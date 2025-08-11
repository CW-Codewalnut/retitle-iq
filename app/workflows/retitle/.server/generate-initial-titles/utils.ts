import type { CoreMessage, JSONValue, UserContent } from "ai";
import { createDataStreamResponse, generateText, streamText } from "ai";
import type { z } from "zod";

import { db } from "@/.server/db";
import { getModelSettings, modelRegistry } from "@/.server/llm";
import { getSERPResults } from "@/.server/llm/tools";
import { languageModelOptions } from "@/utils/llm";
import { getURLsFromText } from "@/utils/misc";

import { getRetitleFirstUserMessage } from "../../utils/methods";
import type { retitleInputSchema } from "../../utils/schemas";
import { getRetitleSystemMessages } from "../prompt";
import { uploadBlogFromFile, uploadBlogFromURL } from "./upload-blog";

type ResponseType = "stream" | "text";

type GenerateInitialTitlesParams<T extends ResponseType> = {
	id: string;
	userId: string;
	reqBody: z.infer<typeof retitleInputSchema>;
	responseType: T;
};

type GenerateInitialTitlesAPIResponse = {
	chatId: string;
	generatedText: string;
};

type GenerateInitialTitlesResponse =
	| Response
	| GenerateInitialTitlesAPIResponse;

export async function generateInitialTitles(
	params: GenerateInitialTitlesParams<"stream">,
): Promise<Response>;
export async function generateInitialTitles(
	params: GenerateInitialTitlesParams<"text">,
): Promise<GenerateInitialTitlesAPIResponse>;
export async function generateInitialTitles<T extends ResponseType>({
	id,
	userId,
	responseType,
	reqBody: inputParseResult,
}: GenerateInitialTitlesParams<T>): Promise<GenerateInitialTitlesResponse> {
	// const userData = await getUserData(userId);

	const usage = await db.usage.findUnique({
		where: { userId },
		select: { retitleGenerations: true },
	});

	if (!usage) {
		await db.usage.create({
			data: { userId },
			select: { retitleGenerations: true },
		});
	}

	// if (
	// 	usage.retitleGenerations >= MAX_RETITLE_GENERATIONS_PER_DAY &&
	// 	userData.privateMetadata.role !== "admin"
	// ) {
	// 	return Response.json(
	// 		{
	// 			status: "error",
	// 			message: "You have reached the maximum number of retitling per day",
	// 		},
	// 		{ status: 429 },
	// 	);
	// }

	await db.usage.update({
		where: { userId },
		data: {
			retitleGenerations: {
				increment: 1,
			},
		},
	});

	const { keyword, model, type: inputType } = inputParseResult;

	let blogURL;
	let fileUpload;
	let fileUploadId;

	if (inputType === "text") {
		const urls = getURLsFromText(inputParseResult.content);
		blogURL = urls.at(0);

		if (blogURL) {
			fileUpload = await uploadBlogFromURL(blogURL);
		}
	} else if (inputType === "file") {
		fileUpload = await uploadBlogFromFile(inputParseResult.file);
	}

	if (fileUpload) {
		const newFileUpload = await db.fileUpload.create({
			data: {
				userId,
				url: fileUpload.url,
				name: fileUpload.name,
				mimeType: fileUpload.mimeType,
			},
			select: {
				id: true,
				url: true,
			},
		});

		fileUploadId = newFileUpload.id;
	}

	const serpResults = await getSERPResults(keyword, "serper");

	const newChat = await db.chat.create({
		data: {
			id,
			userId,
			title: keyword,
			category: "retitle",
			source: responseType === "stream" ? "direct" : "api",
			messages: {
				create: {
					model,
					role: "user",
					content: getRetitleFirstUserMessage(inputParseResult),
					files: fileUploadId
						? {
								connect: { id: fileUploadId },
							}
						: undefined,
				},
			},
		},

		select: {
			id: true,
		},
	});

	const chatId = newChat.id;

	const userMessageParts: UserContent = [];
	if (fileUpload) {
		userMessageParts.push({
			type: "file",
			data: new URL(fileUpload.url),
			mimeType: "application/pdf",
			filename: fileUpload.name,
		});
	}

	userMessageParts.push({
		type: "text",
		text: getRetitleFirstUserMessage(inputParseResult),
	});

	userMessageParts.push({
		type: "text",
		text: `Here is the SERP API Results (JSON): ${JSON.stringify(serpResults)}`,
	});

	const modelSettings = getModelSettings(model);
	const langModel = modelRegistry.languageModel(model);
	const modelInfo = languageModelOptions.find((m) => m.id === model);

	const extraData = {
		model: modelInfo?.name ?? null,
		blogURL: blogURL ?? null,
		serpResults: serpResults as JSONValue,
	};

	const systemMessages = getRetitleSystemMessages({
		isFirstMessage: true,
		isThinkingModel: modelInfo?.thinking ?? false,
	});

	const finalMessages = [
		...systemMessages,
		{
			role: "user",
			content: userMessageParts,
		},
	] satisfies CoreMessage[];

	const modelCallSettings = {
		temperature: 0.8,
		model: langModel,
		messages: finalMessages,

		providerOptions: modelSettings?.providerOptions,
	} satisfies Parameters<typeof streamText>[0];

	async function createMessageOnFinish(text: string, reasoning?: string) {
		await db.message.create({
			data: {
				role: "assistant",
				chatId,
				model,
				content: text,
				reasoning,
				annotations: [extraData],
			},
		});
	}

	if (responseType === "stream") {
		return createDataStreamResponse({
			execute(dataStream) {
				dataStream.writeMessageAnnotation(extraData);

				const result = streamText({
					...modelCallSettings,
					async onFinish(data) {
						await createMessageOnFinish(data.text, data.reasoning);

						console.log("Stream Finish initial titles", chatId);
						console.log("Usage", data.usage);
					},

					async onError(error) {
						console.log("Error generating initial titles", error);

						await db.chat.delete({
							where: {
								id: chatId,
							},
						});

						await db.usage.update({
							where: {
								userId,
							},
							data: {
								retitleGenerations: {
									decrement: 1,
								},
							},
						});
					},
				});

				void result.consumeStream();

				result.mergeIntoDataStream(dataStream);
			},
		});
	} else {
		const result = await generateText(modelCallSettings);
		await createMessageOnFinish(result.text, result.reasoning);

		return {
			chatId,
			generatedText: result.text,
		};
	}
}

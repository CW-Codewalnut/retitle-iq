import { getAuth } from "@clerk/react-router/ssr.server";
import type { CoreMessage, JSONValue, UserContent } from "ai";
import { createDataStreamResponse, streamText } from "ai";
import type { ActionFunctionArgs } from "react-router";

import { getUserData } from "@/.server/auth";
import { db } from "@/.server/db";
import { getModelSettings, modelRegistry } from "@/.server/llm";
import { getSERPResults } from "@/.server/llm/tools";
import { MAX_RETITLE_GENERATIONS_PER_DAY } from "@/utils/constants";
import { languageModelOptions } from "@/utils/llm";
import { getURLsFromText } from "@/utils/misc";

import { getRetitleFirstUserMessage } from "../../utils/methods";
import { retitleInputSchema } from "../../utils/schemas";
import { getRetitleSystemMessages } from "../prompt";
import { uploadBlogFromFile, uploadBlogFromURL } from "./upload-blog";

export async function generateInitialTitles(actionArgs: ActionFunctionArgs) {
	const { userId } = await getAuth(actionArgs);
	if (!userId) {
		return Response.json(
			{
				status: "error",
				message: "You must be signed in to generate titles",
			},
			{ status: 401 },
		);
	}

	const userData = await getUserData(userId);

	let usage = await db.usage.findUnique({
		where: { userId },
		select: { retitleGenerations: true },
	});

	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	if (!usage) {
		usage = await db.usage.create({
			data: { userId },
			select: { retitleGenerations: true },
		});
	}

	if (
		usage.retitleGenerations >= MAX_RETITLE_GENERATIONS_PER_DAY &&
		userData.privateMetadata.role !== "admin"
	) {
		return Response.json(
			{
				status: "error",
				message: "You have reached the maximum number of retitling per day",
			},
			{ status: 429 },
		);
	}

	await db.usage.update({
		where: { userId },
		data: {
			retitleGenerations: {
				increment: 1,
			},
		},
	});

	const id = actionArgs.params.id;
	const input = (await actionArgs.request.json()) as unknown;

	const inputParseResult = retitleInputSchema.safeParse(input);

	if (!inputParseResult.success) {
		return Response.json(
			{
				status: "error",
				message: "Invalid Input",
			},
			{ status: 400 },
		);
	}

	const { keyword, model, type: inputType } = inputParseResult.data;

	let blogURL;
	let fileUpload;
	let fileUploadId;

	if (inputType === "text") {
		const urls = getURLsFromText(inputParseResult.data.content);
		blogURL = urls.at(0);

		if (blogURL) {
			fileUpload = await uploadBlogFromURL(blogURL);
		}
	} else if (inputType === "file") {
		fileUpload = await uploadBlogFromFile(inputParseResult.data.file);
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
			messages: {
				create: {
					model,
					role: "user",
					content: getRetitleFirstUserMessage(inputParseResult.data),
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

	const userMessageParts: UserContent = [];
	if (fileUpload) {
		userMessageParts.push({
			type: "file",
			data: fileUpload.url,
			mimeType: "application/pdf",
		});
	}

	userMessageParts.push({
		type: "text",
		text: getRetitleFirstUserMessage(inputParseResult.data),
	});

	userMessageParts.push({
		type: "text",
		text: `Here is the SERP API Results (JSON): ${JSON.stringify(serpResults)}`,
	});

	const finalMessages = [
		...systemMessages,
		{
			role: "user",
			content: userMessageParts,
		},
	] satisfies CoreMessage[];

	const modelSettings = getModelSettings(model);

	return createDataStreamResponse({
		execute(dataStream) {
			dataStream.writeMessageAnnotation(extraData);

			const result = streamText({
				messages: finalMessages,
				model: modelRegistry.languageModel(model),

				providerOptions: modelSettings?.providerOptions,

				async onFinish(data) {
					await db.message.create({
						data: {
							role: "assistant",
							chatId,
							model,
							content: data.text,
							reasoning: data.reasoning,
							annotations: [extraData],
						},
					});

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
}

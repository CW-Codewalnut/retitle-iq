import { getAuth } from "@clerk/react-router/ssr.server";
import type { ActionFunctionArgs } from "react-router";
import { cors } from "remix-utils/cors";
import { v7 as uuidv7 } from "uuid";
import { z } from "zod";

import { clerkClient } from "@/.server/auth";

import { getTitlesObject } from "../../utils/parse-output";
import { retitleInputSchema } from "../../utils/schemas";
import { generateEmailBody } from "../email/email-template";
import { sendEmail } from "../email/send-email";
import { generateInitialTitles } from "./utils";

type CreateGenerationParams = {
	id: string;
	reqBody: z.infer<typeof apiActionBodySchema>;
};

export async function generateInitialTitlesDirectAction(
	actionArgs: ActionFunctionArgs,
) {
	const id = actionArgs.params.id;
	if (!id) {
		return Response.json(
			{
				status: "error",
				message: "Missing Id",
			},
			{ status: 400 },
		);
	}

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

	const reqBody = (await actionArgs.request.json()) as unknown;
	const inputParseResult = retitleInputSchema.safeParse(reqBody);
	if (!inputParseResult.success) {
		return Response.json(
			{
				status: "error",
				message: "Invalid Input",
				errors: inputParseResult.error.flatten().fieldErrors,
			},
			{ status: 400 },
		);
	}

	const result = await generateInitialTitles({
		id,
		userId,
		responseType: "stream",
		reqBody: inputParseResult.data,
	});

	if (result instanceof Response) {
		return result;
	}

	return Response.json(result, { status: 200 });
}

const apiActionBodySchema = retitleInputSchema.and(
	z.object({
		email: z.string().email(),
	}),
);

export async function generateInitialTitlesTextAPIAction(
	actionArgs: ActionFunctionArgs,
) {
	const reqBody = (await actionArgs.request.json()) as unknown;
	const inputParseResult = apiActionBodySchema.safeParse(reqBody);
	if (!inputParseResult.success) {
		return await cors(
			actionArgs.request,
			Response.json({
				status: "error",
				message: "Invalid Input",
				errors: inputParseResult.error.flatten().fieldErrors,
			}),
			{
				origin: true,
				methods: ["POST", "OPTIONS"],
			},
		);
	}

	const newChatId = uuidv7();
	void createGeneration({
		id: newChatId,
		reqBody: inputParseResult.data,
	});

	return await cors(
		actionArgs.request,
		Response.json({
			chatId: newChatId,
			status: "success",
			message: "Titles generation started",
		}),
		{
			origin: true,
			methods: ["POST", "OPTIONS"],
		},
	);
}

async function createGeneration({ id, reqBody }: CreateGenerationParams) {
	const existingUserResponse = await clerkClient.users.getUserList({
		emailAddress: [reqBody.email],
	});

	const existingUser = existingUserResponse.data;

	let user;

	if (existingUser.length > 0) {
		user = existingUser[0];
	} else {
		user = await clerkClient.users.createUser({
			emailAddress: [reqBody.email],
			skipPasswordChecks: true,
		});
	}

	const result = await generateInitialTitles({
		id,
		userId: user.id,
		responseType: "text",
		reqBody,
	});

	const generationLink = `${process.env.APP_URL}/${id}`;
	const title =
		getTitlesObject(result.generatedText)?.finalRecommendedTitles?.map(
			(item) => item?.title ?? "",
		) ?? [];

	const emailBody = generateEmailBody({ titles: title, generationLink });

	// Send the email to the user
	await sendEmail({
		to: reqBody.email,
		subject: "Your Retitle IQ Title Suggestions Are Ready!",
		html: emailBody,
	});

	return result;
}

import { getAuth } from "@clerk/react-router/ssr.server";
import type { ActionFunctionArgs } from "react-router";
import { v7 as uuidv7 } from "uuid";
import { z } from "zod";

import { clerkClient } from "@/.server/auth";

import { retitleInputSchema } from "../../utils/schemas";
import { generateInitialTitles } from "./utils";

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

	return result;
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
		return Response.json(
			{
				status: "error",
				message: "Invalid Input",
				errors: inputParseResult.error.flatten().fieldErrors,
			},
			{ status: 400 },
		);
	}

	const newChatId = uuidv7();
	void createGeneration({
		id: newChatId,
		reqBody: inputParseResult.data,
	});

	return Response.json({
		chatId: newChatId,
		status: "success",
		message: "Titles generation started",
	});
}

type CreateGenerationParams = {
	id: string;
	reqBody: z.infer<typeof apiActionBodySchema>;
};

async function createGeneration({ id, reqBody }: CreateGenerationParams) {
	const newUser = await clerkClient.users.createUser({
		emailAddress: [reqBody.email],
	});

	const result = await generateInitialTitles({
		id,
		userId: newUser.id,
		responseType: "text",
		reqBody,
	});

	console.log("result", result);

	// TODO: Send email to user
	return result;
}

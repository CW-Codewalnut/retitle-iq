import { getAuth } from "@clerk/react-router/ssr.server";
import type { ActionFunctionArgs } from "react-router";
import { v7 as uuidv7 } from "uuid";
import { z } from "zod";

import { clerkClient } from "@/.server/auth";
import { retitleInputSchema } from "../../utils/schemas";
import { generateInitialTitles } from "./utils";
import { sendEmail } from "../email/send-email";
import { getTitlesObject } from "../../utils/parse-output";
import { generateEmailBody } from "../email/email-template";

type CreateGenerationParams = {
	id: string;
	reqBody: z.infer<typeof apiActionBodySchema>;
};

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") || [];

function setCORSHeaders(response: Response, origin: string | null) {
	if (origin && ALLOWED_ORIGINS.includes(origin)) {
		response.headers.set("Access-Control-Allow-Origin", origin);
		response.headers.set("Access-Control-Allow-Methods", "POST");
		response.headers.set("Access-Control-Allow-Headers", "Content-Type");
	} else {
		response.headers.set("Access-Control-Allow-Origin", "null");
	}
}

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

	const origin = actionArgs.request.headers.get("Origin");
	const response = new Response(null);

	setCORSHeaders(response, origin);

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

	const clickableLink = `${process.env.APP_URL}/${id}`;
	const title =
		getTitlesObject(result.generatedText)?.finalRecommendedTitles?.map(
			(item) => item?.title || "",
		) || [];

	const emailBody = generateEmailBody({ titles: title, clickableLink });

	// Send the email to the user
	await sendEmail({
		to: reqBody.email,
		subject: "Your Retitle IQ Title Suggestions Are Ready!",
		html: emailBody,
	});

	return result;
}

import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

import { db } from "@/.server/db";
import { getUIMessagesFromDBMessages } from "@/.server/llm/messages";
import { RETITLE_ROUTE } from "@/utils/constants";

export async function getChatMessages(loaderArgs: LoaderFunctionArgs) {
	const chatId = loaderArgs.params.id;

	const chat = await db.chat.findUnique({
		where: {
			id: chatId,
		},
		include: {
			messages: {
				orderBy: {
					createdAt: "asc",
				},
				include: {
					files: true,
				},
			},
		},
	});

	if (!chat) {
		return redirect(RETITLE_ROUTE);
	}

	const messages = getUIMessagesFromDBMessages(chat.messages);
	return messages;
}

import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

import { RETITLE_ROUTE } from "@/lib/constants";
import { db } from "@/lib/db";
import { getUIMessagesFromDBMessages } from "@/utils/server/messages";

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

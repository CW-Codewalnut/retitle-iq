import { getAuth } from "@clerk/react-router/ssr.server";
import type { LoaderFunctionArgs } from "react-router";

import { db } from "@/lib/db";
import { getInfiniteAPIParams } from "@/utils/server";
import type { InfiniteAPIResponse } from "@/utils/types";

export async function getRetitleChatHistory(loaderArgs: LoaderFunctionArgs) {
	const searchParams = new URL(loaderArgs.request.url).searchParams;
	const { userId } = await getAuth(loaderArgs);

	if (!userId) {
		return Response.json(
			{
				status: "error",
				message: "You must be signed in to view chat history",
			},
			{ status: 401 },
		);
	}

	const { prismaParams, limit } = getInfiniteAPIParams(searchParams);

	const chats = await db.chat.findMany({
		where: {
			userId,
		},

		select: {
			id: true,
			title: true,
		},

		orderBy: {
			updatedAt: "desc",
		},

		...prismaParams,
	});

	const lastId = chats.at(-1)?.id ?? null;
	const nextCursor = chats.length === limit ? lastId : null;

	return Response.json(
		{
			nextCursor,
			items: chats,
			status: "success",
		} satisfies InfiniteAPIResponse,
		{ status: 200 },
	);
}

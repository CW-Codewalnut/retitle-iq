import { RetitleChat } from "@/workflows/retitle/components/chat";
import { getChatMessages } from "@/workflows/retitle/server/get-chat-messages";

import type { Route } from "./+types/_retitle.$id";

export const loader = getChatMessages;

export default function RetitleChatPage({
	params,
	loaderData,
}: Route.ComponentProps) {
	return <RetitleChat id={params.id} initialMessages={loaderData} />;
}

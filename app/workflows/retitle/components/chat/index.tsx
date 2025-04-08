import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";

import { RetitleChatMessages } from "./messages";

type RetitleChatProps = {
	id: string;
	initialMessages: UIMessage[];
};

export function RetitleChat({ id, initialMessages }: RetitleChatProps) {
	const { messages, status } = useChat({
		id,
		initialMessages,
	});

	return <RetitleChatMessages status={status} messages={messages} />;
}

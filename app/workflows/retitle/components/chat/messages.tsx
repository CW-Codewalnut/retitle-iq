import type { UseChatHelpers } from "@ai-sdk/react";

import { ScrollToBottom } from "@/components/chat/scroll-to-bottom";
import { UserMessage } from "@/components/chat/user-message";

import { RetitleLoading } from "../loading";
import { InitialTitles } from "./initial-titles";

type MessagesProps = Pick<UseChatHelpers, "status" | "messages">;

export function RetitleChatMessages({ status, messages }: MessagesProps) {
	const isStreaming = status === "streaming";

	const lastMessage = messages.at(-1);
	const lastMessageContent = lastMessage?.content;
	const isLoading =
		status === "submitted" ||
		(lastMessage?.role === "assistant" && lastMessageContent === "");

	return (
		<div className="flex flex-col gap-8">
			{messages.map((message, index) => {
				if (message.role === "user") {
					return <UserMessage key={message.id} {...message} />;
				}

				if (message.role === "assistant") {
					if (index === 1 && message.content) {
						return (
							<InitialTitles
								{...message}
								key={message.id}
								isStreaming={isStreaming}
							/>
						);
					}
				}
			})}
			{isLoading ? <RetitleLoading /> : null}
			<ScrollToBottom
				isStreaming={isStreaming}
				autoScrollKey={lastMessageContent}
			/>
		</div>
	);
}

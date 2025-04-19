import type { FileUpload, Message as DBMessage } from "@prisma/client";
import type { Attachment, CoreMessage, FilePart, UIMessage } from "ai";

type DBMessageWithFiles = DBMessage & {
	files: FileUpload[];
};

export function getCoreMessagesFromDBMessages(
	dbMessages: DBMessageWithFiles[],
) {
	const conversationHistory: CoreMessage[] = [];

	for (const dbMessage of dbMessages) {
		if (dbMessage.role === "assistant") {
			conversationHistory.push({
				role: "assistant",
				content: dbMessage.content,
			});
		}

		if (dbMessage.role === "user") {
			const fileParts: FilePart[] = [];

			for (const file of dbMessage.files) {
				fileParts.push({
					type: "file",
					data: file.url,
					filename: file.name,
					mimeType: file.mimeType,
				});
			}

			conversationHistory.push({
				role: "user",
				content: [
					...fileParts,
					{
						type: "text",
						text: dbMessage.content,
					},
				],
			});
		}
	}

	return conversationHistory;
}

export function getUIMessagesFromDBMessages(dbMessages: DBMessageWithFiles[]) {
	const conversationHistory: UIMessage[] = [];

	for (const dbMessage of dbMessages) {
		if (dbMessage.role === "assistant") {
			const parts: UIMessage["parts"] = [];

			parts.push({
				type: "text",
				text: dbMessage.content,
			});

			if (dbMessage.reasoning) {
				parts.push({
					type: "reasoning",
					reasoning: "",
					details: [{ type: "text", text: dbMessage.reasoning }],
				});
			}

			conversationHistory.push({
				id: dbMessage.id,
				role: "assistant",
				content: dbMessage.content,
				annotations: dbMessage.annotations as never,
				parts,
			});
		}

		if (dbMessage.role === "user") {
			const fileParts: Attachment[] = [];

			for (const file of dbMessage.files) {
				fileParts.push({
					url: file.url,
					name: file.name,
					contentType: file.mimeType,
				});
			}

			conversationHistory.push({
				id: dbMessage.id,
				role: "user",
				content: dbMessage.content,
				experimental_attachments: fileParts,
				parts: [
					{
						type: "text",
						text: dbMessage.content,
					},
				],
			});
		}
	}

	return conversationHistory;
}

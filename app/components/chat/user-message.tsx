import type { UIMessage } from "ai";
import { useMemo } from "react";

import { UploadList } from "./upload-list";

type UserMessageProps = UIMessage;

export function UserMessage({
	parts,
	experimental_attachments: attachments,
}: UserMessageProps) {
	const uploads = useMemo(() => {
		if (!attachments) {
			return [];
		}

		return attachments.map((i) => ({
			id: crypto.randomUUID(),
			url: i.url,
			name: i.name ?? "file",
			contentType: i.contentType ?? "",
		}));
	}, [attachments]);

	return (
		<div className="flex flex-col items-end gap-0.5">
			<div className="bg-muted max-w-4/5 rounded-xl rounded-br-none px-4 py-2.5">
				{parts.map((part, index) => {
					if (part.type === "text") {
						return (
							<p key={index} className="break-all whitespace-pre-wrap">
								{part.text}
							</p>
						);
					}
				})}
			</div>
			<UploadList uploads={uploads} />
		</div>
	);
}

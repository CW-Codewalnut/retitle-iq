import type { Attachment } from "ai";

export function parseUserUpload(file: Attachment, index = 1) {
	const extension = file.name?.split(".").pop()?.toLowerCase();
	const name = file.name ?? `file-${index}.${extension}`;

	let dataURI = file.url;
	let mimeType = file.contentType ?? "application/octet-stream";

	if (extension === "md") {
		mimeType = "text/plain";
		dataURI = file.url.replace("application/octet-stream", "text/plain");
	}

	const base64 = dataURI.replace(`data:${mimeType};base64,`, "");
	const buffer = Buffer.from(base64, "base64");

	return {
		name,
		mimeType,
		extension,
		buffer,
		base64,
		dataURI,
	};
}

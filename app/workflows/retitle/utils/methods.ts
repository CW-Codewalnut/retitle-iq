import type { RetitleInput } from "./types";

export function getRetitleFirstUserMessage(input: RetitleInput) {
	return `Primary Keyword:\n${input.keyword}\n\nBlog Content:\n${input.type === "text" ? input.content : input.file.name}`;
}

import { fixJson } from "./fix-json";
import type { RetitleOutputPartial } from "./types";

export function getCodeFenceContent(input: string) {
	const regex = /^\s*```(?:[ \t]*\S+)?[ \t]*\n?([\s\S]*?)(?:\n?[ \t]*```)?\s*$/;
	const match = regex.exec(input);
	return match ? match[1] : input;
}

export function getXMLTagContent(
	rawText: string | null | undefined,
	tag: string,
) {
	if (!rawText) {
		return;
	}

	let text = getCodeFenceContent(rawText.trim());

	const endingTagIndex = text.indexOf(`</${tag}>`);
	if (endingTagIndex === -1) {
		text += `</${tag}>`;
	}

	const contentRegex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "g");
	const contentMatch = contentRegex.exec(text);
	const content = contentMatch?.[1];

	if (content) {
		return getCodeFenceContent(content.trim());
	}
}

export function getTitlesObject(rawResponse: string | null | undefined) {
	const titlesTagContent = getXMLTagContent(rawResponse, "titles");

	if (titlesTagContent) {
		return JSON.parse(fixJson(titlesTagContent)) as RetitleOutputPartial;
	}
}

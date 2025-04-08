import type { CoreMessage } from "ai";

import { RETITLE_IQ_RESEARCH_DOC } from "./docs";
import {
	getRetitleSysOutputInstructions,
	RETITLE_SYS_INSTRUCTIONS,
} from "./instructions";

type GetRetitleSystemMessagesParams = {
	extraText?: string;
	isFirstMessage: boolean;
	isThinkingModel: boolean;
};

export function getRetitleSystemMessages({
	extraText = "",
	isFirstMessage: _,
	isThinkingModel,
}: GetRetitleSystemMessagesParams) {
	return [
		{
			role: "system",
			content: `
			<documents>
			${RETITLE_IQ_RESEARCH_DOC}
			</documents>
			`,
		},
		{
			role: "system",
			content: `
			<instructions>
			${RETITLE_SYS_INSTRUCTIONS}
			${getRetitleSysOutputInstructions(isThinkingModel)}
			</instructions>
			`,
		},
		{
			role: "system",
			content: `Extra Info: Current Date(ISO): ${new Date().toISOString()}. ${extraText}`,
		},
	] satisfies CoreMessage[];
}

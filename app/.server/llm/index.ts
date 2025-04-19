import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import type { LanguageModel as LanguageModelV1, ProviderMetadata } from "ai";
import { customProvider } from "ai";

import type { LanguageModel } from "@/utils/llm";

export const modelRegistry = customProvider({
	languageModels: {
		"gemini-2.0-flash": google("gemini-2.0-flash-001", {
			structuredOutputs: false,
		}),

		"gemini-2.0-flash-lite": google("gemini-2.0-flash-lite-001", {
			structuredOutputs: false,
		}),

		"gemini-2.0-flash-thinking": google("gemini-2.0-flash-thinking-exp-01-21", {
			structuredOutputs: false,
		}),

		"gemini-2.0-pro": google("gemini-2.0-pro-exp-02-05", {
			structuredOutputs: false,
		}),

		"gemini-2.5-pro-thinking": openrouter(
			"google/gemini-2.5-pro-preview-03-25",
			{
				reasoning: {
					effort: "high",
					exclude: false,
				},
			},
		),

		"sonnet-3.5": anthropic("claude-3-5-sonnet-20241022", {
			sendReasoning: false,
		}),

		"sonnet-3.7": anthropic("claude-3-7-sonnet-20250219", {
			sendReasoning: false,
		}),

		"sonnet-3.7-thinking": anthropic("claude-3-7-sonnet-20250219", {
			sendReasoning: true,
		}),

		"gpt-4o": openai("gpt-4o-2024-11-20"),

		"gpt-4o-mini": openai("gpt-4o-mini-2024-07-18"),

		"ChatGPT-4o": openai("chatgpt-4o-latest"),

		"o3-mini-low": openai("o3-mini-2025-01-31", {
			reasoningEffort: "low",
		}),

		"o3-mini-medium": openai("o3-mini-2025-01-31", {
			reasoningEffort: "medium",
		}),

		"o3-mini-high": openai("o3-mini-2025-01-31", {
			reasoningEffort: "high",
		}),

		"quasar-alpha": openrouter("openrouter/quasar-alpha"),

		"deepseek-v3": openrouter("deepseek/deepseek-chat-v3-0324:free"),

		"deepseek-r1": openrouter("deepseek/deepseek-r1:free", {
			reasoning: {
				effort: "high",
				exclude: false,
			},
		}),
	} satisfies Record<LanguageModel, LanguageModelV1>,
});

export function getModelSettings(
	model: LanguageModel,
	structuredOutputs = false,
): {
	providerOptions: ProviderMetadata;
} {
	if (model === "sonnet-3.7-thinking") {
		return {
			providerOptions: {
				anthropic: {
					sendReasoning: true,
					thinking: {
						type: "enabled",
						budgetTokens: 32000,
					},
				},
			},
		};
	}

	if (model === "sonnet-3.7" || model === "sonnet-3.5") {
		return {
			providerOptions: {
				anthropic: {
					sendReasoning: false,
				},
			},
		};
	}

	if (model === "gpt-4o" || model === "gpt-4o-mini" || model === "ChatGPT-4o") {
		return {
			providerOptions: {
				openai: {
					structuredOutputs,
				},
			},
		};
	}

	if (model.includes("gemini") && model !== "gemini-2.5-pro-thinking") {
		return {
			providerOptions: {
				google: {
					structuredOutputs,
				},
			},
		};
	}

	return {
		providerOptions: {
			openrouter: {
				transforms: ["middle-out"],
			},
		},
	};
}

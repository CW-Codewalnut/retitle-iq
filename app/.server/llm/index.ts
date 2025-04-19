import type { AnthropicProviderOptions } from "@ai-sdk/anthropic";
import { anthropic } from "@ai-sdk/anthropic";
import type { GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { google } from "@ai-sdk/google";
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

		"gemini-2.5-flash": google("gemini-2.5-flash-preview-04-17", {
			structuredOutputs: false,
		}),

		"gemini-2.5-flash-thinking": google("gemini-2.5-flash-preview-04-17", {
			structuredOutputs: false,
		}),

		"gemini-2.5-pro-thinking": openrouter(
			"google/gemini-2.5-pro-preview-03-25",
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

		"gpt-4o": openrouter("openai/gpt-4o-2024-11-20"),

		"gpt-4o-mini": openrouter("openai/gpt-4o-mini-2024-07-18"),

		"chatgpt-4o": openrouter("openai/chatgpt-4o-latest"),

		"gpt-4.1": openrouter("openai/gpt-4.1"),

		"gpt-4.1-mini": openrouter("openai/gpt-4.1-mini"),

		"deepseek-v3": openrouter("deepseek/deepseek-chat-v3-0324:free"),

		"deepseek-r1": openrouter("deepseek/deepseek-r1:free", {
			reasoning: {
				exclude: false,
				effort: "medium",
			},
		}),
	} satisfies Record<LanguageModel, LanguageModelV1>,
});

export function getModelSettings(model: LanguageModel): {
	isOpenRouter?: boolean;
	providerOptions: ProviderMetadata;
} {
	if (model === "sonnet-3.7-thinking") {
		return {
			providerOptions: {
				anthropic: {
					thinking: {
						type: "enabled",
						budgetTokens: 40000,
					},
				} satisfies AnthropicProviderOptions,
			},
		};
	}

	if (model === "sonnet-3.7" || model === "sonnet-3.5") {
		return {
			providerOptions: {
				anthropic: {
					thinking: {
						type: "disabled",
					},
				} satisfies AnthropicProviderOptions,
			},
		};
	}

	if (model === "gemini-2.5-flash") {
		return {
			providerOptions: {
				google: {
					thinkingConfig: {
						thinkingBudget: 0,
					},
				} satisfies GoogleGenerativeAIProviderOptions,
			},
		};
	}

	if (model === "gemini-2.5-flash-thinking") {
		return {
			providerOptions: {
				google: {
					thinkingConfig: {
						thinkingBudget: 20000,
					},
				} satisfies GoogleGenerativeAIProviderOptions,
			},
		};
	}

	return {
		isOpenRouter: true,
		providerOptions: {
			openrouter: {
				reasoning: {
					exclude: false,
					effort: "medium",
				},

				transforms: ["middle-out"],
				usage: {
					include: true,
				},
			},
		},
	};
}

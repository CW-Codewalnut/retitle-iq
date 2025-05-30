import type { GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { google } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel as LanguageModelV1, ProviderMetadata } from "ai";
import { customProvider } from "ai";

import type { LanguageModel } from "@/utils/llm";

const openrouter = createOpenAI({
	name: "openrouter",
	compatibility: "strict",
	baseURL: "https://openrouter.ai/api/v1",
	apiKey: process.env.OPENROUTER_API_KEY!,
});

export const modelRegistry = customProvider({
	languageModels: {
		"gemini-2.0-flash": google("gemini-2.0-flash-001", {
			structuredOutputs: false,
		}),

		"gemini-2.5-flash": google("gemini-2.5-flash-preview-05-20", {
			structuredOutputs: false,
		}),

		"gemini-2.5-flash-thinking": google("gemini-2.5-flash-preview-05-20", {
			structuredOutputs: false,
		}),

		"gemini-2.5-pro-thinking": openrouter("google/gemini-2.5-pro-preview"),

		"sonnet-3.5": openrouter("anthropic/claude-3.5-sonnet"),

		"sonnet-4": openrouter("anthropic/claude-sonnet-4"),

		"gpt-4o": openrouter("openai/gpt-4o-2024-11-20"),

		"gpt-4o-mini": openrouter("openai/gpt-4o-mini-2024-07-18"),

		"chatgpt-4o": openrouter("openai/chatgpt-4o-latest"),

		"gpt-4.1": openrouter("openai/gpt-4.1"),

		"gpt-4.1-mini": openrouter("openai/gpt-4.1-mini"),

		"o4-mini": openrouter("openai/o4-mini", {
			reasoningEffort: "medium",
		}),

		"grok-3-mini": openrouter("x-ai/grok-3-mini-beta", {
			reasoningEffort: "medium",
		}),
	} satisfies Record<LanguageModel, LanguageModelV1>,
});

export function getModelSettings(model: LanguageModel): {
	providerOptions: ProviderMetadata;
} {
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

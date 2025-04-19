import { z } from "zod";

export const languageModels = [
	"gemini-2.0-flash",
	"gemini-2.0-flash-lite",
	"gemini-2.5-flash",
	"gemini-2.5-flash-thinking",
	"gemini-2.5-pro-thinking",

	"sonnet-3.5",
	"sonnet-3.7",
	"sonnet-3.7-thinking",

	"gpt-4o",
	"gpt-4o-mini",
	"chatgpt-4o",
	"gpt-4.1",
	"gpt-4.1-mini",
	"o4-mini",

	"grok-3-mini",

	"deepseek-v3",
	"deepseek-r1",
] as const;

export type LanguageModel = (typeof languageModels)[number];

export const defaultLanguageModel = "gemini-2.0-flash" satisfies LanguageModel;
export const languageModelSchema = z
	.enum(languageModels)
	.catch(defaultLanguageModel);

export type ModelOption = {
	id: LanguageModel;
	name: string;
	thinking?: boolean;
};

export const languageModelOptions = [
	{
		id: "gemini-2.0-flash",
		name: "Gemini 2.0 Flash",
	},
	{
		id: "gemini-2.0-flash-lite",
		name: "Gemini 2.0 Flash Lite",
	},
	{
		id: "gemini-2.5-flash",
		name: "Gemini 2.5 Flash",
	},
	{
		id: "gemini-2.5-flash-thinking",
		name: "Gemini 2.5 Flash (Reasoning)",
		thinking: true,
	},
	{
		id: "gemini-2.5-pro-thinking",
		name: "Gemini 2.5 Pro (Reasoning)",
		thinking: true,
	},
	{
		id: "sonnet-3.5",
		name: "Claude Sonnet 3.5",
	},
	{
		id: "sonnet-3.7",
		name: "Claude Sonnet 3.7",
	},
	{
		id: "sonnet-3.7-thinking",
		name: "Claude Sonnet 3.7 (Reasoning)",
		thinking: true,
	},
	{
		id: "gpt-4o",
		name: "GPT-4o",
	},
	{
		id: "gpt-4o-mini",
		name: "GPT-4o Mini",
	},
	{
		id: "chatgpt-4o",
		name: "ChatGPT-4o",
	},
	{
		id: "gpt-4.1",
		name: "GPT-4.1",
	},
	{
		id: "gpt-4.1-mini",
		name: "GPT-4.1 Mini",
	},
	{
		id: "o4-mini",
		name: "o4 Mini",
		thinking: true,
	},
	{
		id: "grok-3-mini",
		name: "Grok 3 Mini",
		thinking: true,
	},
	{
		id: "deepseek-v3",
		name: "Deepseek V3",
	},
	{
		id: "deepseek-r1",
		name: "Deepseek R1 (Reasoning)",
		thinking: true,
	},
] satisfies ModelOption[];

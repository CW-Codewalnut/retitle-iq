import { z } from "zod";

import { languageModelSchema } from "@/utils/llm";

export const retitleInputSchema = z
	.object({
		keyword: z.string(),
		model: languageModelSchema,
	})
	.and(
		z.discriminatedUnion("type", [
			z.object({
				content: z.string(),
				type: z.literal("text"),
			}),
			z.object({
				file: z.object({
					url: z.string(),
					name: z.string(),
					contentType: z.string(),
				}),
				type: z.literal("file"),
			}),
		]),
	);

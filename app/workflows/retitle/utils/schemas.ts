import { z } from "zod";

import { aiModelSchema } from "@/lib/ai/models/list";

export const retitleInputSchema = z
	.object({
		keyword: z.string(),
		model: aiModelSchema,
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

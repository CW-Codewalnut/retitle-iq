import type { DeepPartial } from "ai";
import type { z } from "zod";

import type { retitleInputSchema } from "./schemas";

export type RetitleInput = z.infer<typeof retitleInputSchema>;

export type RetitleOutput = {
	competitorTitles: {
		name: string;
		title: string;
		score: number;
		justification: string;
	}[];

	finalRecommendedTitles: {
		name: string;
		title: string;
		justification: string;
	}[];
};

export type RetitleOutputPartial = DeepPartial<RetitleOutput>;

export type GoogleTitle = DeepPartial<
	RetitleOutput["competitorTitles"][number]
>;

export type SerpResult = { title: string; link: string } & Record<
	string,
	string
>;

export type RetitleInitialTitlesAnnotations = {
	model?: string;
	blogURL?: string | null;
	serpResults?: SerpResult[];
};

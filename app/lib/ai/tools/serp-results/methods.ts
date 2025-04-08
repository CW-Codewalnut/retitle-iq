import type { Prisma } from "@prisma/client";

import { getGoogleSearchResults } from "@/lib/ai/tools/google-cse-api";
import type { SerpResultsProvider } from "@/lib/ai/tools/serp-results/types";
import { getSerperResults } from "@/lib/ai/tools/serper-api";
import { SERP_CACHE_DURATION_HOURS } from "@/lib/constants";
import { db } from "@/lib/db";

export async function getSERPResults(
	query: string,
	provider: SerpResultsProvider,
) {
	const cacheExpiryTime = new Date();

	cacheExpiryTime.setHours(
		cacheExpiryTime.getHours() - SERP_CACHE_DURATION_HOURS,
	);

	let serpResult = await db.serpResult.findFirst({
		where: {
			query,
			createdAt: {
				gte: cacheExpiryTime,
			},
		},
	});

	if (!serpResult) {
		console.log("cache expired/not found", { query });

		let serpAPIResponse: Prisma.JsonValue = {};

		if (provider === "google-cse") {
			serpAPIResponse = await getGoogleSearchResults({
				query,
			});
		}

		if (provider === "serper") {
			serpAPIResponse = await getSerperResults({
				query,
			});
		}

		serpResult = await db.serpResult.create({
			data: {
				query,
				results: serpAPIResponse,
			},
		});
	} else {
		console.log("cache found", { query, createdAt: serpResult.createdAt });
	}

	return serpResult.results;
}

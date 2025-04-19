import type { Prisma } from "@prisma/client";

import { db } from "@/.server/db";
import { SERP_CACHE_DURATION_HOURS } from "@/utils/constants";

import { getGoogleSearchResults } from "../google-cse-api";
import { getSerperResults } from "../serper-api";
import type { SerpResultsProvider } from "./types";

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

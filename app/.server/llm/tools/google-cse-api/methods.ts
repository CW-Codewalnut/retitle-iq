import type { Prisma } from "@prisma/client";

import type { GetSerpResultsParams } from "../serp-results/types";
import type {
	GoogleSearchAPIResponse,
	GoogleSearchAPIResultItem,
} from "./types";

const MAX_RESULTS_PER_PAGE = 10;
const baseURL = "https://www.googleapis.com/customsearch/v1";

export async function getGoogleSearchResults({
	query,
	maxResults = 20,
}: GetSerpResultsParams) {
	const apiURL = new URL(baseURL);

	apiURL.searchParams.set("cx", process.env.GOOGLE_SEARCH_ENGINE_ID!);
	apiURL.searchParams.set("key", process.env.GOOGLE_SEARCH_ENGINE_API_KEY!);
	apiURL.searchParams.set("num", `${MAX_RESULTS_PER_PAGE}`);
	apiURL.searchParams.set("q", query);

	const results: GoogleSearchAPIResponse["items"] = [];

	let start = 1;

	while (start < maxResults) {
		apiURL.searchParams.set("start", `${start}`);

		try {
			console.log("Calling Google Search API", { query, start });

			const resp = await fetch(apiURL.toString());
			const data = (await resp.json()) as GoogleSearchAPIResponse;

			console.log("Google Search API Resp Status", resp.status);

			if (!resp.ok) {
				throw new Error(JSON.stringify(data));
			}

			results.push(...data.items);
		} catch (error) {
			console.log("Error calling Google Search API", error);
		}

		start += MAX_RESULTS_PER_PAGE;
	}

	return results;
}

export function getGoogleSearchResultsForLLM(results: Prisma.JsonValue) {
	const items = results as GoogleSearchAPIResultItem[];

	return items?.map((item) => {
		return {
			title: item.title,
			finalURL: item.link,
			displayLink: item.displayLink,
		};
	});
}

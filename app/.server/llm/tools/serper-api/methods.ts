import type { GetSerpResultsParams } from "../serp-results/types";
import type { SerperAPIResponse } from "./types";

const baseURL = "https://google.serper.dev/search";

export async function getSerperResults({
	query,
	maxResults = 20,
}: GetSerpResultsParams) {
	const apiURL = new URL(baseURL);

	try {
		console.log("Calling Serper API", { query });

		const reqHeaders = new Headers();
		reqHeaders.append("Content-Type", "application/json");
		reqHeaders.append("X-API-KEY", process.env.SERPER_API_KEY!);

		const reqBody = {
			q: query,
			num: maxResults,
		};

		const resp = await fetch(apiURL.toString(), {
			method: "POST",
			headers: reqHeaders,
			body: JSON.stringify(reqBody),
		});

		const data = (await resp.json()) as SerperAPIResponse;

		console.log("Serper API Resp Status", resp.status);

		if (!resp.ok) {
			throw new Error(JSON.stringify(data));
		}

		return data.organic;
	} catch (error) {
		console.log("Error calling Serper API", error);
		return [];
	}
}

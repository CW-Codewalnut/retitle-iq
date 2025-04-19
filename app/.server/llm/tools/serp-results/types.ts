export type GetSerpResultsParams = {
	query: string;
	maxResults?: number;
};

export type SerpResultsProvider = "google-cse" | "serper";

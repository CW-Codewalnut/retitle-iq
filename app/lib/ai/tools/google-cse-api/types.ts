type GoogleSearchAPIRequest = {
	title: string;
	totalResults: string;
	searchTerms: string;
	count: number;
	startIndex: number;
	inputEncoding: string;
	outputEncoding: string;
	safe: string;
	cx: string;
};

export type GoogleSearchAPIResponse = {
	kind: string;
	url: {
		type: string;
		template: string;
	};
	queries: {
		request: GoogleSearchAPIRequest;
		nextPage?: GoogleSearchAPIRequest;
	};
	context: {
		title: string;
	};
	searchInformation: {
		searchTime: number;
		formattedSearchTime: string;
		totalResults: string;
		formattedTotalResults: string;
	};

	items: GoogleSearchAPIResultItem[];
};

export type GoogleSearchAPIResultItem = {
	kind: string;
	title: string;
	htmlTitle: string;
	link: string;
	displayLink: string;
	snippet: string;
	htmlSnippet: string;
	formattedUrl: string;
	htmlFormattedUrl: string;
	pagemap?: GoogleSearchResultItemPageMap;
};

type GoogleSearchResultItemPageMap = {
	metatags?: Record<string, string>[];
	cse_image?: {
		src: string;
	};
};

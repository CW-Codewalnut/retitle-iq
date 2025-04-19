export type SerperAPIOrganicResult = {
	position: number;
	title: string;
	link: string;
	snippet: string;
	sitelinks?: {
		title: string;
		link: string;
	}[];
	attributes?: Record<string, string>;
};

export type SerperAPIResponse = {
	knowledgeGraph: {
		title: string;
		type: string;
		website: string;
		imageUrl: string;
		description: string;
		descriptionSource: string;
		descriptionLink: string;
		attributes: Record<string, string>;
	};

	organic: SerperAPIOrganicResult[];

	peopleAlsoAsk: {
		question: string;
		snippet: string;
		title: string;
		link: string;
	}[];

	relatedSearches: {
		query: string;
	}[];
};

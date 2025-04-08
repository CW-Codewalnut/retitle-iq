export function getURLsFromText(text: string) {
	const urlRegex =
		/(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)(\/[^\s]*)?/g;

	const matches = text.match(urlRegex) ?? [];

	const validUrls = [];

	for (const url of matches) {
		if (!url.startsWith("http://") && !url.startsWith("https://")) {
			validUrls.push("http://" + url);
		} else {
			validUrls.push(url);
		}
	}

	return validUrls;
}

export function getDomainFromURL(url: string): string | null {
	try {
		const urlObject = new URL(url);
		return urlObject.hostname;
	} catch (error) {
		console.error("Error extracting domain:", error);
		return url;
	}
}

export function getFaviconURL(url: string) {
	return `https://www.google.com/s2/favicons?domain=${url}`;
}

export function getRandomIndex(arrLength: number) {
	return Math.floor(Math.random() * arrLength);
}

import { cloudFlareClient } from "@/.server/cloudflare";

const options = {
	account_id: process.env.CLOUDFLARE_ACCOUNT_ID!,
} as const;

export async function getURLContent(url: string) {
	console.log("Visiting URL", url);

	let buffer;

	const pdfResponse = await cloudFlareClient.browserRendering.pdf.create({
		url,
		...options,
	});

	if (pdfResponse.ok) {
		const arrayBuffer = await pdfResponse.arrayBuffer();
		buffer = Buffer.from(arrayBuffer);
	}

	return buffer;
}

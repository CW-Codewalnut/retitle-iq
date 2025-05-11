import Cloudflare from "cloudflare";

export const cloudFlareClient = new Cloudflare({
	apiToken: process.env.CLOUDFLARE_API_TOKEN,
});

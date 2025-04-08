import path from "path";
import type { LaunchOptions } from "playwright";
import { chromium } from "playwright";

const userDataDir = path.join(import.meta.dirname, "./.tmp/storage-state.json");

export async function getBrowserInstance(launchOptions?: LaunchOptions) {
	const browser = await chromium.launch({
		...launchOptions,
		headless: true,
		channel: "chromium",
		args: ["--disable-blink-features=AutomationControlled"],
	});

	const context = await browser.newContext({
		locale: "en-US",
		deviceScaleFactor: 1,
	});

	await context.storageState({ path: userDataDir });
	const page = await context.newPage();

	return {
		browser,
		context,
		page,
	};
}

export async function getURLContent(url: string, type: "image" | "pdf") {
	const { browser, page } = await getBrowserInstance();
	await page.goto(url, { waitUntil: "domcontentloaded" });

	console.log("Visiting URL", url);

	let buffer;

	if (type == "image") {
		buffer = await page.screenshot({
			type: "png",
			fullPage: true,
			animations: "disabled",
		});
	} else {
		await page.emulateMedia({
			media: "screen",
			reducedMotion: "reduce",
		});
		buffer = await page.pdf();
	}

	await browser.close();

	return buffer;
}

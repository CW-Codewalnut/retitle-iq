import { db } from "@/.server/db";
import { getURLContent } from "@/.server/headless-browser";
import { uploadFileToStorage } from "@/.server/storage";
import { convertToPDF, parseUserUpload } from "@/.server/uploads";
import { WEB_PAGE_RESULT_CACHE_DURATION_HOURS } from "@/utils/constants";
import type { UserUpload } from "@/utils/types";

export async function uploadBlogFromURL(blogURL: string) {
	const fileName = "blog.pdf";
	const mimeType = "application/pdf";
	let fileURL: string | null = null;

	const cacheExpiryTime = new Date();
	cacheExpiryTime.setHours(
		cacheExpiryTime.getHours() - WEB_PAGE_RESULT_CACHE_DURATION_HOURS,
	);

	const webPageResult = await db.webPageResult.findFirst({
		where: {
			webPageUrl: blogURL,
			createdAt: {
				gte: cacheExpiryTime,
			},
		},
	});

	if (!webPageResult) {
		console.log("cache expired/not found", { blogURL });

		const fileBuffer = await getURLContent(blogURL);
		if (!fileBuffer) {
			return null;
		}

		fileURL = await uploadFileToStorage({
			mimeType,
			fileName,
			fileBuffer,
			targetfolder: "retitle-iq",
		});
		if (!fileURL) {
			return null;
		}

		await db.webPageResult.create({
			data: {
				pdfUrl: fileURL,
				webPageUrl: blogURL,
			},
		});
	} else {
		console.log("cache found", {
			url: blogURL,
			createdAt: webPageResult.createdAt,
		});
		fileURL = webPageResult.pdfUrl;
	}

	if (!fileURL) {
		return null;
	}

	return {
		mimeType,
		url: fileURL,
		name: fileName,
	};
}

export async function uploadBlogFromFile(userUpload: Omit<UserUpload, "id">) {
	const file = parseUserUpload(userUpload);

	const fileExtension = file.extension;
	if (!fileExtension) {
		return null;
	}

	let fileName = file.name;
	let mimeType = file.mimeType;
	let fileBuffer = file.buffer;

	if (file.extension !== "pdf") {
		mimeType = "application/pdf";
		fileName = fileName.replace(`.${fileExtension}`, ".pdf");

		fileBuffer = await convertToPDF({
			buffer: fileBuffer,
			extension:
				fileExtension === "md" || fileExtension === "txt"
					? "markdown"
					: fileExtension,
		});
	}

	const fileURL = await uploadFileToStorage({
		mimeType,
		fileName,
		fileBuffer,
		targetfolder: "retitle-iq",
	});

	if (!fileURL) {
		return null;
	}

	return {
		mimeType,
		url: fileURL,
		name: fileName,
	};
}

import { getURLContent } from "@/.server/headless-browser";
import { uploadFileToStorage } from "@/.server/storage";
import { convertToPDF, parseUserUpload } from "@/.server/uploads";
import type { UserUpload } from "@/utils/types";

export async function uploadBlogFromURL(blogURL: string) {
	const fileBuffer = await getURLContent(blogURL);

	const fileName = "blog.pdf";
	const mimeType = "application/pdf";

	if (!fileBuffer) {
		return null;
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

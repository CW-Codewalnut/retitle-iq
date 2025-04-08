import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { v7 as uuid } from "uuid";

import type { StorageFolders } from "./types";

const S3 = new S3Client({
	forcePathStyle: true,
	region: process.env.S3_REGION,
	endpoint: process.env.S3_ENDPOINT,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY!,
		secretAccessKey: process.env.S3_SECRET_KEY!,
	},
});

type UploadFileArgs = {
	fileName: string;
	mimeType: string;
	fileBuffer: Buffer;
	targetfolder: StorageFolders;
};

export async function uploadFileToStorage({
	mimeType,
	fileName,
	fileBuffer,
	targetfolder,
}: UploadFileArgs) {
	const fileId = uuid();

	const name = fileName.replace(/[^a-zA-Z0-9.]/g, "-");
	const fileTarget = `${targetfolder}/${fileId}-${name}`;

	const command = new PutObjectCommand({
		Key: fileTarget,
		Body: fileBuffer,
		ACL: "public-read",
		ContentType: mimeType,
		Bucket: process.env.S3_BUCKET,
		CacheControl: "max-age=31536000",
	});

	try {
		await S3.send(command);

		const fileURL = `${process.env.S3_BASE_URL}/${fileTarget}`;

		console.log("Uploaded file to storage", fileURL);
		return fileURL;
	} catch (e) {
		console.log("Error uploading file to storage", e);
		return null;
	}
}

export async function deleteFileFromStorage(fileURL: string) {
	const command = new DeleteObjectCommand({
		Bucket: process.env.S3_BUCKET,
		Key: fileURL.replace(`${process.env.S3_BASE_URL}/`, ""),
	});

	try {
		await S3.send(command);

		console.log("Deleted file from storage", fileURL);
		return true;
	} catch (e) {
		console.log("Error deleting file from storage", e);
		return false;
	}
}

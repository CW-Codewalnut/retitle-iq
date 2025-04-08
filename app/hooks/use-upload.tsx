import { useState } from "react";
import { toast } from "sonner";

import type { ValidateUserUploadsParams } from "@/utils/client/uploads";
import {
	getDataURLFromFile,
	validateUserUploads,
} from "@/utils/client/uploads";
import type { UserUpload } from "@/utils/types";

type UseUploadParams = Pick<
	ValidateUserUploadsParams,
	"maxFileSize" | "validFileExtensions"
> & {
	maxFiles?: number;
};

export function useUpload({
	maxFileSize,
	maxFiles = 5,
	validFileExtensions,
}: UseUploadParams) {
	const [uploads, setUploads] = useState<UserUpload[]>([]);

	async function handleFileSelect(files: FileList) {
		const validationResult = validateUserUploads({
			files,
			maxFiles,
			maxFileSize,
			validFileExtensions,
		});

		if (validationResult.type === "error") {
			toast.error(validationResult.message);
			setUploads([]);
			return;
		}

		if (validationResult.type === "success") {
			const newUploads: UserUpload[] = [];

			for (const file of validationResult.files) {
				newUploads.push({
					id: crypto.randomUUID(),
					name: file.name,
					contentType: file.type,
					url: (await getDataURLFromFile(file)) as string,
				});
			}

			setUploads((existingUploads) => {
				return [...existingUploads, ...newUploads];
			});
		}
	}

	function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			void handleFileSelect(e.target.files);
		}
	}

	function removeUpload(id: string) {
		setUploads((uploads) => uploads.filter((file) => file.id !== id));
	}

	function clearUploads() {
		setUploads([]);
	}

	return {
		uploads,
		removeUpload,
		clearUploads,

		handleFileSelect,
		handleFileInputChange,
	};
}

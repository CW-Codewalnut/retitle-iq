export type ValidateUserUploadsParams = {
	files: FileList;
	maxFiles: number;
	maxFileSize: number;
	validFileExtensions: string[];
};

export function validateUserUploads({
	files,
	maxFiles,
	maxFileSize,
	validFileExtensions,
}: ValidateUserUploadsParams) {
	let errorMessage = "";
	const validFiles: File[] = [];

	for (const file of files) {
		if (validFiles.length >= maxFiles) {
			errorMessage += `Maximum number of files is ${maxFiles}.\n`;
			break;
		}

		if (file.size > maxFileSize) {
			errorMessage += `Maximum file size is ${maxFileSize / 1024 / 1024}MB.\n`;
			break;
		}

		const fileExtension = file.name.split(".").pop()?.toLowerCase();

		const invalidFileTypeErrorMessage = `Invalid file type. Accepted file types: ${validFileExtensions.join(", ")}\n`;

		if (!fileExtension) {
			errorMessage = invalidFileTypeErrorMessage;
			break;
		}

		if (!validFileExtensions.includes(`.${fileExtension}`)) {
			errorMessage = invalidFileTypeErrorMessage;
			break;
		}

		validFiles.push(file);
	}

	if (errorMessage) {
		return {
			type: "error" as const,
			message: errorMessage,
		};
	}

	if (validFiles.length === 0) {
		return {
			type: "error" as const,
			message: "No valid files found.",
		};
	}

	return {
		type: "success" as const,
		files: validFiles,
	};
}

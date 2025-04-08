import { ModelPicker } from "@/components/model-picker";
import { Button } from "@/components/ui/button";
import { FileDropZone } from "@/components/ui/file-drop-zone";
import { UploadPreview } from "@/components/ui/upload-preview";
import { useUpload } from "@/hooks/use-upload";
import type { AIModel } from "@/lib/ai/models/list";
import {
	BLOG_FILE_VALID_EXTENSIONS,
	CHAT_FILE_MAX_SIZE,
} from "@/lib/constants";

import type { RetitleInput } from "../../utils/types";
import { FormContentInput } from "./content";
import { FormKeywordInput } from "./keyword";

type RetitleFormProps = {
	onSubmit: (input: RetitleInput) => void;
};

export function RetitleForm({ onSubmit }: RetitleFormProps) {
	const { uploads, clearUploads, handleFileSelect } = useUpload({
		maxFiles: 1,
		maxFileSize: CHAT_FILE_MAX_SIZE,
		validFileExtensions: BLOG_FILE_VALID_EXTENSIONS,
	});

	const blogUpload = uploads.at(0);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const keyword = formData.get("keyword") as string;
		const content = formData.get("content") as string;
		const model = formData.get("model") as unknown as AIModel;

		if (keyword && model && (content || blogUpload)) {
			if (blogUpload) {
				onSubmit({
					type: "file",
					keyword,
					model,
					file: blogUpload,
				});
			} else {
				onSubmit({
					type: "text",
					keyword,
					model,
					content,
				});
			}
		}
	}

	return (
		<FileDropZone
			asChild
			disabled={uploads.length > 0}
			onFilesDrop={handleFileSelect}
		>
			<form
				onSubmit={handleSubmit}
				className="mx-auto flex size-full max-w-xl flex-col justify-center gap-4"
			>
				<FormKeywordInput />
				<FormContentInput
					blogUpload={
						blogUpload && (
							<UploadPreview upload={blogUpload} onRemove={clearUploads} />
						)
					}
				/>
				<ModelPicker />
				<Button type="submit">Submit</Button>
			</form>
		</FileDropZone>
	);
}

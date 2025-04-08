import { UploadIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { UserUpload } from "@/utils/types";

type UploadPreviewProps = {
	upload: UserUpload;
	onRemove: () => void;
};

export function UploadPreview({ upload, onRemove }: UploadPreviewProps) {
	return (
		<div className="bg-card text-muted-foreground/80 relative flex items-center gap-2 rounded-md border p-4">
			<UploadIcon className="text-muted-foreground size-7" />
			<p className="text-card-foreground line-clamp-1 flex-1 font-medium">
				{upload.name}
			</p>
			<Button
				size="icon"
				type="button"
				variant="ghost"
				onClick={onRemove}
				aria-label="Remove file"
			>
				<XIcon className="size-4.5" />
			</Button>
		</div>
	);
}

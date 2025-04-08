import * as Slot from "@radix-ui/react-slot";
import { UploadIcon } from "lucide-react";
import { useState } from "react";

type FileDropZoneProps = {
	asChild?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
	onFilesDrop: (files: FileList) => void;
};

export function FileDropZone({
	asChild,
	children,
	disabled,
	onFilesDrop,
}: FileDropZoneProps) {
	const [isDragging, setIsDragging] = useState(false);

	function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
		if (!disabled) {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(true);
		}
	}

	function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
		if (!disabled) {
			e.preventDefault();
			e.stopPropagation();

			if (e.currentTarget.contains(e.relatedTarget as Node) === false) {
				setIsDragging(false);
			}
		}
	}

	function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
		if (!disabled) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (!disabled) {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);

			onFilesDrop(e.dataTransfer.files);
		}
	};

	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
		>
			<Slot.Slottable>{children}</Slot.Slottable>
			{isDragging && (
				<div className="text-background fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/75">
					<UploadIcon className="text-background mb-4 size-16" />
					<h3 className="mb-2 text-xl font-medium">Drop your file here</h3>
				</div>
			)}
		</Comp>
	);
}

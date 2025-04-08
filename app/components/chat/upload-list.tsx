import { cn } from "@/components/utils";
import type { UserUpload } from "@/utils/types";

type UploadListProps = {
	className?: string;
	uploads: UserUpload[];
};

export function UploadList({ uploads, className }: UploadListProps) {
	if (!uploads.length) {
		return null;
	}

	return (
		<div
			className={cn(
				"scrollbar-none mt-0.5 flex gap-1 overflow-x-auto text-sm",
				className,
			)}
		>
			{uploads.map((item) => (
				<a
					key={item.id}
					href={item.url}
					target="_blank"
					rel="noreferrer noopener"
					className="bg-secondary text-card-foreground scrollbar-none flex shrink-0 items-center gap-1 rounded-lg px-3 py-1 transition"
				>
					{item.name}
				</a>
			))}
		</div>
	);
}

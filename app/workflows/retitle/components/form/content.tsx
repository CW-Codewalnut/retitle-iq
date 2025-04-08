import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormContentInputProps = {
	blogUpload: React.ReactNode | null;
};

export function FormContentInput({ blogUpload }: FormContentInputProps) {
	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor="content">Blog Content</Label>
			{blogUpload ?? (
				<Textarea
					id="content"
					name="content"
					className="max-h-80 min-h-56 resize-y break-words"
					placeholder="Paste your blog content or provide URL to your blog post or drop your file here"
				/>
			)}
		</div>
	);
}

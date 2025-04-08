import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormKeywordInput() {
	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor="keyword">Primary Keyword</Label>
			<Input
				required
				id="keyword"
				name="keyword"
				placeholder="Enter your primary keyword"
			/>
		</div>
	);
}

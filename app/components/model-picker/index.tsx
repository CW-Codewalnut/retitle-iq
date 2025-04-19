import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { defaultLanguageModel, languageModelOptions } from "@/utils/llm";

export function ModelPicker() {
	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor="model">Model</Label>
			<Select name="model" defaultValue={defaultLanguageModel}>
				<SelectTrigger id="model" className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{languageModelOptions.map((item) => (
						<SelectItem key={item.id} value={item.id}>
							{item.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

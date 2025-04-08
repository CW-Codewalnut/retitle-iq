import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { aiModelList, defaultAIModel } from "@/lib/ai/models/list";

export function ModelPicker() {
	return (
		<div className="flex flex-col gap-2">
			<Label htmlFor="model">Model</Label>
			<Select name="model" defaultValue={defaultAIModel}>
				<SelectTrigger id="model" className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{aiModelList.map((item) => (
						<SelectItem key={item.id} value={item.id}>
							{item.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

function IconButton({
	label,
	variant = "ghost",
	...props
}: Omit<React.ComponentProps<typeof Button>, "size"> & {
	label: string;
}) {
	return (
		<Tooltip delayDuration={200}>
			<TooltipTrigger asChild>
				<Button
					{...props}
					size="icon"
					type="button"
					variant={variant}
					aria-label={props["aria-label"] ?? label}
				/>
			</TooltipTrigger>
			<TooltipContent>{label}</TooltipContent>
		</Tooltip>
	);
}

export { IconButton };

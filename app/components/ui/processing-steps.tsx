import { useEffect, useState } from "react";

import { JumpingDots } from "@/components/ui/jumping-dots";
import { cn } from "@/components/utils";

export type ProcessingStep = {
	text: string;
	icon?: React.ReactNode;
};

type ProcessingStepsProps = {
	interval?: number;
	className?: string;
	steps: ProcessingStep[];
};

export function ProcessingSteps({
	steps,
	className,
	interval = 5000,
}: ProcessingStepsProps) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((currentIndex) => {
				const nextIndex = currentIndex + 1;

				if (nextIndex === steps.length) {
					return currentIndex;
				} else {
					return nextIndex;
				}
			});
		}, interval);

		return () => {
			clearInterval(timer);
		};
	}, [interval, steps.length]);

	return (
		<div
			className={cn("relative flex h-6 flex-col overflow-hidden", className)}
		>
			{steps.map((step, stepIndex) => (
				<p
					key={`${step.text}-${stepIndex}`}
					className="absolute flex origin-top translate-0 items-center gap-2 font-medium transition duration-500 ease-in-out [&_svg]:size-4.5"
					style={{
						["--tw-translate-y" as string]: `${stepIndex * 100 - index * 100}%`,
					}}
				>
					{step.icon}
					{step.text}
					<span className="-ml-1">
						<JumpingDots />
					</span>
				</p>
			))}
		</div>
	);
}

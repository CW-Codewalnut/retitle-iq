import { LightbulbIcon } from "lucide-react";
import type { Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { getRandomIndex } from "@/utils/misc";

export type InsightItem = {
	id: number;
	content: string;
};

export type InsightsProps = {
	interval?: number;
	initialIndex?: number;
	items: InsightItem[];
};

export function Insights({
	items,
	initialIndex,
	interval = 7000,
}: InsightsProps) {
	const [currentIndex, setCurrentIndex] = useState(
		() => initialIndex ?? getRandomIndex(items.length),
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((currentIndex) => {
				const nextIndex = currentIndex + 1;

				if (nextIndex === items.length) {
					return 0;
				} else {
					return nextIndex;
				}
			});
		}, interval);

		return () => {
			clearInterval(timer);
		};
	}, [interval, items.length]);

	const item = items[currentIndex];

	return (
		<AnimatePresence mode="popLayout">
			<motion.article
				key={currentIndex}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={insightVariant}
				className="mx-auto max-w-xl rounded-md border px-4 py-3.5 text-sm shadow"
			>
				<h3 className="flex items-center justify-between gap-2 font-medium">
					Did You Know?
					<LightbulbIcon className="size-4" />
				</h3>
				<p className="text-secondary-foreground/80 mt-3 leading-relaxed italic">
					{item.content}
				</p>
			</motion.article>
		</AnimatePresence>
	);
}

const insightVariant = {
	initial: {
		x: 150,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	exit: {
		x: -150,
		opacity: 0,
	},
} satisfies Variants;

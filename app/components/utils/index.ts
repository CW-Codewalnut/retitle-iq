import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function scrollElemToViewRef<T extends HTMLElement>(node: T | null) {
	node?.scrollIntoView({ behavior: "smooth" });
}

export function autoScrollRef<T extends HTMLElement>(node: T | null) {
	node?.scrollIntoView({ behavior: "instant" });
}

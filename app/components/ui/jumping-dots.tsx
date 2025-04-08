import { useMemo } from "react";

type JumpingDotsProps = {
	count?: number;
};

export function JumpingDots({ count = 3 }: JumpingDotsProps) {
	const arr = useMemo(() => {
		return Array.from({ length: count }, (_, i) => i);
	}, [count]);

	return arr.map((i) => (
		<span
			key={i}
			style={{ ["--pos" as string]: i }}
			className="jumping-dots inline-block"
		>
			.
		</span>
	));
}

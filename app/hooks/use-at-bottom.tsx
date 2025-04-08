import { useEffect, useState } from "react";

export function useIsAtBottom() {
	const [isAtBottom, setIsAtBottom] = useState(false);

	useEffect(() => {
		function handleScroll() {
			const buffer = 1;
			const hasScrolledToBottom =
				window.scrollY + window.innerHeight >=
				document.documentElement.scrollHeight - buffer;

			setIsAtBottom(hasScrolledToBottom);
		}

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return isAtBottom;
}

import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { autoScrollRef } from "@/components/utils";
import { useIsAtBottom } from "@/hooks/use-at-bottom";

type ScrollToBottomProps = {
	isStreaming: boolean;
	autoScrollKey?: string | number;
};

export function ScrollToBottom({
	isStreaming,
	autoScrollKey,
}: ScrollToBottomProps) {
	const isAtBottom = useIsAtBottom();
	const [shouldAutoScroll, setShouldAutoScroll] = useState(isStreaming);

	useEffect(() => {
		if (!shouldAutoScroll) {
			return;
		}

		function handleScroll() {
			if (window.scrollY > 0) {
				setShouldAutoScroll(false);
			}
		}

		window.addEventListener("wheel", handleScroll);
		window.addEventListener("touchmove", handleScroll);

		return () => {
			window.removeEventListener("wheel", handleScroll);
			window.removeEventListener("touchmove", handleScroll);
		};
	}, [shouldAutoScroll]);

	function handleClick() {
		if (isStreaming) {
			setShouldAutoScroll(true);
		} else {
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: "smooth",
			});
		}
	}

	return (
		<>
			<div className="fixed bottom-4 mx-auto flex w-full max-w-[50rem] justify-end max-md:right-2">
				<Button
					size="icon"
					type="button"
					variant="outline"
					onClick={handleClick}
					className={`rounded-full border ${
						isAtBottom ? "translate-y-16" : "translate-y-0"
					}`}
				>
					<ChevronDownIcon className="size-4.5" />
				</Button>
			</div>
			<div
				aria-hidden
				className="h-px w-full"
				ref={shouldAutoScroll ? autoScrollRef : undefined}
				key={shouldAutoScroll ? autoScrollKey : undefined}
			/>
		</>
	);
}

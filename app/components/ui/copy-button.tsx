import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { IconButton } from "./icon-button";

type CopyButtonProps = {
	label: string;
	content?: string;
	className?: string;
};

export function CopyButton({ content, label, className }: CopyButtonProps) {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (!isCopied) {
			return;
		}

		const timer = setTimeout(() => {
			setIsCopied(false);
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, [isCopied]);

	function handleCopy() {
		if (content) {
			void navigator.clipboard.writeText(content);
			setIsCopied(true);
		}
	}

	return (
		<IconButton label={label} onClick={handleCopy} className={className}>
			{isCopied ? <CheckIcon /> : <CopyIcon />}
		</IconButton>
	);
}

import type { Options } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/components/utils";

type MarkdownProps = {
	children: string;
	className?: string;
};

export function Markdown({ children, className }: MarkdownProps) {
	return (
		<div className={cn("prose", className)}>
			<ReactMarkdown {...reactMarkdownProps}>{children}</ReactMarkdown>
		</div>
	);
}

const reactMarkdownProps = {
	remarkPlugins: [remarkGfm],
} satisfies Options;

import { useMemo } from "react";

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getDomainFromURL, getFaviconURL } from "@/utils/misc";

type GoogleResultProps = Partial<{
	link: string;
	name: string;
	title: string;
	snippet: string;
	score: number;
	justification: string;
}>;

export function GoogleResult({
	link,
	name,
	title,
	score,
	snippet,
	justification,
}: GoogleResultProps) {
	const { domain, favicon } = useMemo(() => {
		return {
			favicon: link ? getFaviconURL(link) : undefined,
			domain: link ? getDomainFromURL(link) : undefined,
		};
	}, [link]);

	return (
		<div className="font-arial w-full">
			<div className="group relative">
				<HoverCard openDelay={300}>
					<HoverCardTrigger asChild>
						<a
							href={link}
							target="_blank"
							aria-label={title}
							rel="noopener noreferrer"
							className="absolute inset-0 size-full"
						/>
					</HoverCardTrigger>
					<HoverCardContent className="w-full max-w-md text-sm">
						{score !== undefined && (
							<div className="flex gap-2">
								<span className="font-bold">Score:</span>
								<span>{score}</span>
							</div>
						)}
						<p>{justification}</p>
					</HoverCardContent>
				</HoverCard>
				{link && (
					<div className="mb-2 flex w-full items-center gap-2">
						<div className="inline-flex size-6.5 shrink-0 items-center justify-center overflow-hidden rounded-full">
							<img
								src={favicon}
								alt={`${domain} favicon`}
								className="size-full object-cover"
							/>
						</div>
						<div>
							<p className="text-google-foreground-secondary line-clamp-1 text-sm">
								{name}
							</p>
							<p className="text-google-muted-foreground line-clamp-1 text-xs">
								{domain}
							</p>
						</div>
					</div>
				)}
				<header>
					<h3 className="text-google-blue text-lg leading-[26px] group-hover:underline lg:text-xl">
						{title}
					</h3>
				</header>
			</div>
			{snippet && (
				<p className="text-google-foreground mt-1 text-sm">{snippet}</p>
			)}
		</div>
	);
}

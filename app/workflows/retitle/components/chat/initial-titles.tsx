import type { UIMessage } from "ai";
import { useMemo } from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { CopyButton } from "@/components/ui/copy-button";
import { Markdown } from "@/components/ui/markdown";

import { getTitlesObject, getXMLTagContent } from "../../utils/parse-output";
import type {
	RetitleInitialTitlesAnnotations,
	RetitleOutputPartial,
} from "../../utils/types";
import { GoogleResult } from "./google-result";

type InitialTitlesProps = UIMessage & {
	isStreaming?: boolean;
};

export function InitialTitles({
	parts,
	annotations,
	isStreaming,
}: InitialTitlesProps) {
	const { object, thinking, error } = useMemo(() => {
		let thinking;
		let outputText;

		if (parts.length > 0) {
			for (const part of parts) {
				if (part.type === "text") {
					outputText = part.text;
				} else if (part.type === "reasoning") {
					thinking = part.reasoning;
				}
			}
		}

		const object = getTitlesObject(outputText);
		const error = getXMLTagContent(outputText, "error");
		thinking = thinking ?? getXMLTagContent(outputText, "thinking");

		return {
			object,
			thinking,
			error,
		};
	}, [parts]);

	const extraData = annotations?.at(0) as RetitleInitialTitlesAnnotations;
	const serpResults = extraData?.serpResults;
	const userBlogURL = extraData?.blogURL;

	const props = isStreaming
		? {
				value: ["thinking"],
			}
		: {
				defaultValue: ["finalTitles"],
			};

	if (isStreaming) {
		if (object?.finalRecommendedTitles) {
			props.value = ["finalTitles"];
		} else if (object?.competitorTitles) {
			props.value = ["compTitles"];
		} else if (error) {
			props.value = ["error"];
		}
	}

	return (
		<Accordion type="multiple" {...props}>
			{thinking && (
				<AccordionItem value="thinking">
					<AccordionTrigger>Thinking</AccordionTrigger>
					<AccordionContent>
						<Markdown>{thinking}</Markdown>
					</AccordionContent>
				</AccordionItem>
			)}
			{object?.competitorTitles && (
				<AccordionItem value="compTitles">
					<AccordionTrigger>Competitor Titles</AccordionTrigger>
					<AccordionContent>
						<ul className="flex flex-col gap-4">
							{object?.competitorTitles?.map((item, index) => {
								const info = serpResults?.find((serpResult) => {
									return item?.title
										? serpResult.title.startsWith(item?.title)
										: false;
								});

								return (
									<li key={index}>
										<GoogleResult
											{...item}
											link={info?.link}
											snippet={info?.snippet}
										/>
									</li>
								);
							})}
						</ul>
					</AccordionContent>
				</AccordionItem>
			)}
			{object?.finalRecommendedTitles && (
				<AccordionItem value="finalTitles">
					<AccordionTrigger>Recommended Titles</AccordionTrigger>
					<AccordionContent>
						<ul className="flex flex-col gap-4">
							{object?.finalRecommendedTitles?.map((item, index) => (
								<li key={index}>
									<GoogleResult
										{...item}
										link={userBlogURL ?? "http://example.com/"}
									/>
								</li>
							))}
						</ul>
						{!isStreaming && (
							<div className="mt-6 flex items-center gap-4">
								<CopyButton
									label="Copy Titles"
									content={getTitleForCopy(object.finalRecommendedTitles)}
								/>
								{extraData.model && (
									<p className="text-sm italic">
										Generated with{" "}
										<span className="font-bold">{extraData.model}</span>
									</p>
								)}
							</div>
						)}
					</AccordionContent>
				</AccordionItem>
			)}
			{error && (
				<AccordionItem value="error">
					<AccordionTrigger>Error</AccordionTrigger>
					<AccordionContent>
						<Markdown>{error}</Markdown>
					</AccordionContent>
				</AccordionItem>
			)}
		</Accordion>
	);
}

function getTitleForCopy(
	recommendedTitles: RetitleOutputPartial["finalRecommendedTitles"],
) {
	const titles = recommendedTitles?.map((t) => t?.title);

	if (titles) {
		return titles.join("\n");
	}
}

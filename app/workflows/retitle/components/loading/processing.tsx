import {
	BookOpenIcon,
	ChartColumnIcon,
	GlobeIcon,
	ListChecksIcon,
	LoaderIcon,
	NotebookPenIcon,
} from "lucide-react";

import type { ProcessingStep } from "@/components/ui/processing-steps";
import { ProcessingSteps } from "@/components/ui/processing-steps";

type ProcessingRetitleRequestProps = {
	isFollowUp?: boolean;
};

export function ProcessingRetitleRequest({
	isFollowUp,
}: ProcessingRetitleRequestProps) {
	return <ProcessingSteps steps={isFollowUp ? followUpSteps : initialSteps} />;
}

const initialSteps = [
	{
		icon: <LoaderIcon className="animate-spin" />,
		text: "Processing the Inputs",
	},
	{
		icon: <GlobeIcon />,
		text: "Fetching Google Results for the keyword",
	},
	{
		icon: <BookOpenIcon />,
		text: "Reading the Blog Content",
	},
	{
		icon: <ChartColumnIcon />,
		text: "Analysing existing titles",
	},
	{
		icon: <NotebookPenIcon />,
		text: "Drafting Titles",
	},
	{
		icon: <ListChecksIcon />,
		text: "Finalizing Titles",
	},
] satisfies ProcessingStep[];

const followUpSteps = [
	{
		icon: null,
		text: "Generating",
	},
] satisfies ProcessingStep[];

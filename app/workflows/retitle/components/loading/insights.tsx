import type { InsightItem } from "@/components/ui/insights";
import { Insights } from "@/components/ui/insights";

export function RetitleInsights() {
	return (
		<div className="mt-24">
			<Insights items={didYouKnowFacts} />
		</div>
	);
}

const didYouKnowFacts = [
	{
		id: 1,
		content: `Professional copywriters often brainstorm 25 headlines for one post to push past obvious ideas and find the most compelling title`,
	},
	{
		id: 2,
		content: `Odd numbers in titles outperform even numbers by about 20% in engagement, except for the number 10, which remains popular due to its familiarity`,
	},
	{
		id: 3,
		content: `Negative superlatives like "worst" or "never" can attract more clicks than positive ones, as they feel more authentic and intriguing`,
	},
	{
		id: 4,
		content: `Headlines with "who" get 22% more clicks than those with "why," making "who" questions more effective for engagement`,
	},
	{
		id: 5,
		content: `Adding bracketed clarifications like [Interview] or [Guide] can increase clicks by 38% by setting clear expectations for readers`,
	},
	{
		id: 6,
		content: `Titles longer than 60 characters may get cut off in search results, reducing their visibility and impact`,
	},
	{
		id: 7,
		content: `An estimated 80% of people may never read beyond the headline, making it crucial for capturing attention`,
	},
	{
		id: 8,
		content: `A single word change, like swapping "Ultimate" for "Proven," can significantly boost click-through rates (CTR) by adding credibility`,
	},
	{
		id: 9,
		content: `Aligning a title with search intent, such as using a question that matches user queries, can dramatically improve rankings and CTR`,
	},
	{
		id: 10,
		content: `Including a number in the title can increase clicks by 36% on average, as numbers promise tangible, digestible content`,
	},
	{
		id: 11,
		content: `Titles with "How to" can perform 49% worse than average in some contexts due to oversaturation, unless highly specific`,
	},
	{
		id: 12,
		content: `Overly salesy words like "easy" or "simple" can reduce CTR, possibly due to reader skepticism`,
	},
	{
		id: 13,
		content: `Titles that directly address a specific audience and their pain points can achieve high CTR, as seen in niche-focused examples`,
	},
	{
		id: 14,
		content: `Adding unique elements like "with Quick Infographic" can differentiate a title and attract more clicks in competitive topics`,
	},
	{
		id: 15,
		content: `Monitoring CTR in Google Search Console can help identify underperforming titles that may need tweaking`,
	},
	{
		id: 16,
		content: `Iterative title updates based on performance data can lead to significant improvements in traffic`,
	},
	{
		id: 17,
		content: `A/B testing titles on social media or email can provide insights into which versions are more compelling`,
	},
	{
		id: 18,
		content: `Headline analyzer tools can offer suggestions but should be used with caution, as real-world performance is the ultimate measure`,
	},
	{
		id: 19,
		content: `Analyzing top-performing content can reveal patterns in successful title strategies, helping refine future titles`,
	},
	{
		id: 20,
		content: `The landscape of effective titles changes over time, so continuous testing and adaptation are necessary to stay relevant`,
	},
] satisfies InsightItem[];

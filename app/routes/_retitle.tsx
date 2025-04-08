import RetitleLayout from "@/workflows/retitle/components/layout";

import type { Route } from "./+types/_retitle";

export function meta() {
	return [
		{
			title: "ReTitleIQ by LeadWalnut",
		},
	] satisfies Route.MetaDescriptors;
}

export default function RetitleIQLayout() {
	return <RetitleLayout />;
}

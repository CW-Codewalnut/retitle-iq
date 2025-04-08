import { v7 as uuidv7 } from "uuid";

import { RetitleLanding } from "@/workflows/retitle/components/landing";

import type { Route } from "./+types/_retitle._index";

export function loader() {
	return {
		id: uuidv7(),
	};
}

export default function RetitleIQLandingPage({
	loaderData,
}: Route.ComponentProps) {
	return <RetitleLanding {...loaderData} />;
}

import { getAuth } from "@clerk/react-router/ssr.server";
import { redirect } from "react-router";
import { v7 as uuidv7 } from "uuid";

import { RetitleLanding } from "@/workflows/retitle/components/landing";

import type { Route } from "./+types/_retitle._index";

export async function loader(args: Route.LoaderArgs) {
	const { userId } = await getAuth(args);

	if (!userId) {
		return redirect("/sign-in");
	}

	return {
		id: uuidv7(),
	};
}

export default function RetitleIQLandingPage({
	loaderData,
}: Route.ComponentProps) {
	return <RetitleLanding {...loaderData} />;
}

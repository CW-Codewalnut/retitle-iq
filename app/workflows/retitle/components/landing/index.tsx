import { ClerkLoading, SignedIn, SignedOut, SignUp } from "@clerk/react-router";
import { LoaderIcon } from "lucide-react";

import { RetitleLandingComp } from "./landing";

type RetitleLandingProps = {
	id: string;
};

export function RetitleLanding(props: RetitleLandingProps) {
	return (
		<>
			<ClerkLoading>
				<div className="grid h-full place-items-center">
					<LoaderIcon className="animate-spin" />
				</div>
			</ClerkLoading>
			<SignedIn>
				<RetitleLandingComp {...props} />
			</SignedIn>
			<SignedOut>
				<div className="grid h-full place-items-center">
					<SignUp oauthFlow="popup" />
				</div>
			</SignedOut>
		</>
	);
}

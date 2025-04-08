import { ClerkLoading, SignedOut, SignIn } from "@clerk/react-router";
import { LoaderIcon } from "lucide-react";

export default function SignUpPage() {
	return (
		<div className="grid h-svh place-items-center">
			<SignedOut>
				<SignIn transferable oauthFlow="popup" />
			</SignedOut>
			<ClerkLoading>
				<LoaderIcon className="animate-spin" />
			</ClerkLoading>
		</div>
	);
}

import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/react-router";
import { LoaderIcon } from "lucide-react";

export default function SignInPage() {
	return (
		<div className="grid h-svh place-items-center">
			<ClerkLoaded>
				<SignIn transferable />
			</ClerkLoaded>
			<ClerkLoading>
				<LoaderIcon className="animate-spin" />
			</ClerkLoading>
		</div>
	);
}

import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/react-router";
import { LoaderIcon } from "lucide-react";

export default function SignUpPage() {
	return (
		<div className="grid h-svh place-items-center">
			<ClerkLoaded>
				<SignUp signInUrl="/sign-in" />
			</ClerkLoaded>
			<ClerkLoading>
				<LoaderIcon className="animate-spin" />
			</ClerkLoading>
		</div>
	);
}

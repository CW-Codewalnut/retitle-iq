import { ClerkProvider } from "@clerk/react-router";

type AuthProviderProps = Pick<
	React.ComponentProps<typeof ClerkProvider>,
	"children" | "loaderData"
>;

export function AuthProvider(props: AuthProviderProps) {
	return (
		<ClerkProvider
			{...props}
			signUpUrl="/"
			signInUrl="/sign-in"
			appearance={{
				layout: {
					unsafe_disableDevelopmentModeWarnings: true,
				},
			}}
		/>
	);
}

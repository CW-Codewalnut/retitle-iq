import { ClerkProvider } from "@clerk/react-router";

type AuthProviderProps = Pick<
	React.ComponentProps<typeof ClerkProvider>,
	"children" | "loaderData"
>;

export function AuthProvider(props: AuthProviderProps) {
	return (
		<ClerkProvider
			{...props}
			appearance={{
				layout: {
					unsafe_disableDevelopmentModeWarnings: true,
				},
			}}
		/>
	);
}

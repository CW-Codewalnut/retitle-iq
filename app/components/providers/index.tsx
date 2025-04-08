import { AuthProvider } from "@/components/providers/auth";
import { Toaster } from "@/components/providers/sonner";

type AppProvidersProps = {
	authLoaderData: unknown;
	children: React.ReactNode;
};

export function AppProviders({ authLoaderData, children }: AppProvidersProps) {
	return (
		<AuthProvider loaderData={authLoaderData}>
			{children}
			<Toaster />
		</AuthProvider>
	);
}

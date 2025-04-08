import { SignedIn } from "@clerk/react-router";
import { Outlet } from "react-router";

import { SidebarProvider } from "@/components/ui/sidebar";

import { RetitleHeader } from "./header";
import { RetitleChatHistory } from "./history";

export default function RetitleLayout() {
	return (
		<SidebarProvider>
			<SignedIn>
				<RetitleChatHistory />
				<RetitleHeader />
			</SignedIn>
			<main className="mx-auto w-full max-w-[50rem] p-4 max-md:pt-12 xl:px-0">
				<Outlet />
			</main>
		</SidebarProvider>
	);
}

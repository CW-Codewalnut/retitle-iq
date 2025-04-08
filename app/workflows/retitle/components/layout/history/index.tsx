import { UserButton } from "@clerk/react-router";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
} from "@/components/ui/sidebar";

import { RetitleChatHistoryList } from "./history-list";

export function RetitleChatHistory() {
	return (
		<Sidebar>
			<SidebarHeader className="flex-row items-center justify-center">
				<h1 className="mt-1 text-xl font-bold">ReTitleIQ</h1>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Chat History</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<RetitleChatHistoryList />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="py-0 pb-1">
				<UserButton showName />
			</SidebarFooter>
		</Sidebar>
	);
}

import { Link, useLocation } from "react-router";

import { ChatHistorySkeleton } from "@/components/chat/history-skeleton";
import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useInfiniteList } from "@/hooks/use-infinite-list";
import { RETITLE_ROUTE } from "@/utils/constants";

type ChatHistoryItem = {
	id: string;
	title: string;
};

export function RetitleChatHistoryList() {
	const location = useLocation();

	const currentPath = location.pathname;

	const { data, isLoading, loadMoreRef, hasReachedEnd } =
		useInfiniteList<ChatHistoryItem>(`${RETITLE_ROUTE}api/history`);

	if (isLoading) {
		return <ChatHistorySkeleton />;
	}

	return (
		<>
			{data?.map((item) => {
				const href = `${RETITLE_ROUTE}${item.id}`;

				return (
					<SidebarMenuItem key={item.id}>
						<SidebarMenuButton
							asChild
							className="line-clamp-1"
							isActive={currentPath === href}
						>
							<Link to={href}>{item.title}</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				);
			})}
			{isLoading ? <ChatHistorySkeleton /> : null}
			{hasReachedEnd ? null : (
				<SidebarMenuItem ref={loadMoreRef}>
					<SidebarMenuSkeleton className="w-full" />
				</SidebarMenuItem>
			)}
		</>
	);
}

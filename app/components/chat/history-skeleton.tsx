import { SidebarMenuItem, SidebarMenuSkeleton } from "@/components/ui/sidebar";

const MOCK_ARR = Array.from({ length: 10 }, (_, i) => i);

export function ChatHistorySkeleton() {
	return MOCK_ARR.map((i) => (
		<SidebarMenuItem key={i}>
			<SidebarMenuSkeleton className="w-full" />
		</SidebarMenuItem>
	));
}

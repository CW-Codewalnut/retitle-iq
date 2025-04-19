import { PlusIcon, SidebarIcon } from "lucide-react";
import { Link } from "react-router";

import { IconButton } from "@/components/ui/icon-button";
import { useSidebar } from "@/components/ui/sidebar";
import { RETITLE_ROUTE } from "@/utils/constants";

export function RetitleHeader() {
	const { open, isMobile, toggleSidebar } = useSidebar();

	return (
		<div className="fixed top-2 left-2 z-999 flex rounded-md backdrop-blur-md transition duration-200 ease-linear xl:w-9">
			<IconButton label="Toggle Sidebar" onClick={toggleSidebar}>
				<SidebarIcon />
			</IconButton>
			<IconButton
				asChild
				label="New Generation"
				className="translate-x-0 duration-200 ease-linear max-md:!translate-x-0"
				style={
					{
						["--tw-translate-x"]:
							open || isMobile
								? "calc(var(--sidebar-width) - 200% - (var(--spacing) * 4))"
								: 0,
					} as React.CSSProperties
				}
			>
				<Link to={RETITLE_ROUTE}>
					<PlusIcon />
				</Link>
			</IconButton>
		</div>
	);
}

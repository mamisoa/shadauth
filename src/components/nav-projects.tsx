/**
 * @file nav-projects.tsx
 * @description This file contains the `NavProjects` component, which renders a sidebar group for navigating projects.
 * It includes a list of projects, each with a name, URL, and icon, and provides a dropdown menu for additional actions.
 */

import {
	Folder,
	Forward,
	MoreHorizontal,
	Trash2,
	type LucideIcon,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/src/components/ui/sidebar";

/**
 * @function NavProjects
 * @description Renders a sidebar group for navigating projects.
 * @param {Object} props - The component props.
 * @param {Array} props.projects - An array of project objects.
 * @param {string} props.projects.name - The name of the project.
 * @param {string} props.projects.url - The URL of the project.
 * @param {LucideIcon} props.projects.icon - The icon representing the project.
 * @returns {JSX.Element} The rendered sidebar group component.
 */
export function NavProjects({
	projects,
}: {
	projects: {
		name: string;
		url: string;
		icon: LucideIcon;
	}[];
}): JSX.Element {
	const { isMobile } = useSidebar();

	return (
		<SidebarGroup className='group-data-[collapsible=icon]:hidden'>
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild>
							<a href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</a>
						</SidebarMenuButton>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuAction showOnHover>
									<MoreHorizontal />
									<span className='sr-only'>More</span>
								</SidebarMenuAction>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className='w-48 rounded-lg'
								side={isMobile ? "bottom" : "right"}
								align={isMobile ? "end" : "start"}>
								<DropdownMenuItem>
									<Folder className='text-muted-foreground' />
									<span>View Project</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Forward className='text-muted-foreground' />
									<span>Share Project</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Trash2 className='text-muted-foreground' />
									<span>Delete Project</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				))}
				<SidebarMenuItem>
					<SidebarMenuButton className='text-sidebar-foreground/70'>
						<MoreHorizontal className='text-sidebar-foreground/70' />
						<span>More</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}

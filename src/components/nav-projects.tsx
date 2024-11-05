"use client";
/**
 * @file nav-projects.tsx
 * @description This file contains the `NavProjects` component, which renders a sidebar group for navigating projects.
 * It includes a list of projects, each with a name, URL, and icon, and provides a dropdown menu for additional actions.
 */
import { MoreHorizontal } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
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

export function NavProjects(): JSX.Element {
	return (
		<SidebarGroup className='group-data-[collapsible=icon]:hidden'>
			<SidebarGroupLabel className='text-2xl'>Projects</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton className='text-sidebar-foreground/70 text-base'>
						<MoreHorizontal className='text-sidebar-foreground/70 h-5 w-5' />
						<span>More</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}

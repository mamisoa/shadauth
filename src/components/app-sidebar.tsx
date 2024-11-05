/**
 * Represents the data structure used in the app sidebar component.
 *
 * @property {Object} user - Information about the current user.
 * @property {string} user.name - The name of the user.
 * @property {string} user.email - The email of the user.
 * @property {string} user.avatar - The URL to the user's avatar image.
 *
 * @property {Array<Object>} teams - List of teams the user is part of.
 * @property {string} teams.name - The name of the team.
 * @property {React.ComponentType} teams.logo - The logo component for the team.
 * @property {string} teams.plan - The plan type of the team.
 *
 * @property {Array<Object>} navMain - Main navigation items.
 * @property {string} navMain.title - The title of the navigation item.
 * @property {string} navMain.url - The URL of the navigation item.
 * @property {React.ComponentType} navMain.icon - The icon component for the navigation item.
 * @property {boolean} [navMain.isActive] - Indicates if the navigation item is active.
 * @property {Array<Object>} navMain.items - Sub-items under the main navigation item.
 * @property {string} navMain.items.title - The title of the sub-item.
 * @property {string} navMain.items.url - The URL of the sub-item.
 *
 * @property {Array<Object>} projects - List of projects.
 * @property {string} projects.name - The name of the project.
 * @property {string} projects.url - The URL of the project.
 * @property {React.ComponentType} projects.icon - The icon component for the project.
 */

import {
	TeamsType,
	NavProjectsType,
	NavItemType,
	UserType,
} from "@/src/_types/sideBarTypes";

import * as React from "react";

import { NavMain } from "@/src/components/nav-main";
import { NavUser } from "@/src/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/src/components/ui/sidebar";
import { prisma } from "@/prisma/prisma";

interface SidebarData {
	user: UserType;
	teams: TeamsType[];
	navMain: NavItemType[];
	projects: NavProjectsType[] | never[];
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	data: SidebarData;
}

export async function AppSidebar({ data, ...props }: AppSidebarProps) {
	// console.log("🚀 ~ userData:", data);
	// Fetch the latest user data from the database
	const userData = await prisma.user.findUnique({
		where: { email: data.user.email },
		select: {
			id: true,
			username: true,
			firstname: true,
			lastname: true,
			email: true,
			image: true,
			name: true,
		},
	});
	// console.log("🚀 ~ userData:", userData);

	if (!userData) {
		console.error("User not found in database");
		return null;
	}

	// Merge the fetched data with the existing user data
	const enrichedUser: UserType = {
		...data.user,
		id: userData.id,
		username: userData.username ?? data.user.username,
		firstname: userData.firstname ?? data.user.firstname,
		lastname: userData.lastname ?? data.user.lastname,
		name: userData.name ?? data.user.name,
		email: userData.email ?? data.user.email,
		avatar: userData.image ?? data.user.avatar,
	};

	// console.log("🚀 ~ enrichedUser:", enrichedUser);

	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader></SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={enrichedUser} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

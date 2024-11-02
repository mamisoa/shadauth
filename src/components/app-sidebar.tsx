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

"use client";

import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/src/components/nav-main";
import { NavProjects } from "@/src/components/nav-projects";
import { NavUser } from "@/src/components/nav-user";
import { TeamSwitcher } from "@/src/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/src/components/ui/sidebar";

// This is sample data.
const user = {
	name: "shadcn",
	email: "m@example.com",
	avatar: "/avatars/shadcn.jpg",
};
const data = {
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
					url: "#",
				},
			],
		},
		{
			title: "Models",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General",
					url: "#",
				},
				{
					title: "Team",
					url: "#",
				},
				{
					title: "Billing",
					url: "#",
				},
				{
					title: "Limits",
					url: "#",
				},
			],
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

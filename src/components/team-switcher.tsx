/**
 * TeamSwitcher component allows users to switch between different teams.
 * It displays a dropdown menu with a list of teams and an option to add a new team.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.teams - An array of team objects.
 * @param {string} props.teams.name - The name of the team.
 * @param {React.ElementType} props.teams.logo - The logo component of the team.
 * @param {string} props.teams.plan - The plan associated with the team.
 *
 * @returns {JSX.Element} The rendered TeamSwitcher component.
 */
"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/src/components/ui/sidebar";

import { TeamsType } from "../_types/sideBarTypes";

export function TeamSwitcher({ teams }: { teams: TeamsType[] }) {
	const { isMobile } = useSidebar();
	const [activeTeam, setActiveTeam] = React.useState(teams[0]);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
							<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
								<activeTeam.logo className='size-4' />
							</div>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>
									{activeTeam.name}
								</span>
								<span className='truncate text-xs'>{activeTeam.plan}</span>
							</div>
							<ChevronsUpDown className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						align='start'
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}>
						<DropdownMenuLabel className='text-xs text-muted-foreground'>
							Teams
						</DropdownMenuLabel>
						{teams.map((team, index) => (
							<DropdownMenuItem
								key={team.name}
								onClick={() => setActiveTeam(team)}
								className='gap-2 p-2'>
								<div className='flex size-6 items-center justify-center rounded-sm border'>
									<team.logo className='size-4 shrink-0' />
								</div>
								{team.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className='gap-2 p-2'></DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='gap-2 p-2'>
							<div className='flex size-6 items-center justify-center rounded-md border bg-background'>
								<Plus className='size-4' />
							</div>
							<div className='font-medium text-muted-foreground'>Add team</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

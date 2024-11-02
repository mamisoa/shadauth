"use client";

import { ChevronRight } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/src/components/ui/sidebar";

import { NavItemType } from "../_types/sideBarTypes";
import { IconMapper } from "@/src/components/dashboard/sidebar/IconMapper";

/**
 * NavMain component renders a sidebar navigation menu with collapsible items.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.items - An array of navigation items.
 * @param {string} props.items[].title - The title of the navigation item.
 * @param {string} props.items[].url - The URL of the navigation item.
 * @param {LucideIcon} [props.items[].icon] - Optional icon component for the navigation item.
 * @param {boolean} [props.items[].isActive] - Optional flag to indicate if the item is active and should be open by default.
 * @param {Array} [props.items[].items] - Optional array of sub-items for the navigation item.
 * @param {string} props.items[].items[].title - The title of the sub-item.
 * @param {string} props.items[].items[].url - The URL of the sub-item.
 *
 * @returns {JSX.Element} The rendered sidebar navigation menu.
 */
export function NavMain({ items }: { items: NavItemType[] }): JSX.Element {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className='group/collapsible'>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <IconMapper name={item.icon} />}
									<span>{item.title}</span>
									<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<a href={subItem.url}>
													<span>{subItem.title}</span>
												</a>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

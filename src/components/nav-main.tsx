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

import { NavItemType } from "@/src/_types/sideBarTypes";
import { IconMapper } from "@/src/components/dashboard/sidebar/IconMapper";

export function NavMain({ items }: { items: NavItemType[] }): JSX.Element {
	return (
		<SidebarGroup>
			<SidebarGroupLabel className='text-2xl font-semibold mb-4'>
				Platform
			</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className='group/collapsible'>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									tooltip={item.title}
									className='text-xl py-3 min-h-[3rem]'>
									{item.icon && (
										<IconMapper name={item.icon} className='h-7 w-7' />
									)}
									<span>{item.title}</span>
									<ChevronRight className='ml-auto h-7 w-7 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton
												asChild
												className='text-xl pl-8 py-2.5 hover:bg-gray-100/10 rounded-lg transition-colors'>
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

"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/src/components/ui/sidebar";
import { HandleSignOut } from "@/src/_actions/signOutAction";
import { UserType } from "@/src/_types/sideBarTypes";
import ProfileDialog from "@/src/components/dashboard/profileDialog";

export function NavUser({ user }: { user: UserType }) {
	const { isMobile } = useSidebar();
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState(user);

	// Update local user state when props change
	useEffect(() => {
		setCurrentUser(user);
	}, [user]);

	const handleProfileUpdate = useCallback((updatedUser: Partial<UserType>) => {
		setCurrentUser((prev) => ({
			...prev,
			...updatedUser,
		}));
	}, []);

	return (
		<>
			<ProfileDialog
				user={currentUser}
				open={isProfileOpen}
				onOpenChange={setIsProfileOpen}
				onProfileUpdate={handleProfileUpdate}
			/>

			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size='lg'
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage
										src={currentUser.avatar}
										alt={currentUser.name}
									/>
									<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>
										{currentUser.name}
									</span>
									<span className='truncate text-xs'>{currentUser.email}</span>
								</div>
								<ChevronsUpDown className='ml-auto size-4' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
							side={isMobile ? "bottom" : "right"}
							align='end'
							sideOffset={4}>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarImage
											src={currentUser.avatar}
											alt={currentUser.name}
										/>
										<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>
											{currentUser.name}
										</span>
										<span className='truncate text-xs'>
											{currentUser.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<Sparkles />
									Upgrade to Pro
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
									<BadgeCheck />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCard />
									Billing
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Bell />
									Notifications
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={HandleSignOut}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</>
	);
}

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
								className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground py-3'>
								<Avatar className='h-10 w-10 rounded-lg'>
									<AvatarImage
										src={currentUser.avatar}
										alt={currentUser.name}
									/>
									<AvatarFallback className='rounded-lg text-lg'>
										{currentUser.firstname?.[0]}
										{currentUser.lastname?.[0]}
									</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left leading-tight'>
									<span className='truncate font-semibold text-lg'>
										{currentUser.name}
									</span>
									<span className='truncate text-base'>
										{currentUser.email}
									</span>
								</div>
								<ChevronsUpDown className='ml-auto h-6 w-6' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg'
							side={isMobile ? "bottom" : "right"}
							align='end'
							sideOffset={4}>
							<DropdownMenuLabel className='p-0 font-normal'>
								<div className='flex items-center gap-3 p-3 text-left'>
									<Avatar className='h-10 w-10 rounded-lg'>
										<AvatarImage
											src={currentUser.avatar}
											alt={currentUser.name}
										/>
										<AvatarFallback className='rounded-lg text-lg'>
											{currentUser.firstname?.[0]}
											{currentUser.lastname?.[0]}
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left leading-tight'>
										<span className='truncate font-semibold text-lg'>
											{currentUser.name}
										</span>
										<span className='truncate text-base'>
											{currentUser.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className='p-3 text-lg gap-3'>
									<Sparkles className='h-6 w-6' />
									Upgrade to Pro
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem
									onClick={() => setIsProfileOpen(true)}
									className='p-3 text-lg gap-3'>
									<BadgeCheck className='h-6 w-6' />
									Account
								</DropdownMenuItem>
								<DropdownMenuItem className='p-3 text-lg gap-3'>
									<CreditCard className='h-6 w-6' />
									Billing
								</DropdownMenuItem>
								<DropdownMenuItem className='p-3 text-lg gap-3'>
									<Bell className='h-6 w-6' />
									Notifications
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={HandleSignOut}
								className='p-3 text-lg gap-3'>
								<LogOut className='h-6 w-6' />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</>
	);
}

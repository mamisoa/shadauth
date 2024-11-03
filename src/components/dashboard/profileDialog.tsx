"use client";
import React, { useEffect } from "react";
import { useActionState } from "react";
import { Button } from "@/src/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Loader2 } from "lucide-react";
import { UserType } from "@/src/_types/sideBarTypes";
import { handleProfileUpdate } from "@/src/_actions/profileAction";
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from "@/src/components/ui/avatar";

interface ProfileDialogProps {
	user: UserType; // Now using the updated UserType that includes id
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onProfileUpdate: (updatedUser: Partial<UserType>) => void;
}

const ProfileDialog = ({
	user,
	open,
	onOpenChange,
	onProfileUpdate,
}: ProfileDialogProps) => {
	const [actionData, handleProfileSubmit, isPending] = useActionState(
		handleProfileUpdate,
		undefined
	);

	useEffect(() => {
		// console.log("🚀 ~ actionData:", actionData);
		if (actionData?.errors?.log) {
			console.log(actionData.errors.log);
		}
		if (actionData?.successMsg) {
			// Update the parent component with new user data
			onProfileUpdate({
				username: actionData.username as string,
				firstname: actionData.firstname as string,
				lastname: actionData.lastname as string,
			});
		}
	}, [actionData, onOpenChange, onProfileUpdate]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				onCloseAutoFocus={() => {
					if (actionData?.successMsg) {
						delete actionData.successMsg;
					}
				}}
				className='sm:max-w-md bg-background border-border'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold text-foreground'>
						Profile Settings
					</DialogTitle>
					<DialogDescription className='text-muted-foreground'>
						Update your account information
					</DialogDescription>
				</DialogHeader>

				<div className='flex justify-center mb-4'>
					<Avatar className='h-20 w-20'>
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className='text-lg'>
							{user.firstname?.[0]}
							{user.lastname?.[0]}
						</AvatarFallback>
					</Avatar>
				</div>

				<form action={handleProfileSubmit} className='space-y-4'>
					{/* Hidden input for user ID */}
					<input type='hidden' name='id' value={user.id} />

					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							name='email'
							placeholder='you@example.com'
							defaultValue={user.email}
							disabled
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='username'>Username</Label>
						<Input
							id='username'
							name='username'
							placeholder='johndoe'
							defaultValue={
								(actionData?.username as string) || user.username || ""
							}
						/>
						{actionData?.errors?.username && (
							<p className='text-sm text-destructive' role='alert'>
								{actionData.errors.username}
							</p>
						)}
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='firstname'>First Name</Label>
							<Input
								id='firstname'
								name='firstname'
								placeholder='John'
								defaultValue={
									(actionData?.firstname as string) || user.firstname || ""
								}
							/>
							{actionData?.errors?.firstname && (
								<p className='text-sm text-destructive' role='alert'>
									{actionData.errors.firstname}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='lastname'>Last Name</Label>
							<Input
								id='lastname'
								name='lastname'
								placeholder='Doe'
								defaultValue={
									(actionData?.lastname as string) || user.lastname || ""
								}
							/>
							{actionData?.errors?.lastname && (
								<p className='text-sm text-destructive' role='alert'>
									{actionData.errors.lastname}
								</p>
							)}
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='currentPassword'>
							Current Password (required for changes)
						</Label>
						<Input
							type='password'
							id='currentPassword'
							name='currentPassword'
							placeholder='••••••••'
						/>
						{actionData?.errors?.currentPassword && (
							<p className='text-sm text-destructive' role='alert'>
								{actionData.errors.currentPassword}
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='newPassword'>New Password (optional)</Label>
						<Input
							type='password'
							id='newPassword'
							name='newPassword'
							placeholder='••••••••'
						/>
						{actionData?.errors?.newPassword && (
							<p className='text-sm text-destructive' role='alert'>
								{actionData.errors.newPassword}
							</p>
						)}
					</div>

					{actionData?.errors?.general && (
						<Alert variant='destructive'>
							<AlertDescription>{actionData.errors.general}</AlertDescription>
						</Alert>
					)}

					{actionData?.successMsg && (
						<Alert className='bg-green-100 border-green-500'>
							<AlertDescription className='text-green-800'>
								<span className='font-medium'>Success!</span>{" "}
								{actionData.successMsgas as string}
							</AlertDescription>
						</Alert>
					)}

					<DialogFooter className='sm:justify-between'>
						<Button
							type='button'
							variant='outline'
							onClick={() => onOpenChange(false)}
							disabled={isPending}>
							Cancel
						</Button>
						<Button type='submit' disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Updating profile...
								</>
							) : (
								"Update Profile"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ProfileDialog;

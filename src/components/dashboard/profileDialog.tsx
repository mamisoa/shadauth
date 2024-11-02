import React from "react";
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
import { UserType } from "@/src/_types/sideBarTypes";

interface ProfileDialogProps {
	user: UserType;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const ProfileDialog = ({ user, open, onOpenChange }: ProfileDialogProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-md bg-background border-border'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold text-foreground'>
						Profile Settings
					</DialogTitle>
					<DialogDescription className='text-muted-foreground'>
						Update your account information
					</DialogDescription>
				</DialogHeader>

				<form className='space-y-4'>
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
							defaultValue={user.name || ""}
						/>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='firstname'>First Name</Label>
							<Input id='firstname' name='firstname' placeholder='John' />
						</div>

						<div className='space-y-2'>
							<Label htmlFor='lastname'>Last Name</Label>
							<Input id='lastname' name='lastname' placeholder='Doe' />
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='currentPassword'>Current Password</Label>
						<Input
							type='password'
							id='currentPassword'
							name='currentPassword'
							placeholder='••••••••'
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='newPassword'>New Password (optional)</Label>
						<Input
							type='password'
							id='newPassword'
							name='newPassword'
							placeholder='••••••••'
						/>
					</div>
				</form>

				<DialogFooter className='sm:justify-between'>
					<Button
						type='button'
						variant='outline'
						onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button type='submit'>Update Profile</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ProfileDialog;

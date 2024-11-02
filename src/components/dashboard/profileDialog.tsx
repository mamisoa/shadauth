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
			<DialogContent className='sm:max-w-md bg-gray-800 text-white border-gray-700'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold'>
						Profile Settings
					</DialogTitle>
					<DialogDescription className='text-gray-400'>
						Update your account information
					</DialogDescription>
				</DialogHeader>

				<form className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='email' className='text-gray-300'>
							Email
						</Label>
						<Input
							id='email'
							name='email'
							placeholder='you@example.com'
							defaultValue={user.email}
							className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							disabled
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='username' className='text-gray-300'>
							Username
						</Label>
						<Input
							id='username'
							name='username'
							placeholder='johndoe'
							defaultValue={user.name || ""}
							className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
						/>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='firstname' className='text-gray-300'>
								First Name
							</Label>
							<Input
								id='firstname'
								name='firstname'
								placeholder='John'
								className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='lastname' className='text-gray-300'>
								Last Name
							</Label>
							<Input
								id='lastname'
								name='lastname'
								placeholder='Doe'
								className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							/>
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='currentPassword' className='text-gray-300'>
							Current Password
						</Label>
						<Input
							type='password'
							id='currentPassword'
							name='currentPassword'
							placeholder='••••••••'
							className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='newPassword' className='text-gray-300'>
							New Password (optional)
						</Label>
						<Input
							type='password'
							id='newPassword'
							name='newPassword'
							placeholder='••••••••'
							className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
						/>
					</div>
				</form>

				<DialogFooter className='sm:justify-between'>
					<Button
						type='button'
						variant='secondary'
						onClick={() => onOpenChange(false)}
						className='bg-gray-600 hover:bg-gray-500 text-white'>
						Cancel
					</Button>
					<Button
						type='submit'
						className='bg-blue-600 hover:bg-blue-700 text-white'>
						Update Profile
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ProfileDialog;

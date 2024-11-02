"use client";
import React, { useEffect } from "react";
import { useActionState } from "react";
import Image from "next/image";
import { handleProfileUpdate } from "@/src/_actions/profileAction";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Loader2 } from "lucide-react";
import { SessionType } from "@/src/_types/signInTypes";

export default function ProfilePage(session: SessionType) {
	const [actionData, handleProfileSubmit, isPending] = useActionState(
		handleProfileUpdate,
		undefined
	);

	useEffect(() => {
		if (actionData?.errors?.log) {
			console.log(actionData.errors.log);
		}
	}, [actionData]);

	return (
		<div className='min-h-screen flex items-center justify-center bg-black p-4'>
			<Card className='w-full max-w-md bg-gray-800 border-gray-700'>
				<CardHeader className='space-y-1'>
					<div className='flex items-center justify-center mb-4'>
						{session.user.image ? (
							<Image
								src={session.user.image}
								alt='Profile'
								width={80}
								height={80}
								className='rounded-full'
							/>
						) : (
							<svg
								className='w-20 h-20 text-gray-400 rounded-full'
								fill='currentColor'
								viewBox='0 0 24 24'>
								<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
							</svg>
						)}
					</div>
					<CardTitle className='text-2xl font-bold text-center text-white'>
						Update Profile
					</CardTitle>
					<CardDescription className='text-center text-gray-400'>
						Update your account information
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form action={handleProfileSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email' className='text-gray-300'>
								Email
							</Label>
							<Input
								type='email'
								id='email'
								name='email'
								placeholder='you@example.com'
								defaultValue={
									(actionData?.email as string) || session.user.email || ""
								}
								className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							/>
							{actionData?.errors?.email && (
								<p className='text-sm text-red-400' role='alert'>
									{actionData.errors.email}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='username' className='text-gray-300'>
								Username
							</Label>
							<Input
								type='text'
								id='username'
								name='username'
								placeholder='johndoe'
								defaultValue={
									(actionData?.username as string) ||
									session.user.username ||
									""
								}
								className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							/>
							{actionData?.errors?.username && (
								<p className='text-sm text-red-400' role='alert'>
									{actionData.errors.username}
								</p>
							)}
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='firstname' className='text-gray-300'>
									First Name
								</Label>
								<Input
									type='text'
									id='firstname'
									name='firstname'
									placeholder='John'
									defaultValue={
										(actionData?.firstname as string) ||
										session.user.firstname ||
										""
									}
									className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
								/>
								{actionData?.errors?.firstname && (
									<p className='text-sm text-red-400' role='alert'>
										{actionData.errors.firstname}
									</p>
								)}
							</div>

							<div className='space-y-2'>
								<Label htmlFor='lastname' className='text-gray-300'>
									Last Name
								</Label>
								<Input
									type='text'
									id='lastname'
									name='lastname'
									placeholder='Doe'
									defaultValue={
										(actionData?.lastname as string) ||
										session.user.lastname ||
										""
									}
									className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
								/>
								{actionData?.errors?.lastname && (
									<p className='text-sm text-red-400' role='alert'>
										{actionData.errors.lastname}
									</p>
								)}
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='currentPassword' className='text-gray-300'>
								Current Password (required for changes)
							</Label>
							<Input
								type='password'
								id='currentPassword'
								name='currentPassword'
								placeholder='••••••••'
								className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
							/>
							{actionData?.errors?.currentPassword && (
								<p className='text-sm text-red-400' role='alert'>
									{actionData.errors.currentPassword}
								</p>
							)}
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
							{actionData?.errors?.newPassword && (
								<p className='text-sm text-red-400' role='alert'>
									{actionData.errors.newPassword}
								</p>
							)}
						</div>

						{actionData?.errors?.general && (
							<Alert
								variant='destructive'
								className='bg-red-900 border-red-500'>
								<AlertDescription>{actionData.errors.general}</AlertDescription>
							</Alert>
						)}

						{actionData?.successMsg && (
							<Alert className='bg-green-900 border-green-500'>
								<AlertDescription className='text-green-400'>
									<span className='font-medium'>Success!</span>{" "}
									{actionData.successMsg as string}
								</AlertDescription>
							</Alert>
						)}

						<Button
							type='submit'
							disabled={isPending}
							className='w-full bg-blue-600 hover:bg-blue-700'>
							{isPending ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Updating profile...
								</>
							) : (
								"Update Profile"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

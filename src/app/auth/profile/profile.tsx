"use client";

import { useActionState, useEffect } from "react";
import { handleProfileUpdate } from "@/src/_actions/profileAction";
import Image from "next/image";
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
		<div className='min-h-screen flex items-center justify-center bg-black'>
			<div className='w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl'>
				<div className='flex items-center justify-center mb-6'>
					{session.user.image ? (
						<Image
							src={session.user.image as string}
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

				<h2 className='text-2xl font-bold text-center text-white mb-2'>
					Update Profile
				</h2>
				<p className='text-center text-gray-400 mb-6'>
					Update your account information
				</p>

				<form action={handleProfileSubmit} className='space-y-4'>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-300 mb-1'>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='you@example.com'
							defaultValue={
								(actionData?.email as string) || session.user.email || ""
							}
							disabled
						/>
						{actionData?.errors?.email && (
							<p className='text-sm text-red-400 mt-1' role='alert'>
								{actionData.errors.email}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor='username'
							className='block text-sm font-medium text-gray-300 mb-1'>
							Username
						</label>
						<input
							type='text'
							id='username'
							name='username'
							className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='johndoe'
							defaultValue={
								(actionData?.username as string) || session.user.username || ""
							}
						/>
						{actionData?.errors?.username && (
							<p className='text-sm text-red-400 mt-1' role='alert'>
								{actionData.errors.username}
							</p>
						)}
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label
								htmlFor='firstname'
								className='block text-sm font-medium text-gray-300 mb-1'>
								First Name
							</label>
							<input
								type='text'
								id='firstname'
								name='firstname'
								className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='John'
								defaultValue={
									(actionData?.firstname as string) ||
									session.user.firstname ||
									""
								}
							/>
							{actionData?.errors?.firstname && (
								<p className='text-sm text-red-400 mt-1' role='alert'>
									{actionData.errors.firstname}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor='lastname'
								className='block text-sm font-medium text-gray-300 mb-1'>
								Last Name
							</label>
							<input
								type='text'
								id='lastname'
								name='lastname'
								className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='Doe'
								defaultValue={
									(actionData?.lastname as string) ||
									session.user.lastname ||
									""
								}
							/>
							{actionData?.errors?.lastname && (
								<p className='text-sm text-red-400 mt-1' role='alert'>
									{actionData.errors.lastname}
								</p>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor='currentPassword'
							className='block text-sm font-medium text-gray-300 mb-1'>
							Current Password (required for changes)
						</label>
						<input
							type='password'
							id='currentPassword'
							name='currentPassword'
							className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='••••••••'
						/>
						{actionData?.errors?.currentPassword && (
							<p className='text-sm text-red-400 mt-1' role='alert'>
								{actionData.errors.currentPassword}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor='newPassword'
							className='block text-sm font-medium text-gray-300 mb-1'>
							New Password (optional)
						</label>
						<input
							type='password'
							id='newPassword'
							name='newPassword'
							className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='••••••••'
						/>
						{actionData?.errors?.newPassword && (
							<p className='text-sm text-red-400 mt-1' role='alert'>
								{actionData.errors.newPassword}
							</p>
						)}
					</div>

					{actionData?.errors?.general && (
						<p className='text-sm text-red-400' role='alert'>
							{actionData.errors.general}
						</p>
					)}

					{actionData?.successMsg && (
						<div
							className='p-4 mb-4 text-sm text-green-400 bg-green-900 rounded-lg'
							role='alert'>
							<span className='font-medium'>Success!</span>{" "}
							{actionData.successMsg as string}
						</div>
					)}

					<button
						disabled={isPending}
						className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out flex items-center justify-center'>
						{isPending ? (
							<>
								<svg
									className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'></circle>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
								</svg>
								Updating profile...
							</>
						) : (
							"Update Profile"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

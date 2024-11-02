"use client";

import { handleEmailSignIn } from "@/src/_actions/emailSigninAction";
import { handleCredentialSignIn } from "@/src/_actions/credentialSigninAction";
import { SignInGoogleButton } from "@/src/components/auth/signInGoogleButton";
import { useActionState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function SignInPage() {
	const router = useRouter();

	const [emailActionData, handleEmailSignInSubmit, isEmailPending] =
		useActionState(handleEmailSignIn, undefined);

	const [
		credentialActionData,
		handleCredentialSignInSubmit,
		isCredentialPending,
	] = useActionState(handleCredentialSignIn, undefined);

	useEffect(() => {
		if (emailActionData?.errors?.log) {
			console.log(emailActionData.errors.log);
		}
		if (credentialActionData?.errors?.log) {
			console.log(credentialActionData.errors.log);
		}
		// Redirect if credential sign in was successful
		if (credentialActionData?.redirect) {
			router.push(credentialActionData.redirect as string);
		}
	}, [emailActionData, credentialActionData, router]);

	return (
		<div className='min-h-screen flex items-center justify-center bg-black'>
			<div className='w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl'>
				<h2 className='text-2xl font-bold text-center text-white mb-2'>
					Sign In
				</h2>
				<p className='text-center text-gray-400 mb-6'>
					Choose your preferred sign in method
				</p>

				{/* Standard Sign In Form */}
				<form action={handleCredentialSignInSubmit} className='space-y-4 mb-6'>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-300 mb-1'>
							Email
						</label>
						<input
							type='text'
							id='email'
							name='email'
							className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='you@example.com'
							defaultValue={credentialActionData?.email as string}
						/>
						{credentialActionData?.errors?.email && (
							<p className='text-sm text-red-400' role='alert'>
								{credentialActionData.errors.email}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-300 mb-1'>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='••••••••'
						/>
						{credentialActionData?.errors?.password && (
							<p className='text-sm text-red-400' role='alert'>
								{credentialActionData.errors.password}
							</p>
						)}
					</div>
					{credentialActionData?.errors?.general && (
						<p className='text-sm text-red-400' role='alert'>
							{credentialActionData.errors.general}
						</p>
					)}
					{credentialActionData?.successMsg && (
						<div
							className='p-4 mb-4 text-sm text-green-400 bg-green-900 rounded-lg'
							role='alert'>
							<span className='font-medium'>Success!</span>{" "}
							{credentialActionData.successMsg as string}
						</div>
					)}
					<button
						type='submit'
						disabled={isCredentialPending}
						className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out flex items-center justify-center'>
						{isCredentialPending ? (
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
								Signing in...
							</>
						) : (
							"Sign In"
						)}
					</button>
				</form>

				<div className='relative mb-6'>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-gray-600'></div>
					</div>
					<div className='relative flex justify-center text-sm'>
						<span className='px-2 bg-gray-800 text-gray-400'>
							Or continue with
						</span>
					</div>
				</div>

				{/* Email Link Sign In Form */}
				<form action={handleEmailSignInSubmit} className='space-y-4 mb-6'>
					<div>
						<label
							htmlFor='email-link'
							className='block text-sm font-medium text-gray-300 mb-1'>
							Email
						</label>
						<input
							type='text'
							id='email-link'
							name='email'
							className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							placeholder='you@example.com'
							defaultValue={emailActionData?.email as string}
						/>
					</div>
					{emailActionData?.errors && (
						<p className='text-sm text-red-400' role='alert'>
							{emailActionData.errors.email}
						</p>
					)}
					{emailActionData?.errors?.general && (
						<p className='text-sm text-red-400' role='alert'>
							{emailActionData.errors.general}
						</p>
					)}
					{emailActionData?.successMsg && (
						<div
							className='p-4 mb-4 text-sm text-green-400 bg-green-900 rounded-lg'
							role='alert'>
							<span className='font-medium'>Success!</span>{" "}
							{emailActionData?.successMsg as string}
							<br />
							Check your inbox.
						</div>
					)}
					<button
						type='submit'
						disabled={isEmailPending}
						className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out flex items-center justify-center'>
						{isEmailPending ? (
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
								Sending email link...
							</>
						) : (
							<>
								Sign in with magic link
								<FiArrowRight className='ml-2 h-5 w-5' />
							</>
						)}
					</button>
				</form>
				<div className='relative mb-6'>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-gray-600'></div>
					</div>
					<div className='relative flex justify-center text-sm'>
						<span className='px-2 bg-gray-800 text-gray-400'>
							Or
						</span>
					</div>
				</div>
				<div className='mt-6'>
					<SignInGoogleButton />
				</div>
			</div>
		</div>
	);
}

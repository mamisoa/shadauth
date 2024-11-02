"use client";

import { handleEmailSignIn } from "@/src/_actions/emailSigninAction";
import { handleCredentialSignIn } from "@/src/_actions/credentialSigninAction";
import { SignInGoogleButton } from "@/src/components/auth/signInGoogleButton";
import { useActionState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Separator } from "@/src/components/ui/separator";

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
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold text-center'>
						Sign In
					</CardTitle>
					<CardDescription className='text-center'>
						Choose your preferred sign in method
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-6'>
						<div className='border rounded-lg p-4'>
							{/* Standard Sign In Form */}
							<form action={handleCredentialSignInSubmit} className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										type='email'
										id='email'
										name='email'
										placeholder='you@example.com'
										defaultValue={credentialActionData?.email as string}
									/>
									{credentialActionData?.errors?.email && (
										<p className='text-sm text-destructive' role='alert'>
											{credentialActionData.errors.email}
										</p>
									)}
								</div>
								<div className='space-y-2'>
									<Label htmlFor='password'>Password</Label>
									<Input
										type='password'
										id='password'
										name='password'
										placeholder='••••••••'
									/>
									{credentialActionData?.errors?.password && (
										<p className='text-sm text-destructive' role='alert'>
											{credentialActionData.errors.password}
										</p>
									)}
								</div>
								{credentialActionData?.errors?.general && (
									<p className='text-sm text-destructive' role='alert'>
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
								<Button
									type='submit'
									className='w-full'
									disabled={isCredentialPending}>
									{isCredentialPending ? (
										<>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Signing in...
										</>
									) : (
										"Sign In"
									)}
								</Button>
							</form>
						</div>

						<div className='relative my-6'>
							<div className='absolute inset-0 flex items-center'>
								<Separator className='w-full' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-background px-2 text-muted-foreground'>
									Or
								</span>
							</div>
						</div>

						<div className='border rounded-lg p-4'>
							{/* Email Link Sign In Form */}
							<form action={handleEmailSignInSubmit} className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='email-link'>Email</Label>
									<Input
										type='email'
										id='email-link'
										name='email'
										placeholder='you@example.com'
										defaultValue={emailActionData?.email as string}
									/>
								</div>
								{emailActionData?.errors && (
									<p className='text-sm text-destructive' role='alert'>
										{emailActionData.errors.email}
									</p>
								)}
								{emailActionData?.errors?.general && (
									<p className='text-sm text-destructive' role='alert'>
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
								<Button
									type='submit'
									className='w-full'
									disabled={isEmailPending}>
									{isEmailPending ? (
										<>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Sending email link...
										</>
									) : (
										<>
											Sign in with magic link
											<ArrowRight className='ml-2 h-4 w-4' />
										</>
									)}
								</Button>
							</form>
						</div>

						<div className='relative my-6'>
							<div className='absolute inset-0 flex items-center'>
								<Separator className='w-full' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-background px-2 text-muted-foreground'>
									Or
								</span>
							</div>
						</div>

						<div>
							<SignInGoogleButton />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

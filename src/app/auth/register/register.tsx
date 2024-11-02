"use client";

import { useActionState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { handleRegistration } from "@/src/_actions/registerAction";
import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export default function RegisterPage() {
	const [actionData, handleRegisterSubmit, isPending] = useActionState(
		handleRegistration,
		undefined
	);

	useEffect(() => {
		if (actionData) {
			console.log(actionData);
		}
	}, [actionData]);

	return (
		<div className='min-h-screen flex items-center justify-center bg-black'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold text-center'>
						Create Account
					</CardTitle>
					<CardDescription className='text-center'>
						Fill in your details to register
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={handleRegisterSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								type='email'
								id='email'
								name='email'
								placeholder='you@example.com'
								defaultValue={actionData?.email as string}
							/>
							{actionData?.errors?.email && (
								<p className='text-sm text-destructive' role='alert'>
									{actionData.errors.email}
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
							{actionData?.errors?.password && (
								<p className='text-sm text-destructive' role='alert'>
									{actionData.errors.password}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<Input
								type='password'
								id='confirmPassword'
								name='confirmPassword'
								placeholder='••••••••'
							/>
							{actionData?.errors?.confirmPassword && (
								<p className='text-sm text-destructive' role='alert'>
									{actionData.errors.confirmPassword}
								</p>
							)}
						</div>

						{actionData?.errors?.general && (
							<p className='text-sm text-destructive' role='alert'>
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

						<Button type='submit' disabled={isPending} className='w-full'>
							{isPending ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Creating account...
								</>
							) : (
								<>
									Create Account
									<ArrowRight className='ml-2 h-4 w-4' />
								</>
							)}
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p className='text-center text-sm text-muted-foreground'>
						Already have an account?{" "}
						<Link href='/auth/sign-in' className='text-primary hover:underline'>
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}

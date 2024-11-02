// Import necessary components from Next.js and custom UI components
import Link from "next/link";
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

// Define the LoginForm component
export function LoginForm() {
	return (
		// Card containing the login form
		<Card className='mx-auto max-w-sm'>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						{/* Input field for email */}
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='m@example.com'
							required
						/>
					</div>
					<div className='grid gap-2'>
						<div className='flex items-center'>
							{/* Input field for password with a link for forgotten password */}
							<Label htmlFor='password'>Password</Label>
							<Link href='#' className='ml-auto inline-block text-sm underline'>
								Forgot your password?
							</Link>
						</div>
						<Input id='password' type='password' required />
					</div>
					{/* Submit button for the form */}
					<Button type='submit' className='w-full'>
						Login
					</Button>
					{/* Button to login with Google */}
					<Button variant='outline' className='w-full'>
						Login with Google
					</Button>
				</div>
				{/* Link to sign up if the user doesn't have an account */}
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{" "}
					<Link href='#' className='underline'>
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}

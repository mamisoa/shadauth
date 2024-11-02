"use client";

import { handleGoogleSignIn } from "@/src/_actions/googleSigninAction";
import { Button } from "@/src/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const SignInGoogleButton = (props: {
	children?: React.ReactNode;
	className?: string;
}) => {
	const defaultClassName =
		"flex items-center justify-center w-full bg-white text-black p-2 rounded-md border hover:bg-gray-100 mb-2";

	return (
		<Button
			className={`${defaultClassName} ${props?.className || ""}`}
			style={{ cursor: "pointer" }}
			onClick={() => handleGoogleSignIn()}>
			<FcGoogle className='bg-white mr-2' />
			{props.children || "Sign in with Google"}
		</Button>
	);
};

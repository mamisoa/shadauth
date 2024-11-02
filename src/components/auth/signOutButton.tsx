"use client";

import { HandleSignOut } from "@/src/_actions/signOutAction";
import { Button } from "@/src/components/ui/button";

export const SignOutButton = (props: {
	children?: React.ReactNode;
	className?: string;
}) => {
	return (
		<Button
			className={props.className}
			style={{ cursor: "pointer" }}
			onClick={() => HandleSignOut()}>
			{props.children || "Sign Out"}
		</Button>
	);
};

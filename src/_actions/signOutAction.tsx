"use server";

import { signOut } from "@/auth";

export async function HandleSignOut() {
	try {
		await signOut();
	} catch (error) {
		throw error;
	}
}

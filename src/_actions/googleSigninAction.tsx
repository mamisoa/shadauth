"use server";

import { signIn } from "@/auth";

export async function handleGoogleSignIn() {
  try {
    await signIn("google", { redirectTo: "/dashboard"});
    // console.log("Sign in action with Google")
  } catch (error) {
    throw error;
  }
};
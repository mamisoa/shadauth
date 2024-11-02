"use server";

import { signIn } from "@/auth";
import { convertZodErrors } from "@/src/_utils/errors";
import { wait } from "../_utils/time";
import { StringMap } from "../_types/signInTypes";
import { CredentialSignInSchema } from "@/src/_schemas/signInSchema";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";

interface CredentialSignInActionReturn {
    errors?: StringMap;
    [key: string]: StringMap | string | undefined;
};

export async function handleCredentialSignIn(
    prevState = {},
    formData: FormData
): Promise<CredentialSignInActionReturn> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const unvalidatedInputs = Object.fromEntries(formData);

    // console.log("previous state: ", prevState);
    
    // First validate the input data
    const validated = CredentialSignInSchema.safeParse(unvalidatedInputs);
    if (!validated.success) {
        const errors = convertZodErrors(validated.error);
        return { errors, ...unvalidatedInputs };
    }

    try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
            }
        });

        if (!existingUser || !existingUser.password) {
            await wait(1000); // Prevent timing attacks by maintaining consistent response time
            return {
                errors: {
                    general: "Invalid email or password",
                    log: "User not found or no password set"
                },
                ...unvalidatedInputs
            };
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            await wait(1000); // Prevent timing attacks
            return {
                errors: {
                    general: "Invalid email or password",
                    log: "Invalid password"
                },
                ...unvalidatedInputs
            };
        }

        // Attempt to sign in using NextAuth
        try {
            const signInResult = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/dashboard"
            });

            if (signInResult?.error) {
                return {
                    errors: {
                        general: "Authentication failed",
                        log: signInResult.error
                    },
                    ...unvalidatedInputs
                };
            }

            return { 
                email,
                successMsg: "Sign in successful",
                redirect: signInResult?.url || "/dashboard"
            };

        } catch (signInError) {
            console.error("NextAuth sign in error:", signInError);
            return {
                errors: {
                    general: "Authentication failed",
                    log: signInError instanceof Error ? signInError.message : "Unknown error"
                },
                ...unvalidatedInputs
            };
        }

    } catch (error) {
        console.error("Credential sign in error:", error);
        return {
            errors: {
                general: "An error occurred during sign in",
                log: error instanceof Error ? error.message : "Unknown error"
            },
            ...unvalidatedInputs
        };
    }
}
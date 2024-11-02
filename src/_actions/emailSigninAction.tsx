"use server";

import { signIn } from "@/auth";

import { EmailSignInSchema } from "@/src/_schemas/signInSchema";
import { convertZodErrors } from "@/src/_utils/errors";
import { wait } from "../_utils/time";
import { StringMap } from "../_types/signInTypes";
import { prisma } from "@/prisma/prisma";


// Définir un type pour le retour de la fonction
interface EmailSignInActionReturn {
	errors?: StringMap;
	[key: string]: StringMap | string | undefined;
}

interface CleanupResult {
    success: boolean;
    deletedCount?: number;
    error?: string;
}

/**
 * Deletes verification tokens that are older than 24 hours
 * @returns Promise<CleanupResult> Object containing success status and number of deleted tokens
 */
export async function cleanupVerificationTokens(): Promise<CleanupResult> {
    try {
        // Calculate the date 24 hours ago
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // Delete all tokens that have expired
        const deleted = await prisma.verificationToken.deleteMany({
            where: {
                expires: {
                    lt: oneDayAgo
                }
            }
        });

        return {
            success: true,
            deletedCount: deleted.count
        };
    } catch (error) {
        console.error("Error cleaning up verification tokens:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}


// Modifier la fonction pour utiliser le type défini
export async function handleEmailSignIn(
	prevState = {},
	formData: FormData
): Promise<EmailSignInActionReturn> {

	 // First, cleanup old tokens
	 await cleanupVerificationTokens();

	const email = formData.get("email");
	// console.log(email);
	const unvalidatedInputs = Object.fromEntries(formData);

	// console.log("previous state: ", prevState);
	const validated = EmailSignInSchema.safeParse(unvalidatedInputs);

	await wait(1000);

	if (!validated.success) {
		const errors = convertZodErrors(validated.error);
		return { errors, ...unvalidatedInputs };
	}
	try {
		console.log("Sign in action with Email");
		await signIn("nodemailer", {
			email,
			redirect: false,
			callbackUrl: "/dashboard",
		});
		return {
			email: email as string,
			successMsg: "Email sent successfully to: " + email,
		};
	} catch (error) {
		const errors: StringMap = {
			general: "Error trying to send the link.",
			log: error as string,
		};
		// console.log("🚀 ~ error:", error)
		return { errors };
	}
}

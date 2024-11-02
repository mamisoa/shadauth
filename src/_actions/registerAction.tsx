"use server";

import { convertZodErrors } from "@/src/_utils/errors";
import { wait } from "../_utils/time";
import { StringMap } from "../_types/signInTypes";
import { RegisterSchema } from "@/src/_schemas/registrationSchema";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";

interface RegistrationActionReturn {
    errors?: StringMap;
    [key: string]: StringMap | string | undefined;
};

export async function handleRegistration(
    prevState = {},
    formData: FormData
): Promise<RegistrationActionReturn> {
    const email = formData.get("email") as string;
    const unvalidatedInputs = Object.fromEntries(formData);

    // console.log("previous state: ", prevState);
    
    // First validate the input data
    const validated = RegisterSchema.safeParse(unvalidatedInputs);
    if (!validated.success) {
        const errors = convertZodErrors(validated.error);
        return { errors, ...unvalidatedInputs };
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return {
                errors: {
                    email: "An account with this email already exists",
                    log: "User already exists"
                },
                ...unvalidatedInputs
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validated.data.password, 12);

        // Create new user
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                // Optional: extract username from email
                username: email.split('@')[0],
            }
        });

        await wait(1000); // Keeping the wait for UX consistency

        return { 
            email,
            successMsg: "Account created successfully! Please sign in." 
        };

    } catch (error) {
        console.error("Registration error:", error);
        return {
            errors: {
                general: "Error creating account. Please try again.",
                log: error instanceof Error ? error.message : "Unknown error"
            },
            ...unvalidatedInputs
        };
    }
}
import { z } from "zod";

export const CredentialSignInSchema = z.object({
    email: z
        .string({ message : 'Enter a valid email'})
        .max(100, 'Email should not exceed 100 characters'),
    password: z
        .string() // no limitation if different constraints have been set before
})

export const EmailSignInSchema = z.object({
    email: z
        .string()
        .email({ message : 'Enter a valid email'})
        .max(100, 'Email should not exceed 100 characters'),
})

import { z } from "zod";

export const ProfileUpdateSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" })
		.max(30, { message: "Username must not exceed 30 characters" })
		.optional()
        .or(z.literal('')),
	firstname: z
		.string()
		.min(2, { message: "First name must be at least 2 characters" })
		.max(50, { message: "First name must not exceed 50 characters" })
		.optional()
        .or(z.literal('')),
	lastname: z
		.string()
		.min(2, { message: "Last name must be at least 2 characters" })
		.max(50, { message: "Last name must not exceed 50 characters" })
		.optional()
        .or(z.literal('')),
	currentPassword: z.string().optional(),
	newPassword: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })
		.max(100, { message: "Password should not exceed 100 characters" })
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter",
		})
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter",
		})
		.regex(/[0-9]/, { message: "Password must contain at least one number" })
		.regex(/[^A-Za-z0-9]/, {
			message: "Password must contain at least one special character",
		})
		.optional()
        .or(z.literal('')),
});

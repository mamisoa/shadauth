import { z } from "zod";

export const RegisterSchema = z
	.object({
		email: z
			.string()
			.email({ message: "Enter a valid email" })
			.max(100, "Email should not exceed 100 characters"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(100, "Password should not exceed 100 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(
				/[^A-Za-z0-9]/,
				"Password must contain at least one special character"
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const RegisterSignInSchema = z.object({
	email: z
		.string()
		.email({ message: "Enter a valid email" })
		.max(100, "Email should not exceed 100 characters"),
	password: z.string(),
});
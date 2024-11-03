"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { convertZodErrors } from "@/src/_utils/errors";
import { StringMap } from "@/src/_types/signInTypes";
import bcrypt from "bcrypt";
import { ProfileUpdateSchema } from "../_schemas/profileSchema";
import { wait } from "../_utils/time";

interface ProfileActionReturn {
	errors?: StringMap;
	[key: string]: StringMap | string | undefined;
}

export async function handleProfileUpdate(
	_: unknown,
	formData: FormData
): Promise<ProfileActionReturn> {
	const session = await auth();

	// Check if user is authenticated
	if (!session?.user?.id) {
		return {
			errors: {
				general: "You must be logged in to update your profile",
			},
		};
	}

	const unvalidatedInputs = Object.fromEntries(formData);
	const validated = ProfileUpdateSchema.safeParse(unvalidatedInputs);

	if (!validated.success) {
		const errors = convertZodErrors(validated.error);
		return { errors, ...unvalidatedInputs };
	}

	try {
		// Get current user data
		const currentUser = await prisma.user.findUnique({
			where: { id: session.user.id },
			select: {
				id: true,
				password: true,
			},
		});

		console.log("🚀 ~ currentUser:", currentUser);

		if (!currentUser) {
			return {
				errors: {
					general: "User not found",
				},
			};
		}

		// Verify current password if provided
		if (validated.data.currentPassword) {
			// doesn't check if password is empty because it's optional

			const isValidPassword = await bcrypt.compare(
				validated.data.currentPassword,
				currentUser.password as string
			);

			if (!isValidPassword) {
				return {
					errors: {
						currentPassword: "Current password is incorrect",
					},
				};
			}
		}

		// Prepare update data
		const updateData: StringMap = {
			username: validated.data.username as string,
			firstname: validated.data.firstname as string,
			lastname: validated.data.lastname as string,
		};

		// Hash new password if provided
		if (validated.data.newPassword !== "") {
			updateData.password = await bcrypt.hash(
				validated.data.newPassword as string,
				12
			);
		}

		// console.log("🚀 ~ updateData:", updateData);

		// Update user profile
		await prisma.user.update({
			where: { id: session.user.id },
			data: updateData,
		});

		await wait(1000);

		return {
			...updateData,
			successMsg: "Profile updated successfully",
		};
	} catch (error) {
		console.error("Profile update error:", error);
		return {
			errors: {
				general: "Failed to update profile",
				log: error as string,
			},
		};
	}
}

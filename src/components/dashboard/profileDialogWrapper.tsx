// Server Component
import { prisma } from "@/prisma/prisma";
import { UserType } from "@/src/_types/sideBarTypes";
import ProfileDialog from "@/src/components/dashboard/profileDialog";

interface ProfileDialogWrapperProps {
	user: UserType;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onProfileUpdate: (updatedUser: Partial<UserType>) => void;
}

export async function ProfileDialogWrapper({
	user,
	open,
	onOpenChange,
	onProfileUpdate,
}: ProfileDialogWrapperProps) {
	// Ensure we have a user ID
	if (!user.id) {
		console.error("User ID is missing");
		return null;
	}

	// Fetch the latest user data from the database
	const userData = await prisma.user.findUnique({
		where: { id: user.id },
		select: {
			id: true,
			username: true,
			firstname: true,
			lastname: true,
			email: true,
			image: true,
			name: true,
		},
	});

	if (!userData) {
		console.error("User not found in database");
		return null;
	}

	// Merge the fetched data with the existing user data
	const enrichedUser: UserType = {
		...user,
		id: userData.id,
		username: userData.username ?? user.username,
		firstname: userData.firstname ?? user.firstname,
		lastname: userData.lastname ?? user.lastname,
		name: userData.name ?? user.name,
		email: userData.email ?? user.email,
		avatar: userData.image ?? user.avatar,
	};

	return (
		<ProfileDialog
			user={enrichedUser}
			open={open}
			onOpenChange={onOpenChange}
			onProfileUpdate={onProfileUpdate}
		/>
	);
}

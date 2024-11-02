import { redirect } from "next/navigation";
import {
	checkIsAuthenticated,
	getSession,
} from "@/src/_actions/checkAuthAction";
import ProfilePage from "@/src/app/auth/profile/profile";
import { SessionType } from "@/src/_types/signInTypes";
import { prisma } from "@/prisma/prisma";

export default async function Profile() {
	const isAuthenticated = await checkIsAuthenticated();
	const sessionObj = (await getSession()) as SessionType;

	if (!isAuthenticated) {
		redirect("/auth/sign-in");
	} else {
		const userData = await prisma.user.findUnique({
			where: { id: sessionObj.user.id },
			select: {
				username: true,
				firstname: true,
				lastname: true,
				// any other fields you need
			},
		});

		// Create updated session object maintaining the SessionType structure
		const updatedSessionObj: SessionType = {
			user: {
				...sessionObj.user,
				username: userData?.username ?? undefined,
				firstname: userData?.firstname ?? undefined,
				lastname: userData?.lastname ?? undefined,
				// any other fields you need
			},
			expires: sessionObj.expires,
		};

		return <ProfilePage {...updatedSessionObj} />;
	}
}

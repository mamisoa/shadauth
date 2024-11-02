import { redirect } from "next/navigation";
import { DashboardPageCN } from "@/src/app/dashboard/dashboard";
import {
	checkIsAuthenticated,
	getSession,
} from "@/src/_actions/checkAuthAction";
import { SessionType } from "@/src/_types/signInTypes";

export default async function Dashboard() {
	const isAuthenticated = await checkIsAuthenticated();
	const sessionObj = (await getSession()) as SessionType;
	if (!isAuthenticated) {
		redirect("/auth/sign-in");
	} else {
		return <DashboardPageCN {...sessionObj} />;
	}
}

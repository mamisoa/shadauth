import { redirect } from "next/navigation";
import { DashboardPage } from "@/src/app/dashboard/dashboard";
import {
  checkIsAuthenticated,
  getSession,
} from "@/src/_actions/checkAuthAction";
import { SessionSchema } from "@/src/_types/signInTypes";


export default async function Dashboard() {
  const isAuthenticated = await checkIsAuthenticated();
  const sessionObj = await getSession() as SessionSchema;
  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <DashboardPage {...sessionObj} />;
  }
}
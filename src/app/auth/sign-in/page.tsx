import { redirect } from "next/navigation"
import SignInPage from "@/src/app/auth/sign-in/signin";
import { checkIsAuthenticated } from "@/src/_actions/checkAuthAction";

export default async function SignIn() {
    // Check if user is authenticated
    const isAuthenticated = await checkIsAuthenticated();

    if (isAuthenticated) {
        redirect('/dashboard')
    } else {
        return(
            <SignInPage/>
        )
    }
    
}
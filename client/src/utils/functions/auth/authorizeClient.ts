import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { user } from "@/lib/types/user";
import { loginWithEmail } from "@/api/auth/emailAuth";
import { deleteCookie, setCookie } from "@/app/action";
import { makeToast } from "../common/makeToast";
import { getUserProfile } from "@/api/auth/userProfile";

export const emailPasswordAuth = async (userInfo: user, router: AppRouterInstance, setAuth: (authState: boolean) => void, setUser: (userData: user | undefined) => void) => {
    const response = await loginWithEmail({
        username: userInfo.username,
        password: userInfo.password,
    });
    
    if (response) {
        await setCookie(response);
        const user = await getUserProfile();
        console.log("authorizeClient func:", user);
        if (user && user.role === "ADMIN") {
            setAuth(true);
            setUser(user);      // set the global user state
            router.push("/");
            makeToast(200, "Login successful");
        } else {
            await deleteCookie()
            makeToast(400, "You are not authorized to access this page");
        }
    }
    return response;
}
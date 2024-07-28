import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { user } from "@/lib/types/user";
import { loginWithEmail } from "@/api/auth/emailAuth";
import { setCookie } from "@/app/action";
import { makeToast } from "../common/makeToast";

export const emailPasswordAuth = async (userInfo: user, router: AppRouterInstance, setAuth: (authState: boolean) => void) => {
    const response = await loginWithEmail({
        username: userInfo.username,
        password: userInfo.password,
    });
    if (response) {
        await setCookie(response);
        setAuth(true);
        router.push("/");
        makeToast(200, "Login successful");
    }
    return response;
}
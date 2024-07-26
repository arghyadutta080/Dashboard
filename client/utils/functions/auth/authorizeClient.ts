import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { user } from "../../../lib/types/user";
import { loginWithEmail } from "@/api/auth/emailAuth";
import { makeToast } from "../common/makeToast";
import { setCookie } from "@/app/action";

export const emailPasswordAuth = async (userInfo: user, router: AppRouterInstance) => {
    const response = await loginWithEmail({
        username: userInfo.username,
        password: userInfo.password,
    });
    if (response) {
        await setCookie(response);
        router.push("/");
        makeToast(response.status, "Login successful");
    }
    return response;
}
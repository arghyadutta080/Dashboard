import { user } from "@/lib/types/user";
import catchErrorFunc from "@/utils/functions/errorResponseLog";
import { LoginAPIinstance } from "../axiosConfig";

export const loginWithEmail = async (userInfo: user) => {
    try {
        const response = await LoginAPIinstance.post(
            'user/login', userInfo
        )
        return response?.data;
    } catch (error: any) {
        return catchErrorFunc(error)
    }
}
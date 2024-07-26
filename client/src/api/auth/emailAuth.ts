import { user } from "../../../lib/types/user";
import catchErrorFunc from "../../../utils/functions/errorResponseLog";
import { APIinstance } from "../axiosConfig";

export const loginWithEmail = async (userInfo: user) => {
    try {
        const response = await APIinstance.post(
            'user/login', userInfo, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
        )
        return response?.data;
    } catch (error: any) {
        return catchErrorFunc(error)
    }
}
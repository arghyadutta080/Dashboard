import { getCookie } from "@/app/action";
import catchErrorFunc from "@/utils/functions/errorResponseLog";
import { APIinstance } from "../axiosConfig"


export const getUserProfile = async () => {
    const token = await getCookie()
    try {
        if (token) {
            const response = await APIinstance.get(
                '/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            )
            // console.log("userProfile func:", response?.data)
            return response?.data;
        }  
    } catch (error) {
        catchErrorFunc(error)
    }
}

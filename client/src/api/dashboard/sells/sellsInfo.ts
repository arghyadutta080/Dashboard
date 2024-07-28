import { getCookie } from "@/app/action"
import { APIinstance } from "../../axiosConfig"
import catchErrorFunc from "@/utils/functions/errorResponseLog"


export const getAllSells = async () => {
    const token = await getCookie()
    try {
        if (token) {
            const response = await APIinstance.get(
                '/sell/all', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            )
            return response?.data;
        }
    } catch (error) {
        return catchErrorFunc(error)
    }
}
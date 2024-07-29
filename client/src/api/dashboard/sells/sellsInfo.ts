import { getCookie } from "@/app/action"
import { APIinstance } from "../../axiosConfig"
import catchErrorFunc from "@/utils/functions/errorResponseLog"


export const getAllSells = async () => {
    const token = await getCookie()
    try {
        if (token) {
            const response = await APIinstance.get(
                '/sell/total-sell', {
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


export const getDateWiseSell = async () => {
    const token = await getCookie()
    try {
        if (token) {
            const response = await APIinstance.get(
                '/sell/date/count', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            )
            console.log(response?.data);
            return response?.data;
        }
    } catch (error) {
        return catchErrorFunc(error)
    }
}


export const getTop5Products = async () => {
    const token = await getCookie()
    try {
        if (token) {
            const response = await APIinstance.get(
                '/sell/top-products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            )
            console.log(response?.data);
            return response?.data;
        }
    } catch (error) {
        return catchErrorFunc(error)
    }
}
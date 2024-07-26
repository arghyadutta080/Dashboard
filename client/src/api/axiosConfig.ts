import axios from "axios";

export const APIinstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
    withCredentials: true
});

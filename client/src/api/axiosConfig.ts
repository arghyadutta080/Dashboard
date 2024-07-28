import axios from "axios";

export const LoginAPIinstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

export const APIinstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_API,
    withCredentials: true,
});

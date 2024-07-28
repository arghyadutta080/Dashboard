'use server'

import { cookies } from 'next/headers'

export const setCookie = async (cookie: any) => {
    const expires = 30 * 60 * 1000
    cookies().set({
        name: 'access_token',
        value: cookie.access_token,
        sameSite: 'strict',
        secure: true,
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + expires)
    })
}

export const getCookie = async () => {
    const cookie = cookies().get('access_token')
    console.log("server action: ", cookie?.value)
    return cookie?.value
}
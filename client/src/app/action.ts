'use server'

import { cookies } from 'next/headers'

export const setCookie = async (cookie: any) => {
    cookies().set({
        name: 'access_token',
        value: cookie.access_token,
        sameSite: 'strict',
        secure: true,
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 1000),
    })
}
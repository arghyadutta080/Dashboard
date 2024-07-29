import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    let cookie = request.cookies.get('access_token')
    const path = request.nextUrl.pathname;

    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);

    if (!cookie && path !== '/sign-in') {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    } 
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
    ],
};
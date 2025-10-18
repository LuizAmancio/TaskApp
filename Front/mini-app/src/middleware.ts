import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if(!token){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try{
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const email = payload.sub; // subject (email)
        const userId = payload.id; // claim "id"

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", String(userId));
        requestHeaders.set("x-user-email", String(email));

        return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// Especifica os paths que o middleware deve proteger
export const config = {
    matcher: ['/tasks/:path*']
};
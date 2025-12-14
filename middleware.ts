import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if user has a session cookie
    const sessionToken = request.cookies.get("better-auth.session_token");

    // If user is on home page and has a session, redirect to dashboard
    if (pathname === "/" && sessionToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*"],
};

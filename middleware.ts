import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for better-auth session cookie
    const hasSessionCookie = request.cookies.has("better-auth.session_token") ||
        request.cookies.has("__Secure-better-auth.session_token");

    if (!hasSessionCookie) {

        if (pathname === "/onboarding" || pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
        return NextResponse.next();
    }

    // Since we can't easily check database in middleware without performance hit or Edge incompatibility,
    // we fetch the session from the API or rely on the fact that Better Auth sets the user info.
    // Optimal way for Next.js 14+ is to call the session API.

    try {
        const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        });
        const session = await response.json();

        if (!session) {
            if (pathname === "/onboarding" || pathname.startsWith("/dashboard")) {
                return NextResponse.redirect(new URL("/sign-in", request.url));
            }
            return NextResponse.next();
        }

        const onboardingDone = session.user.onboardingDone;

        if (!onboardingDone && pathname !== "/onboarding") {
            return NextResponse.redirect(new URL("/onboarding", request.url));
        }

        if (onboardingDone && pathname === "/onboarding") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (pathname === "/" || pathname === "/sign-in") {
            return NextResponse.redirect(new URL(onboardingDone ? "/dashboard" : "/onboarding", request.url));
        }
    } catch (e) {
        console.error("Middleware session check failed", e);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/sign-in", "/dashboard/:path*", "/onboarding"],
};


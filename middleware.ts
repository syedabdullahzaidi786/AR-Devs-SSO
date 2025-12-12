import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // Optional: Add session checking logic here if needed for protecting routes
    // For now, just passing through.
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/auth/:path*"],
};

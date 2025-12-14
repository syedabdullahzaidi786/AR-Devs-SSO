import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    await auth.api.signOut({
        headers: await headers()
    });
    return NextResponse.redirect(new URL("/", process.env.BETTER_AUTH_URL || "http://localhost:3000"));
}

export async function POST() {
    await auth.api.signOut({
        headers: await headers()
    });
    return NextResponse.json({ success: true });
}

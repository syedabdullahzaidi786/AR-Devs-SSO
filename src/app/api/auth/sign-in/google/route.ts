import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
    const res = await auth.api.signInSocial({
        body: {
            provider: "google",
            callbackURL: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/api/auth/callback/google`
        },
        headers: await headers()
    });

    if (res?.url) {
        return redirect(res.url);
    }

    return redirect("/api/auth/error");
}

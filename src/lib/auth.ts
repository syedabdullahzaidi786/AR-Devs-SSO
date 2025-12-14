import { betterAuth } from "better-auth";
import postgres from "postgres";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google Client ID or Secret");
}

if (!process.env.POSTGRES_URL) {
    throw new Error("Missing POSTGRES_URL environment variable");
}

const sql = postgres(process.env.POSTGRES_URL);

export const auth = betterAuth({
    database: sql,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectURI: process.env.NODE_ENV === "production"
                ? "https://ar-devs-sso.vercel.app/api/auth/callback/google"
                : "http://localhost:3000/api/auth/callback/google",
            authorization: {
                params: {
                    prompt: "consent select_account",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        },
    },
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET || "development-fallback-secret-123456789",
    account: {
        // Skip state check in development to avoid localhost cookie issues
        // This is safe for local dev but should NOT be used in production
        accountLinking: {
            enabled: true,
        },
        skipStateCookieCheck: process.env.NODE_ENV !== "production",
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 * 1000, // 5 minutes
        },
    },
    advanced: {
        useSecureCookies: process.env.NODE_ENV === "production",
    },
    trustedOrigins: process.env.NODE_ENV === "production"
        ? [
            "https://ar-devs-sso.vercel.app",
            "https://physical-ai-and-humanoid-robotics-t-peach.vercel.app",
        ]
        : ["http://localhost:3000"],
});

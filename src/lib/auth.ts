import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendWelcomeEmail } from "./email";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET || "development-fallback-secret-123456789",
    hooks: {},


    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await sendWelcomeEmail({
                        email: user.email,
                        name: user.name,
                    });
                },
            },
        },
    },
    user: {
        additionalFields: {
            experienceLevel: { type: "string", required: false },
            accessPlatform: { type: "string", required: false },
            primaryPurpose: { type: "string", required: false },
            onboardingDone: { type: "boolean", defaultValue: false },
        },
    },
    session: {
        cookieCache: {
            enabled: false,
            maxAge: 5 * 60 * 1000,
        },
    },
    advanced: {
        useSecureCookies: process.env.NODE_ENV === "production",
    },
});


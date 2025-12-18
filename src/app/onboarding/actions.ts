"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const onboardingSchema = z.object({
    experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
    accessPlatform: z.enum(["windows", "mac", "linux", "web", "mobile"]),
    primaryPurpose: z.enum(["productivity", "ai", "collaboration", "learning", "explore"]),
});

export async function completeOnboarding(state: any, formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Not authenticated");
    }

    const validatedFields = onboardingSchema.safeParse({
        experienceLevel: formData.get("experienceLevel"),
        accessPlatform: formData.get("accessPlatform"),
        primaryPurpose: formData.get("primaryPurpose"),
    });

    if (!validatedFields.success) {
        return {
            error: "Invalid input. Please fill all fields.",
        };
    }

    const { experienceLevel, accessPlatform, primaryPurpose } = validatedFields.data;

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            experienceLevel,
            accessPlatform,
            primaryPurpose,
            onboardingDone: true,
        },
    });

    redirect("/dashboard");
}

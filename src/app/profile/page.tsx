"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/");
        }
    }, [isPending, session, router]);

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!session) return null;

    // @ts-ignore - Extended fields are not recognized by default session type but exist in DB
    const user = session.user as any;

    const ProfileItem = ({ label, value, icon }: { label: string; value: string | undefined; icon: React.ReactNode }) => (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 transition-all hover:bg-white/10">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                {icon}
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{label}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{value || "Not Set"}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
            <div className="w-full max-w-2xl animate-fade-in-up">
                {/* Header Navigation */}
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-500 transition-colors group"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>

                <div className="glass-card rounded-[2.5rem] overflow-hidden">
                    {/* Top Profile Banner */}
                    <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600">
                        <div className="absolute -bottom-12 left-8">
                            <div className="relative h-24 w-24 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-900 shadow-xl bg-white dark:bg-zinc-800">
                                {user.image ? (
                                    <Image src={user.image} alt={user.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-blue-100 text-blue-600">
                                        {user.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-10 px-8">
                        {/* Name and Email */}
                        <div className="mb-10">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{user.name}</h1>
                            <p className="text-blue-500 font-medium">{user.email}</p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ProfileItem
                                label="Experience Level"
                                value={user.experienceLevel}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            />
                            <ProfileItem
                                label="Platform"
                                value={user.accessPlatform}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                            />
                            <ProfileItem
                                label="Primary Purpose"
                                value={user.primaryPurpose}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                            />
                            <ProfileItem
                                label="Onboarding"
                                value={user.onboardingDone ? "Completed" : "Pending"}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

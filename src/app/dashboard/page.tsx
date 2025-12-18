"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Dashboard() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);

    const handleSignOut = async () => {
        setShowLogoutConfirm(true);
    };

    const confirmSignOut = async () => {
        try {
            setShowLogoutConfirm(false);
            setShowLogoutSuccess(true);

            // Artificial delay to show success popup (matches onboarding)
            const timer = setTimeout(async () => {
                await signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            window.location.href = "/";
                        },
                    },
                });
            }, 2000);

            return () => clearTimeout(timer);
        } catch (error) {
            console.error("Sign out error:", error);
            setShowLogoutSuccess(false);
            setShowLogoutConfirm(false);
        }
    };

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/");
        }
    }, [isPending, session, router]);

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-300 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
            {/* Background Effects: Grid Pattern (Matching Login) */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 [background:radial-gradient(#e5e7eb_1px,transparent_1px)] dark:[background:radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            {/* Ambient Glow */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none dark:bg-blue-600/20"></div>

            <div className="w-full max-w-lg space-y-8 relative z-10 animate-fade-in-up">

                {/* Logo & Header */}
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="relative h-16 w-16 mb-4 drop-shadow-xl">
                        <Image
                            src="/logo.webp"
                            alt="AR Devs Logo"
                            width={64}
                            height={64}
                            className="object-contain filter dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            priority
                        />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
                        Secure Single Sign-On
                    </p>
                    {/* Active Indicator */}
                    <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-semibold text-green-700 dark:text-green-400 tracking-wide">AUTHENTICATED</span>
                    </div>
                </div>

                {/* Main Card */}
                <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/60 px-8 py-10 shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10 rounded-3xl transition-all duration-300">

                    <div className="mb-8 text-center sm:text-left">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Welcome back, {session.user.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 font-medium">
                            {session.user.email}
                        </p>
                    </div>

                    {/* Secure Session Info Box */}
                    <div className="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 flex items-start gap-4">
                        <div className="mt-1 p-2 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Secure Session Active</h4>
                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 leading-relaxed">
                                Your identity is verified and protected by AR Developers. Access your connected applications securely.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <button
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 active:scale-[0.98]"
                            onClick={() => window.location.href = 'https://physical-ai-and-humanoid-robotics-t-peach.vercel.app'} // Example redirect
                        >
                            Connect to DApp
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>

                        <button
                            className="w-full rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-4 py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-slate-700"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-xs text-gray-400 dark:text-slate-600 transition-colors">
                        Powered by AR Developers
                    </div>

                </div>
            </div>

            {/* Logout Confirmation Popup */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95 slide-in-from-bottom-5 duration-500">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign Out?</h2>
                        <p className="text-gray-600 dark:text-zinc-400 mb-8">Are you sure you want to log out of your secure session?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-semibold hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmSignOut}
                                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Logout Success Popup */}
            {showLogoutSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95 slide-in-from-bottom-5 duration-500">
                        <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Signed Out!</h2>
                        <p className="text-gray-600 dark:text-zinc-400 mb-6">You have been securely logged out. Redirecting...</p>
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 animate-progress origin-left"></div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes progress {
                    0% { transform: scaleX(0); }
                    100% { transform: scaleX(1); }
                }
                .animate-progress {
                    animation: progress 2s linear forwards;
                }
            `}</style>
        </div>
    );
}

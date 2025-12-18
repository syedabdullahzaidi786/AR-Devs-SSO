"use client";

import { useActionState, useEffect, useState } from "react";
import { completeOnboarding } from "./actions";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const [state, formAction, isPending] = useActionState(completeOnboarding, null);
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            setShowSuccess(true);
            // Refresh and Redirect after 2 seconds
            const timer = setTimeout(() => {
                // Using window.location.href to force a full reload and clear any client-side cache
                window.location.href = "/dashboard";
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
            <div className="w-full max-w-md glass-card rounded-3xl p-8 transition-all duration-500 hover:shadow-blue-900/10">
                <div className="space-y-2 mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">Welcome!</h1>
                    <p className="text-zinc-400 font-medium">Let's personalize your experience.</p>
                </div>

                <form action={formAction} className="space-y-6">
                    {state?.error && (
                        <div className="p-4 bg-red-950/30 border border-red-500/50 rounded-2xl text-red-400 text-sm animate-shake">
                            {state.error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Experience Level</label>
                            <select
                                name="experienceLevel"
                                required
                                className="block w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none transition-all hover:bg-zinc-800"
                            >
                                <option value="">Select Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Access Platform</label>
                            <select
                                name="accessPlatform"
                                required
                                className="block w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none transition-all hover:bg-zinc-800"
                            >
                                <option value="">Select Platform</option>
                                <option value="windows">Windows</option>
                                <option value="mac">macOS</option>
                                <option value="linux">Linux</option>
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Primary Purpose</label>
                            <select
                                name="primaryPurpose"
                                required
                                className="block w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none transition-all hover:bg-zinc-800"
                            >
                                <option value="">Select Purpose</option>
                                <option value="productivity">Productivity</option>
                                <option value="ai">AI</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="learning">Learning</option>
                                <option value="explore">Explore</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending || showSuccess}
                        className="group relative w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/20 active:scale-95 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isPending ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                "Complete Onboarding"
                            )}
                        </span>
                    </button>
                </form>
            </div>

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95 slide-in-from-bottom-5 duration-500">
                        <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
                        <p className="text-zinc-400 mb-6">Your profile is ready. Taking you to the dashboard...</p>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
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
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.2s ease-in-out 0s 2;
                }
            `}</style>
        </div>
    );
}

"use client";

import { useActionState } from "react";
import { completeOnboarding } from "./actions";

export default function OnboardingPage() {
    const [state, formAction] = useActionState(completeOnboarding, null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-2 mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Welcome!</h1>
                    <p className="text-zinc-400">Let's personalize your experience.</p>
                </div>

                <form action={formAction} className="space-y-6">
                    {state?.error && (
                        <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                            {state.error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Experience Level</span>
                            <select
                                name="experienceLevel"
                                required
                                className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-lg text-white p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            >
                                <option value="">Select Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Access Platform</span>
                            <select
                                name="accessPlatform"
                                required
                                className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-lg text-white p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            >
                                <option value="">Select Platform</option>
                                <option value="windows">Windows</option>
                                <option value="mac">macOS</option>
                                <option value="linux">Linux</option>
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-zinc-300">Primary Purpose</span>
                            <select
                                name="primaryPurpose"
                                required
                                className="mt-1 block w-full bg-zinc-800 border-zinc-700 rounded-lg text-white p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            >
                                <option value="">Select Purpose</option>
                                <option value="productivity">Productivity</option>
                                <option value="ai">AI</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="learning">Learning</option>
                                <option value="explore">Explore</option>
                            </select>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
                    >
                        Complete Onboarding
                    </button>
                </form>
            </div>
        </div>
    );
}

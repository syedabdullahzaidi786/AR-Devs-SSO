import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-300 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
            {/* Background Effects: Grid Pattern */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 [background:radial-gradient(#e5e7eb_1px,transparent_1px)] dark:[background:radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            {/* Ambient Glow in Dark Mode */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none dark:bg-blue-600/20"></div>

            <div className="w-full max-w-md space-y-8 relative z-10 animate-fade-in-up">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="relative h-20 w-20 mb-6 drop-shadow-xl transition-transform hover:scale-105 duration-300">
                        {/* Logo */}
                        <Image
                            src="/logo.webp"
                            alt="AR Devs Logo"
                            width={80}
                            height={80}
                            className="object-contain filter dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            priority
                        />
                    </div>

                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium tracking-wide">
                        Secure Single Sign-On
                    </p>
                    {/* Animated Blue dot */}
                    <div className="mt-4 h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse ring-4 ring-blue-600/20 dark:ring-blue-400/20"></div>
                </div>

                {/* Card */}
                <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/60 px-8 py-10 shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10 rounded-3xl transition-all duration-300 hover:shadow-blue-500/5 dark:hover:shadow-blue-900/20">
                    <div className="mb-8 text-center sm:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome back</h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 font-medium">Log in to your account</p>
                    </div>

                    <div className="space-y-6">
                        {/* Google Sign In Button */}
                        <a
                            href="/api/auth/sign-in/google"
                            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 active:scale-[0.98]"
                        >
                            <div className="bg-white rounded-full p-0.5 shadow-sm transition-transform group-hover:rotate-12 duration-300">
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                            </div>
                            <span className="tracking-wide">Sign in with Google</span>
                        </a>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100 dark:border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase">
                                <span className="bg-white/50 dark:bg-slate-900 px-2 text-gray-400 dark:text-slate-500 font-bold tracking-widest backdrop-blur-sm">Secured by Better Auth</span>
                            </div>
                        </div>

                        {/* Footer Text */}
                        <div className="text-center text-xs text-gray-400 dark:text-slate-600 transition-colors">
                            &copy; 2025 AR Developers
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

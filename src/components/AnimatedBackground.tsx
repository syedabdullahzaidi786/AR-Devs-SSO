"use client";

import React from "react";

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-gray-50 dark:bg-slate-950 transition-colors duration-700">
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-indigo-500/5 dark:from-blue-900/10 dark:to-indigo-900/10"></div>

            {/* Animated Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[80px] animate-blob"></div>
            <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[80px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-blue-500/10 dark:bg-blue-800/5 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 [background:radial-gradient(#e5e7eb_1px,transparent_1px)] dark:[background:radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        </div>
    );
}

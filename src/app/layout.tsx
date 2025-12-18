import type { Metadata } from "next";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
    title: "AR Dev SSO",
    description: "AR Dev Authentication Service",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased relative min-h-screen">
                <AnimatedBackground />
                {children}
            </body>
        </html>
    );
}

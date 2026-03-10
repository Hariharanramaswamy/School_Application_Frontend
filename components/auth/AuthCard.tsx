"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface AuthCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-surface-light dark:bg-navy-900 transition-colors relative">
            {/* Background gradient */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-[15%] left-[15%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.06] blur-[100px]" />
                <div className="absolute bottom-[25%] right-[20%] w-[300px] h-[300px] rounded-full bg-blue-400/[0.04] blur-[80px]" />
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 glass-header border-b border-gray-100 dark:border-navy-800">
                <div className="flex items-center gap-3">
                    <Image
                        src="/school-logo.svg"
                        alt="AMJS Logo"
                        width={38}
                        height={38}
                        className="object-contain"
                    />
                    <div>
                        <div className="font-display text-sm font-bold text-navy-900 dark:text-gray-100 leading-tight">
                            Agurchand Manmull Jain School
                        </div>
                        <div className="text-[0.55rem] text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            (A Unit of Sri S.S. Jain Educational Society)
                        </div>
                    </div>
                </div>
                <ThemeToggle />
            </header>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="w-full max-w-[436px] bg-white dark:bg-surface-card-dark rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-navy-700 mt-20"
            >
                <h1 className="font-display text-2xl font-bold text-navy-900 dark:text-white text-center mb-1">
                    {title}
                </h1>
                <p className="text-center text-sm text-gray-400 dark:text-gray-500 mb-7">
                    {subtitle}
                </p>
                {children}
            </motion.div>

            {/* Back to Home */}
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 mt-6 text-sm text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-blue-500/[0.05]"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>
        </div>
    );
}

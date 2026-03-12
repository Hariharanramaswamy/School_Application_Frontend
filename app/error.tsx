"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Page error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-surface-light dark:bg-navy-900 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
                </svg>
            </div>
            <h1 className="font-display text-3xl font-bold text-navy-900 dark:text-white mb-2">
                Oops! Something went wrong
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                We encountered an unexpected error. Please try again or go back to the homepage.
            </p>
            <div className="flex items-center gap-3">
                <Button onClick={reset}>Try Again</Button>
                <Link href="/">
                    <Button variant="secondary">Go Home</Button>
                </Link>
            </div>
        </div>
    );
}

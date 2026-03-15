"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoggedIn, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && isLoggedIn) {
            router.replace("/");
        }
    }, [isLoggedIn, loading, router]);

    // While checking auth, or if logged in (about to redirect), show nothing
    if (loading || isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-navy-900">
                <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}

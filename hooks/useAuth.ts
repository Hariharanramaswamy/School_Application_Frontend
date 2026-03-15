"use client";

import { useState, useEffect, useCallback } from "react";

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const token = localStorage.getItem("jwt-token");
            const email = localStorage.getItem("user-email");
            if (token) {
                setIsLoggedIn(true);
                setUserEmail(email);
            }
        } catch {
            /* private browsing */
        }
        setLoading(false);
    }, []);

    const logout = useCallback(() => {
        try {
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("user-email");
        } catch {
            /* private browsing */
        }
        setIsLoggedIn(false);
        setUserEmail(null);
    }, []);

    return { isLoggedIn, userEmail, loading, logout };
}

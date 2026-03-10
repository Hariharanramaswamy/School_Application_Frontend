"use client";

import { useState, useEffect, useCallback } from "react";

export function useTheme() {
    const [theme, setThemeState] = useState<"light" | "dark">("light");

    useEffect(() => {
        try {
            const saved = localStorage.getItem("amjs-theme");
            if (saved === "dark" || saved === "light") {
                setThemeState(saved);
                document.documentElement.classList.toggle("dark", saved === "dark");
            }
        } catch {
            /* private mode */
        }
    }, []);

    const setTheme = useCallback((t: "light" | "dark") => {
        setThemeState(t);
        document.documentElement.classList.toggle("dark", t === "dark");
        try {
            localStorage.setItem("amjs-theme", t);
        } catch {
            /* private mode */
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === "dark" ? "light" : "dark");
    }, [theme, setTheme]);

    return { theme, toggleTheme };
}

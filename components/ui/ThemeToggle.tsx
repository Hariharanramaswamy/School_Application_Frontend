"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full border-[1.5px] border-gray-200 dark:border-navy-700 bg-surface-light dark:bg-navy-800 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:rotate-[20deg] hover:shadow-lg hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex-shrink-0 overflow-hidden"
            aria-label="Toggle theme"
        >
            <Sun
                className={`absolute h-[18px] w-[18px] text-blue-500 transition-all duration-300 ${theme === "dark"
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-50"
                    }`}
            />
            <Moon
                className={`absolute h-[18px] w-[18px] text-blue-500 transition-all duration-300 ${theme === "light"
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 rotate-90 scale-50"
                    }`}
            />
        </button>
    );
}

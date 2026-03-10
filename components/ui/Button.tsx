"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const base =
        "relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

    const variants = {
        primary:
            "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 dark:shadow-blue-400/20 dark:hover:shadow-blue-400/30",
        secondary:
            "bg-transparent text-blue-500 border-[1.5px] border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400",
        ghost:
            "bg-transparent text-blue-500 hover:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-400/10",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-[0.95rem] tracking-wide",
        lg: "px-8 py-3.5 text-base tracking-wide",
    };

    return (
        <button
            className={cn(
                base,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {children}
        </button>
    );
}

"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    error?: string;
    register?: UseFormRegisterReturn;
}

export default function Input({
    label,
    id,
    type = "text",
    error,
    register,
    className,
    ...rest
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-semibold text-navy-900 dark:text-gray-200 mb-1.5"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    type={inputType}
                    className={cn(
                        "w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-navy-800 border-[1.5px] border-gray-200 dark:border-navy-700 text-navy-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200 outline-none",
                        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-navy-800",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        isPassword && "pr-12",
                        className
                    )}
                    {...register}
                    {...rest}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 rounded-md transition-colors"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? (
                            <EyeOff className="h-[18px] w-[18px]" />
                        ) : (
                            <Eye className="h-[18px] w-[18px]" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                    {error}
                </p>
            )}
        </div>
    );
}

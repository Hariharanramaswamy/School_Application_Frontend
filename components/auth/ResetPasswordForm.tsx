"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authApi } from "@/lib/api";

interface ResetFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function ResetPasswordForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetFormData>();

    const password = watch("password");

    const onSubmit = async (data: ResetFormData) => {
        setLoading(true);
        setMessage(null);
        try {
            await authApi.resetPassword({ email: data.email, password: data.password });
            setMessage({ type: "success", text: "Password reset successfully! Redirecting to login..." });
            setTimeout(() => router.push("/login"), 2000);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Password reset failed. Please try again.";
            setMessage({ type: "error", text: msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {message && (
                <div
                    className={`mb-5 p-3 rounded-xl text-sm font-medium flex items-center gap-2 ${message.type === "error"
                            ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                            : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input
                    label="Email Address"
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    error={errors.email?.message}
                    register={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    })}
                />
                <Input
                    label="New Password"
                    id="reset-password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    error={errors.password?.message}
                    register={register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                />
                <Input
                    label="Confirm New Password"
                    id="reset-confirm"
                    type="password"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    error={errors.confirmPassword?.message}
                    register={register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (val) => val === password || "Passwords do not match",
                    })}
                />

                <Button type="submit" loading={loading} fullWidth className="mt-2">
                    Reset Password
                </Button>
            </form>

            <div className="text-center mt-5 text-sm text-gray-400">
                <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                    ← Back to Login
                </Link>
            </div>
        </>
    );
}


"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authApi } from "@/lib/api";
import type { RegisterFormData } from "@/types";

export default function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const password = watch("password");

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        setMessage(null);
        try {
            await authApi.register({ email: data.email, password: data.password });
            setMessage({ type: "success", text: "Account created successfully! Redirecting to login..." });
            setTimeout(() => router.push("/login"), 2000);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
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
                    id="reg-email"
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
                    label="Password"
                    id="reg-password"
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
                    label="Confirm Password"
                    id="reg-confirm"
                    type="password"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    error={errors.confirmPassword?.message}
                    register={register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (val) => val === password || "Passwords do not match",
                    })}
                />

                {/* Robot Checkbox */}
                <div className="mb-5">
                    <div
                        className={`flex items-center justify-between bg-surface-light dark:bg-navy-800 border-[1.5px] rounded-xl px-4 py-3.5 transition-all ${errors.robot
                            ? "border-red-500"
                            : "border-gray-200 dark:border-navy-700 hover:border-blue-400"
                            }`}
                    >
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <div className="relative flex-shrink-0 w-6 h-6">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    {...register("robot", { required: "Please verify that you are not a robot" })}
                                />
                                <span className="absolute inset-0 rounded-md border-[1.5px] border-gray-300 dark:border-gray-600 transition-all peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-500/30 bg-white dark:bg-navy-800" />
                                <svg
                                    className="absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-navy-900 dark:text-gray-200">
                                I&apos;m not a robot
                            </span>
                        </label>
                        <Shield className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                    </div>
                    {errors.robot && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">{errors.robot.message}</p>
                    )}
                </div>

                <Button type="submit" loading={loading} fullWidth>
                    Register Account
                </Button>
            </form>

            <div className="text-center mt-5 text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                    Login
                </Link>
            </div>
        </>
    );
}

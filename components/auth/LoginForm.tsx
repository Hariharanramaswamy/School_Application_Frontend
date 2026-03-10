"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { authApi } from "@/lib/api";

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setMessage(null);
        try {
            const res = await authApi.login({ email: data.email, password: data.password });
            const token = res.data;
            try {
                localStorage.setItem("jwt-token", token);
                localStorage.setItem("user-email", data.email);
            } catch { /* private mode */ }
            setMessage({ type: "success", text: "Login successful! Redirecting..." });
            setTimeout(() => router.push("/"), 1500);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Invalid email or password.";
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
                    id="login-email"
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
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    error={errors.password?.message}
                    register={register("password", {
                        required: "Password is required",
                    })}
                />

                <Button type="submit" loading={loading} fullWidth className="mt-2">
                    Login
                </Button>
            </form>

            <div className="text-center mt-5 text-sm text-gray-400">
                <Link href="/reset-password" className="text-blue-500 hover:text-blue-600 font-medium">
                    Forgot Password?
                </Link>
            </div>
            <div className="text-center mt-2 text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-blue-500 hover:text-blue-600 font-medium">
                    Register
                </Link>
            </div>
        </>
    );
}

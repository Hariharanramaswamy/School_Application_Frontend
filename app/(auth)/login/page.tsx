import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
    title: "Login — AMJS Portal",
    description: "Login to the Agurchand Manmull Jain School admissions portal.",
};

export default function LoginPage() {
    return (
        <AuthCard title="Welcome Back" subtitle="Login to your AMJS portal account">
            <LoginForm />
        </AuthCard>
    );
}

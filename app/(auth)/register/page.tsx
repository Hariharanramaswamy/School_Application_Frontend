import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
    title: "Register — AMJS Portal",
    description: "Create an account for the Agurchand Manmull Jain School admissions portal.",
};

export default function RegisterPage() {
    return (
        <AuthCard title="Create Account" subtitle="Register for the AMJS admissions portal">
            <RegisterForm />
        </AuthCard>
    );
}

import type { Metadata } from "next";
import AuthCard from "@/components/auth/AuthCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
    title: "Reset Password — AMJS Portal",
    description: "Reset your password for the AMJS admissions portal.",
};

export default function ResetPasswordPage() {
    return (
        <AuthCard title="Reset Password" subtitle="Enter your new password below">
            <ResetPasswordForm />
        </AuthCard>
    );
}

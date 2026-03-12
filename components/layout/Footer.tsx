"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Timeline", href: "#timeline" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
];

const admissionLinks = [
    { label: "Apply Now", href: "/register" },
    { label: "Login", href: "/login" },
];

const socialLinks: { icon: typeof Facebook; label: string; href: string }[] = [
    // Add real social media URLs here when available
    // { icon: Facebook, label: "Facebook", href: "https://facebook.com/amjs" },
    // { icon: Twitter, label: "Twitter", href: "https://twitter.com/amjs" },
    // { icon: Instagram, label: "Instagram", href: "https://instagram.com/amjs" },
    // { icon: Youtube, label: "YouTube", href: "https://youtube.com/amjs" },
];

export default function Footer() {
    return (
        <footer className="bg-navy-950 text-white/70 pt-16 transition-colors">
            <div className="max-w-[1320px] mx-auto px-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/[0.08]">
                    {/* Brand */}
                    <div>
                        <Image
                            src="/school-logo.svg"
                            alt="AMJS Logo"
                            width={52}
                            height={52}
                            className="mb-4 brightness-0 invert opacity-85"
                        />
                        <h3 className="font-display text-lg text-white mb-2">
                            Agurchand Manmull Jain School
                        </h3>
                        <p className="text-sm leading-7 text-white/50 max-w-[280px]">
                            Nurturing minds, building futures. A unit of Sri S.S. Jain Educational Society.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
                            Quick Links
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-white/50 hover:text-blue-400 hover:pl-1 transition-all duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Admissions */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
                            Admissions
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {admissionLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/50 hover:text-blue-400 hover:pl-1 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
                            Follow Us
                        </h4>
                        <div className="flex gap-2.5 flex-wrap">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/60 transition-all duration-300 hover:bg-blue-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 hover:border-transparent"
                                >
                                    <s.icon className="h-[18px] w-[18px]" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="py-5 text-center text-xs text-white/30">
                    &copy; {new Date().getFullYear()} Agurchand Manmull Jain School. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

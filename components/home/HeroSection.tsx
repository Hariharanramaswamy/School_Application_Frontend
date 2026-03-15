"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { useAuth } from "@/hooks/useAuth";

export default function HeroSection() {
    const { isLoggedIn } = useAuth();

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden pt-[72px] bg-gradient-to-br from-surface-light via-blue-50 to-blue-100/60 dark:from-navy-900 dark:via-navy-900 dark:to-navy-800 transition-colors duration-500"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[18%] left-[15%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.08] blur-[100px] dark:bg-blue-400/[0.06]" />
                <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-400/[0.06] blur-[80px] dark:bg-blue-300/[0.04]" />
                <div className="absolute top-[60%] left-[60%] w-[200px] h-[200px] rounded-full bg-gold-400/[0.05] blur-[60px]" />
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[20%] w-3 h-3 rounded-full bg-blue-500/20 animate-float" />
                <div className="absolute top-[40%] left-[8%] w-2 h-2 rounded-full bg-gold-400/30 animate-float" style={{ animationDelay: "1s" }} />
                <div className="absolute bottom-[30%] right-[35%] w-4 h-4 rounded-full bg-blue-400/15 animate-float" style={{ animationDelay: "2s" }} />
                <div className="absolute top-[70%] left-[45%] w-2.5 h-2.5 rounded-full bg-blue-300/20 animate-float" style={{ animationDelay: "3s" }} />
            </div>

            <div className="relative z-10 max-w-[1320px] mx-auto px-5 py-12 flex flex-col lg:flex-row items-center justify-between w-full gap-12">
                {/* Left Content */}
                <div className="max-w-[580px] text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-6 backdrop-blur-sm animate-pulse-glow"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Applications Open 2026–2027
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Image
                            src="/school-logo.svg"
                            alt="AMJS Logo"
                            width={84}
                            height={84}
                            className="mb-5 animate-float drop-shadow-lg mx-auto lg:mx-0"
                        />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-navy-900 dark:text-white leading-[1.05] mb-4 tracking-tight"
                    >
                        Application
                        <span className="block shimmer-text">Open</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-[460px] leading-relaxed mx-auto lg:mx-0"
                    >
                        Admissions Open for Academic Year 2026–2027. Begin your child&apos;s journey to excellence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Link href={isLoggedIn ? "/admission" : "/register"}>
                            <Button size="lg" className="group">
                                {isLoggedIn ? "Apply Now" : "Register Now"}
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Right: Timer */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex-shrink-0"
                >
                    <CountdownTimer />
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Building2, Users, Star } from "lucide-react";

const features = [
    { icon: Trophy, title: "Excellence in Education", desc: "Proven track record of outstanding academic results." },
    { icon: Building2, title: "Modern Infrastructure", desc: "State-of-the-art labs and smart classrooms." },
    { icon: Users, title: "Experienced Faculty", desc: "Dedicated teachers with decades of experience." },
    { icon: Star, title: "Holistic Development", desc: "Focus on academics, sports, and creative arts." },
];

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-white dark:bg-navy-900 transition-colors">
            <div className="max-w-[1320px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Image / Decorative */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-700 to-navy-800 dark:from-navy-800 dark:to-navy-950 p-12 flex items-center justify-center aspect-[4/3] shadow-2xl">
                        <Image
                            src="/school-logo.svg"
                            alt="AMJS Logo"
                            width={160}
                            height={160}
                            className="opacity-90 drop-shadow-2xl"
                        />
                        <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-blue-500/10" />
                        <div className="absolute bottom-8 left-8 w-14 h-14 rounded-full bg-gold-400/10" />
                    </div>
                    {/* Offset border decoration */}
                    <div className="absolute -bottom-4 -right-4 w-[55%] h-[55%] border-[3px] border-blue-500/25 rounded-3xl -z-10" />
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xs font-bold uppercase tracking-[3px] text-blue-500 mb-3">
                        About Us
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 dark:text-white leading-tight mb-4">
                        About <span className="text-blue-500">Our School</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                        Agurchand Manmull Jain School, established under the Sri S.S. Jain Educational Society, is dedicated to academic excellence and holistic student development. The school provides modern infrastructure, innovative learning environments, and a strong academic foundation.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="group bg-surface-light dark:bg-navy-800 p-5 rounded-xl border-l-4 border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 mb-3">
                                    <f.icon className="h-5 w-5" />
                                </div>
                                <h4 className="text-sm font-bold text-navy-900 dark:text-white mb-1">
                                    {f.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

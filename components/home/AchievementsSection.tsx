"use client";

import { motion } from "framer-motion";
import { GraduationCap, Medal, Lightbulb } from "lucide-react";

const achievements = [
    {
        icon: GraduationCap,
        title: "Academic Excellence",
        year: "2024",
        desc: "Ranked among top 10 CBSE schools in Tamil Nadu with 98% distinction rate.",
    },
    {
        icon: Medal,
        title: "Sports Championship",
        year: "2023",
        desc: "State-level champions in athletics and basketball tournaments.",
    },
    {
        icon: Lightbulb,
        title: "Innovation Award",
        year: "2024",
        desc: "Recognized for STEM education and emerging robotics programs.",
    },
];

export default function AchievementsSection() {
    return (
        <section id="achievements" className="py-24 bg-white dark:bg-navy-900 transition-colors">
            <div className="max-w-[1320px] mx-auto px-5">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-display text-4xl md:text-5xl font-bold text-center text-navy-900 dark:text-white mb-14"
                >
                    Our <span className="text-blue-500">Achievements</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
                    {achievements.map((a, i) => (
                        <motion.div
                            key={a.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className="group bg-white dark:bg-surface-card-dark rounded-3xl overflow-hidden border border-gray-100 dark:border-navy-700 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-[400ms]"
                        >
                            {/* Top gradient with icon */}
                            <div className="relative bg-gradient-to-br from-navy-700 to-navy-800 dark:from-navy-800 dark:to-navy-950 px-8 py-10 flex items-center justify-center overflow-hidden">
                                <div className="absolute -top-8 -right-6 w-28 h-28 rounded-full bg-white/[0.05]" />
                                <div className="absolute -bottom-6 -left-4 w-20 h-20 rounded-full bg-white/[0.03]" />
                                <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white transition-transform duration-[400ms] group-hover:scale-110 group-hover:rotate-3">
                                    <a.icon className="h-9 w-9" />
                                </div>
                            </div>

                            {/* Bottom content */}
                            <div className="p-6">
                                <span className="inline-block bg-blue-500/10 text-blue-500 text-[0.7rem] font-bold tracking-wider px-3 py-0.5 rounded-full border border-blue-500/15 mb-3">
                                    {a.year}
                                </span>
                                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">
                                    {a.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {a.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";

const items = [
    { year: "2024 — December", title: "Application Portal Opens", desc: "Online applications begin for AY 2026-27." },
    { year: "2025 — January", title: "Document Submission", desc: "Upload required documents and certificates." },
    { year: "2025 — February", title: "Entrance Assessment", desc: "Written test and interaction for shortlisted candidates." },
    { year: "2025 — March", title: "Results Announcement", desc: "Selected candidates notified via email and portal." },
    { year: "2026 — March 31", title: "Final Deadline", desc: "Last date to complete admission formalities." },
];

export default function TimelineSection() {
    return (
        <section id="timeline" className="py-24 bg-surface-light dark:bg-navy-800/40 transition-colors">
            <div className="max-w-[860px] mx-auto px-5">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-display text-4xl md:text-5xl font-bold text-center text-navy-900 dark:text-white mb-14"
                >
                    Our <span className="text-blue-500">Journey</span>
                </motion.h2>

                <div className="relative pl-10 md:pl-0">
                    {/* Vertical line - left on mobile, center on desktop */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-blue-500 via-blue-400 to-navy-700 opacity-60" />

                    {items.map((item, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`relative mb-8 md:mb-10 md:flex md:items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Dot */}
                                <div className="absolute left-4 md:left-1/2 top-6 w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-blue-500 border-[3px] border-surface-light dark:border-navy-800 shadow-[0_0_0_3px_#1E88E5,0_0_12px_rgba(30,136,229,0.4)] z-10 transition-all" />

                                {/* Card */}
                                <div className={`md:w-[calc(50%-28px)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                                    <div className="bg-white dark:bg-surface-card-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-navy-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                        <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[0.7rem] font-bold tracking-wider px-3 py-1 rounded-full mb-3 shadow-sm shadow-blue-500/25">
                                            {item.year}
                                        </span>
                                        <h3 className="text-base font-bold text-navy-900 dark:text-white mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

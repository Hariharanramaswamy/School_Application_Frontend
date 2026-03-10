"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { ContactFormData } from "@/types";

const infoCards = [
    {
        icon: MapPin,
        title: "Address",
        value: "Agurchand Manmull Jain School,\nChennai, Tamil Nadu, India",
    },
    { icon: Phone, title: "Phone", value: "+91 44 2345 6789" },
    {
        icon: Mail,
        title: "Email",
        value: "admissions@amjs.edu.in",
        href: "mailto:admissions@amjs.edu.in",
    },
];

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>();

    const onSubmit = (data: ContactFormData) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            reset();
            setTimeout(() => setSubmitted(false), 4000);
        }, 1200);
        void data; // used for simulation
    };

    return (
        <section id="contact" className="py-24 bg-surface-light dark:bg-navy-800/40 transition-colors">
            <div className="max-w-[1320px] mx-auto px-5">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-display text-4xl md:text-5xl font-bold text-center text-navy-900 dark:text-white mb-14"
                >
                    Get In <span className="text-blue-500">Touch</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
                    {/* Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-4"
                    >
                        {infoCards.map((c) => (
                            <div
                                key={c.title}
                                className="flex items-start gap-4 p-5 bg-white dark:bg-surface-card-dark rounded-xl border border-gray-100 dark:border-navy-700 shadow-sm transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                            >
                                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-blue-500/25">
                                    <c.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-navy-900 dark:text-white mb-0.5">
                                        {c.title}
                                    </h4>
                                    {c.href ? (
                                        <a
                                            href={c.href}
                                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                                        >
                                            {c.value}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                                            {c.value}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            className="bg-white dark:bg-surface-card-dark rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-navy-700"
                        >
                            <Input
                                label="Full Name"
                                id="contact-name"
                                placeholder="Enter your full name"
                                autoComplete="name"
                                error={errors.name?.message}
                                register={register("name", { required: "Name is required" })}
                            />
                            <Input
                                label="Email Address"
                                id="contact-email"
                                type="email"
                                placeholder="Enter your email"
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
                            <div className="mb-4">
                                <label
                                    htmlFor="contact-message"
                                    className="block text-sm font-semibold text-navy-900 dark:text-gray-200 mb-1.5"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-navy-800 border-[1.5px] border-gray-200 dark:border-navy-700 text-navy-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-navy-800 resize-vertical min-h-[120px]"
                                    {...register("message", { required: "Message is required" })}
                                />
                                {errors.message && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            {submitted && (
                                <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-medium">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            <Button type="submit" loading={loading} className="group">
                                <span>Send Message</span>
                                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

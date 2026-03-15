"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Timeline", href: "#timeline" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { isLoggedIn, userEmail, loading: authLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);

            const sections = navLinks.map((l) => l.href.slice(1));
            const y = window.scrollY + 120;
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
                    setActiveSection(id);
                    break;
                }
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeNav = useCallback(() => {
        setMobileOpen(false);
        document.body.style.overflow = "";
    }, []);

    const toggleNav = useCallback(() => {
        setMobileOpen((prev) => {
            document.body.style.overflow = prev ? "" : "hidden";
            return !prev;
        });
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            closeNav();
            const target = document.querySelector(href);
            if (target) {
                const headerH = 72;
                window.scrollTo({
                    top: (target as HTMLElement).offsetTop - headerH,
                    behavior: "smooth",
                });
            }
        },
        [closeNav]
    );

    const handleLogout = useCallback(() => {
        logout();
        closeNav();
        router.push("/");
        router.refresh();
    }, [logout, closeNav, router]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
                    scrolled
                        ? "glass-header shadow-lg border-transparent"
                        : "glass-header border-gray-100 dark:border-navy-800"
                )}
            >
                <div className="max-w-[1320px] mx-auto px-5 flex items-center h-[72px] gap-4">
                    {/* Logo */}
                    <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex-shrink-0 group">
                        <Image
                            src="/school-logo.svg"
                            alt="AMJS Logo"
                            width={46}
                            height={46}
                            className="transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105"
                        />
                    </a>

                    {/* School Name — hidden on mobile */}
                    <div className="hidden md:block flex-shrink min-w-0">
                        <h1 className="font-display text-base font-bold text-navy-900 dark:text-gray-100 whitespace-nowrap leading-tight">
                            Agurchand Manmull Jain School
                        </h1>
                        <p className="text-[0.6rem] text-gray-400 dark:text-gray-500 tracking-wider uppercase">
                            (A Unit of Sri S.S. Jain Educational Society)
                        </p>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1 ml-auto">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={cn(
                                    "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap",
                                    activeSection === link.href.slice(1)
                                        ? "text-blue-500 bg-blue-500/[0.07]"
                                        : "text-navy-900 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-500/[0.05]"
                                )}
                            >
                                {link.label}
                                <span
                                    className={cn(
                                        "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-blue-500 transition-transform duration-300",
                                        activeSection === link.href.slice(1) ? "scale-x-100" : "scale-x-0"
                                    )}
                                />
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    {!authLoading && (
                        <div className="hidden lg:flex items-center gap-2 ml-4">
                            {isLoggedIn ? (
                                <>
                                    <Link href="/admission">
                                        <Button variant="primary" size="sm" className="gap-1.5">
                                            <LayoutDashboard className="h-3.5 w-3.5" />
                                            Apply Now
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleLogout}
                                        className="gap-1.5 !text-red-400 hover:!text-red-300 hover:!bg-red-500/10"
                                    >
                                        <LogOut className="h-3.5 w-3.5" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="secondary" size="sm">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button variant="primary" size="sm">Register</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}

                    {/* Theme Toggle */}
                    <div className="ml-auto lg:ml-2">
                        <ThemeToggle />
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        onClick={toggleNav}
                        className="lg:hidden flex flex-col gap-[5px] p-1.5 rounded-lg hover:bg-blue-500/[0.08] transition-colors z-[1100]"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileOpen ? (
                            <X className="h-6 w-6 text-navy-900 dark:text-gray-100" />
                        ) : (
                            <Menu className="h-6 w-6 text-navy-900 dark:text-gray-100" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/45 z-[1040] backdrop-blur-sm lg:hidden"
                    onClick={closeNav}
                />
            )}

            {/* Mobile Drawer */}
            <nav
                className={cn(
                    "fixed top-0 right-0 w-[280px] h-screen bg-white dark:bg-navy-900 shadow-2xl z-[1050] transition-transform duration-300 pt-20 px-6 lg:hidden",
                    mobileOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <ul className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={cn(
                                    "block py-3 px-4 rounded-lg text-base font-medium transition-colors",
                                    activeSection === link.href.slice(1)
                                        ? "text-blue-500 bg-blue-500/[0.07]"
                                        : "text-navy-900 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-500/[0.05]"
                                )}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li className="pt-3 border-t border-gray-100 dark:border-navy-800 mt-2">
                        {!authLoading && isLoggedIn ? (
                            <>
                                {userEmail && (
                                    <p className="text-xs text-gray-400 px-4 mb-3 truncate">
                                        {userEmail}
                                    </p>
                                )}
                                <Link href="/admission" onClick={closeNav}>
                                    <Button variant="primary" fullWidth className="mb-2 gap-1.5">
                                        <LayoutDashboard className="h-4 w-4" />
                                        Apply Now
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    fullWidth
                                    onClick={handleLogout}
                                    className="gap-1.5 !text-red-400 hover:!text-red-300"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </>
                        ) : !authLoading ? (
                            <>
                                <Link href="/login" onClick={closeNav}>
                                    <Button variant="secondary" fullWidth className="mb-2">Login</Button>
                                </Link>
                                <Link href="/register" onClick={closeNav}>
                                    <Button variant="primary" fullWidth>Register</Button>
                                </Link>
                            </>
                        ) : null}
                    </li>
                </ul>
            </nav>
        </>
    );
}

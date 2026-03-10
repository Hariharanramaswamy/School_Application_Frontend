import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs);
}

export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formatCountdown(targetMs: number): {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
} {
    const diff = targetMs - Date.now();
    if (diff <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    const pad = (n: number) => (n < 10 ? "0" + n : String(n));
    return {
        days: pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        minutes: pad(Math.floor((diff % 3600000) / 60000)),
        seconds: pad(Math.floor((diff % 60000) / 1000)),
    };
}

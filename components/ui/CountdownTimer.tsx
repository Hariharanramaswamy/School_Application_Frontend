"use client";

import { useState, useEffect } from "react";
import { formatCountdown } from "@/lib/utils";
// Application deadline: always March 31 of the current or next academic cycle
function getApplicationDeadline(): number {
    const now = new Date();
    let year = now.getFullYear();
    const deadline = new Date(year, 2, 31, 23, 59, 59); // March 31
    // If the deadline has passed, use next year's
    if (now > deadline) {
        year += 1;
    }
    return new Date(year, 2, 31, 23, 59, 59).getTime();
}

const TARGET = getApplicationDeadline();

const labels = ["Days", "Hours", "Minutes", "Seconds"] as const;

const INITIAL = { days: "--", hours: "--", minutes: "--", seconds: "--" };

export default function CountdownTimer() {
    const [time, setTime] = useState(INITIAL);

    useEffect(() => {
        const tick = () => setTime(formatCountdown(TARGET));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const values = [time.days, time.hours, time.minutes, time.seconds];

    return (
        <div className="text-center">
            <h3 className="text-xs font-bold uppercase tracking-[3px] text-gray-400 dark:text-gray-500 mb-5">
                Application Closes In
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {values.map((val, i) => (
                    <div
                        key={labels[i]}
                        className="glass rounded-xl px-5 py-4 flex items-center gap-4 min-w-[160px] transition-all duration-300 hover:-translate-x-1 shadow-sm hover:shadow-md"
                    >
                        <span className="font-display text-4xl font-bold text-blue-500 min-w-[56px] text-center leading-none">
                            {val}
                        </span>
                        <span className="text-[0.7rem] font-semibold uppercase tracking-[2px] text-gray-400 dark:text-gray-500">
                            {labels[i]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
    title: "AMJS - School Application Portal",
    description:
        "Agurchand Manmull Jain School — Applications open for Academic Year 2026-2027. Apply now for admissions.",
    icons: { icon: "/school-logo.svg" },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${playfair.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              try {
                const t = localStorage.getItem('amjs-theme');
                if (t === 'dark') document.documentElement.classList.add('dark');
              } catch {}
            `,
                    }}
                />
            </head>
            <body className="font-sans text-navy-900 dark:text-gray-100 bg-surface-light dark:bg-navy-900 antialiased transition-colors duration-300">
                {children}
            </body>
        </html>
    );
}

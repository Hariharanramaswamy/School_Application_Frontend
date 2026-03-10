import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    950: "#020B18",
                    900: "#0A1628",
                    800: "#0D2040",
                    700: "#0F2D5A",
                },
                blue: {
                    300: "#74C0FC",
                    400: "#42A5F5",
                    500: "#1E88E5",
                    600: "#1565C0",
                },
                gold: {
                    300: "#FCD34D",
                    400: "#F59E0B",
                },
                surface: {
                    light: "#F0F4F9",
                    card: "#FFFFFF",
                    dark: "#0A1628",
                    "card-dark": "#112035",
                },
            },
            fontFamily: {
                display: ["Playfair Display", "serif"],
                sans: ["Inter", "sans-serif"],
            },
            animation: {
                float: "float 5s ease-in-out infinite",
                shimmer: "shimmer 4s linear infinite",
                "pulse-glow": "pulseGlow 3s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "0% center" },
                    "100%": { backgroundPosition: "200% center" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 0 0 rgba(30,136,229,0)" },
                    "50%": { boxShadow: "0 0 0 6px rgba(30,136,229,0.1)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;

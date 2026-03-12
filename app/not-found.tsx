import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-surface-light dark:bg-navy-900 transition-colors">
            <h1 className="font-display text-8xl font-extrabold text-blue-500 mb-4">404</h1>
            <h2 className="font-display text-2xl font-bold text-navy-900 dark:text-white mb-3">
                Page Not Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
                ← Back to Home
            </Link>
        </div>
    );
}

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-navy-900 transition-colors">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-[3px] border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-sm font-medium text-gray-400 dark:text-gray-500">Loading...</p>
            </div>
        </div>
    );
}

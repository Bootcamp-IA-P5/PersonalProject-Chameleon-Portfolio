export default function Footer() {
    return (
        <footer className="mt-32 border-t border-slate-800/60 py-10 px-6">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-5">
                    <a
                        href="https://github.com/Arowi95"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 transition-colors"
                    >
                        GitHub
                    </a>
                    <span>© {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}

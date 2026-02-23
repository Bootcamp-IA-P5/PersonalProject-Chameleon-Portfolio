'use client';

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800/60">
            <nav className="max-w-5xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

                {/* Nav links */}
                <div className="flex items-center gap-6">
                    <a
                        href="#analyzer"
                        className="text-sm text-slate-400 hover:text-cyan-400 transition-colors hidden sm:block"
                    >
                        Analizador IA
                    </a>
                    <a
                        href="#projects"
                        className="text-sm text-slate-400 hover:text-cyan-400 transition-colors hidden sm:block"
                    >
                        Proyectos
                    </a>
                </div>
            </nav>
        </header>
    );
}

'use client';

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800/60">
            <nav className="max-w-5xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="text-white font-bold text-lg tracking-tight hover:text-cyan-400 transition-colors">
                    <span className="text-gradient">Aroa</span>
                    <span className="text-slate-300"> Mateo</span>
                </a>

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
                    <a
                        href="https://github.com/Arowi95"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm px-4 py-1.5 rounded-full border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
                    >
                        GitHub
                    </a>
                </div>
            </nav>
        </header>
    );
}

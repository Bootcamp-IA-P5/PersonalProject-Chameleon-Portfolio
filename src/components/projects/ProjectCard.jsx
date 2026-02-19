import MatchScore from '../ai/MatchScore';
import AIPitch from '../ai/AIPitch';

// Category color mapping
const categoryColors = {
    'Generative AI Engineer': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    'Machine Learning Engineer': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'Machine Learning': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

export default function ProjectCard({ project, index = 0 }) {
    const categoryStyle =
        categoryColors[project.category] ||
        'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';

    return (
        <div
            className="group relative glass glass-hover rounded-2xl p-6 md:p-8 transition-all duration-300
                 hover:glow-cyan animate-fade-up flex flex-col"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Score bar — shown only after AI analysis */}
            <MatchScore score={project.score} />

            {/* Category badge */}
            <span
                className={`inline-flex items-center self-start text-[10px] font-bold uppercase tracking-widest
                    px-2.5 py-1 rounded-full border ${categoryStyle} mb-4`}
            >
                {project.category}
            </span>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-cyan-50 transition-colors">
                {project.title}
            </h3>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                {project.shortDescription}
            </p>

            {/* AI Pitch */}
            <AIPitch pitch={project.pitch} />

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mt-5">
                {project.tech.slice(0, 6).map((t) => (
                    <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 bg-slate-800/80 text-slate-400 rounded-md border border-slate-700/60"
                    >
                        {t}
                    </span>
                ))}
                {project.tech.length > 6 && (
                    <span className="text-[10px] px-2 py-0.5 bg-slate-800/80 text-slate-500 rounded-md border border-slate-700/60">
                        +{project.tech.length - 6} más
                    </span>
                )}
            </div>

            {/* GitHub link */}
            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors self-start"
                >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Ver en GitHub
                </a>
            )}
        </div>
    );
}
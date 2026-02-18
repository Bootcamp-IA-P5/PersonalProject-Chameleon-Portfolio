export default function ProjectCard({ project }) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/50 transition-all">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                {project.category}
            </span>
            <h3 className="text-2xl font-bold text-white mt-4 mb-2">
                {project.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-1 bg-slate-800 text-slate-200 rounded-md border border-slate-700">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}
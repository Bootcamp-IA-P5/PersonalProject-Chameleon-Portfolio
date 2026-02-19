export default function MatchScore({ score }) {
    if (score === undefined || score === null) return null;

    // Color tiers
    const color =
        score >= 80
            ? { bar: 'bg-emerald-400', text: 'text-emerald-400', glow: 'shadow-emerald-500/30' }
            : score >= 50
                ? { bar: 'bg-amber-400', text: 'text-amber-400', glow: 'shadow-amber-500/30' }
                : { bar: 'bg-rose-400', text: 'text-rose-400', glow: 'shadow-rose-500/30' };

    return (
        <div className="mb-4">
            {/* Score badge + bar */}
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Match Score
                </span>
                <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 shadow-md ${color.text} ${color.glow}`}
                >
                    {score}%
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color.bar} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
}
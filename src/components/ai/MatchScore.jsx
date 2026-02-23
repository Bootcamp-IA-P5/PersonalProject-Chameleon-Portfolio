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
        <div className="flex flex-col items-center gap-4 py-2">
            {/* Score label */}
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                Match
            </span>

            {/* Score circle/badge */}
            <div
                className={`flex items-center justify-center w-14 h-14 rounded-full bg-slate-950 border-2 border-slate-800 shadow-xl ${color.text} ${color.glow}`}
            >
                <span className="text-sm font-black italic">
                    {score}%
                </span>
            </div>

            {/* Vertical Progress bar (mini) */}
            <div className="h-20 w-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/50">
                <div
                    className={`w-full ${color.bar} rounded-full transition-all duration-1000 ease-out`}
                    style={{ height: `${score}%`, marginTop: `${100 - score}%` }}
                />
            </div>
        </div>
    );
}
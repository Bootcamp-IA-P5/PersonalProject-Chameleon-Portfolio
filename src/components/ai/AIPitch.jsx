export default function AIPitch({ pitch }) {
    if (!pitch) return null;

    return (
        <div className="mt-4 px-4 py-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 pitch-border">
            <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5 text-sm flex-shrink-0">✦</span>
                <p className="text-xs text-cyan-200/80 leading-relaxed italic">
                    {pitch}
                </p>
            </div>
        </div>
    );
}
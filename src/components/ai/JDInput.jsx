'use client';

export default function JDInput({ value, onChange, onAnalyze, loading }) {
    return (
        <div className="glass rounded-2xl p-6 md:p-8 glow-cyan">
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-cyan-400 text-lg">⚡</span>
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
                    Descripción del puesto
                </label>
            </div>

            {/* Textarea */}
            <textarea
                id="jd-textarea"
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl p-4 text-slate-300
                   placeholder-slate-600 focus:outline-none focus:border-cyan-500/70 focus:ring-1
                   focus:ring-cyan-500/30 transition-all resize-none leading-relaxed text-sm"
                rows="6"
                placeholder="Pega aquí la descripción del puesto al que quieres aplicar... La IA analizará qué proyectos encajan mejor con la oferta."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            {/* Button */}
            <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
                <p className="text-xs text-slate-600">
                    Powered by Gemini 2.0 Flash
                </p>
                <button
                    id="analyze-button"
                    onClick={onAnalyze}
                    disabled={loading || !value.trim()}
                    className="flex items-center gap-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700
                     disabled:text-slate-500 text-white font-bold py-3 px-7 rounded-xl
                     transition-all duration-200 shadow-lg shadow-cyan-900/30
                     hover:shadow-cyan-500/20 hover:-translate-y-0.5
                     active:translate-y-0 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    {loading ? (
                        <>
                            <span className="spinner" />
                            Analizando…
                        </>
                    ) : (
                        <>
                            <span>✦</span>
                            Activar Modo Camaleón
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
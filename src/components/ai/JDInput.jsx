'use client';

import { motion } from 'framer-motion';

export default function JDInput({ value, onChange, onAnalyze, loading }) {
    return (
        <div className="glass rounded-2xl p-6 md:p-8 glow-cyan relative overflow-hidden">
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
                <motion.span
                    animate={loading ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-cyan-400 text-lg"
                >
                    ⚡
                </motion.span>
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

            {/* Button & Info */}
            <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
                <p className="text-xs text-slate-600">
                    Powered by Groq
                </p>

                <button
                    id="analyze-button"
                    onClick={onAnalyze}
                    disabled={loading || !value.trim()}
                    className="relative flex items-center gap-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700
                     disabled:text-slate-500 text-white font-bold py-3 px-7 rounded-xl
                     transition-all duration-200 shadow-lg shadow-cyan-900/30
                     hover:shadow-cyan-500/20 hover:-translate-y-0.5
                     active:translate-y-0 disabled:cursor-not-allowed disabled:shadow-none overflow-hidden"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full block"
                            />
                            <span>Analizando…</span>
                        </div>
                    ) : (
                        <>
                            <motion.span
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                ✦
                            </motion.span>
                            <span>Activar Modo Camaleón</span>
                        </>
                    )}
                </button>
            </div>

            {/* Barra de progreso inferior (Solo visible cuando carga) */}
            {loading && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
                />
            )}
        </div>
    );
}
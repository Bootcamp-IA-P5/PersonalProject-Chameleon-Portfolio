'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Inyectamos la magia
import { projects as initialProjects } from '../data/projects';
import ProjectCard from '../components/projects/ProjectCard';
import JDInput from '../components/ai/JDInput';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Home() {
    const [displayProjects, setDisplayProjects] = useState(initialProjects);
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) return;

        setIsLoading(true);
        setError('');
        try {
            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription, projects: initialProjects }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error al conectar con el servidor');
            }

            if (data.analysis) {
                const updated = data.analysis.map(item => {
                    const project = initialProjects.find(p => p.id === item.id);
                    return { ...project, score: item.score, pitch: item.pitch };
                });
                setDisplayProjects(updated);
                setAnalyzed(true);
            }
        } catch (err) {
            console.error("Error en la IA:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen pt-24 pb-16 px-6 md:px-8">
                <div className="max-w-5xl mx-auto">

                    {/* ── Hero ─────────────────────────────────────────── */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-24 pt-12"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <span className="h-px w-8 bg-cyan-500/60" />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-6">
                            Portfolio{' '}
                            <span className="text-gradient">Camaleón</span>
                        </h1>

                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white/90 leading-tight mb-6">
                            Soy Aroa Mateo Gómez. Desarrolladora web e Inteligencia Artificial.
                        </h2>

                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
                            Pega la descripción de una oferta de trabajo y la IA reordenará mis proyectos
                            mostrándote los que mejor se aplican con lo que buscas.
                        </p>
                    </motion.section>

                    {/* ── AI Analyzer ──────────────────────────────────── */}
                    <section id="analyzer" className="mb-24 scroll-mt-20">
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl font-bold text-white">¿Cuál es tu oferta?</h2>
                        </div>
                        <JDInput
                            value={jobDescription}
                            onChange={setJobDescription}
                            onAnalyze={handleAnalyze}
                            loading={isLoading}
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm"
                            >
                                <p className="flex items-center gap-2">
                                    <span className="text-xl">⚠️</span>
                                    {error}
                                </p>
                            </motion.div>
                        )}
                    </section>

                    {/* ── Projects ─────────────────────────────────────── */}
                    <section id="projects" className="scroll-mt-20">
                        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                            <h2 className="text-2xl font-bold text-white">
                                {analyzed ? '✦ Proyectos ordenados por relevancia' : 'Mis Proyectos'}
                            </h2>
                            {analyzed && (
                                <button
                                    onClick={() => {
                                        setDisplayProjects(initialProjects);
                                        setAnalyzed(false);
                                        setJobDescription('');
                                    }}
                                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700"
                                >
                                    Restablecer
                                </button>
                            )}
                        </div>

                        {/* Implementación de Framer Motion Layout para el Grid */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <AnimatePresence mode='popLayout'>
                                {displayProjects.map((project, i) => (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{
                                            duration: 0.5,
                                            type: "spring",
                                            stiffness: 80,
                                            damping: 15
                                        }}
                                    >
                                        <ProjectCard
                                            project={project}
                                            index={i}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </section>

                </div>
            </main>

            <Footer />
        </>
    );
}
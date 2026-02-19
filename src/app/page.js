'use client';

import { useState } from 'react';
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

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) return;

        setIsLoading(true);
        try {
            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription, projects: initialProjects }),
            });

            const data = await res.json();

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
                    <section className="mb-24 pt-12">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="h-px w-8 bg-cyan-500/60" />
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-6">
                            Portfolio{' '}
                            <span className="text-gradient">Camaleón</span>
                        </h1>

                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-6">
                            Mi nombre es Aroa Mateo Gómez. Soy desarrolladora web e Inteligencia Artificial. Siempre he sido una apasionada de la tecnología, estoy dispuesta a nuevos retos y desafíos.{' '}
                        </h2>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
                            Pega la descripción de una oferta de trabajo y la IA reordenará mis proyectos
                            mostrándote los que mejor encajan con lo que buscas.
                        </p>
                    </section>

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {displayProjects.map((project, i) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={i}
                                />
                            ))}
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </>
    );
}
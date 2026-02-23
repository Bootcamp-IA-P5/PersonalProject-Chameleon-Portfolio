'use client';

import { useState } from 'react';
import { projects as initialProjects } from '../data/projects';
import { reorderProjectsByScore } from '../lib/scoringUtils';

export default function useChameleon() {
    const [displayProjects, setDisplayProjects] = useState([]);
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

            const contentType = res.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                throw new Error('El servidor no devolvió una respuesta válida.');
            }

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error al conectar con el servidor');
            }

            if (data.analysis) {
                const updated = reorderProjectsByScore(initialProjects, data.analysis);
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

    const reset = () => {
        setDisplayProjects([]);
        setAnalyzed(false);
        setJobDescription('');
        setError('');
    };

    return {
        displayProjects,
        jobDescription,
        setJobDescription,
        isLoading,
        analyzed,
        error,
        handleAnalyze,
        reset
    };
}

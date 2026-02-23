import { renderHook, act } from '@testing-library/react';
import useChameleon from '../../src/hooks/useChameleon';

// Mock initial projects
jest.mock('../../src/data/projects', () => ({
    projects: [
        { id: '1', title: 'AI Recommendation System', tech: ['Python', 'Scikit-learn', 'SQL'] },
        { id: '2', title: 'Big Data Pipeline with Spark', tech: ['PySpark', 'AWS', 'S3'] },
        { id: '3', title: 'React Portfolio', tech: ['React', 'Framer Motion'] },
    ],
}));

global.fetch = jest.fn();

describe('useChameleon Hook - Focused Complex JD', () => {
    const complexJD = `
        Experiencia desarrollando soluciones analíticas aplicadas a problemas de negocio, incluyendo: Análisis estadístico, técnicas de machine learning, sistemas de recomendación, text mining, optimización. analítica de grafos.
        Programación en lenguajes orientados a matemáticas, preferiblemente Python, y uso de librerías de data science: NumPy, SciPy, Pandas, Scikit-learn, TensorFlow/Keras, entre otras.
        Experiencia trabajando con grandes volúmenes de datos en entornos Big Data, especialmente Spark (PySpark).
        Capacidad para representar y resumir datos mediante librerías de visualización como matplotlib, plotly, bokeh u otras.
        Excelentes habilidades en programación orientada a objetos y desarrollo de software de calidad productiva.
        Uso de Git y control de versiones.
        SQL
        Conocimientos de productos AWS (SageMaker, S3, Athena, etc.)
    `;

    beforeEach(() => {
        fetch.mockClear();
    });

    it('should correctly map high scores to technical projects matching the complex JD', async () => {
        const mockAnalysis = [
            { id: '2', score: 98, pitch: 'Tu experiencia en PySpark y AWS es clave para esta vacante.' },
            { id: '1', score: 92, pitch: 'Sólidos conocimientos en Scikit-learn y ML aplicados.' },
            { id: '3', score: 15, pitch: 'Muestra tus bases de desarrollo aunque menos orientado a data.' }
        ];

        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ analysis: mockAnalysis }),
            })
        );

        const { result } = renderHook(() => useChameleon());

        await act(async () => {
            result.current.setJobDescription(complexJD);
        });

        await act(async () => {
            await result.current.handleAnalyze();
        });

        // Verify order and data mapping
        expect(result.current.displayProjects[0].id).toBe('2');
        expect(result.current.displayProjects[0].score).toBe(98);
        expect(result.current.displayProjects[1].id).toBe('1');
        expect(result.current.displayProjects[1].score).toBe(92);
        expect(result.current.displayProjects[2].id).toBe('3');
        expect(result.current.displayProjects[2].score).toBe(15);
        expect(result.current.analyzed).toBe(true);
    });
});

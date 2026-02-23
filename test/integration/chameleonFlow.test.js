import { renderHook, act } from '@testing-library/react';
import useChameleon from '../../src/hooks/useChameleon';

// Mock initial projects to have a baseline
jest.mock('../../src/data/projects', () => ({
    projects: [
        { id: 'ml_1', title: 'Machine Learning Project', tech: ['Python', 'Scikit-learn'] },
        { id: 'web_1', title: 'React App', tech: ['React', 'CSS'] },
        { id: 'data_1', title: 'Big Data Tool', tech: ['Spark', 'PySpark', 'AWS'] },
    ],
}));

global.fetch = jest.fn();

describe('Chameleon Integration Flow - Complex JD', () => {
    const complexJD = `
        Programación en lenguajes orientados a matemáticas, preferiblemente Python, y uso de librerías de data science: NumPy, SciPy, Pandas, Scikit-learn, TensorFlow/Keras, entre otras.
        Experiencia trabajando con grandes volúmenes de datos en entornos Big Data, especialmente Spark (PySpark).
        Capacidad para representar y resumir datos mediante librerías de visualización como matplotlib, plotly, bokeh u otras.
        Excelentes habilidades en programación orientada a objetos y desarrollo de software de calidad productiva.
        Uso de Git y control de versiones.
        SQL
        Conocimientos de productos AWS (SageMaker, S3, Athena, etc.)
        Resolución de errores (debugging), creación y lectura de logs, conocimientos de testing.
        Uso de herramientas de IA.
    `;

    beforeEach(() => {
        fetch.mockClear();
    });

    it('should correctly reorder projects based on compatibility with the complex JD', async () => {
        // Simulating Groq's intelligent response for this JD
        const mockAnalysis = [
            { id: 'data_1', score: 98, pitch: 'Experto en Spark y AWS, perfecto para Big Data.' },
            { id: 'ml_1', score: 92, pitch: 'Dominio de Python y librerías de Data Science.' },
            { id: 'web_1', score: 20, pitch: 'Habilidades de desarrollo útiles pero fuera del foco principal.' }
        ];

        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ analysis: mockAnalysis }),
            })
        );

        const { result } = renderHook(() => useChameleon());

        // Set JD
        await act(async () => {
            result.current.setJobDescription(complexJD);
        });

        // Trigger analysis
        await act(async () => {
            await result.current.handleAnalyze();
        });

        // VERIFICATIONS
        expect(result.current.analyzed).toBe(true);
        expect(result.current.displayProjects).toHaveLength(3);

        // Check order
        expect(result.current.displayProjects[0].id).toBe('data_1'); // Highest score
        expect(result.current.displayProjects[1].id).toBe('ml_1');   // Second
        expect(result.current.displayProjects[2].id).toBe('web_1');  // Last

        // Check scores attachment
        expect(result.current.displayProjects[0].score).toBe(98);
        expect(result.current.displayProjects[0].pitch).toContain('Spark');

        expect(result.current.displayProjects[1].score).toBe(92);
        expect(result.current.displayProjects[1].pitch).toContain('Python');
    });
});

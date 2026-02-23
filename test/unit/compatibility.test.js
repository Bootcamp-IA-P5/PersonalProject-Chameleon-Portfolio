import { reorderProjectsByScore } from '../../src/lib/scoringUtils';

describe('Compatibility Scoring Verification', () => {
    const userPrompt = `
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

    const myProjects = [
        {
            id: 'spark_aws',
            title: 'Analítica en AWS con Spark',
            tech: ['Python', 'PySpark', 'AWS SageMaker', 'SQL'],
            desc: 'Pipeline de Big Data procesando millones de registros con Spark y desplegado en AWS.'
        },
        {
            id: 'react_portfolio',
            title: 'Portfolio Web',
            tech: ['React', 'Next.js', 'Tailwind'],
            desc: 'Un portfolio moderno con animaciones.'
        }
    ];

    it('should assign a significantly higher score to the Spark/AWS project than the React project', () => {
        // Simulating the expected logic that would be returned by Groq
        const mockAnalysisResults = [
            { id: 'spark_aws', score: 95, pitch: 'Encaja perfectamente con Spark, Python y AWS.' },
            { id: 'react_portfolio', score: 30, pitch: 'Muestra habilidades de desarrollo general.' }
        ];

        const reordered = reorderProjectsByScore(myProjects, mockAnalysisResults);

        expect(reordered[0].id).toBe('spark_aws');
        expect(reordered[0].score).toBeGreaterThan(90);
        expect(reordered[1].id).toBe('react_portfolio');
        expect(reordered[1].score).toBeLessThan(40);
    });

    it('should demonstrate that reorderProjectsByScore utility handles the mapping correctly', () => {
        const mockAnalysisResults = [
            { id: 'spark_aws', score: 100, pitch: 'Match total.' },
            { id: 'react_portfolio', score: 0, pitch: 'No relacionado.' }
        ];

        const reordered = reorderProjectsByScore(myProjects, mockAnalysisResults);

        expect(reordered[0].score).toBe(100);
        expect(reordered[1].score).toBe(0);
    });
});

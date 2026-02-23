import { reorderProjectsByScore } from '../../src/lib/scoringUtils';

describe('reorderProjectsByScore Utility', () => {
    const mockProjects = [
        { id: '1', title: 'Python Project' },
        { id: '2', title: 'React Project' },
        { id: '3', title: 'Data Analysis Project' },
    ];

    it('should sort projects by score descending', () => {
        const mockAnalysis = [
            { id: '1', score: 90, pitch: 'A' },
            { id: '3', score: 100, pitch: 'B' },
            { id: '2', score: 10, pitch: 'C' }
        ];

        const result = reorderProjectsByScore(mockProjects, mockAnalysis);

        expect(result[0].id).toBe('3'); // 100
        expect(result[1].id).toBe('1'); // 90
        expect(result[2].id).toBe('2'); // 10
    });

    it('should attach scores and pitches to projects', () => {
        const mockAnalysis = [
            { id: '1', score: 85, pitch: 'Best match' }
        ];

        const result = reorderProjectsByScore(mockProjects, mockAnalysis);
        const p1 = result.find(p => p.id === '1');

        expect(p1.score).toBe(85);
        expect(p1.pitch).toBe('Best match');
    });
});

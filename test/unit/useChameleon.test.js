import { renderHook, act } from '@testing-library/react';
import useChameleon from '../../src/hooks/useChameleon';

// Mock the initial projects data
jest.mock('../../src/data/projects', () => ({
    projects: [
        { id: '1', title: 'Project 1', tech: ['React'] },
        { id: '2', title: 'Project 2', tech: ['Python'] },
    ],
}));

// Mock global fetch
global.fetch = jest.fn();

describe('useChameleon Hook', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should initialize with empty displayProjects and false analyzed', () => {
        const { result } = renderHook(() => useChameleon());
        expect(result.current.displayProjects).toEqual([]);
        expect(result.current.analyzed).toBe(false);
    });

    it('should handle successful analysis and reorder projects', async () => {
        const mockAnalysis = [
            { id: '2', score: 95, pitch: 'Great Python skills' },
            { id: '1', score: 40, pitch: 'Some React' },
        ];

        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ analysis: mockAnalysis }),
            })
        );

        const { result } = renderHook(() => useChameleon());

        await act(async () => {
            result.current.setJobDescription('Python developer needed');
        });

        await act(async () => {
            await result.current.handleAnalyze();
        });

        expect(result.current.analyzed).toBe(true);
        expect(result.current.displayProjects[0].id).toBe('2');
        expect(result.current.displayProjects[0].score).toBe(95);
        expect(result.current.displayProjects[1].id).toBe('1');
        expect(result.current.isLoading).toBe(false);
    });

    it('should handle API errors correctly', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Rate limit exceeded' }),
            })
        );

        const { result } = renderHook(() => useChameleon());

        await act(async () => {
            result.current.setJobDescription('Some JD');
        });

        await act(async () => {
            await result.current.handleAnalyze();
        });

        expect(result.current.error).toBe('Rate limit exceeded');
        expect(result.current.analyzed).toBe(false);
        expect(result.current.isLoading).toBe(false);
    });

    it('should reset state correctly', async () => {
        const { result } = renderHook(() => useChameleon());

        await act(async () => {
            result.current.setJobDescription('Python');
        });

        act(() => {
            result.current.reset();
        });

        expect(result.current.jobDescription).toBe('');
        expect(result.current.displayProjects).toEqual([]);
        expect(result.current.analyzed).toBe(false);
    });
});

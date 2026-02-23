import { cleanAIJSONResponse } from '../../src/lib/jsonUtils';

describe('cleanAIJSONResponse', () => {
    it('should parse a direct JSON array', () => {
        const input = '[{"id": "1", "score": 90}]';
        expect(cleanAIJSONResponse(input)).toEqual([{ "id": "1", "score": 90 }]);
    });

    it('should parse JSON wrapped in markdown code blocks', () => {
        const input = '```json\n[{"id": "1", "score": 90}]\n```';
        expect(cleanAIJSONResponse(input)).toEqual([{ "id": "1", "score": 90 }]);
    });

    it('should extract array from an object if it is the only key', () => {
        const input = '{"projects": [{"id": "1", "score": 90}]}';
        expect(cleanAIJSONResponse(input)).toEqual([{ "id": "1", "score": 90 }]);
    });

    it('should throw error if no JSON is found', () => {
        const input = 'This is just some text without JSON';
        expect(() => cleanAIJSONResponse(input)).toThrow("La IA no devolvió un JSON válido");
    });
});

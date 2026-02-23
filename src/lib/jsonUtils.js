/**
 * Cleans the output from the AI to ensure it's a valid JSON array or object.
 * Handles cases where the AI wraps the JSON in markdown code blocks or adds extra text.
 * 
 * @param {string} text - The raw text from the AI response.
 * @returns {any} The parsed JSON data.
 * @throws {Error} If no valid JSON is found or if parsing fails.
 */
export function cleanAIJSONResponse(text) {
    // Try to find a JSON array or object in the text
    const match = text.match(/(\{.*\}|\[.*\])/s);
    if (!match) {
        throw new Error("La IA no devolvió un JSON válido");
    }

    let data = JSON.parse(match[0]);

    // If it's an object with a single key that is an array, extract the array
    if (!Array.isArray(data)) {
        const keys = Object.keys(data);
        if (keys.length === 1 && Array.isArray(data[keys[0]])) {
            data = data[keys[0]];
        }
    }

    // FINAL CHECK: Must be an array
    if (!Array.isArray(data)) {
        throw new Error("Formato JSON inesperado: se esperaba un array de resultados");
    }

    return data;
}

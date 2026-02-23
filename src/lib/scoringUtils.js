/**
 * Reorders projects based on AI analysis scores.
 * 
 * @param {Array} projects - The initial projects array.
 * @param {Array} analysis - The analysis results from the AI [{id, score, pitch}].
 * @returns {Array} The reordered projects with scores and pitches attached.
 */
export function reorderProjectsByScore(projects, analysis) {
    if (!analysis || !Array.isArray(analysis)) return projects;

    // Create a map for quick lookup
    const analysisMap = new Map();
    analysis.forEach(item => {
        analysisMap.set(String(item.id), item);
    });

    // Map projects to include score and pitch, then sort
    return projects
        .map(project => {
            const analysisData = analysisMap.get(String(project.id));
            return {
                ...project,
                score: analysisData ? analysisData.score : 0,
                pitch: analysisData ? analysisData.pitch : "",
            };
        })
        .sort((a, b) => (b.score || 0) - (a.score || 0));
}

import groq from "@/lib/groq";
import { NextResponse } from "next/server";
import { cleanAIJSONResponse } from "@/lib/jsonUtils";

export async function POST(req) {
  try {
    const { jobDescription, projects } = await req.json();

    const prompt = `
      Eres un reclutador IT experto en perfiles de IA y Data Science. 
      Analiza esta oferta de trabajo: "${jobDescription}"
      
      Estos son mis proyectos actuales: 
      ${JSON.stringify(projects.map(p => ({
      id: p.id,
      title: p.title,
      tech: p.tech,
      desc: p.shortDescription || p.fullDescription
    })))}
      
      TAREA:
      Para cada proyecto, calcula:
      1. Un "score" (0-100) de qué tanto encaja con la oferta.
      2. Un "pitch" (máximo 15 palabras) explicando por qué es relevante.
      
      Devuelve SOLO un array JSON con este formato:
      [
        {"id": "1", "score": 95, "pitch": "Tu dominio de RAG es justo lo que piden."},
        {"id": "2", "score": 40, "pitch": "Muestra tu capacidad de aprendizaje en Fullstack."}
      ]
      
      Ordena el array de mayor a menor score.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Eres un reclutador IT experto en perfiles de IA. Respondes siempre en formato JSON puro."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const text = chatCompletion.choices[0]?.message?.content || "";

    try {
      const analysis = cleanAIJSONResponse(text);
      return NextResponse.json({ analysis });
    } catch (error) {
      throw new Error(`Error al procesar el JSON de la IA: ${error.message}`);
    }
  } catch (error) {
    console.error("Error en el cerebro de la IA (Groq):", error);
    const status = error.status === 429 ? 429 : (error.status || 500);

    let message;
    if (status === 429) {
      message = "El cerebro de la IA está saturado. Inténtalo de nuevo en unos segundos.";
    } else if (error.error?.message) {
      message = error.error.message;
    } else {
      message = error.message || "Fallo en el análisis";
    }

    return NextResponse.json({ error: message }, { status });
  }
}
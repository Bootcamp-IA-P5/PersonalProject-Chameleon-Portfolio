import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { jobDescription, projects } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Eres un reclutador IT experto en perfiles de IA y Data Science. 
      Analiza esta oferta de trabajo: "${jobDescription}"
      
      Estos son mis proyectos actuales: 
      ${JSON.stringify(projects.map(p => ({
      id: p.id,
      title: p.title,
      tech: p.tech,
      desc: p.shortDescription
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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Limpieza de seguridad por si la IA añade markdown (```json ... ```)
    const match = text.match(/(\[.*\])/s);
    if (!match) throw new Error("La IA no devolvió un JSON válido");
    const analysis = JSON.parse(match[1]);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error en el cerebro de la IA:", error);
    return NextResponse.json({ error: "Fallo en el análisis" }, { status: 500 });
  }
}
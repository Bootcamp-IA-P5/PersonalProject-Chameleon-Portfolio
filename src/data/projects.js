export const projects = [
    {
        id: "1",
        title: "Hackaton_Ratoncito_Perez",
        shortDescription: "Un agente de IA inspirado en la magia del Ratoncito Pérez, diseñado para ayudar a las familias con niños a planificar su visita a Madrid de forma personalizada, divertida e inmersiva.",
        // Esta descripción larga la leerá la IA, no el usuario inicialmente
        fullDescription: "Desarrollé un agente conversacional basado en LLM con arquitectura RAG, capaz de generar itinerarios turísticos personalizados mediante recuperación semántica de información. Implementé el backend con FastAPI integrando modelos de lenguaje vía Hugging Face y Groq, junto con APIs externas de clima y eventos en tiempo real. Construí el sistema de memoria conversacional y recuperación de contexto utilizando LangChain y base de datos vectorial en MongoDB. Desarrollé el frontend interactivo con React y Tailwind CSS, creando una experiencia conversacional intuitiva y multilingüe. El sistema permite interacción contextual persistente, generación dinámica de recomendaciones y consumo de datos externos en tiempo real. Proyecto desarrollado en entorno Hackathon, aplicando metodologías ágiles para entregar un producto funcional end-to-end en 4 días.",
        tech: ["LangChain", "Hugging Face", "Groq (Llama 3.1, Mistral, MiniLM)", "RAG (Retrieval-Augmented Generation)", "FastAPI", "Python", "REST API", "MongoDB", "Vector Database", "Vite", "Tailwind CSS", "APIs Externas (AEMET,Ticketmaster)"],
        category: "Generative AI Engineer",
        link: "https://github.com/Arowi95/Hackaton_Ratoncito_Perez",
        // Keywords para ayudar a la IA a emparejar habilidades
        keywords: ["Conversational AI", "Generative AI", "LLM Applications", "AI Agent Development", "RAG", "FastAPI", "Python", "REST API", "Backend Development", "Vector Database", "Vite", "Tailwind CSS", "APIs Externas (AEMET,Ticketmaster)", "Prompt Engineering", "Context Management", "Semantic Search", "AI Assistant Development", "Agile Development", "Hackathon", "Hugging Face", "LangChain", "Llama", "Mistral", "Embeddings", "Vector Database", "MongoDB", "API Integration", "NoSQL Database", "Machine Learning"]
    },
    {
        id: "2",
        title: "Stroke Risk Prediction System",
        shortDescription: "Sistema de predicción de riesgo de ictus usando Machine Learning con arquitectura cliente-servidor.",
        fullDescription: "Desarrollé un sistema completo de predicción de riesgo de ictus con Machine Learning, entrenando y optimizando un modelo XGBoost (Recall 82%, AUC 84,4%) y desplegándolo en una aplicación funcional. Implementé una API REST con FastAPI y una interfaz interactiva con Streamlit para realizar predicciones en tiempo real, visualizar métricas y almacenar el historial, cubriendo todo el ciclo end-to-end de una solución de ML orientada a producción.",
        tech: ["XGBoost", "scikit-learn", "Optuna", "FastAPI", "SQLite", "Pandas", "NumPy", "Streamlit"],
        category: "Machine Learning Engineer",
        link: "https://github.com/Bootcamp-IA-P5/project-ai-data-scientistG2",
        keywords: ["Machine Learning", "Predictive Modeling", "Supervised Learning", "Classification Models", "Model Optimization", "End-to-End ML", "Hyperparameter Tuning", "Model Deployment", "XGBoost", "scikit-learn", "Optuna", "FastAPI", "SQLite", "Pandas", "NumPy", "Streamlit", "API Development", "Model Serving", "Backend Development", "Interactive Dashboard", "Data Visualization", "Data Preprocessing", "Feature Engineering", "Exploratory Data Analysis (EDA)", "Data Cleaning", "Imbalanced Data", "SMOTE", "Model Evaluation", "AUC-ROC", "Recall Optimization", "Python", "Machine Learning Engineer", "Data Scientist", "AI Developer", "Production ML", "Applied Machine Learning"]
    },
    {
        id: "3",
        title: "FireRiskAI - Sistema de Predicción de Riesgo de Incendios Forestales",
        shortDescription: "FireRiskAI es una aplicación web impulsada por inteligencia artificial que combina clasificación multiclase y análisis predictivo para abordar un problema real: la evaluación del riesgo de incendios forestales.",
        // Esta descripción larga la leerá la IA, no el usuario inicialmente
        fullDescription: "Desarrollé un sistema de predicción de riesgo de incendios forestales basado en Machine Learning, utilizando un modelo optimizado de XGBoost con un 97.07% de precisión en clasificación multiclase. Implementé una API REST con FastAPI para servir predicciones en tiempo real, permitiendo evaluar el nivel de riesgo ambiental a partir de variables geográficas. Realicé el entrenamiento, evaluación y optimización del modelo utilizando el dataset Forest Cover Type del University of California, Irvine Machine Learning Repository. Desarrollé pipelines de inferencia, análisis de features e interpretación del modelo para mejorar la explicabilidad y aplicabilidad en contextos reales. El sistema permite clasificar tipos de bosque, estimar el riesgo de incendio y proporcionar métricas de confianza para la toma de decisiones. Proyecto orientado a la aplicación práctica de Machine Learning en problemas medioambientales y sistemas predictivos en producción.",
        tech: ["XGBoost", "scikit-learn", "Python", "FastAPI", "REST API", "Uvicorn", "pandas", "NumPy", "Jupyter Notebook", "Model Serialization (Pickle)", "Inference Pipeline", "pytest"],
        category: "Machine Learning",
        link: "https://github.com/Bootcamp-IA-P5/Grupo1_Modelos_de_Ensemble",
        // Keywords para ayudar a la IA a emparejar habilidades
        keywords: ["Machine Learning", "Predictive Modeling", "Classification", "Multiclass Classification", "Ensemble Models", "Gradient Boosting", "scikit-learn", "Python", "FastAPI", "REST API", "Uvicorn", "pandas", "NumPy", "Jupyter Notebook", "Model Serialization (Pickle)", "Inference Pipeline", "pytest", "Machine Learning Engineer", "Data Scientist", "AI Developer", "Production ML", "Applied Machine Learning"]
    },
];
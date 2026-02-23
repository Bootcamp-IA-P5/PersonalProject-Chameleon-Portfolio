# 🦎 Portfolio Camaleón

> Portfolio inteligente que reordena tus proyectos según la oferta de trabajo que le pegues, usando IA (Groq + Llama 3.3).

Pega la descripción de una oferta de empleo y la IA analiza tu portfolio, asignando un **score de compatibilidad (0–100)** y un **pitch personalizado** a cada proyecto. Los proyectos se reordenan automáticamente mostrando primero los más relevantes.

---

## ✨ Características

- **Análisis con IA** — Usa Groq (Llama 3.3 70B) para evaluar la relevancia de cada proyecto respecto a una oferta de trabajo.
- **Reordenación dinámica** — Los proyectos se reordenan visualmente según su score de compatibilidad con animaciones fluidas.
- **Score visual** — Cada proyecto muestra un indicador de compatibilidad con código de colores (verde ≥80%, ámbar ≥50%, rojo <50%).
- **Pitch personalizado** — La IA genera una frase explicando por qué cada proyecto es relevante.
- **Diseño dark premium** — Interfaz glassmorphism con gradientes, glows cyan y animaciones suaves.
- **Dockerizado** — Listo para desarrollo y despliegue con Docker Compose.
- **Tests** — Suite de tests unitarios e integración con Jest y Testing Library.

---

## 🛠️ Tech Stack

| Capa | Tecnologías |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Frontend** | React 19, Framer Motion, Tailwind CSS 4 |
| **IA** | Groq SDK (Llama 3.3 70B Versatile) |
| **Testing** | Jest 30, Testing Library, Cypress |
| **DevOps** | Docker, Docker Compose |
| **Utilidades** | clsx, tailwind-merge |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── api/analyze/route.js    # API Route — llama a Groq y devuelve scores
│   ├── layout.js               # Layout raíz (Inter font, metadata)
│   └── page.js                 # Página principal (Hero + Analizador + Proyectos)
├── components/
│   ├── ai/
│   │   ├── JDInput.jsx         # Textarea para pegar la oferta de trabajo
│   │   ├── AIPitch.jsx         # Muestra el pitch generado por la IA
│   │   └── MatchScore.jsx      # Indicador visual de score (0-100%)
│   ├── layout/
│   │   ├── Navbar.jsx          # Barra de navegación fija
│   │   └── Footer.jsx          # Pie de página
│   └── projects/
│       ├── ProjectCard.jsx     # Tarjeta individual de proyecto
│       └── ProjectList.jsx     # Grid animado de proyectos
├── data/
│   └── projects.js             # Datos de los proyectos (título, tech, descripción, keywords)
├── hooks/
│   └── useChameleon.js         # Hook principal — estado, fetch y lógica de análisis
├── lib/
│   ├── groq.js                 # Cliente Groq SDK
│   ├── jsonUtils.js            # Limpieza y parseo del JSON de la IA
│   ├── scoringUtils.js         # Reordenación de proyectos por score
│   └── utils.js                # Utilidades CSS (cn helper)
├── styles/
│   └── global.css              # Tema global, glassmorphism, animaciones
test/
├── unit/                       # Tests unitarios (scoring, JSON, hook)
└── integration/                # Test de flujo completo
```

---

## 🔄 Flujo de la petición

```
Usuario pega oferta → JDInput → useChameleon.handleAnalyze()
    ↓
POST /api/analyze  (body: { jobDescription, projects })
    ↓
route.js → Groq SDK (Llama 3.3 70B)
    ↓
IA devuelve JSON: [{ id, score, pitch }, ...]
    ↓
cleanAIJSONResponse() → parsea y valida el JSON
    ↓
reorderProjectsByScore() → ordena proyectos por score
    ↓
UI se actualiza → ProjectList + ProjectCard + MatchScore + AIPitch
```

---

## 🚀 Instalación y desarrollo

### Requisitos previos

- [Docker](https://www.docker.com/) y Docker Compose
- Una API key de [Groq](https://console.groq.com/) (gratis)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Bootcamp-IA-P5/PersonalProject-Chameleon-Portfolio.git
cd PersonalProject-Chameleon-Portfolio
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
GROQ_API_KEY=tu_api_key_de_groq
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

> ⚠️ Asegúrate de tener habilitado el modelo `llama-3.3-70b-versatile` en la [configuración de tu organización de Groq](https://console.groq.com/settings/limits).

### 3. Levantar con Docker

```bash
docker-compose build
docker-compose up
```

La aplicación estará disponible en **http://localhost:3000**

### Alternativa sin Docker

```bash
npm install
npm run dev
```

---

## 🧪 Tests

```bash
# Tests unitarios e integración
npm test

# Con verbose
npx jest --verbose

# Tests E2E (requiere app corriendo)
npx cypress run
```

---

## 📄 Licencia

Este proyecto está bajo la licencia [EUPL-1.2](LICENSE).

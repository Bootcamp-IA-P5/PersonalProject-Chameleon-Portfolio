import { projects } from '../data/projects.js';
import ProjectCard from '../components/projects/ProjectCard.jsx';

export default function Home() {
    return (
        <main className="min-h-screen bg-[#020617]">
            <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">

                {/* HERO SECTION */}
                <header className="mb-20">
                    <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                        Soy Aroa Mateo Gómez<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Desarrollador IA</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                        Especializada en Desarrollo Fullstack. Este portfolio utiliza IA para
                        resaltar mis habilidades según lo que tú necesitas.
                    </p>
                </header>

                {/* PROJECTS GRID */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500 mb-10">
                        Proyectos Seleccionados
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
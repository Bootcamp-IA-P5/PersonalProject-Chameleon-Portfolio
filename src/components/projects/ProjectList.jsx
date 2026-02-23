'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects, analyzed }) {
    return (
        <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            <AnimatePresence mode='popLayout'>
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            duration: 0.5,
                            type: "spring",
                            stiffness: 80,
                            damping: 15
                        }}
                    >
                        <ProjectCard
                            project={project}
                            index={i}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}

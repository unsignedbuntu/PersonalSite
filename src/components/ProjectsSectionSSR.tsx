// src/components/ProjectsSectionSSR.tsx
'use client';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Project interface
interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
}

interface ProjectsSectionSSRProps {
  projects: Project[];
}

export default function ProjectsSectionSSR({ projects }: ProjectsSectionSSRProps) {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center p-8 md:p-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl w-full"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">PROJECTS</h2>
          <div className="w-24 h-1 bg-red-400 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Showcase of my full-stack development projects and technical expertise
          </p>
        </div>
        
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-4">Henüz Proje Yok</h3>
            <p className="text-gray-400 text-lg">
              Yakında harika projeler paylaşacağım. Takipte kalın!
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 p-6 rounded-lg flex flex-col border border-gray-700 hover:border-red-400/50 transition-all duration-300 group h-full"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span 
                      key={tech} 
                      className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded border border-red-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                   {project.technologies.length > 4 && (
                    <span className="text-gray-400 text-xs px-2 py-1">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
                <div className="mt-auto pt-4 border-t border-gray-700/50 flex justify-end items-center space-x-4">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-gray-400 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </Link>
                  {project.demo && (
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                      <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
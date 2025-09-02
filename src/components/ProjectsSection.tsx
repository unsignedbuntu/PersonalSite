// src/components/ProjectsSection.tsx
'use client';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  { name: 'e-commerce-app', description: 'Modern e-ticaret platformu', technologies: ['Next.js', 'TypeScript', 'Stripe'], github: '#', demo: '#' },
  { name: 'task-management', description: 'Takım çalışması için proje yönetim aracı', technologies: ['React', 'Node.js', 'Socket.io'], github: '#', demo: '#' },
  { name: 'ai-chat-bot', description: 'Yapay zeka destekli sohbet botu', technologies: ['Python', 'FastAPI', 'OpenAI'], github: '#', demo: null },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center p-8">
       <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">PROJELERİM</h2>
        <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-6 rounded-lg text-left flex flex-col"
            >
              <h3 className="text-xl font-bold text-yellow-300 mb-2">{project.name}</h3>
              <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => <span key={tech} className="bg-gray-700 text-xs px-2 py-1 rounded">{tech}</span>)}
              </div>
              <div className="flex gap-4 mt-auto">
                <a href={project.github} className="text-gray-400 hover:text-yellow-300"><Github /></a>
                {project.demo && <a href={project.demo} className="text-gray-400 hover:text-yellow-300"><ExternalLink /></a>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
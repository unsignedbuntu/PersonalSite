// src/components/ProjectsSection.tsx
'use client';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

// Project interface
interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API'den projeleri çek
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Projects API çağrısı yapılıyor...');
        const response = await fetch('http://localhost:8000/api/projects');
        console.log('Projects Response status:', response.status);
        
        if (!response.ok) {
          throw new Error('HTTP ' + response.status + ': Projeler yüklenemedi');
        }
        const data = await response.json();
        console.log('Projects API\'den gelen data:', data);
        setProjects(data);
      } catch (err) {
        console.error('Projects API Hatası:', err);
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Loading durumu
  if (loading) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-6xl w-full text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white"
          >
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <p className="mt-4 text-gray-300">Projeler yükleniyor...</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Error durumu
  if (error) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-6xl w-full text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400"
          >
            <p className="text-xl">❌ {error}</p>
            <p className="text-gray-300 mt-2">FastAPI sunucusunun çalıştığından emin olun.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">PROJECTS</h2>
        <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
          Showcase of my full-stack development projects and technical expertise
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 p-6 rounded-lg text-left flex flex-col border border-gray-700 hover:border-purple-400/50 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-yellow-300 mb-2 group-hover:text-white transition-colors">
                {project.name}
              </h3>
              <p className="text-gray-300 mb-4 flex-grow leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="bg-gray-700 text-xs px-2 py-1 rounded border border-gray-600 text-gray-300 hover:border-purple-400/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-auto">
                <motion.a 
                  href={project.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-yellow-300 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                {project.demo && (
                  <motion.a 
                    href={project.demo} 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-yellow-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terminal-style Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-6 bg-gray-900/30 rounded-lg border border-gray-700"
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-sm ml-4">project_stats.sh</span>
          </div>
          
          <div className="font-mono text-sm space-y-2">
            <div className="text-green-400">
              <span className="text-gray-400">$</span> cat project_summary.json
            </div>
            <div className="text-white ml-4">
              {`{`}
            </div>
            <div className="text-white ml-8">
              <span className="text-blue-300">"total_projects"</span>: <span className="text-yellow-300">{projects.length}</span>,
            </div>
            <div className="text-white ml-8">
              <span className="text-blue-300">"technologies"</span>: <span className="text-yellow-300">{new Set(projects.flatMap(p => p.technologies)).size}</span>,
            </div>
            <div className="text-white ml-8">
              <span className="text-blue-300">"status"</span>: <span className="text-green-300">"production_ready"</span>
            </div>
            <div className="text-white ml-4">
              {`}`}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
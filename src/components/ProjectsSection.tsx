'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, FolderOpen } from 'lucide-react'

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      name: 'e-commerce-app',
      description: 'Modern e-ticaret platformu',
      technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'],
      details: [
        'Kullanıcı dostu arayüz tasarımı',
        'Güvenli ödeme sistemi entegrasyonu',
        'Admin panel ve stok yönetimi',
        'Responsive tasarım'
      ],
      github: 'https://github.com/username/project',
      demo: 'https://project-demo.com',
      status: 'completed'
    },
    {
      id: 2,
      name: 'task-management',
      description: 'Takım çalışması için proje yönetim aracı',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      details: [
        'Real-time işbirliği özellikleri',
        'Drag & drop görev yönetimi',
        'Takım üyesi davet sistemi',
        'Proje analitikleri'
      ],
      github: 'https://github.com/username/project2',
      demo: 'https://project2-demo.com',
      status: 'completed'
    },
    {
      id: 3,
      name: 'ai-chat-bot',
      description: 'Yapay zeka destekli sohbet botu',
      technologies: ['Python', 'FastAPI', 'OpenAI', 'React'],
      details: [
        'Doğal dil işleme',
        'Öğrenebilen bot yapısı',
        'Çoklu platform desteği',
        'API entegrasyonu'
      ],
      github: 'https://github.com/username/project3',
      demo: null,
      status: 'in-progress'
    }
  ]

  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-terminal-border p-8"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-terminal-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm">projects/</span>
        </div>

        {/* Command */}
        <div className="mb-6 font-mono">
          <div className="flex items-center mb-4">
            <span className="text-terminal-text mr-2">$</span>
            <span className="text-terminal-secondary">ls -la projects/</span>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-terminal-border rounded-lg overflow-hidden hover:border-terminal-text/50 transition-colors"
            >
              {/* Project Header */}
              <motion.button
                whileHover={{ backgroundColor: 'rgba(0, 255, 0, 0.05)' }}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                className="w-full p-4 text-left flex items-center justify-between font-mono"
              >
                <div className="flex items-center space-x-3">
                  <FolderOpen className="w-5 h-5 text-terminal-text" />
                  <span className="text-terminal-secondary">{project.name}/</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    project.status === 'completed' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="text-gray-400 text-sm">
                  {selectedProject === project.id ? 'collapse' : 'expand'}
                </div>
              </motion.button>

              {/* Project Details */}
              {selectedProject === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-terminal-border p-4 bg-gray-800/30"
                >
                  <div className="space-y-4">
                    {/* Description */}
                    <div>
                      <div className="text-terminal-text font-mono text-sm mb-2">
                        cat description.txt
                      </div>
                      <div className="text-terminal-secondary pl-4">
                        {project.description}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <div className="text-terminal-text font-mono text-sm mb-2">
                        cat technologies.json
                      </div>
                      <div className="flex flex-wrap gap-2 pl-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-terminal-text/10 border border-terminal-text/30 rounded text-xs font-mono text-terminal-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="text-terminal-text font-mono text-sm mb-2">
                        cat features.md
                      </div>
                      <div className="pl-4 space-y-1">
                        {project.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="text-terminal-secondary text-sm">
                            • {detail}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex space-x-4 pt-4 border-t border-terminal-border/30">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 border border-terminal-text/50 rounded hover:bg-terminal-text/10 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span className="font-mono text-sm">GitHub</span>
                      </motion.a>
                      
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 px-4 py-2 border border-terminal-secondary/50 rounded hover:bg-terminal-secondary/10 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-mono text-sm">Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-6 pt-4 border-t border-terminal-border font-mono text-sm text-gray-400"
        >
          <div className="flex items-center">
            <span className="text-terminal-text mr-2">$</span>
            <span>find . -name "*.project" | wc -l</span>
          </div>
          <div className="pl-4 mt-1 text-terminal-secondary">
            {projects.length} projects found
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

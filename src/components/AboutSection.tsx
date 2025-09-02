'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AboutSection() {
  const [activeCommand, setActiveCommand] = useState('')

  const commands = [
    {
      command: 'cat about.txt',
      output: [
        'Merhaba! Ben tutkulu bir Full Stack Developer\'ım.',
        'Modern web teknolojileri ile kullanıcı deneyimini ön planda tutan',
        'çözümler geliştiriyorum. Sürekli öğrenmeye ve kendimi geliştirmeye',
        'odaklanan biriyim.'
      ]
    },
    {
      command: 'ls experience/',
      output: [
        'frontend_development.js',
        'backend_development.py',
        'database_design.sql',
        'ui_ux_design.figma',
        'project_management.md'
      ]
    },
    {
      command: 'cat education.txt',
      output: [
        'Bilgisayar Mühendisliği - [Üniversite Adı]',
        'Çeşitli online kurslar ve sertifikalar',
        'Sürekli öğrenme ve pratik yapma'
      ]
    }
  ]

  return (
    <section id="about" className="py-20">
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
          <span className="text-gray-400 text-sm">about.sh</span>
        </div>

        {/* Command Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {commands.map((cmd, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCommand(cmd.command)}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                activeCommand === cmd.command
                  ? 'bg-terminal-text/20 text-terminal-text border border-terminal-text'
                  : 'bg-gray-800 text-terminal-secondary border border-terminal-border hover:border-terminal-text/50'
              }`}
            >
              {cmd.command}
            </motion.button>
          ))}
        </div>

        {/* Terminal Output */}
        <div className="font-mono space-y-2">
          {activeCommand && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <span className="text-terminal-text mr-2">$</span>
                <span className="text-terminal-secondary">{activeCommand}</span>
              </div>
              
              {commands
                .find(cmd => cmd.command === activeCommand)
                ?.output.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-terminal-secondary pl-4"
                  >
                    {line}
                  </motion.div>
                ))}
            </motion.div>
          )}
          
          {!activeCommand && (
            <div className="text-gray-500 italic">
              Yukarıdaki komutlardan birine tıklayarak hakkımda daha fazla bilgi edinin...
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

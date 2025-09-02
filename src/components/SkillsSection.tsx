'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SkillsSection() {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React/Next.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Framer Motion', level: 80 }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 70 }
      ]
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'Figma', level: 85 },
        { name: 'VS Code', level: 95 }
      ]
    }
  ]

  const runSkillsCommand = () => {
    setIsRunning(true)
    setCurrentSkillIndex(0)
    
    const interval = setInterval(() => {
      setCurrentSkillIndex(prev => {
        if (prev >= skillCategories.length - 1) {
          clearInterval(interval)
          setIsRunning(false)
          return prev
        }
        return prev + 1
      })
    }, 1500)
  }

  return (
    <section id="skills" className="py-20">
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
          <span className="text-gray-400 text-sm">skills.sh</span>
        </div>

        {/* Command Input */}
        <div className="mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={runSkillsCommand}
            disabled={isRunning}
            className="flex items-center font-mono text-terminal-secondary hover:text-terminal-text transition-colors disabled:opacity-50"
          >
            <span className="text-terminal-text mr-2">$</span>
            <span>./show_skills.sh</span>
            {isRunning && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-2 w-2 h-5 bg-terminal-text inline-block"
              />
            )}
          </motion.button>
        </div>

        {/* Skills Output */}
        <div className="space-y-6">
          {skillCategories.slice(0, currentSkillIndex + 1).map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="space-y-3"
            >
              <div className="text-terminal-text font-mono font-semibold">
                [{category.category.toUpperCase()}]
              </div>
              
              <div className="grid gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-32 text-terminal-secondary font-mono text-sm">
                      {skill.name}
                    </div>
                    
                    <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                          duration: 0.8,
                          ease: 'easeOut'
                        }}
                        className="h-full bg-gradient-to-r from-terminal-text to-green-400"
                      />
                    </div>
                    
                    <div className="w-12 text-terminal-text font-mono text-sm">
                      {skill.level}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
          
          {currentSkillIndex >= skillCategories.length - 1 && !isRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-4 border-t border-terminal-border"
            >
              <div className="flex items-center font-mono text-terminal-secondary">
                <span className="text-terminal-text mr-2">$</span>
                <span>Skills scan completed successfully!</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1 w-2 h-5 bg-terminal-text inline-block"
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

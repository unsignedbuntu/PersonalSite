'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TypingAnimation from './TypingAnimation'

export default function HeroSection() {
  const [currentLine, setCurrentLine] = useState(0)
  
  const lines = [
    { text: 'whoami', delay: 1000 },
    { text: '> Full Stack Developer', delay: 2000 },
    { text: '> UI/UX Designer', delay: 2500 },
    { text: '> Problem Solver', delay: 3000 },
    { text: '', delay: 3500 },
    { text: 'cat introduction.txt', delay: 4000 },
    { text: '> Merhaba! Ben [İsminiz], tutkulu bir yazılım geliştiricisiyim.', delay: 5000 },
    { text: '> Modern web teknolojileri ile kullanıcı dostu çözümler üretiyorum.', delay: 6000 },
  ]

  // Timer effect to show lines progressively
  useEffect(() => {
    const timers = lines.map((line, index) => 
      setTimeout(() => setCurrentLine(index + 1), line.delay)
    )
    
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center py-20">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-terminal-border p-8 shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm">terminal</span>
          </div>

          {/* Terminal Content */}
          <div className="space-y-3 font-mono">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentLine >= index ? 1 : 0 }}
                transition={{ delay: line.delay / 1000 }}
                className="flex items-center"
              >
                {line.text.startsWith('>') ? (
                  <span className="text-terminal-secondary">
                    {line.text}
                  </span>
                ) : line.text === '' ? (
                  <span>&nbsp;</span>
                ) : (
                  <>
                    <span className="text-terminal-text mr-2">$</span>
                    <TypingAnimation
                      text={line.text}
                      delay={line.delay}
                      className="text-terminal-secondary"
                    />
                  </>
                )}
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7 }}
              className="flex items-center pt-4"
            >
              <span className="text-terminal-text mr-2">$</span>
              <span className="text-terminal-secondary">explore_portfolio</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-1 w-2 h-5 bg-terminal-text inline-block"
              />
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 7.5 }}
            className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-terminal-border"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-terminal-text text-terminal-text rounded-md hover:bg-terminal-text/10 transition-all duration-300 font-mono"
            >
              ./view_projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-terminal-secondary text-terminal-secondary rounded-md hover:bg-terminal-secondary/10 transition-all duration-300 font-mono"
            >
              ./contact_me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

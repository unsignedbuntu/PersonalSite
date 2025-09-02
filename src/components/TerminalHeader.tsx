'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minimize2, Maximize2, X } from 'lucide-react'

export default function TerminalHeader() {
  const [isMaximized, setIsMaximized] = useState(true)

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 border-b border-terminal-border sticky top-0 z-50"
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
              onClick={() => window.close()}
            >
              <X className="w-2 h-2 text-transparent" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
            >
              <Minimize2 className="w-2 h-2 text-transparent" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
              onClick={() => setIsMaximized(!isMaximized)}
            >
              <Maximize2 className="w-2 h-2 text-transparent" />
            </motion.button>
          </div>
          <span className="text-sm text-gray-400 ml-4">
            portfolio@terminal:~$
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: 'about', label: '0. ABOUT' },
            { name: 'skills', label: '1. SKILLS' },
            { name: 'projects', label: '2. PROJECTS' },
            { name: 'contact', label: '3. CONTACT' }
          ].map((item) => (
            <motion.a
              key={item.name}
              href={`#${item.name}`}
              whileHover={{ 
                scale: 1.05,
                color: '#00ff00',
                textShadow: '0 0 8px rgba(0, 255, 0, 0.8)'
              }}
              className="text-terminal-secondary hover:text-terminal-text transition-all duration-300 terminal-text text-sm font-mono relative group"
            >
              <span className="group-hover:text-terminal-text">
                {item.label}
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-terminal-text"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}

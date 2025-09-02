'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TerminalHeader from '@/components/TerminalHeader'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import ScrollIndicator from '@/components/ScrollIndicator'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="terminal-text text-terminal-text">
          <span>Initializing...</span>
          <span className="terminal-cursor"></span>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <TerminalHeader />
      <ScrollIndicator />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-6xl"
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </motion.div>
    </main>
  )
}

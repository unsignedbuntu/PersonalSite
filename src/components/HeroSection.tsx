// src/components/HeroSection.tsx
'use client';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-start justify-center p-8 md:p-24">
      <div className="max-w-2xl">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-8xl font-bold text-yellow-300 mb-2"
        >
          Atalay Beyazıt {/* KENDİ İSMİNİZLE DEĞİŞTİRİN */}
        </motion.h1>

        <TypeAnimation
          sequence={[
            'BUG DEVELOPER', 1500,
            'CODE WIZARD', 1500,
            'RUST ENJOYER', 1500,
            'SOFTWARE ENGINEER', 1500,
          ]}
          wrapper="h2"
          speed={40}
          repeat={Infinity}
          className="text-4xl md:text-5xl font-semibold text-white mb-6"
        />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-300 mb-8"
        >
          Self-taught programmer motivated by passion and personal projects.
          Expert of searching bugs on Google and quickly scanning the best StackOverflow answers.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-3 bg-yellow-300 text-black font-bold rounded-md transition-transform duration-300 hover:scale-105"
          >
            Contact Me
          </a>
          <a
            href="#projects"
            className="px-8 py-3 border border-yellow-300 text-yellow-300 font-bold rounded-md transition-all duration-300 hover:bg-yellow-300 hover:text-black hover:scale-105"
          >
            Learn More
          </a>
        </motion.div>

      </div>
    </section>
  );
}
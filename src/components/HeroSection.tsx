// src/components/HeroSection.tsx
'use client';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const experience = ['EPAM Systems', 'Meta Smart Factory', 'ESBAŞ Technology Center'];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[100svh] flex flex-col items-start justify-center px-5 pt-28 pb-16 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="w-full max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-green-400/30 bg-green-400/5 text-xs sm:text-sm text-green-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Open to new opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-blue-300 mb-3 leading-tight break-words"
        >
          Atalay Beyazıt
        </motion.h1>

        {/* min-h prevents layout jump while the text is being typed/deleted */}
        <div className="min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.75rem] mb-6">
          <TypeAnimation
            sequence={[
              '.NET DEVELOPER', 1500,
              'FULL-STACK DEVELOPER', 1500,
              'COMPUTER ENGINEER', 1500,
              'CLEAN ARCHITECTURE FAN', 1500,
            ]}
            wrapper="h2"
            speed={40}
            repeat={Infinity}
            className="text-2xl sm:text-3xl md:text-5xl font-semibold text-green-300"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-2xl"
        >
          Computer Engineer and Full-Stack Developer specializing in{' '}
          <span className="text-white font-semibold">.NET Core</span> and{' '}
          <span className="text-white font-semibold">TypeScript</span>. I design scalable,
          maintainable systems with Clean Architecture, MSSQL and Redis &mdash; from robust
          REST APIs to AI-integrated microservices &mdash; where code quality and architectural
          integrity come first.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-400 mb-10"
        >
          <span className="text-gray-500">Experience:</span>
          {experience.map((company) => (
            <span
              key={company}
              className="px-2.5 py-1 rounded border border-gray-700 bg-gray-800/40 text-gray-300"
            >
              {company}
            </span>
          ))}
          <span className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-4 h-4" /> Izmir, Turkey
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <a
            href="#contact"
            className="text-center px-8 py-3 bg-red-300 text-black font-bold rounded-md transition-transform duration-300 hover:scale-105"
          >
            Contact Me
          </a>
          <a
            href="#projects"
            className="text-center px-8 py-3 border border-red-300 text-red-300 font-bold rounded-md transition-all duration-300 hover:bg-red-300 hover:text-black hover:scale-105"
          >
            View Projects
          </a>
        </motion.div>

      </div>
    </section>
  );
}

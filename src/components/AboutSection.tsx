// src/components/AboutSection.tsx
'use client';
import { motion } from 'framer-motion';
import { Code, Database, Server, Zap } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Development",
      description: "End-to-end solutions with modern technologies"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Integration",
      description: "SQL databases and data processing solutions"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Backend Engineering",
      description: "Robust APIs and microservices"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimization",
      description: "Redis caching and efficient solutions"
    }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 p-8 md:p-12"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm">about_me.sh</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Left Side: Introduction */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 text-gray-300"
            >
              <h2 className="text-5xl font-bold text-blue-400 mb-6">ABOUT {'{'}</h2>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Hello, my name is <span className="text-white font-semibold">Atalay Beyazıt</span>. 
                  I'm a recent and passionate Computer Engineering graduate, and I specialize in 
                  building <span className="text-blue-400">full-stack, end-to-end solutions</span>.
                </p>
                
                <p>
                  I thrive on solving complex problems with a <span className="text-blue-400">polyglot development approach</span>. 
                  My professional activities are centered around building scalable applications 
                  using modern technologies like <span className="text-cyan-300">.NET</span>, 
                  <span className="text-cyan-300"> Next.js</span>, and <span className="text-cyan-300e ">SQL</span>.
                </p>

                <p>
                  Currently, I am actively deepening my expertise in 
                  <span className="text-blue-400"> AI integration</span>, learning to connect applications 
                  with powerful models like OpenAI and Google Gemini, while mastering advanced 
                  architectural patterns like Microservices and Clean Architecture.
                </p>
              </div>
              
              <h2 className="text-5xl font-bold text-blue-400 mt-6">{'}'}</h2>
            </motion.div>

            {/* Right Side: Highlights Grid */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-800/50 p-6 rounded-lg border border-gray-600 hover:border-blue-400/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center mb-3">
                      <div className="text-blue-400 group-hover:text-cyan-300 transition-colors mr-3">
                        {highlight.icon}
                      </div>
                      <h3 className="text-white font-semibold text-sm">
                        {highlight.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Terminal Command */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-600"
              >
                <div className="font-mono text-sm space-y-2">
                  <div className="text-green-400">
                    <span className="text-gray-400">$</span> whoami
                  </div>
                  <div className="text-white ml-4">
                    Computer Engineering Graduate
                  </div>
                  <div className="text-green-400">
                    <span className="text-gray-400">$</span> cat specialties.txt
                  </div>
                  <div className="text-white ml-4">
                    Full-Stack Development | Backend Engineering | AI Integration
                  </div>
                  <div className="text-green-400">
                    <span className="text-gray-400">$</span> echo $PASSION
                  </div>
                  <div className="text-blue-400 ml-4">
                    "Building scalable solutions that make a difference"
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
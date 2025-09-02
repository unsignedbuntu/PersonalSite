// src/components/AboutSection.tsx
'use client';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">HAKKIMDA</h2>
        <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
        <p className="text-lg text-gray-300 leading-relaxed">
          Merhaba! Ben tutkulu bir Full Stack Developer'ım. Modern web teknolojileri ile kullanıcı deneyimini ön planda tutan çözümler geliştiriyorum. Sürekli öğrenmeye ve kendimi geliştirmeye odaklanan biriyim.
        </p>
      </motion.div>
    </section>
  );
}
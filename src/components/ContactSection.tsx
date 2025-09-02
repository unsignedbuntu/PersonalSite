// src/components/ContactSection.tsx
'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">İLETİŞİM</h2>
        <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
        <p className="text-lg text-gray-300 mb-8">
          Bir proje hakkında konuşmak veya tanışmak isterseniz, aşağıdaki linklerden bana ulaşabilirsiniz.
        </p>
        <div className="flex justify-center gap-8">
          <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors"><Github size={40} /></a>
          <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors"><Linkedin size={40} /></a>
          <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors"><Twitter size={40} /></a>
          <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors"><Mail size={40} /></a>
        </div>
      </motion.div>
    </section>
  );
}
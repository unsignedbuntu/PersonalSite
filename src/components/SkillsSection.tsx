// src/components/SkillsSection.tsx
'use client';
import { motion } from 'framer-motion';

const skills = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 
  'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Git', 'Docker', 'Figma'
];

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl text-center"
      >
       <h2 className="text-5xl md:text-6xl font-black text-gray-200 mb-4 tracking-widest uppercase">
  YETENEKLERİM
</h2>
        <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-gray-800 text-yellow-300 font-semibold px-6 py-3 rounded-md"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
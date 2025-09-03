// src/components/SkillsSection.tsx
'use client';
import { motion } from 'framer-motion';

// react-icons kütüphanesinden kullanacağımız ikonları import ediyoruz
import { FaReact, FaPython, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiRust } from 'react-icons/si';

// Yeteneklerinizi ve ikonlarını tek bir listede tanımlayın
const skills = [
  { name: 'TypeScript', icon: <SiTypescript size={24} className="text-blue-400" /> },
  { name: 'JavaScript', icon: <SiJavascript size={24} className="text-yellow-400" /> },
  { name: 'Python', icon: <FaPython size={24} className="text-blue-500" /> },
  { name: 'Rust', icon: <SiRust size={24} className="text-orange-500" /> },
  { name: 'React', icon: <FaReact size={24} className="text-blue-300" /> },
  { name: 'Next.js', icon: <SiNextdotjs size={24} className="text-white" /> },
  { name: 'Node.js', icon: <FaNodeJs size={24} className="text-green-500" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={24} className="text-teal-400" /> },
];

export default function SkillsSection() {
  // Yetenek listesini dinamik olarak ikiye bölüyoruz
  const midpoint = Math.ceil(skills.length / 2);
  const firstColumnSkills = skills.slice(0, midpoint);
  const secondColumnSkills = skills.slice(midpoint);

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center p-8 md:p-16">
      <div className="max-w-6xl w-full">
        {/* Terminal çerçevesini koruyoruz */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 p-8"
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
            {/* Terminal başlığı aynı kalıyor */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm">skills.sh</span>
          </div>

          {/* YENİ YAPI: Sol Yazı Bölümü ve Sağ Yetenekler Bölümü */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">

            {/* Sol Taraf: Yazı Bölümü */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/3 text-gray-300"
            >
              <h2 className="text-4xl font-bold text-green-400 mb-4">SKILLS {'{'}</h2>
              <p className="leading-relaxed">
                I excel in dissecting complex problems into manageable tasks, essential for crafting robust, maintainable code in large-scale projects.
              </p>
              <h2 className="text-4xl font-bold text-green-400 mt-4">{'}'}</h2>
            </motion.div>

            {/* Sağ Taraf: Yetenek Sütunları ve Neon Çizgi */}
            <div className="flex-1 flex justify-center items-center gap-8 w-full lg:w-2/3">
              
              {/* İlk Yetenek Sütunu */}
              <div className="flex flex-col gap-6 w-full">
                {firstColumnSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 group"
                  >
                    {skill.icon}
                    <span className="font-mono text-white group-hover:text-green-400 transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Neon Dikey Çizgi */}
      <motion.div 
       initial={{ opacity: 0, scaleY: 0 }}
       whileInView={{ opacity: 1, scaleY: 1 }}
       transition={{ duration: 0.8, delay: 0.2 }}
       viewport={{ once: true }}
       className="neon-divider" 
      />
            
              {/* İkinci Yetenek Sütunu */}
              <div className="flex flex-col gap-6 w-full">
                {secondColumnSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 group"
                  >
                    {skill.icon}
                    <span className="font-mono text-white group-hover:text-green-400 transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
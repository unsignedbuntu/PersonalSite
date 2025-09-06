// src/components/SkillsSection.tsx
'use client';
import { motion } from 'framer-motion';
import { FaReact, FaPython, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiRust } from 'react-icons/si';

const skills = [
  // Görsel denge için sıralamayı koruyoruz
  { name: 'TypeScript', icon: <SiTypescript size={28} className="text-blue-400" /> },
  { name: 'React', icon: <FaReact size={28} className="text-blue-300" /> },
  { name: 'Python', icon: <FaPython size={28} className="text-blue-500" /> },
  { name: 'Node.js', icon: <FaNodeJs size={28} className="text-green-500" /> },
  { name: 'JavaScript', icon: <SiJavascript size={28} className="text-yellow-400" /> },
  { name: 'Next.js', icon: <SiNextdotjs size={28} className="text-white" /> },
  { name: 'Rust', icon: <SiRust size={28} className="text-orange-500" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={28} className="text-teal-400" /> },
];

export default function SkillsSection() {
  const midpoint = Math.ceil(skills.length / 2);
  const firstColumnSkills = skills.slice(0, midpoint);
  const secondColumnSkills = skills.slice(midpoint);

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 p-8 md:p-12"
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
            {/* Terminal başlığı */}
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Sol Taraf: Yazı Bölümü */}
            <motion.div /* ... */ className="w-full lg:w-1/3 text-gray-300">
              <h2 className="text-5xl font-bold text-green-400 mb-6">SKILLS {'{'}</h2>
              <p className="text-lg leading-relaxed">
                I excel in dissecting complex problems into manageable tasks, essential for crafting robust, maintainable code in large-scale projects.
              </p>
              <h2 className="text-5xl font-bold text-green-400 mt-6">{'}'}</h2>
            </motion.div>

            {/* --- DEĞİŞİKLİK BURADA BAŞLIYOR --- */}
            {/* Sağ Taraf: Yetenekler ve Neon Çizgi. Artık CSS Grid kullanıyoruz. */}
            <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-x-8 lg:gap-x-12 w-full lg:w-2/3">
              
              {/* İlk Yetenek Sütunu (sağa hizalı) */}
              <div className="flex flex-col gap-y-8 items-end">
                {firstColumnSkills.map((skill, index) => (
                  <motion.div /* ... */ className="flex items-center gap-4 group">
                    <span className="font-mono text-lg text-white group-hover:text-green-400 transition-colors text-right">
                      {skill.name}
                    </span>
                    {skill.icon}
                  </motion.div>
                ))}
              </div>

              {/* Neon Dikey Çizgi */}
              <motion.div /* ... */ className="neon-divider hidden lg:block" />
            
              {/* İkinci Yetenek Sütunu (sola hizalı) */}
              <div className="flex flex-col gap-y-8 items-start">
                {secondColumnSkills.map((skill, index) => (
                  <motion.div /* ... */ className="flex items-center gap-4 group">
                    {skill.icon}
                    <span className="font-mono text-lg text-white group-hover:text-green-400 transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* --- DEĞİŞİKLİK BURADA BİTİYOR --- */}

          </div>
        </motion.div>
      </div>
    </section>
  );
}
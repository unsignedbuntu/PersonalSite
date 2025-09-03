// src/components/ScrollIndicator.tsx
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  // --- 1. İlerleme Çubuğu için Mantık ---
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- 2. Tıklanabilir Noktalar/Çizgiler için Mantık ---
  const [activeSection, setActiveSection] = useState('hero');
  const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      // Aktif bölümü belirlemek için ekranın ortasını referans alıyoruz
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break; // Doğru bölüm bulununca döngüyü durdur
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- 3. Birleştirilmiş JSX ---
  return (
    // Ana konteyner: Dikey çubuk ve noktaları yan yana getirmek için flex kullanıyoruz
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex items-center gap-16">
      
      {/* Tıklanabilir Dikey Çizgiler (Noktalar) */}
      <div className="flex flex-col gap-6">
        {sections.map((sectionId) => (
          <button
            key={sectionId}
            onClick={() => scrollToSection(sectionId)}
            className="group"
          >
            {/* Her bir nokta yerine kısa bir dikey çizgi */}
            <div
              className={`w-2 h-12 rounded-full transition-all duration-300 
                ${activeSection === sectionId
                  ? 'bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.7)]' // Aktif durum
                  : 'bg-gray-500 group-hover:bg-yellow-300' // Pasif durum
                }`}
            />
          </button>
        ))}
      </div>

      {/* Dikey İlerleme Çubuğu */}
      <div className="relative h-96 w-3 bg-gray-700 rounded-full">
        <motion.div
          className="absolute top-0 left-0 right-0 h-full bg-yellow-300 rounded-full origin-top shadow-[0_0_15px_rgba(253,224,71,0.7)]"
          style={{ scaleY }}
        />
      </div>

    </div>
  );
}
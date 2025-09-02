// src/components/ScrollIndicator.tsx
'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState('hero');
  const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // z-50 class'ı bu noktaları da en üste taşır
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((sectionId) => (
        <button key={sectionId} onClick={() => scrollToSection(sectionId)} className="group relative">
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 
              ${activeSection === sectionId
                ? 'bg-yellow-300 border-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.7)]'
                : 'bg-transparent border-gray-500 group-hover:border-yellow-300'
              }`}
          />
        </button>
      ))}
    </div>
  );
}
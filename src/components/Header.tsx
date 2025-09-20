// src/components/Header.tsx
'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  
  const navItems = [
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'BLOG', href: '#blog', id: 'blog' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Hero bölümünde miyiz kontrol et
      if (scrollPosition < (document.getElementById('about')?.offsetTop || 0)) {
        setActiveSection('hero');
        return;
      }

      // Diğer bölümleri kontrol et
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    // İlk yüklemede çalıştır
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionColors: { [key: string]: string } = {
    about: 'from-blue-400 to-cyan-400',
    skills: 'from-yellow-400 to-orange-400',
    projects: 'from-red-500 to-orange-500',
    blog: 'from-purple-400 to-pink-400',
    contact: 'from-green-400 to-teal-400',
  };

  const activeGradient = sectionColors[activeSection] || 'from-yellow-300 to-green-400';

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-8 py-6">
        <nav className="flex items-center justify-end gap-6 md:gap-8">
          {navItems.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <motion.a
                href={item.href}
                className={`group text-lg font-semibold tracking-wider transition-all duration-300 relative ${
                  activeSection === item.id 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-yellow-300 mr-2">
                  {index}.
                </span>
                {item.name}
                
                {/* Aktif bölüm göstergesi */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r ${activeGradient} rounded-full`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      duration: 0.3 
                    }}
                  />
                )}
                
                {/* Hover efekti için ek çizgi */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white/20 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: activeSection === item.id ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
              {index < navItems.length - 1 && (
                <span className="hidden md:inline-block text-gray-600 mx-4">|</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
// src/components/Header.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'ABOUT', href: '#about', id: 'about' },
  { name: 'SKILLS', href: '#skills', id: 'skills' },
  { name: 'PROJECTS', href: '#projects', id: 'projects' },
  { name: 'BLOG', href: '#blog', id: 'blog' },
  { name: 'CONTACT', href: '#contact', id: 'contact' },
];

const sectionColors: { [key: string]: string } = {
  about: 'from-blue-400 to-cyan-400',
  skills: 'from-yellow-400 to-orange-400',
  projects: 'from-red-500 to-orange-500',
  blog: 'from-purple-400 to-pink-400',
  contact: 'from-green-400 to-teal-400',
};

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  // Mobil menü açıkken sayfanın kaymasını engelle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const activeGradient = sectionColors[activeSection] || 'from-yellow-300 to-green-400';

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? 'bg-black/70 backdrop-blur-md border-b border-gray-800' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 lg:py-6 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold text-blue-300 tracking-wider">
          AB<span className="text-yellow-300">.</span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center">
          {navItems.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <motion.a
                href={item.href}
                className={`group text-base xl:text-lg font-semibold tracking-wider transition-all duration-300 relative ${
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
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
              {index < navItems.length - 1 && (
                <span className="text-gray-600 mx-4">|</span>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="lg:hidden p-2 -mr-2 text-gray-300 hover:text-white"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100svh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-2 px-5 sm:px-8 pt-4">
              {navItems.map((item, index) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 text-2xl font-semibold tracking-wider border-b border-gray-800 ${
                      activeSection === item.id ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    <span className="text-yellow-300 mr-3">{index}.</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

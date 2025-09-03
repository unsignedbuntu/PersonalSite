// src/components/Header.tsx
'use client';
import { motion } from 'framer-motion';

export default function Header() {
  const navItems = [
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-8 py-6">
        <nav className="flex items-center justify-end gap-4 md:gap-6">
          {navItems.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <a
                href={item.href}
                className="group text-gray-400 font-semibold tracking-wider transition-colors duration-300 hover:text-white"
              >
                <span className="text-yellow-300 mr-2">
                  {index}.
                </span>
                {item.name}
              </a>
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
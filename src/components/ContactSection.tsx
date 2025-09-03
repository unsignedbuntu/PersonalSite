// src/components/ContactSection.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/username',
      command: 'git clone https://github.com/username'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/username',
      command: 'curl -X GET linkedin.com/in/username'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/username',
      command: 'wget twitter.com/username'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:your.email@example.com',
      command: 'mail -s "Hello" your.email@example.com'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center p-8 md:p-24">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 p-8"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm">contact.sh</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <div className="flex items-center font-mono mb-4">
                  <span className="text-green-400 mr-2">$</span>
                  <span className="text-white">./send_message.sh</span>
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    --name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="İsminiz"
                  />
                </div>

                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    --email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-green-400 font-mono text-sm mb-2">
                    --message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-colors resize-none"
                    placeholder="Mesajınız..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-400/10 border border-green-400 text-green-400 rounded px-6 py-3 font-mono hover:bg-green-400/20 transition-colors"
                >
                  ./send
                </motion.button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <div className="mb-8">
                <div className="flex items-center font-mono mb-4">
                  <span className="text-green-400 mr-2">$</span>
                  <span className="text-white">ls social_links/</span>
                </div>
              </div>

              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center space-x-4 p-4 border border-gray-600 rounded-lg hover:border-green-400/50 transition-all duration-300 group"
                  >
                    <social.icon className="w-6 h-6 text-green-400" />
                    <div className="flex-1">
                      <div className="text-white font-mono">
                        {social.name}
                      </div>
                      <div className="text-gray-400 text-sm font-mono">
                        {social.command}
                      </div>
                    </div>
                    <div className="text-gray-500 group-hover:text-green-400 transition-colors">
                      →
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Status */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-600"
              >
                <div className="font-mono text-sm space-y-1">
                  <div className="text-green-400">Status: Online ●</div>
                  <div className="text-white">Response time: ~24h</div>
                  <div className="text-gray-400">Location: Turkey</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-terminal-border p-8"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-terminal-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm">contact.sh</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <div className="mb-6">
              <div className="flex items-center font-mono mb-4">
                <span className="text-terminal-text mr-2">$</span>
                <span className="text-terminal-secondary">./send_message.sh</span>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 text-center"
              >
                <div className="text-green-400 font-mono mb-2">
                  Message sent successfully!
                </div>
                <div className="text-green-300 text-sm">
                  Thank you for reaching out. I'll get back to you soon.
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-terminal-text font-mono text-sm mb-2">
                    --name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-terminal-border rounded px-4 py-3 text-terminal-secondary font-mono focus:border-terminal-text focus:outline-none transition-colors"
                    placeholder="İsminiz"
                  />
                </div>

                <div>
                  <label className="block text-terminal-text font-mono text-sm mb-2">
                    --email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-terminal-border rounded px-4 py-3 text-terminal-secondary font-mono focus:border-terminal-text focus:outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-terminal-text font-mono text-sm mb-2">
                    --message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-gray-800 border border-terminal-border rounded px-4 py-3 text-terminal-secondary font-mono focus:border-terminal-text focus:outline-none transition-colors resize-none"
                    placeholder="Mesajınız..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-terminal-text/10 border border-terminal-text text-terminal-text rounded px-6 py-3 font-mono hover:bg-terminal-text/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-terminal-text border-t-transparent rounded-full" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>./send</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>

          {/* Social Links */}
          <div>
            <div className="mb-6">
              <div className="flex items-center font-mono mb-4">
                <span className="text-terminal-text mr-2">$</span>
                <span className="text-terminal-secondary">ls social_links/</span>
              </div>
            </div>

            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 255, 0, 0.05)' }}
                    className="flex items-center space-x-4 p-4 border border-terminal-border rounded-lg hover:border-terminal-text/50 transition-all duration-300"
                  >
                    <social.icon className="w-6 h-6 text-terminal-text" />
                    <div className="flex-1">
                      <div className="text-terminal-secondary font-mono">
                        {social.name}
                      </div>
                      <div className="text-gray-400 text-sm font-mono">
                        {social.command}
                      </div>
                    </div>
                    <div className="text-gray-500 group-hover:text-terminal-text transition-colors">
                      →
                    </div>
                  </motion.a>
                </motion.div>
              ))}
            </div>

            {/* Terminal Status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-terminal-border/50"
            >
              <div className="font-mono text-sm space-y-1">
                <div className="text-terminal-text">Status: Online ●</div>
                <div className="text-terminal-secondary">Response time: ~24h</div>
                <div className="text-gray-400">Location: Turkey</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

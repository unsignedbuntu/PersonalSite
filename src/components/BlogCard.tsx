// src/components/BlogCard.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '@/types/blog'; // Re-using the type, will fix if needed
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  expanded: boolean;
  setExpanded: (index: number | false) => void;
}

export default function BlogCard({ post, index, expanded, setExpanded }: BlogCardProps) {
  const isOpen = expanded;

  return (
    <motion.div
      layout
      initial={{ borderRadius: 12 }}
      className={`bg-gray-800/50 p-6 rounded-lg border border-gray-700 transition-all duration-300 group h-auto cursor-pointer ${isOpen ? 'hover:border-purple-600' : 'hover:border-purple-400/50'}`}
      onClick={() => setExpanded(isOpen ? false : index)}
      whileHover={{ y: isOpen ? 0 : -5 }}
    >
      <motion.div layout="position" className="flex justify-between items-center text-xs text-gray-400 mb-3">
        <div className="flex items-center">
          <Tag className="w-3 h-3 mr-1.5" />
          <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-400/30">
            {post.category}
          </span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1.5" />
          <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
      </motion.div>
      <motion.h3 layout="position" className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
        {post.title}
      </motion.h3>
      <motion.p layout="position" className="text-gray-300 text-sm mb-4">
        {post.excerpt}
      </motion.p>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div 
              className="prose prose-invert prose-sm max-w-none mt-4 pt-4 border-t border-gray-700/50"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout="position" className="mt-auto pt-4 border-t border-gray-700/50 flex justify-between items-center text-xs text-gray-400">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1.5" />
          <span>{post.readTime} dk okuma</span>
        </div>
        <div className="flex items-center text-sm font-semibold text-purple-400 group-hover:text-white transition-colors">
          {isOpen ? 'Kapat' : 'Devamını oku'}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

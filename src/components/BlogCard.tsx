// src/components/BlogCard.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string; // Made content optional
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} legacyBehavior passHref>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-gray-800/50 p-6 rounded-lg flex flex-col border border-gray-700 hover:border-purple-400/50 transition-all duration-300 group h-full cursor-pointer"
      >
        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
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
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 flex-grow">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-700/50 flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1.5" />
            <span>{post.readTime} dk okuma</span>
          </div>
          <div
            className="flex items-center text-sm font-semibold text-purple-400 group-hover:text-white transition-colors"
          >
            Devamını oku
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.a>
    </Link>
  );
}

// src/components/BlogSectionSSR.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BlogCard from './BlogCard';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  slug: string;
}

interface BlogSectionSSRProps {
  posts: BlogPost[];
}

export default function BlogSectionSSR({ posts }: BlogSectionSSRProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | false>(false);

  return (
    <section id="blog" className="min-h-screen flex items-center justify-center px-4 py-20 sm:px-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">BLOG</h2>
          <div className="w-24 h-1 bg-purple-400 mx-auto mb-6 md:mb-8"></div>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Teknoloji, yazılım geliştirme ve kişisel deneyimlerim hakkında yazılarım
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-white mb-4">Henüz Blog Yazısı Yok</h3>
            <p className="text-gray-400 text-lg">
              Yakında ilginç içerikler paylaşacağım. Takipte kalın!
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 items-start">
              {posts.slice(0, 3).map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  index={index} 
                  expanded={expandedIndex === index}
                  setExpanded={setExpandedIndex}
                />
              ))}
            </div>

            {posts.length > 3 && (
              <div className="mt-12 text-center">
                <Link
                  href="/blog"
                  className="inline-block px-8 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-lg hover:bg-gray-700/50 hover:scale-105 transition-all group"
                >
                  Tüm Yazıları Görüntüle
                  <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

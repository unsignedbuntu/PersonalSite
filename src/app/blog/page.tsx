// src/app/blog/page.tsx
'use client';
import { useState } from 'react';
import Header from "@/components/Header";
import { BlogPost } from "@/types/blog"; 
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";

interface BlogPageProps {
  posts: BlogPost[];
}

// Bu fonksiyon sunucu tarafında çalışacak
async function getAllBlogPosts(): Promise<BlogPost[]> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${API_BASE_URL}/api/posts`, {
      next: { revalidate: 60, tags: ['blog-posts'] }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch all blog posts:', error);
    return [];
  }
}

function BlogIndexClient({ posts }: BlogPageProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | false>(false);
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="bg-gray-900 text-white">
      <Header />
      <section id="blog-index" className="min-h-screen pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center">TÜM YAZILAR</h1>
            <div className="w-24 h-1 bg-purple-400 mx-auto mb-12"></div>
          </motion.div>

          {sortedPosts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>Yazı bulunamadı.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {sortedPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  index={index}
                  expanded={expandedIndex === index}
                  setExpanded={setExpandedIndex}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();
  return <BlogIndexClient posts={posts} />;
}

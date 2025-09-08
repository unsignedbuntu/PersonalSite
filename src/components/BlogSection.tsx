// src/components/BlogSection.tsx
'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

// Blog post interface
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  slug: string;
}

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API'den blog yazılarını çek
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        console.log('API çağrısı yapılıyor...');
        const response = await fetch('http://localhost:8000/api/posts');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error('HTTP ' + response.status + ': Blog yazıları yüklenemedi');
        }
        const data = await response.json();
        console.log('APIden gelen data:', data);
        setBlogPosts(data);
      } catch (err) {
        console.error('API Hatası:', err);
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Loading durumu
  if (loading) {
    return (
      <section id="blog" className="min-h-screen flex items-center justify-center p-8 md:p-16">
        <div className="max-w-6xl w-full text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white"
          >
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <p className="mt-4 text-gray-300">Blog yazıları yükleniyor...</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Error durumu
  if (error) {
    return (
      <section id="blog" className="min-h-screen flex items-center justify-center p-8 md:p-16">
        <div className="max-w-6xl w-full text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400"
          >
            <p className="text-xl">❌ {error}</p>
            <p className="text-gray-300 mt-2">FastAPI sunucusunun çalıştığından emin olun.</p>
            <p className="text-gray-400 text-sm mt-4">
              Sunucu: <code>http://localhost:8000</code>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="min-h-screen flex items-center justify-center p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">BLOG</h2>
          <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Teknoloji, yazılım geliştirme ve kişisel deneyimlerim hakkında yazılarım
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-yellow-300/50 transition-all duration-300 group"
            >
              {/* Category Badge */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-yellow-300/10 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-300/20">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded border border-gray-600"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center text-yellow-300 text-sm font-medium hover:text-yellow-200 transition-colors group"
                  >
                    Devamını oku
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Posts Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-yellow-300 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-300 hover:text-black transition-all duration-300"
          >
            Tüm Yazıları Görüntüle
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>

        {/* Terminal-style Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 p-6 bg-gray-900/30 rounded-lg border border-gray-700"
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-sm ml-4">blog_stats.sh</span>
          </div>
          
          <div className="font-mono text-sm space-y-2">
            <div className="text-green-400">
              <span className="text-gray-400">$</span> cat blog_stats.json
            </div>
            <div className="text-white ml-4">
              {`{`}
            </div>
            <div className="text-white ml-8">
              <span className="text-blue-300">"total_posts"</span>: <span className="text-yellow-300">{blogPosts.length}</span>,
            </div>
            <div className="text-white ml-8">
              <span className="text-blue-300">"categories"</span>: <span className="text-yellow-300">{new Set(blogPosts.map(p => p.category)).size}</span>,
            </div>
            <div className="text-white ml-8">
              <span className="text-blue-300">"last_update"</span>: <span className="text-green-300">"{blogPosts[0]?.date}"</span>
            </div>
            <div className="text-white ml-4">
              {`}`}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// src/components/admin/BlogManagement.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Clock,
  Tag,
  Search,
  Filter
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  tags: string[];
  reading_time: string;
  slug: string;
}

interface BlogManagementProps {
  token: string;
}

export default function BlogManagement({ token }: BlogManagementProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/admin/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert('Silme işlemi başarısız!');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Bir hata oluştu!');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        <span className="ml-3 text-gray-300">Blog yazıları yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Blog Yönetimi</h2>
          <p className="text-gray-400">Blog yazılarını oluşturun, düzenleyin ve yönetin</p>
        </div>
        <motion.button
          onClick={() => setShowCreateModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Yazı</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Blog yazılarında ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all"
        >
          <Filter className="w-4 h-4" />
          <span>Filtrele</span>
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Toplam Yazı</p>
              <p className="text-2xl font-bold text-white">{posts.length}</p>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Bu Ay</p>
              <p className="text-2xl font-bold text-white">
                {posts.filter(post => new Date(post.date).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Toplam Tag</p>
              <p className="text-2xl font-bold text-white">
                {new Set(posts.flatMap(post => post.tags)).size}
              </p>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Tag className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ort. Okuma</p>
              <p className="text-2xl font-bold text-white">
                {posts.length > 0 ? Math.round(posts.reduce((acc, post) => acc + parseInt(post.reading_time), 0) / posts.length) : 0} dk
              </p>
            </div>
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz blog yazısı yok'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Farklı anahtar kelimeler deneyin' : 'İlk blog yazınızı oluşturun'}
            </p>
            {!searchTerm && (
              <motion.button
                onClick={() => setShowCreateModal(true)}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
              >
                Yeni Yazı Oluştur
              </motion.button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50 border-b border-gray-600">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Başlık</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Yazar</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Tarih</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Okuma Süresi</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Etiketler</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPosts.map((post, index) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-700/30 transition-all"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <h3 className="text-white font-medium line-clamp-1">{post.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mt-1">{post.excerpt}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{post.author}</td>
                    <td className="py-4 px-6 text-gray-300">
                      {new Date(post.date).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="py-4 px-6 text-gray-300">{post.reading_time}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded border border-purple-400/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-gray-400 text-xs">+{post.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setEditingPost(post)}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deletePost(post.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal Placeholder */}
      {(showCreateModal || editingPost) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {editingPost ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
            </h3>
            <p className="text-gray-400 mb-6">Modal içeriği yakında...</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingPost(null);
                }}
                className="px-4 py-2 text-gray-300 hover:text-white transition-all"
              >
                İptal
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
                Kaydet
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

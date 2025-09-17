// src/components/admin/AdminDashboard.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  FileText, 
  FolderOpen, 
  MessageCircle, 
  BarChart3,
  Plus,
  Settings
} from 'lucide-react';
import BlogManagement from './BlogManagement';
import ProjectManagement from './ProjectManagement';
import ContactMessages from './ContactMessages';
import { useAuth } from '@/contexts/AuthContext';

interface Stats {
  totalPosts: number;
  totalProjects: number;
  totalMessages: number;
}

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<Stats>({ totalPosts: 0, totalProjects: 0, totalMessages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('Fetching stats with token:', token);
      
      // Fetch posts, projects, and messages counts
      const [postsRes, projectsRes, messagesRes] = await Promise.all([
        fetch('http://localhost:8000/api/posts'),
        fetch('http://localhost:8000/api/projects'),
        fetch('http://localhost:8000/api/admin/messages', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      ]);

      console.log('Response status:', {
        posts: postsRes.status,
        projects: projectsRes.status,
        messages: messagesRes.status
      });

      const [posts, projects, messages] = await Promise.all([
        postsRes.ok ? postsRes.json() : [],
        projectsRes.ok ? projectsRes.json() : [],
        messagesRes.ok ? messagesRes.json() : []
      ]);

      console.log('Fetched data:', { posts, projects, messages });

      setStats({
        totalPosts: Array.isArray(posts) ? posts.length : 0,
        totalProjects: Array.isArray(projects) ? projects.length : 0,
        totalMessages: Array.isArray(messages) ? messages.length : 0
      });
    } catch (error) {
      console.error('Stats fetch error:', error);
      setStats({
        totalPosts: 0,
        totalProjects: 0,
        totalMessages: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'posts', label: 'Blog Yazıları', icon: FileText },
    { id: 'projects', label: 'Projeler', icon: FolderOpen },
    { id: 'messages', label: 'Mesajlar', icon: MessageCircle },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  const statsCards = [
    { title: 'Blog Yazıları', value: stats.totalPosts, icon: FileText, color: 'blue' },
    { title: 'Projeler', value: stats.totalProjects, icon: FolderOpen, color: 'green' },
    { title: 'Mesajlar', value: stats.totalMessages, icon: MessageCircle, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-400/30">
                <Settings className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-gray-400 text-sm">
                  Hoş geldin, {user?.username || 'Admin'} • Portfolio Yönetimi
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-64 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
          >
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    whileHover={{ x: 5 }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                      activeTab === item.id
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1"
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
                  <p className="text-gray-400">Portfolio istatistikleriniz ve hızlı erişim</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {statsCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -5 }}
                        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">{card.title}</p>
                            <p className="text-2xl font-bold text-white mt-1">
                              {loading ? '...' : card.value}
                            </p>
                          </div>
                          <div className={`p-3 rounded-lg bg-${card.color}-500/20 border border-${card.color}-400/30`}>
                            <Icon className={`w-6 h-6 text-${card.color}-400`} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Hızlı İşlemler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('posts')}
                      className="flex items-center space-x-3 p-4 bg-blue-600/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Yeni Blog Yazısı</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('projects')}
                      className="flex items-center space-x-3 p-4 bg-green-600/20 text-green-300 rounded-lg border border-green-500/30 hover:bg-green-600/30 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Yeni Proje</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <BlogManagement token={token!} />
            )}

            {activeTab === 'projects' && (
              <ProjectManagement token={token!} />
            )}

            {activeTab === 'messages' && (
              <ContactMessages token={token!} />
            )}

            {activeTab === 'settings' && (
              <div className="text-center py-20">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Ayarlar</h3>
                <p className="text-gray-400">Yakında...</p>
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}

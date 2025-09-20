// src/components/admin/ContactMessages.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Mail, 
  User, 
  Calendar,
  Search,
  Filter,
  Trash2,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface ContactMessagesProps {
  token: string;
}

export default function ContactMessages({ token }: ContactMessagesProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;

    try {
      // Note: Delete endpoint doesn't exist yet, but we'll simulate it
      setMessages(messages.filter(message => message.id !== id));
      alert('Mesaj silindi!');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Bir hata oluştu!');
    }
  };

  const getFilteredMessages = () => {
    let filtered = messages;

    // Date filter
    if (filter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filter) {
        case 'today':
          filterDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(message => 
        new Date(message.created_at) >= filterDate
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  };

  const filteredMessages = getFilteredMessages();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} saat önce`;
    } else {
      return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20"> 
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
        <span className="ml-3 text-gray-300">Mesajlar yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">İletişim Mesajları</h2>
          <p className="text-gray-400">Gelen mesajları görüntüleyin ve yönetin</p>
        </div>
        <motion.button
          onClick={fetchMessages}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
        >
          <Eye className="w-4 h-4" />
          <span>Yenile</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Mesajlarda ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">Tümü</option>
          <option value="today">Bugün</option>
          <option value="week">Bu Hafta</option>
          <option value="month">Bu Ay</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Toplam Mesaj</p>
              <p className="text-2xl font-bold text-white">{messages.length}</p>
            </div>
            <div className="p-2 bg-red-500/20 rounded-lg">
              <MessageCircle className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Bugün</p>
              <p className="text-2xl font-bold text-white">
                {messages.filter(msg => {
                  const today = new Date();
                  const msgDate = new Date(msg.created_at);
                  return msgDate.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Bu Hafta</p>
              <p className="text-2xl font-bold text-white">
                {messages.filter(msg => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(msg.created_at) >= weekAgo;
                }).length}
              </p>
            </div>
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Unique Email</p>
              <p className="text-2xl font-bold text-white">
                {new Set(messages.map(msg => msg.email)).size}
              </p>
            </div>
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Mail className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/50 border border-gray-700 rounded-lg">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz mesaj yok'}
            </h3>
            <p className="text-gray-400">
              {searchTerm ? 'Farklı anahtar kelimeler deneyin' : 'İletişim formundan gelen mesajlar burada görünecek'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-red-400/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Message Header */}
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-white font-medium">{message.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{message.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{formatDate(message.created_at)}</span>
                      </div>
                    </div>

                    {/* Subject */}
                    <h3 className="text-lg font-semibold text-white mb-2">{message.subject}</h3>

                    {/* Message Preview */}
                    <p className="text-gray-300 line-clamp-2 mb-4">{message.message}</p>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                      <motion.button
                        onClick={() => setSelectedMessage(message)}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 px-3 py-1 bg-red-600/20 text-red-300 rounded border border-red-500/30 hover:bg-red-600/30 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Detayları Gör</span>
                      </motion.button>
                      <motion.button
                        onClick={() => deleteMessage(message.id)}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 px-3 py-1 bg-red-600/20 text-red-300 rounded border border-red-500/30 hover:bg-red-600/30 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Sil</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-white">Mesaj Detayı</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-white transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Sender Info */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Gönderen</label>
                    <p className="text-white font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">E-posta</label>
                    <p className="text-white">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Konu</label>
                    <p className="text-white font-medium">{selectedMessage.subject}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Tarih</label>
                    <p className="text-white">{formatDate(selectedMessage.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Mesaj</label>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-all"
                >
                  Kapat
                </button>
                <button
                  onClick={() => {
                    deleteMessage(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Sil
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

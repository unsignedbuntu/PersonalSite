// src/components/admin/ProjectManagement.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Github,
  ExternalLink,
  Search,
  Filter,
  Code,
  Star,
  GitBranch
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
}

interface ProjectManagementProps {
  token: string;
}

export default function ProjectManagement({ token }: ProjectManagementProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setProjects(projects.filter(project => project.id !== id));
      } else {
        alert('Silme işlemi başarısız!');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Bir hata oluştu!');
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        <span className="ml-3 text-gray-300">Projeler yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Proje Yönetimi</h2>
          <p className="text-gray-400">Projelerinizi oluşturun, düzenleyin ve yönetin</p>
        </div>
        <motion.button
          onClick={() => setShowCreateModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Proje</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Projelerde ara..."
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
              <p className="text-gray-400 text-sm">Toplam Proje</p>
              <p className="text-2xl font-bold text-white">{projects.length}</p>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Demo Var</p>
              <p className="text-2xl font-bold text-white">
                {projects.filter(project => project.demo).length}
              </p>
            </div>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <ExternalLink className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Teknoloji</p>
              <p className="text-2xl font-bold text-white">
                {new Set(projects.flatMap(project => project.technologies)).size}
              </p>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Code className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">GitHub Repo</p>
              <p className="text-2xl font-bold text-white">
                {projects.filter(project => project.github).length}
              </p>
            </div>
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Github className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/50 border border-gray-700 rounded-lg">
            <GitBranch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz proje yok'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Farklı anahtar kelimeler deneyin' : 'İlk projenizi oluşturun'}
            </p>
            {!searchTerm && (
              <motion.button
                onClick={() => setShowCreateModal(true)}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
              >
                Yeni Proje Oluştur
              </motion.button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 group hover:border-purple-400/50 transition-all"
              >
                {/* Project Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mt-1">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingProject(project)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all"
                      title="Düzenle"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteProject(project.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-block bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded border border-purple-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="inline-block text-gray-400 text-xs px-2 py-1">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-3">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-xs">GitHub</span>
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-xs">Demo</span>
                      </motion.a>
                    )}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-xs">#{project.id}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal Placeholder */}
      {(showCreateModal || editingProject) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {editingProject ? 'Projeyi Düzenle' : 'Yeni Proje'}
            </h3>
            <p className="text-gray-400 mb-6">Modal içeriği yakında...</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingProject(null);
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

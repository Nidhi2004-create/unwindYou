import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Download, BookOpen, Headphones, Video, FileText, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ResourceHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'videos', name: 'Videos', icon: Video },
    { id: 'audio', name: 'Audio Guides', icon: Headphones },
    { id: 'articles', name: 'Articles', icon: FileText },
    { id: 'exercises', name: 'Exercises', icon: Play },
  ];

  const resources = [
    {
      id: 1,
      title: 'Understanding Anxiety: A Student\'s Guide',
      type: 'video',
      duration: '15 min',
      category: 'Anxiety',
      language: 'English',
      description: 'Learn about anxiety symptoms, triggers, and coping strategies specifically for college students.',
      thumbnail: 'Student watching educational video about anxiety management',
      featured: true
    },
    {
      id: 2,
      title: 'Guided Meditation for Sleep',
      type: 'audio',
      duration: '20 min',
      category: 'Sleep',
      language: 'English',
      description: 'A calming meditation session designed to help students fall asleep peacefully.',
      thumbnail: 'Peaceful bedroom scene with soft lighting for meditation',
      featured: true
    },
    {
      id: 3,
      title: 'Managing Academic Stress',
      type: 'article',
      duration: '8 min read',
      category: 'Stress',
      language: 'English',
      description: 'Practical strategies for handling academic pressure and maintaining mental wellness.',
      thumbnail: 'Student studying with stress management techniques',
      featured: false
    },
    {
      id: 4,
      title: 'Breathing Exercises for Panic Attacks',
      type: 'exercise',
      duration: '5 min',
      category: 'Anxiety',
      language: 'English',
      description: 'Quick breathing techniques to manage panic attacks and acute anxiety.',
      thumbnail: 'Person practicing breathing exercises in calm environment',
      featured: true
    },
    {
      id: 5,
      title: 'Building Healthy Relationships',
      type: 'video',
      duration: '22 min',
      category: 'Relationships',
      language: 'English',
      description: 'Learn how to build and maintain healthy relationships during college years.',
      thumbnail: 'Group of diverse students having positive conversation',
      featured: false
    },
    {
      id: 6,
      title: 'Progressive Muscle Relaxation',
      type: 'audio',
      duration: '18 min',
      category: 'Relaxation',
      language: 'English',
      description: 'A guided session to release physical tension and promote relaxation.',
      thumbnail: 'Person in comfortable position practicing muscle relaxation',
      featured: false
    },
    {
      id: 7,
      title: 'Depression: Signs and Support',
      type: 'article',
      duration: '12 min read',
      category: 'Depression',
      language: 'English',
      description: 'Understanding depression symptoms and available support resources.',
      thumbnail: 'Supportive counseling session with warm lighting',
      featured: true
    },
    {
      id: 8,
      title: 'Mindfulness for Students',
      type: 'exercise',
      duration: '10 min',
      category: 'Mindfulness',
      language: 'English',
      description: 'Simple mindfulness exercises that can be done between classes.',
      thumbnail: 'Student practicing mindfulness in campus setting',
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory.replace('s', '');
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'article': return FileText;
      case 'exercise': return Play;
      default: return BookOpen;
    }
  };

  const handleResourceClick = (resource) => {
    toast({
      title: `🚧 ${resource.title}`,
      description: "This resource feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="pt-24 pb-8 px-4 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Psychoeducational Resource Hub</h1>
          <p className="text-gray-600 text-lg">
            Access videos, audio guides, and wellness resources in multiple languages
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Featured Resources */}
        {selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource, index) => {
                const TypeIcon = getTypeIcon(resource.type);
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="feature-card cursor-pointer group"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <div className="relative mb-4">
                      <img 
                        className="w-full h-48 object-cover rounded-xl"
                        alt={resource.title}
                       src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <TypeIcon className="w-4 h-4 mr-1" />
                        {resource.duration}
                      </div>
                      <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {resource.category}
                      </span>
                      <span className="text-xs text-gray-500">{resource.language}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* All Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-500">{filteredResources.length} resources found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onClick={() => handleResourceClick(resource)}
                >
                  <div className="relative">
                    <img 
                      className="w-full h-40 object-cover"
                      alt={resource.title}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {resource.duration}
                    </div>
                    {resource.featured && (
                      <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {resource.category}
                      </span>
                      <span className="text-xs text-gray-500">{resource.language}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>

        {/* Language Support Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass-effect rounded-2xl p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Multilingual Support</h3>
          <p className="text-gray-600 mb-4">
            Our resources are available in multiple regional languages to ensure accessibility for all students.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['English', 'Hindi', 'Spanish', 'Mandarin', 'Arabic', 'French'].map((language) => (
              <span key={language} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {language}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourceHub;
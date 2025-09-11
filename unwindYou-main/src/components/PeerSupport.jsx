import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Plus, Search, Filter, Clock, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const PeerSupport = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [discussions, setDiscussions] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load discussions from localStorage
    const savedDiscussions = JSON.parse(localStorage.getItem('mindcare_discussions') || '[]');
    if (savedDiscussions.length === 0) {
      // Add some sample discussions
      const sampleDiscussions = [
        {
          id: 1,
          title: 'Dealing with exam anxiety',
          content: 'Hi everyone, I\'m struggling with severe anxiety before exams. Any tips that have worked for you?',
          author: 'Anonymous Student',
          category: 'Anxiety',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: 12,
          replies: 8,
          isAnonymous: true
        },
        {
          id: 2,
          title: 'Finding motivation during tough times',
          content: 'I\'ve been feeling really down lately and can\'t find motivation to do anything. How do you push through?',
          author: 'Anonymous Student',
          category: 'Depression',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          likes: 18,
          replies: 15,
          isAnonymous: true
        },
        {
          id: 3,
          title: 'Healthy sleep schedule tips',
          content: 'I\'ve been staying up too late and it\'s affecting my mental health. What are your best sleep hygiene tips?',
          author: 'Anonymous Student',
          category: 'Sleep',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          likes: 9,
          replies: 12,
          isAnonymous: true
        }
      ];
      localStorage.setItem('mindcare_discussions', JSON.stringify(sampleDiscussions));
      setDiscussions(sampleDiscussions);
    } else {
      setDiscussions(savedDiscussions);
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'Anxiety', name: 'Anxiety' },
    { id: 'Depression', name: 'Depression' },
    { id: 'Stress', name: 'Academic Stress' },
    { id: 'Sleep', name: 'Sleep Issues' },
    { id: 'Relationships', name: 'Relationships' },
    { id: 'General', name: 'General Support' }
  ];

  const volunteers = [
    {
      id: 1,
      name: 'Sarah M.',
      role: 'Peer Counselor',
      specialties: ['Anxiety', 'Academic Stress'],
      experience: '2 years',
      status: 'online',
      image: 'Friendly female student volunteer with warm smile'
    },
    {
      id: 2,
      name: 'Alex K.',
      role: 'Mental Health Advocate',
      specialties: ['Depression', 'Relationships'],
      experience: '1.5 years',
      status: 'online',
      image: 'Supportive male student volunteer in casual setting'
    },
    {
      id: 3,
      name: 'Maya P.',
      role: 'Wellness Coach',
      specialties: ['Sleep', 'General Support'],
      experience: '3 years',
      status: 'away',
      image: 'Caring female student volunteer with peaceful expression'
    }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both title and content are required to create a post.",
        variant: "destructive"
      });
      return;
    }

    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      content: newPostContent,
      author: 'Anonymous Student',
      category: 'General',
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: 0,
      isAnonymous: true
    };

    const updatedDiscussions = [newPost, ...discussions];
    setDiscussions(updatedDiscussions);
    localStorage.setItem('mindcare_discussions', JSON.stringify(updatedDiscussions));

    setNewPostTitle('');
    setNewPostContent('');

    toast({
      title: "✅ Post Created Successfully!",
      description: "Your anonymous post has been shared with the community."
    });
  };

  const handleLike = (discussionId) => {
    const updatedDiscussions = discussions.map(discussion =>
      discussion.id === discussionId
        ? { ...discussion, likes: discussion.likes + 1 }
        : discussion
    );
    setDiscussions(updatedDiscussions);
    localStorage.setItem('mindcare_discussions', JSON.stringify(updatedDiscussions));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="pt-24 pb-8 px-4 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Peer Support Community</h1>
          <p className="text-gray-600 text-lg">
            Connect with fellow students and trained volunteers in a safe, moderated environment
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-2 mb-8"
        >
          <div className="flex space-x-2">
            <Button
              variant={activeTab === 'discussions' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('discussions')}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Discussions
            </Button>
            <Button
              variant={activeTab === 'volunteers' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('volunteers')}
              className="flex-1"
            >
              <Users className="w-4 h-4 mr-2" />
              Volunteers
            </Button>
            <Button
              variant={activeTab === 'create' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('create')}
              className="flex-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </motion.div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Search and Filter */}
            <div className="glass-effect rounded-2xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Discussion List */}
            <div className="space-y-6">
              {filteredDiscussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="feature-card cursor-pointer"
                  onClick={() => toast({ title: "🚧 Discussion details feature coming soon!" })}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                          {discussion.title}
                        </h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {discussion.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{discussion.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatTimeAgo(discussion.timestamp)}
                          </span>
                          <span>by {discussion.author}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(discussion.id);
                            }}
                            className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{discussion.likes}</span>
                          </button>
                          <span className="flex items-center space-x-1 text-gray-500">
                            <MessageSquare className="w-4 h-4" />
                            <span>{discussion.replies}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredDiscussions.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No discussions found</h3>
                  <p className="text-gray-500">Try adjusting your search or create a new post</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteers.map((volunteer, index) => (
                <motion.div
                  key={volunteer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="feature-card"
                >
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img 
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                        alt={`${volunteer.name} profile photo`}
                       src="https://images.unsplash.com/photo-1542957057-debadce4ce81" />
                      <div className={`absolute bottom-0 right-1/2 transform translate-x-6 w-4 h-4 rounded-full border-2 border-white ${
                        volunteer.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{volunteer.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{volunteer.role}</p>
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {volunteer.specialties.map((specialty) => (
                          <span key={specialty} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">{volunteer.experience} experience</p>
                    <Button
                      className="w-full"
                      onClick={() => toast({ title: "🚧 Volunteer chat feature coming soon!" })}
                      disabled={volunteer.status !== 'online'}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {volunteer.status === 'online' ? 'Start Chat' : 'Currently Away'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 glass-effect rounded-2xl p-6 text-center"
            >
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Become a Volunteer</h3>
              <p className="text-gray-600 mb-4">
                Help fellow students by becoming a trained peer support volunteer
              </p>
              <Button onClick={() => toast({ title: "🚧 Volunteer application feature coming soon!" })}>
                Apply to Volunteer
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Create Post Tab */}
        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-effect rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Thoughts</h2>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-800">Anonymous Posting</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your post will be shared anonymously to protect your privacy while allowing you to connect with others.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your thoughts, experiences, or questions. Remember, this is a safe space for support and understanding."
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 resize-none"
                  />
                </div>

                <Button
                  onClick={handleCreatePost}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Share Anonymously
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 glass-effect rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be respectful and supportive of others</li>
                <li>• Keep discussions focused on mental health and wellness</li>
                <li>• Avoid sharing personal identifying information</li>
                <li>• Report any inappropriate content to moderators</li>
                <li>• Remember that peer support complements but doesn't replace professional help</li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PeerSupport;
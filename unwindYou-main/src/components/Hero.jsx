import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Mental Health</span>
              <br />
              <span className="text-gray-800">Support for Students</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              A comprehensive digital platform providing AI-guided support, confidential counseling, 
              and peer connections in a stigma-free environment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg">
              Get Support Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2">
              Learn More
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-effect rounded-3xl p-8 mb-8">
              <img 
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl floating-animation" 
                alt="Students using mental health support platform"
               src="https://images.unsplash.com/photo-1562893492-afd14ae24913" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Heart, label: 'AI Support', count: '24/7' },
              { icon: Shield, label: 'Confidential', count: '100%' },
              { icon: Users, label: 'Peer Network', count: '5000+' },
              { icon: Brain, label: 'Resources', count: '200+' },
            ].map((stat, index) => (
              <div key={index} className="stats-card text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-gray-800">{stat.count}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, BookOpen, Users, BarChart3, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Features = ({ onSectionChange }) => {
  const features = [
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'AI-Guided First Aid Support',
      description: 'Interactive chatbot offering immediate coping strategies and professional referrals when needed.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'booking',
      icon: Calendar,
      title: 'Confidential Booking System',
      description: 'Secure appointment scheduling with on-campus counselors and mental health helplines.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'resources',
      icon: BookOpen,
      title: 'Psychoeducational Hub',
      description: 'Videos, audio guides, and wellness resources available in multiple regional languages.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'peer-support',
      icon: Users,
      title: 'Peer Support Platform',
      description: 'Moderated community forums with trained student volunteers for peer-to-peer support.',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'admin',
      icon: BarChart3,
      title: 'Admin Dashboard',
      description: 'Anonymous analytics for authorities to identify trends and plan effective interventions.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'privacy',
      icon: Shield,
      title: 'Privacy & Security',
      description: 'End-to-end encryption and anonymous data handling to ensure complete confidentiality.',
      color: 'from-gray-500 to-slate-500',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Comprehensive Support</span>
            <br />
            <span className="text-gray-800">System Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform addresses the critical gap in mental health support for college students 
            through innovative technology and human-centered design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="feature-card group cursor-pointer"
              onClick={() => feature.id !== 'privacy' && onSectionChange(feature.id)}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              
              {feature.id !== 'privacy' && (
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-blue-50 transition-colors"
                >
                  Explore Feature
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Addressing Critical Mental Health Challenges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Current Problems:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Lack of structured intervention systems</li>
                  <li>• Limited early detection tools</li>
                  <li>• Stigma preventing help-seeking</li>
                  <li>• Under-utilization of counseling centers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Our Solutions:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Scalable digital intervention platform</li>
                  <li>• AI-powered early detection</li>
                  <li>• Anonymous, stigma-free support</li>
                  <li>• Data-driven policy framework</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
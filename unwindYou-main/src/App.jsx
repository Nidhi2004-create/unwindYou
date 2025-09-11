import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ChatBot from '@/components/ChatBot';
import BookingSystem from '@/components/BookingSystem';
import ResourceHub from '@/components/ResourceHub';
import PeerSupport from '@/components/PeerSupport';
import AdminDashboard from '@/components/AdminDashboard';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatBot />;
      case 'booking':
        return <BookingSystem />;
      case 'resources':
        return <ResourceHub />;
      case 'peer-support':
        return <PeerSupport />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <>
            <Hero />
            <Features onSectionChange={setActiveSection} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>MindCare - Digital Mental Health Support for Students</title>
        <meta name="description" content="Comprehensive digital psychological intervention system providing AI-guided support, confidential counseling, and peer connections for college students." />
      </Helmet>
      
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {renderSection()}
      </motion.main>
      
      <Toaster />
    </div>
  );
}

export default App;
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, AlertTriangle, Phone, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm here to provide mental health support and coping strategies. How are you feeling today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses = {
    anxiety: "I understand you're feeling anxious. Here are some immediate coping strategies:\n\n• Try the 4-7-8 breathing technique\n• Ground yourself using the 5-4-3-2-1 method\n• Practice progressive muscle relaxation\n\nWould you like me to guide you through any of these techniques?",
    depression: "I hear that you're going through a difficult time. Remember that these feelings are temporary:\n\n• Reach out to trusted friends or family\n• Maintain a daily routine\n• Engage in small, achievable activities\n• Consider speaking with a counselor\n\nYou're not alone in this. Would you like help booking a session with a counselor?",
    stress: "Academic stress is very common. Let's work on some strategies:\n\n• Break large tasks into smaller steps\n• Use time management techniques\n• Take regular breaks\n• Practice mindfulness\n\nWhat specific area is causing you the most stress?",
    sleep: "Sleep issues can significantly impact mental health. Here are some tips:\n\n• Maintain a consistent sleep schedule\n• Create a relaxing bedtime routine\n• Limit screen time before bed\n• Avoid caffeine late in the day\n\nHave you noticed any patterns in your sleep difficulties?",
    crisis: "I'm concerned about what you're sharing. Please know that help is available:\n\n🚨 Emergency: Call 911\n📞 Crisis Hotline: 988 (Suicide & Crisis Lifeline)\n💬 Text HOME to 741741 (Crisis Text Line)\n\nWould you like me to help you connect with immediate professional support?",
    default: "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what you're experiencing? I can provide coping strategies, resources, or help you connect with professional support."
  };

  const detectCrisisKeywords = (message) => {
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self-harm', 'die', 'hopeless'];
    return crisisKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (detectCrisisKeywords(message)) {
      return aiResponses.crisis;
    } else if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried')) {
      return aiResponses.anxiety;
    } else if (message.includes('depressed') || message.includes('depression') || message.includes('sad')) {
      return aiResponses.depression;
    } else if (message.includes('stress') || message.includes('overwhelmed') || message.includes('pressure')) {
      return aiResponses.stress;
    } else if (message.includes('sleep') || message.includes('insomnia') || message.includes('tired')) {
      return aiResponses.sleep;
    } else {
      return aiResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: 'Breathing Exercise', action: () => toast({ title: "🧘‍♀️ Breathing exercises feature coming soon!" }) },
    { label: 'Book Counselor', action: () => toast({ title: "📅 Counselor booking feature coming soon!" }) },
    { label: 'Crisis Resources', action: () => toast({ title: "🆘 Crisis resources feature coming soon!" }) },
    { label: 'Peer Support', action: () => toast({ title: "👥 Peer support feature coming soon!" }) },
  ];

  return (
    <div className="pt-24 pb-8 px-4 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">AI Mental Health Support</h1>
          <p className="text-gray-600 text-lg">
            Get immediate support and coping strategies in a safe, confidential environment
          </p>
        </motion.div>

        <div className="glass-effect rounded-3xl overflow-hidden shadow-2xl">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">MindCare AI Assistant</h3>
                <p className="text-sm opacity-90">Always here to help • Completely confidential</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-white/50">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`chat-bubble ${message.type} max-w-md`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'ai' && (
                        <Bot className="w-5 h-5 mt-1 text-blue-500" />
                      )}
                      {message.type === 'user' && (
                        <User className="w-5 h-5 mt-1 text-white" />
                      )}
                      <div className="flex-1">
                        <p className="whitespace-pre-line">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="chat-bubble ai">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-blue-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/20">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="text-xs"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/20">
            <div className="flex space-x-4">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind... I'm here to listen and help."
                className="flex-1 resize-none rounded-xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                rows="2"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Crisis Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800">Crisis Resources</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <Phone className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">Emergency</p>
              <p className="text-red-600 text-lg font-bold">911</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Heart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">Crisis Lifeline</p>
              <p className="text-blue-600 text-lg font-bold">988</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Bot className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">Crisis Text</p>
              <p className="text-green-600 text-lg font-bold">Text HOME to 741741</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatBot;
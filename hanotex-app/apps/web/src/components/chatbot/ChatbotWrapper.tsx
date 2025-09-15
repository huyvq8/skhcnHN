'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import IntelligentChatbot from './IntelligentChatbot';
import SimpleChatbot from './SimpleChatbot';

export default function ChatbotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  // Auto-open chatbot for new users on register page
  useEffect(() => {
    if (pathname === '/technologies/register') {
      const hasSeenRegisterChatbot = localStorage.getItem('hanotex-register-chatbot-seen');
      if (!hasSeenRegisterChatbot) {
        setTimeout(() => {
          setIsOpen(true);
          localStorage.setItem('hanotex-register-chatbot-seen', 'true');
        }, 2000); // Show after 2 seconds for register page
      }
    }
  }, [pathname]);

  const isRegisterPage = pathname === '/technologies/register';

  // For register page - specialized chatbot for product registration
  if (isRegisterPage) {
    return (
      <IntelligentChatbot 
        isOpen={isOpen} 
        onToggle={() => setIsOpen(!isOpen)}
        context="register"
      />
    );
  }

  // For general pages - general support chatbot
  return (
    <SimpleChatbot 
      isOpen={isOpen} 
      onToggle={() => setIsOpen(!isOpen)}
      context="general"
      isAuthenticated={isAuthenticated}
    />
  );
}
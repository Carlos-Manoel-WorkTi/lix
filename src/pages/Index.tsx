
import React, { useState } from 'react';
import Lix from '@/components/Lix';
import ChatBox from '@/components/ChatBox';
import UserInfo from '@/components/UserInfo';
import { getLixResponse } from '@/components/LixResponses';
import { useUserAccount } from '@/hooks/useUserAccount';

const Index = () => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isResponding, setIsResponding] = useState(false);
  const { userAccount, updateUserName, incrementInteractions } = useUserAccount();

  const handleSendMessage = (userMessage: string) => {
    setIsResponding(true);
    incrementInteractions();
    
    // Simula um pequeno delay para parecer que a Lix está pensando
    setTimeout(() => {
      const response = getLixResponse(userMessage);
      setCurrentMessage(response);
    }, 800);
  };

  const handleMessageComplete = () => {
    setCurrentMessage('');
    setIsResponding(false);
  };

  const quickMessages = ['Oi!', 'Como vai?', 'Vamos brincar?', 'Qual sua cor favorita?', 'Conte uma história'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 flex flex-col p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text mb-1 sm:mb-2 leading-tight">
          Conheça a Lix! 🎀
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
          Sua boneca virtual favorita está aqui para conversar com você!
        </p>
      </div>

      {/* User Info */}
      <UserInfo 
        userAccount={userAccount}
        onUpdateName={updateUserName}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative mb-6">
        {/* Lix Container */}
        <div className="relative">
          <Lix 
            message={currentMessage} 
            onMessageComplete={handleMessageComplete}
          />
        </div>

        {/* Status da Lix */}
        {isResponding && (
          <div className="mt-6 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 shadow-lg border-2 border-pink-200">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-xs sm:text-sm text-pink-600 ml-1 sm:ml-2 font-medium">Lix está pensando...</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section - Quick Messages and Chat */}
      <div className="w-full max-w-md mx-auto space-y-4">
        {/* Quick Messages */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-3 flex items-center justify-center gap-1">
            <span>💡</span>
            <span>Sugestões de conversa:</span>
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {quickMessages.map((tip, index) => (
              <button
                key={index}
                onClick={() => !isResponding && handleSendMessage(tip)}
                disabled={isResponding}
                className="px-2 py-1 sm:px-3 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-full text-xs sm:text-sm text-pink-600 hover:bg-pink-50 hover:border-pink-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {tip}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Box */}
        <ChatBox 
          onSendMessage={handleSendMessage}
          disabled={isResponding}
        />

        {/* Tip */}
        <div className="text-center">
          <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <span>🎯 Clique na Lix para vê-la se mover!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

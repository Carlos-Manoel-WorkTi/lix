
import React, { useState } from 'react';
import Lix from '@/components/Lix';
import ChatBox from '@/components/ChatBox';
import { getLixResponse } from '@/components/LixResponses';

const Index = () => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isResponding, setIsResponding] = useState(false);

  const handleSendMessage = (userMessage: string) => {
    setIsResponding(true);
    
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
      {/* Header - Responsivo */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text mb-1 sm:mb-2 leading-tight">
          Conheça a Lix! 🎀
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
          Sua boneca virtual favorita está aqui para conversar com você!
        </p>
      </div>

      {/* Lix Container - Responsivo */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8 relative">
        <div className="relative z-10">
          <Lix 
            message={currentMessage} 
            onMessageComplete={handleMessageComplete}
          />
        </div>

        {/* Status da Lix - Melhorado para mobile */}
        {isResponding && (
          <div className="text-center animate-fade-in">
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

      {/* Chat Box */}
      <div className="w-full px-2 sm:px-4">
        <ChatBox 
          onSendMessage={handleSendMessage}
          disabled={isResponding}
        />
      </div>

      {/* Dicas - Melhorado para mobile */}
      <div className="mt-4 sm:mt-6 text-center max-w-xs sm:max-w-md md:max-w-lg px-2">
        <p className="text-xs sm:text-sm text-gray-500 mb-2 flex items-center justify-center gap-1">
          <span>💡</span>
          <span>Dicas do que falar com a Lix:</span>
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {['Oi!', 'Como vai?', 'Vamos brincar?', 'Qual sua cor favorita?', 'Conte uma história'].map((tip, index) => (
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
        
        <div className="mt-3 sm:mt-4 text-xs text-gray-400 flex items-center justify-center gap-1">
          <span>🎯 Clique na Lix para vê-la se mover!</span>
        </div>
      </div>
    </div>
  );
};

export default Index;


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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text mb-2">
          Conheça a Lix! 🎀
        </h1>
        <p className="text-gray-600 text-lg">
          Sua boneca virtual favorita está aqui para conversar com você!
        </p>
      </div>

      {/* Lix Container */}
      <div className="flex flex-col items-center gap-8 mb-8">
        <div className="relative">
          <Lix 
            message={currentMessage} 
            onMessageComplete={handleMessageComplete}
          />
          
          {/* Efeitos decorativos */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute -top-2 -right-6 w-6 h-6 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute -bottom-2 -left-6 w-4 h-4 bg-purple-300 rounded-full animate-ping opacity-60"></div>
        </div>

        {/* Status da Lix */}
        {isResponding && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md border-2 border-pink-200">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-sm text-pink-600 ml-2">Lix está pensando...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Box */}
      <ChatBox 
        onSendMessage={handleSendMessage}
        disabled={isResponding}
      />

      {/* Dicas */}
      <div className="mt-6 text-center max-w-md">
        <p className="text-sm text-gray-500 mb-2">💡 Dicas do que falar com a Lix:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['Oi!', 'Como vai?', 'Vamos brincar?', 'Qual sua cor favorita?', 'Conte uma história'].map((tip, index) => (
            <button
              key={index}
              onClick={() => !isResponding && handleSendMessage(tip)}
              disabled={isResponding}
              className="px-3 py-1 bg-white border border-pink-200 rounded-full text-xs text-pink-600 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {tip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

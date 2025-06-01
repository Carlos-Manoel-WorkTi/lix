
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LixProps {
  message?: string;
  onMessageComplete?: () => void;
}

const Lix: React.FC<LixProps> = ({ message, onMessageComplete }) => {
  const [currentExpression, setCurrentExpression] = useState<'normal' | 'happy' | 'excited' | 'thinking' | 'winking'>('normal');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      setIsAnimating(true);
      setCurrentExpression('excited');
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setCurrentExpression('normal');
        setShowMessage(false);
        onMessageComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, onMessageComplete]);

  const getEyeExpression = () => {
    switch (currentExpression) {
      case 'happy':
      case 'excited':
        return '◕ ◕';
      case 'thinking':
        return '◔ ◔';
      case 'winking':
        return '◕ ◡';
      default:
        return '● ●';
    }
  };

  const getMouthExpression = () => {
    switch (currentExpression) {
      case 'happy':
        return 'ᵕ';
      case 'excited':
        return 'ᗢ';
      case 'thinking':
        return '〰';
      case 'winking':
        return 'ᵕ';
      default:
        return '◡';
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Balão de fala */}
      {showMessage && message && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white border-2 border-pink-300 rounded-xl p-3 shadow-lg animate-bounce z-10">
          <div className="text-sm text-gray-700 whitespace-nowrap max-w-48 overflow-hidden text-ellipsis">
            {message}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pink-300"></div>
          </div>
        </div>
      )}

      {/* Corpo da Lix */}
      <div 
        className={cn(
          "relative bg-gradient-to-br from-pink-200 to-pink-300 rounded-full w-40 h-40 shadow-lg transition-all duration-500",
          isAnimating && "animate-pulse scale-110",
          !isAnimating && "hover:scale-105 hover:shadow-xl"
        )}
      >
        {/* Bochecha esquerda */}
        <div className="absolute top-20 left-6 w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>
        
        {/* Bochecha direita */}
        <div className="absolute top-20 right-6 w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>

        {/* Olhos */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-700">
          {getEyeExpression()}
        </div>

        {/* Boca */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-xl text-gray-700">
          {getMouthExpression()}
        </div>

        {/* Cabelo */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-t-full"></div>
        
        {/* Laço no cabelo */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 translate-x-8">
          <div className="w-8 h-6 bg-yellow-400 rounded-full relative">
            <div className="absolute inset-1 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Braços */}
      <div className={cn(
        "absolute top-24 -left-8 w-12 h-8 bg-pink-200 rounded-full transform transition-transform duration-300",
        isAnimating && "rotate-12"
      )}></div>
      <div className={cn(
        "absolute top-24 -right-8 w-12 h-8 bg-pink-200 rounded-full transform transition-transform duration-300",
        isAnimating && "-rotate-12"
      )}></div>

      {/* Pernas */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex gap-4">
        <div className="w-8 h-12 bg-pink-200 rounded-full"></div>
        <div className="w-8 h-12 bg-pink-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default Lix;

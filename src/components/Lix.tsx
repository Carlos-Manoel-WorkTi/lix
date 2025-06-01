
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLixMovements } from '@/hooks/useLixMovements';

interface LixProps {
  message?: string;
  onMessageComplete?: () => void;
}

const Lix: React.FC<LixProps> = ({ message, onMessageComplete }) => {
  const [currentExpression, setCurrentExpression] = useState<'normal' | 'happy' | 'excited' | 'thinking' | 'winking' | 'sleepy'>('normal');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const { currentMovement, triggerClickMovement, setIsAutoMoving } = useLixMovements();

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      setIsAnimating(true);
      setCurrentExpression('excited');
      setIsAutoMoving(false);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setCurrentExpression('normal');
        setShowMessage(false);
        setIsAutoMoving(true);
        onMessageComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, onMessageComplete, setIsAutoMoving]);

  const handleLixClick = () => {
    setClickCount(prev => prev + 1);
    triggerClickMovement();
    
    // Expressões especiais baseadas nos cliques
    if (clickCount % 5 === 4) {
      setCurrentExpression('winking');
      setTimeout(() => setCurrentExpression('normal'), 1500);
    } else if (clickCount % 3 === 2) {
      setCurrentExpression('happy');
      setTimeout(() => setCurrentExpression('normal'), 1000);
    }
  };

  const getEyeExpression = () => {
    switch (currentExpression) {
      case 'happy':
      case 'excited':
        return '◕ ◕';
      case 'thinking':
        return '◔ ◔';
      case 'winking':
        return '◕ ◡';
      case 'sleepy':
        return '− −';
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
      case 'sleepy':
        return '〰';
      default:
        return '◡';
    }
  };

  const getMovementClasses = () => {
    if (!currentMovement) return '';
    
    switch (currentMovement) {
      case 'bounce':
        return 'animate-bounce';
      case 'wiggle':
        return 'animate-pulse';
      case 'spin':
        return 'animate-spin';
      case 'pulse':
        return 'animate-pulse';
      case 'shake':
        return 'animate-bounce';
      case 'happy':
        return 'animate-pulse scale-110';
      case 'excited':
        return 'animate-bounce scale-105';
      case 'sleepy':
        return 'opacity-70';
      default:
        return '';
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Balão de fala - Melhorado para mobile */}
      {showMessage && message && (
        <div className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 bg-white border-2 border-pink-300 rounded-2xl p-2 sm:p-3 shadow-xl animate-bounce z-10 max-w-[280px] sm:max-w-xs">
          <div className="text-xs sm:text-sm text-gray-700 text-center leading-tight">
            {message}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 sm:border-l-8 sm:border-r-8 sm:border-t-8 border-l-transparent border-r-transparent border-t-pink-300"></div>
          </div>
        </div>
      )}

      {/* Efeitos decorativos flutuantes - Responsivos */}
      <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-4 h-4 sm:w-8 sm:h-8 bg-yellow-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
      <div className="absolute -top-1 sm:-top-2 -right-3 sm:-right-6 w-3 h-3 sm:w-6 sm:h-6 bg-pink-300 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute -bottom-1 sm:-bottom-2 -left-3 sm:-left-6 w-2 h-2 sm:w-4 sm:h-4 bg-purple-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-4 sm:top-8 -right-1 sm:-right-2 w-3 h-3 sm:w-5 sm:h-5 bg-blue-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s' }}></div>

      {/* Corpo da Lix - Mais redondo e sem braços/pernas */}
      <div 
        onClick={handleLixClick}
        className={cn(
          "relative bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 rounded-full shadow-2xl transition-all duration-500 cursor-pointer select-none",
          "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48",
          "hover:shadow-pink-300/50 hover:scale-105 active:scale-95",
          isAnimating && "animate-pulse scale-110",
          getMovementClasses()
        )}
        style={{
          background: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 40%, #ec4899 100%)',
          boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
        }}
      >
        {/* Brilho interno */}
        <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
        
        {/* Bochechas - Responsivas */}
        <div className="absolute top-16 sm:top-20 md:top-24 left-4 sm:left-6 md:left-8 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-pink-400 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-16 sm:top-20 md:top-24 right-4 sm:right-6 md:right-8 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-pink-400 rounded-full opacity-70 animate-pulse"></div>

        {/* Olhos - Responsivos */}
        <div className="absolute top-8 sm:top-12 md:top-14 left-1/2 transform -translate-x-1/2 text-lg sm:text-2xl md:text-3xl font-bold text-gray-700 tracking-wider">
          {getEyeExpression()}
        </div>

        {/* Boca - Responsiva */}
        <div className="absolute top-16 sm:top-24 md:top-28 left-1/2 transform -translate-x-1/2 text-base sm:text-xl md:text-2xl text-gray-700">
          {getMouthExpression()}
        </div>

        {/* Cabelo melhorado */}
        <div className="absolute -top-1 sm:-top-2 md:-top-3 left-1/2 transform -translate-x-1/2 w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-t-full shadow-lg"></div>
        
        {/* Mechas do cabelo */}
        <div className="absolute -top-0.5 sm:-top-1 left-1/2 transform -translate-x-1/2 translate-x-2 sm:translate-x-3 w-3 h-6 sm:w-4 sm:h-8 md:w-5 md:h-10 bg-purple-300 rounded-full opacity-80"></div>
        <div className="absolute -top-0.5 sm:-top-1 left-1/2 transform -translate-x-1/2 -translate-x-2 sm:-translate-x-3 w-2 h-4 sm:w-3 sm:h-6 md:w-4 md:h-8 bg-purple-300 rounded-full opacity-80"></div>
        
        {/* Laço no cabelo melhorado */}
        <div className="absolute top-0 sm:-top-1 left-1/2 transform -translate-x-1/2 translate-x-6 sm:translate-x-8 md:translate-x-10">
          <div className="relative">
            <div className="w-6 h-4 sm:w-8 sm:h-6 md:w-10 md:h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-md"></div>
            <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-2 sm:w-1.5 sm:h-3 bg-yellow-600 rounded-full"></div>
          </div>
        </div>

        {/* Reflexo de luz */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 bg-white/40 rounded-full blur-sm"></div>
      </div>

      {/* Contador de cliques */}
      {clickCount > 0 && (
        <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-pink-600 opacity-70">
          Cliques: {clickCount}
        </div>
      )}
    </div>
  );
};

export default Lix;

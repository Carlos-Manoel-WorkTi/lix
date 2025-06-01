
import { useState, useEffect, useCallback } from 'react';

type MovementType = 'bounce' | 'wiggle' | 'spin' | 'pulse' | 'shake' | 'happy' | 'excited' | 'sleepy';

export const useLixMovements = () => {
  const [currentMovement, setCurrentMovement] = useState<MovementType | null>(null);
  const [isAutoMoving, setIsAutoMoving] = useState(true);

  const movements: MovementType[] = ['bounce', 'wiggle', 'pulse', 'shake', 'happy'];

  const triggerMovement = useCallback((movement: MovementType) => {
    setCurrentMovement(movement);
    setTimeout(() => {
      setCurrentMovement(null);
    }, 2000);
  }, []);

  const triggerRandomMovement = useCallback(() => {
    const randomMovement = movements[Math.floor(Math.random() * movements.length)];
    triggerMovement(randomMovement);
  }, [movements, triggerMovement]);

  const triggerClickMovement = useCallback(() => {
    const clickMovements: MovementType[] = ['spin', 'excited', 'happy', 'bounce'];
    const randomClick = clickMovements[Math.floor(Math.random() * clickMovements.length)];
    triggerMovement(randomClick);
  }, [triggerMovement]);

  // Movimento automático aleatório
  useEffect(() => {
    if (!isAutoMoving) return;
    
    const interval = setInterval(() => {
      if (!currentMovement && Math.random() > 0.7) {
        triggerRandomMovement();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentMovement, isAutoMoving, triggerRandomMovement]);

  return {
    currentMovement,
    triggerClickMovement,
    triggerRandomMovement,
    triggerMovement,
    setIsAutoMoving
  };
};

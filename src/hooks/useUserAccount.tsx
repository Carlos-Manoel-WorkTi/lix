import { useState, useEffect } from 'react';

interface UserAccount {
  name: string;
  level: number;
  consecutiveDays: number;
  lastLoginDate: string;
  totalInteractions: number;
}

export const useUserAccount = () => {
  const [userAccount, setUserAccount] = useState<UserAccount>({
    name: 'Usuário',
    level: 1,
    consecutiveDays: 0,
    lastLoginDate: '',
    totalInteractions: 0
  });

  useEffect(() => {
    // Load user data from localStorage
    const savedAccount = localStorage.getItem('lixUserAccount');
    if (savedAccount) {
      const parsed = JSON.parse(savedAccount);
      setUserAccount(parsed);
      
      // Check consecutive days
      const today = new Date().toDateString();
      const lastLogin = new Date(parsed.lastLoginDate).toDateString();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();
      
      if (lastLogin === today) {
        // Same day, no update needed
        return;
      } else if (lastLogin === yesterdayStr) {
        // Consecutive day
        const newConsecutiveDays = parsed.consecutiveDays + 1;
        const newLevel = Math.floor(newConsecutiveDays / 7) + 1; // Level up every 7 days
        
        const updatedAccount = {
          ...parsed,
          consecutiveDays: newConsecutiveDays,
          level: newLevel,
          lastLoginDate: today
        };
        
        setUserAccount(updatedAccount);
        localStorage.setItem('lixUserAccount', JSON.stringify(updatedAccount));
      } else {
        // Lost streak, restart but keep total interactions
        const updatedAccount = {
          ...parsed,
          consecutiveDays: 1,
          level: 1,
          lastLoginDate: today
        };
        
        setUserAccount(updatedAccount);
        localStorage.setItem('lixUserAccount', JSON.stringify(updatedAccount));
      }
    } else {
      // New user
      const today = new Date().toDateString();
      const newAccount = {
        ...userAccount,
        consecutiveDays: 1,
        lastLoginDate: today
      };
      
      setUserAccount(newAccount);
      localStorage.setItem('lixUserAccount', JSON.stringify(newAccount));
    }
  }, []);

  const updateUserName = (newName: string) => {
    const updatedAccount = { ...userAccount, name: newName };
    setUserAccount(updatedAccount);
    localStorage.setItem('lixUserAccount', JSON.stringify(updatedAccount));
  };

  const incrementInteractions = () => {
    const updatedAccount = { 
      ...userAccount, 
      totalInteractions: userAccount.totalInteractions + 1 
    };
    setUserAccount(updatedAccount);
    localStorage.setItem('lixUserAccount', JSON.stringify(updatedAccount));
  };

  return {
    userAccount,
    updateUserName,
    incrementInteractions
  };
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Heart } from 'lucide-react';

interface ChatBoxProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-200 shadow-xl p-3 sm:p-4">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 animate-pulse" />
        <h3 className="text-base sm:text-lg font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-center">
          Converse com a Lix!
        </h3>
        <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 animate-pulse" />
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={disabled}
          className="flex-1 border-pink-200 focus:border-pink-400 focus:ring-pink-400 rounded-xl text-sm sm:text-base bg-white/80"
          maxLength={100}
        />
        
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
          size="icon"
        >
          <Send className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </form>
      
      <div className="mt-2 text-xs text-center text-gray-500 flex items-center justify-center gap-1">
        <span>Lix está pronta para brincar!</span>
        <span className="animate-bounce">🎀</span>
      </div>
    </div>
  );
};

export default ChatBox;

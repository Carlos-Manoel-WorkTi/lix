
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

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
    <div className="w-full max-w-md mx-auto bg-white rounded-lg border-2 border-pink-200 shadow-lg p-4">
      <h3 className="text-lg font-semibold text-pink-600 mb-3 text-center">
        Converse com a Lix! 💕
      </h3>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={disabled}
          className="flex-1 border-pink-200 focus:border-pink-400"
          maxLength={50}
        />
        
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="bg-pink-500 hover:bg-pink-600 text-white"
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="mt-2 text-xs text-gray-500 text-center">
        Lix está pronta para conversar! 🎀
      </div>
    </div>
  );
};

export default ChatBox;

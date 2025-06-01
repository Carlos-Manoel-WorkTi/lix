
import React, { useState } from 'react';
import { User, Edit2, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UserInfoProps {
  userAccount: {
    name: string;
    level: number;
    consecutiveDays: number;
    totalInteractions: number;
  };
  onUpdateName: (name: string) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ userAccount, onUpdateName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userAccount.name);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempName(userAccount.name);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-purple-200 shadow-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-purple-600" />
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="h-8 text-sm border-purple-300"
                maxLength={20}
                autoFocus
              />
              <Button size="sm" onClick={handleSaveName} className="h-8 px-2">
                ✓
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 px-2">
                ✕
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-bold text-purple-700">{userAccount.name}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6 p-0"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="h-3 w-3 text-yellow-600" />
            <span className="text-xs font-bold text-yellow-700">Nível</span>
          </div>
          <div className="text-lg font-bold text-yellow-800">{userAccount.level}</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-2">
          <div className="text-xs font-bold text-green-700 mb-1">Sequência</div>
          <div className="text-lg font-bold text-green-800">{userAccount.consecutiveDays}</div>
          <div className="text-xs text-green-600">dias</div>
        </div>
        
        <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-2">
          <div className="text-xs font-bold text-pink-700 mb-1">Conversas</div>
          <div className="text-lg font-bold text-pink-800">{userAccount.totalInteractions}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

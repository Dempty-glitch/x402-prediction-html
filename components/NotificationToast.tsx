import React, { useEffect } from 'react';
import { Bell, X } from 'lucide-react';

interface NotificationToastProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right fade-in duration-300 w-80">
      <div className="bg-crypto-card border border-crypto-accent/30 rounded-xl shadow-2xl shadow-black p-4 flex gap-3 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-crypto-accent"></div>
        
        <div className="mt-1">
          <div className="w-8 h-8 rounded-full bg-crypto-accent/20 flex items-center justify-center text-crypto-accent">
            <Bell className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-bold text-white">{title}</h4>
          <p className="text-xs text-gray-400 mt-1">{message}</p>
        </div>

        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

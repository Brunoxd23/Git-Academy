import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Trophy, ArrowUp, Info } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'level-up' | 'achievement' | 'ranking' | 'info';
  message: string;
  timestamp: any;
  read: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

export function NotificationCenter({ notifications, onClose, onMarkAsRead }: NotificationCenterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 mt-2 w-80 bg-[#0D1117] border border-zinc-800 rounded-2xl shadow-2xl z-[60] overflow-hidden"
    >
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Bell size={16} className="text-emerald-400" /> Notificações
        </h3>
        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 hover:bg-zinc-900/50 transition-colors cursor-pointer ${!notif.read ? 'bg-emerald-500/5' : ''}`}
                onClick={() => onMarkAsRead(notif.id)}
              >
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    notif.type === 'level-up' ? 'bg-emerald-500/10 text-emerald-400' :
                    notif.type === 'achievement' ? 'bg-amber-500/10 text-amber-400' :
                    notif.type === 'ranking' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-zinc-800 text-zinc-400'
                  }`}>
                    {notif.type === 'level-up' && <ArrowUp size={16} />}
                    {notif.type === 'achievement' && <Trophy size={16} />}
                    {notif.type === 'ranking' && <Medal size={16} />}
                    {notif.type === 'info' && <Info size={16} />}
                  </div>
                  <div className="space-y-1">
                    <p className={`text-xs ${!notif.read ? 'text-white font-bold' : 'text-zinc-300'}`}>
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-zinc-500">
                      {notif.timestamp?.toDate ? notif.timestamp.toDate().toLocaleString() : 'Recentemente'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Bell className="mx-auto text-zinc-800 mb-2" size={32} />
            <p className="text-xs text-zinc-500 italic">Tudo limpo por aqui!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Medal({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2" />
    </svg>
  );
}

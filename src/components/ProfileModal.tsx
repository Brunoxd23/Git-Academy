import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Medal, BookOpen, Star, User as UserIcon } from 'lucide-react';

interface UserProfile {
  uid: string;
  displayName: string;
  photoURL?: string;
  xp: number;
  completedLessons?: string[];
  achievements?: string[];
}

interface ProfileModalProps {
  user: UserProfile | null;
  onClose: () => void;
}

export function ProfileModal({ user, onClose }: ProfileModalProps) {
  if (!user) return null;

  const level = Math.floor(user.xp / 100) + 1;
  const progressToNext = user.xp % 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#0D1117] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="h-32 bg-gradient-to-r from-emerald-600 to-blue-600" />
          
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6 flex items-end justify-between">
              <div className="relative">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="w-24 h-24 rounded-2xl border-4 border-[#0D1117] shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-zinc-800 border-4 border-[#0D1117] flex items-center justify-center text-zinc-500 shadow-xl">
                    <UserIcon size={40} />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                  Lvl {level}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{user.displayName}</h2>
                <p className="text-zinc-500 text-sm">Estudante na GitAcademy</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-center">
                  <Star className="text-amber-400 mx-auto mb-1" size={20} />
                  <p className="text-xl font-mono font-bold text-white">{user.xp}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">XP Total</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-center">
                  <BookOpen className="text-emerald-400 mx-auto mb-1" size={20} />
                  <p className="text-xl font-mono font-bold text-white">{user.completedLessons?.length || 0}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Lições</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-center">
                  <Trophy className="text-blue-400 mx-auto mb-1" size={20} />
                  <p className="text-xl font-mono font-bold text-white">{user.achievements?.length || 0}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Medalhas</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Medal size={16} className="text-amber-400" /> Conquistas Recentes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.achievements && user.achievements.length > 0 ? (
                    user.achievements.map((ach, i) => (
                      <div key={i} className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-zinc-300 flex items-center gap-2">
                        <Trophy size={12} className="text-amber-500" /> {ach}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-600 italic">Nenhuma conquista ainda.</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <div className="flex justify-between text-xs font-bold text-zinc-500 mb-2">
                  <span>PROGRESSO PARA NÍVEL {level + 1}</span>
                  <span>{progressToNext}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000" 
                    style={{ width: `${progressToNext}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

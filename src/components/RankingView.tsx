import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { motion } from 'motion/react';
import { Trophy, Medal, Crown, User as UserIcon, ExternalLink } from 'lucide-react';
import { ProfileModal } from './ProfileModal';

interface RankingUser {
  uid: string;
  displayName: string;
  photoURL?: string;
  xp: number;
  completedLessons?: string[];
  achievements?: string[];
}

export function RankingView() {
  const [users, setUsers] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<RankingUser | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(10));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rankingData = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as RankingUser[];
      setUsers(rankingData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users');
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      
      <div>
        <h2 className="text-3xl font-bold text-white">Ranking Global</h2>
        <p className="text-zinc-500">Os melhores alunos da GitAcademy. Clique em um perfil para ver detalhes.</p>
      </div>

      <div className="grid gap-4">
        {users.map((user, index) => (
          <motion.div
            key={user.uid}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group ${
              index === 0 
                ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20 hover:bg-emerald-500/20' 
                : 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="w-8 text-center font-mono font-bold text-zinc-500">
                {index === 0 && <Crown className="text-amber-400 mx-auto" size={20} />}
                {index === 1 && <Medal className="text-zinc-300 mx-auto" size={20} />}
                {index === 2 && <Medal className="text-amber-700 mx-auto" size={20} />}
                {index > 2 && `#${index + 1}`}
              </div>
              
              <div className="flex items-center gap-4">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full border-2 border-zinc-800" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                    <UserIcon size={24} />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold">{user.displayName}</p>
                    <ExternalLink size={12} className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Nível {Math.floor(user.xp / 100) + 1}</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-mono font-bold text-emerald-400">{user.xp}</p>
              <p className="text-[10px] text-zinc-500 uppercase font-bold">XP TOTAL</p>
            </div>
          </motion.div>
        ))}

        {users.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
            <Trophy className="mx-auto text-zinc-700 mb-4" size={48} />
            <p className="text-zinc-500 italic">Nenhum usuário no ranking ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { GitCommit, User, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
  branch: string;
}

interface CommitHistoryProps {
  commits: Commit[];
}

export const CommitHistory: React.FC<CommitHistoryProps> = ({ commits }) => {
  if (commits.length === 0) {
    return (
      <div className="p-12 text-center bg-zinc-900/50 border border-zinc-800 rounded-3xl border-dashed">
        <GitCommit className="mx-auto text-zinc-700 mb-4" size={48} />
        <p className="text-zinc-500">Nenhum commit realizado ainda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <GitCommit size={20} className="text-emerald-400" /> Histórico de Commits
        </h3>
        <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
          {commits.length} commits
        </span>
      </div>

      <div className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
        {commits.slice().reverse().map((commit, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={commit.id} 
            className="relative pl-12 group"
          >
            <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center z-10 group-hover:border-emerald-500 transition-colors">
              <GitCommit size={18} className="text-zinc-500 group-hover:text-emerald-400" />
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-zinc-700 transition-all shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">{commit.message}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5"><User size={14} /> {commit.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {commit.date}</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md font-mono">{commit.branch}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-black px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 font-mono">
                    {commit.id.substring(0, 7)}
                  </code>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

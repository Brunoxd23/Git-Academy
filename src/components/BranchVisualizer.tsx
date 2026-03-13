import React from 'react';
import { GitBranch, GitMerge, GitPullRequest } from 'lucide-react';
import { motion } from 'motion/react';

interface Branch {
  name: string;
  isCurrent: boolean;
}

interface BranchVisualizerProps {
  branches: Branch[];
  currentBranch: string;
}

export const BranchVisualizer: React.FC<BranchVisualizerProps> = ({ branches, currentBranch }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <GitBranch size={20} className="text-blue-400" /> Branches Ativas
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map((branch) => (
          <motion.div 
            key={branch.name}
            whileHover={{ scale: 1.02 }}
            className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${
              branch.name === currentBranch 
                ? 'bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/5' 
                : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                branch.name === currentBranch ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'
              }`}>
                <GitBranch size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold">{branch.name}</h4>
                <p className="text-xs text-zinc-500">{branch.name === currentBranch ? 'Branch atual' : 'Disponível'}</p>
              </div>
            </div>
            {branch.name === currentBranch && (
              <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Active
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-4">
        <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Ações de Branch</h4>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-sm transition-all">
            <GitMerge size={16} /> Merge Branch
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-sm transition-all">
            <GitPullRequest size={16} /> Pull Request
          </button>
        </div>
      </div>
    </div>
  );
};

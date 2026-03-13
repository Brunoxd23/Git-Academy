import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface TerminalProps {
  onCommand: (command: string) => void;
  history: { type: 'input' | 'output' | 'error'; content: string }[];
}

export const Terminal: React.FC<TerminalProps> = ({ onCommand, history }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input.trim());
    setInput('');
  };

  return (
    <div className="bg-[#0D1117] rounded-xl border border-zinc-800 overflow-hidden flex flex-col h-[400px] shadow-2xl">
      <div className="bg-[#161B22] px-4 py-2 border-b border-zinc-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-xs text-zinc-500 font-mono ml-2">git-bash — 80×24</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {history.map((entry, i) => (
          <div key={i} className={`whitespace-pre-wrap ${
            entry.type === 'input' ? 'text-emerald-400' : 
            entry.type === 'error' ? 'text-red-400' : 'text-zinc-300'
          }`}>
            {entry.type === 'input' ? <span className="mr-2">$</span> : ''}
            {entry.content}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center gap-2 text-emerald-400">
          <span>$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-zinc-300 focus:ring-0 p-0"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
};

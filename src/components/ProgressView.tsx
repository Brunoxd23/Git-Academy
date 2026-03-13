import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Target, 
  Zap, 
  Calendar, 
  CheckCircle2, 
  Star, 
  Flame,
  Award,
  TrendingUp
} from 'lucide-react';

interface ProgressViewProps {
  xp: number;
  completedLessons: string[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({ xp, completedLessons }) => {
  const totalLessons = 19; // Total count from all modules
  const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100);
  
  const stats = [
    { label: 'Total XP', value: xp, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Lições', value: `${completedLessons.length}/${totalLessons}`, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Ofensiva', value: completedLessons.length > 0 ? '1 dia' : '0 dias', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Nível', value: Math.floor(xp / 100) + 1, icon: Trophy, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ];

  const achievements = [
    { title: 'Primeiro Commit', description: 'Realizou seu primeiro commit no simulador.', icon: Award, unlocked: completedLessons.length > 5 },
    { title: 'Mestre das Branches', description: 'Completou todas as lições de branches.', icon: Star, unlocked: completedLessons.some(l => l.includes('Branch')) },
    { title: 'Explorador Git', description: 'Acessou todas as seções da plataforma.', icon: Target, unlocked: true },
    { title: 'Sem Medo de Conflitos', description: 'Resolveu seu primeiro conflito de merge.', icon: Zap, unlocked: completedLessons.includes('Resolvendo Conflitos de Merge') },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Meu Progresso</h2>
          <p className="text-zinc-500">Acompanhe sua jornada para se tornar um Git Master.</p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-2xl border border-zinc-800">
          <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2">
            <TrendingUp size={14} /> Ver Estatísticas Detalhadas
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0D1117] border border-zinc-800 p-6 rounded-3xl space-y-4"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart Placeholder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0D1117] border border-zinc-800 rounded-3xl p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Atividade Semanal</h3>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Calendar size={14} />
                <span>Últimos 7 dias</span>
              </div>
            </div>
            
            <div className="h-48 flex items-end justify-between gap-2 px-4">
              {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      className={`w-full rounded-t-lg transition-all duration-300 ${i === 3 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-zinc-800 group-hover:bg-zinc-700'}`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase">
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-bold">Próximo Nível: {xp < 1000 ? 'Git Explorer' : 'Git Architect'}</h3>
              <p className="text-indigo-100/80 max-w-md">Continue completando lições para desbloquear o nível {Math.floor(xp / 100) + 2} e ganhar novas insígnias.</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>PROGRESSO</span>
                  <span>{xp % 100} / 100 XP</span>
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${xp % 100}%` }}
                    className="h-full bg-white"
                  />
                </div>
              </div>
            </div>
            <Award className="absolute -right-8 -bottom-8 text-white/10 w-48 h-48 rotate-12" />
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Conquistas</h3>
          <div className="grid gap-4">
            {achievements.map((achievement, i) => (
              <div 
                key={i}
                className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                  achievement.unlocked 
                    ? 'bg-zinc-900/50 border-zinc-800 opacity-100' 
                    : 'bg-zinc-900/20 border-zinc-800/50 opacity-50 grayscale'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  achievement.unlocked ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-600'
                }`}>
                  <achievement.icon size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{achievement.title}</h4>
                  <p className="text-[10px] text-zinc-500 leading-tight">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

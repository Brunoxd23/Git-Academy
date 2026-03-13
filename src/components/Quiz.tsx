import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Trophy, Lock, Play, Star, ChevronLeft } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  requiredLessons: number;
  questions: Question[];
  xp: number;
}

const QUIZZES: QuizData[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentos do Git',
    description: 'Teste seus conhecimentos sobre o que é Git e como ele funciona.',
    requiredLessons: 3,
    xp: 200,
    questions: [
      {
        id: 1,
        text: "Qual comando é usado para criar um novo repositório Git?",
        options: ["git start", "git init", "git create", "git new"],
        correct: 1,
        explanation: "'git init' inicializa um novo repositório Git no diretório atual, criando a pasta oculta .git."
      },
      {
        id: 2,
        text: "Qual a principal diferença entre Git e SVN?",
        options: ["Git é pago, SVN é grátis", "Git é distribuído, SVN é centralizado", "SVN é mais rápido que Git", "Git não funciona offline"],
        correct: 1,
        explanation: "O Git é um sistema distribuído (cada um tem uma cópia), enquanto o SVN depende de um servidor central."
      },
      {
        id: 3,
        text: "Para que serve o arquivo .gitignore?",
        options: ["Para deletar arquivos", "Para listar arquivos que o Git deve ignorar", "Para esconder o código", "Para acelerar o git push"],
        correct: 1,
        explanation: "O .gitignore serve para listar arquivos ou pastas que não devem ser rastreados pelo Git."
      }
    ]
  },
  {
    id: 'workflow',
    title: 'Fluxo de Trabalho',
    description: 'Domine o ciclo de vida dos arquivos e commits.',
    requiredLessons: 8,
    xp: 350,
    questions: [
      {
        id: 1,
        text: "Como você move arquivos do diretório de trabalho para a Staging Area?",
        options: ["git commit", "git push", "git add", "git stage"],
        correct: 2,
        explanation: "'git add' prepara as mudanças para o próximo commit, movendo-as para a área de preparação."
      },
      {
        id: 2,
        text: "O que o comando 'git commit' faz?",
        options: ["Envia para o GitHub", "Cria uma nova branch", "Salva um snapshot do projeto no histórico", "Deleta arquivos"],
        correct: 2,
        explanation: "O commit salva permanentemente as alterações preparadas no histórico local."
      },
      {
        id: 3,
        text: "Qual comando mostra o histórico de commits?",
        options: ["git history", "git log", "git show", "git list"],
        correct: 1,
        explanation: "'git log' exibe a lista cronológica de commits realizados no repositório."
      }
    ]
  },
  {
    id: 'branches',
    title: 'Branches e Merge',
    description: 'Desafio sobre ramificações e união de código.',
    requiredLessons: 13,
    xp: 500,
    questions: [
      {
        id: 1,
        text: "Qual comando cria e muda para uma nova branch ao mesmo tempo?",
        options: ["git branch -n", "git checkout -b", "git switch -c", "git new-branch"],
        correct: 1,
        explanation: "'git checkout -b <nome>' cria uma nova branch e já muda o seu ambiente para ela."
      },
      {
        id: 2,
        text: "O que acontece em um conflito de merge?",
        options: ["O Git deleta os arquivos", "O Git escolhe a versão mais nova automaticamente", "O Git para o merge e pede para você resolver manualmente", "O computador reinicia"],
        correct: 2,
        explanation: "Conflitos ocorrem quando há alterações na mesma linha, exigindo intervenção manual."
      }
    ]
  }
];

export const Quiz: React.FC<{ completedLessonsCount: number }> = ({ completedLessonsCount }) => {
  const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
  };

  const handleAction = () => {
    if (!activeQuiz) return;
    if (!showResult) {
      setShowResult(true);
      if (selected === activeQuiz.questions[currentIdx].correct) {
        setScore(s => s + 1);
      }
    } else {
      if (currentIdx < activeQuiz.questions.length - 1) {
        setCurrentIdx(c => c + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setFinished(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setFinished(false);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setActiveQuiz(null);
  };

  if (!activeQuiz) {
    return (
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Desafios & Quizzes</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">Desbloqueie novos desafios conforme você avança no currículo. Cada quiz concluído garante XP extra!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUIZZES.map((quiz) => {
            const isLocked = completedLessonsCount < quiz.requiredLessons;
            return (
              <div 
                key={quiz.id}
                className={`relative group rounded-3xl border p-8 transition-all duration-300 ${
                  isLocked 
                    ? 'bg-zinc-900/20 border-zinc-800/50 grayscale' 
                    : 'bg-[#0D1117] border-zinc-800 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      isLocked ? 'bg-zinc-800 text-zinc-600' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {isLocked ? <Lock size={28} /> : <Star size={28} />}
                    </div>
                    {!isLocked && (
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full uppercase">Disponível</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{quiz.description}</p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-zinc-800/50">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Trophy size={14} />
                      <span className="text-xs font-bold">{quiz.xp} XP</span>
                    </div>
                    <button 
                      disabled={isLocked}
                      onClick={() => setActiveQuiz(quiz)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                        isLocked 
                          ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                          : 'bg-emerald-500 text-white hover:bg-emerald-600'
                      }`}
                    >
                      {isLocked ? `Bloqueado (${quiz.requiredLessons} lições)` : <>Começar <Play size={12} /></>}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0D1117] border border-zinc-800 rounded-3xl p-12 text-center space-y-8 max-w-xl mx-auto shadow-2xl"
      >
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
          <Trophy size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white">Incrível!</h2>
          <p className="text-zinc-400 text-lg">Você completou o desafio: {activeQuiz.title}</p>
        </div>
        
        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
          <p className="text-sm text-zinc-500 uppercase font-bold tracking-widest mb-2">Sua Pontuação</p>
          <p className="text-5xl font-black text-white">{score} <span className="text-zinc-600 text-2xl">/ {activeQuiz.questions.length}</span></p>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={resetQuiz}
            className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            Voltar aos Desafios
          </button>
        </div>
      </motion.div>
    );
  }

  const q = activeQuiz.questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveQuiz(null)} className="p-2 hover:bg-zinc-800 rounded-xl text-zinc-500 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">{activeQuiz.title}</h2>
            <p className="text-zinc-500">Questão {currentIdx + 1} de {activeQuiz.questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 rounded-2xl border border-zinc-800">
          <div className="h-2 w-32 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-500" 
              initial={{ width: 0 }}
              animate={{ width: `${((currentIdx + 1) / activeQuiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white leading-tight">{q.text}</h3>
            <div className="grid gap-4">
              {q.options.map((opt, idx) => {
                const isCorrect = idx === q.correct;
                const isSelected = selected === idx;
                
                let borderColor = 'border-zinc-800';
                let bgColor = 'bg-zinc-900/50';
                let textColor = 'text-zinc-400';

                if (isSelected) {
                  borderColor = 'border-emerald-500';
                  bgColor = 'bg-emerald-500/10';
                  textColor = 'text-emerald-400';
                }

                if (showResult) {
                  if (isCorrect) {
                    borderColor = 'border-emerald-500';
                    bgColor = 'bg-emerald-500/20';
                    textColor = 'text-emerald-400';
                  } else if (isSelected) {
                    borderColor = 'border-red-500';
                    bgColor = 'bg-red-500/10';
                    textColor = 'text-red-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={showResult}
                    className={`p-5 rounded-2xl border ${borderColor} ${bgColor} ${textColor} text-left transition-all flex items-center justify-between group relative overflow-hidden`}
                  >
                    <span className="font-bold relative z-10 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-xs border border-white/5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </span>
                    {showResult && isCorrect && <CheckCircle2 size={20} className="text-emerald-500 relative z-10" />}
                    {showResult && isSelected && !isCorrect && <XCircle size={20} className="text-red-500 relative z-10" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            disabled={selected === null}
            onClick={handleAction}
            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl ${
              selected === null 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
            }`}
          >
            {showResult ? (
              <>Próxima Questão <ArrowRight size={20} /></>
            ) : (
              <>Verificar Resposta</>
            )}
          </button>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {showResult ? (
              <motion.div
                key="explanation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`p-8 rounded-3xl border h-full flex flex-col justify-center gap-6 ${
                  selected === q.correct ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  selected === q.correct ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {selected === q.correct ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                </div>
                <div className="space-y-4">
                  <h4 className={`text-2xl font-bold ${selected === q.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                    {selected === q.correct ? 'Excelente!' : 'Não foi dessa vez...'}
                  </h4>
                  <p className="text-zinc-300 leading-relaxed text-lg">
                    {q.explanation}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/20 h-full flex flex-col items-center justify-center text-center gap-4"
              >
                <HelpCircle size={48} className="text-zinc-700" />
                <div className="space-y-2">
                  <p className="text-white font-bold">Dica do Professor</p>
                  <p className="text-zinc-500 text-sm">Leia atentamente a pergunta e as opções. O Git é case-sensitive!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

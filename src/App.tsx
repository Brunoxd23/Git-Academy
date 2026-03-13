/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  BookOpen, 
  GitBranch, 
  BarChart3, 
  Home, 
  ChevronRight, 
  ChevronLeft,
  Play,
  CheckCircle2, 
  Github, 
  Database,
  Layers,
  Code2,
  Menu,
  X,
  Trophy,
  History,
  GitPullRequest,
  GitMerge,
  Search,
  Bell,
  User,
  LogOut,
  LogIn,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, loginWithGoogle, logout, handleFirestoreError, OperationType } from './firebase';
import { Terminal } from './components/Terminal';
import { Quiz } from './components/Quiz';
import { CommitHistory } from './components/CommitHistory';
import { BranchVisualizer } from './components/BranchVisualizer';
import { LessonView } from './components/LessonView';
import { ProgressView } from './components/ProgressView';
import { RankingView } from './components/RankingView';
import { NotificationCenter, Notification } from './components/NotificationCenter';

// --- Types ---

type Section = 'home' | 'curriculum' | 'terminal' | 'quiz' | 'progress' | 'ranking';

interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
  branch: string;
}

// --- App Component ---

export default function App() {
  const [user, loadingAuth] = useAuthState(auth);
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [xp, setXp] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const currentLevel = Math.floor(xp / 100) + 1;
  const [prevLevel, setPrevLevel] = useState(currentLevel);

  // Sync with Firestore when user logs in
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setXp(data.xp || 0);
            setCompletedLessons(data.completedLessons || []);
            setAchievements(data.achievements || []);
            setNotifications(data.notifications || []);
            setPrevLevel(Math.floor((data.xp || 0) / 100) + 1);
          } else {
            // Initialize new user doc
            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: user.displayName || 'Usuário',
              photoURL: user.photoURL || '',
              xp: 0,
              completedLessons: [],
              achievements: [],
              notifications: [],
              lastActive: serverTimestamp()
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        }
      };
      fetchUserData();
    } else {
      // Reset local state on logout
      setXp(0);
      setCompletedLessons([]);
      setAchievements([]);
      setNotifications([]);
    }
  }, [user]);

  // Level up notification
  useEffect(() => {
    if (currentLevel > prevLevel && user) {
      const newNotif: Notification = {
        id: Math.random().toString(36).substring(7),
        type: 'level-up',
        message: `Parabéns! Você subiu para o nível ${currentLevel}!`,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
      toast.success(`Nível ${currentLevel} alcançado! 🚀`);
      setPrevLevel(currentLevel);
    }
  }, [currentLevel, prevLevel, user]);

  // Achievement logic
  useEffect(() => {
    if (!user) return;

    const checkAchievements = () => {
      const newAchievements: string[] = [];
      
      // Module 1 Master
      const module1Lessons = ['O que é Controle de Versão?', 'Git vs SVN: As Diferenças', 'Instalação e Configuração Global', 'O Ciclo de Vida do Arquivo no Git', 'Primeiro Repositório: git init'];
      if (module1Lessons.every(l => completedLessons.includes(l)) && !achievements.includes('Mestre dos Fundamentos')) {
        newAchievements.push('Mestre dos Fundamentos');
      }

      // First Commit
      if (completedLessons.includes('git commit: Registrando a História') && !achievements.includes('Primeiro Passo')) {
        newAchievements.push('Primeiro Passo');
      }

      if (newAchievements.length > 0) {
        setAchievements(prev => [...prev, ...newAchievements]);
        newAchievements.forEach(ach => {
          const notif: Notification = {
            id: Math.random().toString(36).substring(7),
            type: 'achievement',
            message: `Nova medalha conquistada: ${ach}!`,
            timestamp: new Date(),
            read: false
          };
          setNotifications(prev => [notif, ...prev]);
          toast.success(`Medalha conquistada: ${ach}! 🏅`);
        });
      }
    };

    checkAchievements();
  }, [completedLessons, achievements, user]);

  // Sync progress to Firestore
  useEffect(() => {
    if (user && !loadingAuth) {
      const sync = async () => {
        setIsSyncing(true);
        try {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: user.displayName || 'Usuário',
            photoURL: user.photoURL || '',
            xp: xp,
            completedLessons: completedLessons,
            achievements: achievements,
            notifications: notifications,
            lastActive: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          console.error('Sync error:', error);
        } finally {
          setIsSyncing(false);
        }
      };
      
      const timeoutId = setTimeout(sync, 2000); // Debounce sync
      return () => clearTimeout(timeoutId);
    }
  }, [xp, completedLessons, achievements, notifications, user, loadingAuth]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const [terminalHistory, setTerminalHistory] = useState<{ type: 'input' | 'output' | 'error'; content: string }[]>([
    { type: 'output', content: 'Bem-vindo ao Git Simulator v2.0' },
    { type: 'output', content: 'Digite "git help" para ver os comandos disponíveis.' }
  ]);
  
  const [commits, setCommits] = useState<Commit[]>([]);
  const [branches, setBranches] = useState<{ name: string; isCurrent: boolean }[]>([
    { name: 'main', isCurrent: true }
  ]);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [isRepoInit, setIsRepoInit] = useState(false);

  const handleCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const base = parts[0];
    const sub = parts[1];

    setTerminalHistory(prev => [...prev, { type: 'input', content: cmd }]);

    if (base !== 'git') {
      setTerminalHistory(prev => [...prev, { type: 'error', content: `Comando não reconhecido: ${base}. Você quis dizer "git"?` }]);
      return;
    }

    switch (sub) {
      case 'init':
        if (isRepoInit) {
          setTerminalHistory(prev => [...prev, { type: 'error', content: 'Repositório já inicializado.' }]);
        } else {
          setIsRepoInit(true);
          setTerminalHistory(prev => [...prev, { type: 'output', content: 'Initialized empty Git repository in /project/.git/' }]);
          toast.success('Repositório inicializado!');
        }
        break;
      case 'status':
        if (!isRepoInit) {
          setTerminalHistory(prev => [...prev, { type: 'error', content: 'fatal: not a git repository (or any of the parent directories): .git' }]);
        } else {
          const statusMsg = stagedFiles.length > 0 
            ? `On branch ${currentBranch}\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n\t${stagedFiles.join('\n\t')}`
            : `On branch ${currentBranch}\nnothing to commit, working tree clean`;
          setTerminalHistory(prev => [...prev, { type: 'output', content: statusMsg }]);
        }
        break;
      case 'add':
        if (!isRepoInit) {
          setTerminalHistory(prev => [...prev, { type: 'error', content: 'fatal: not a git repository' }]);
        } else {
          setStagedFiles(['index.html', 'style.css']);
          setTerminalHistory(prev => [...prev, { type: 'output', content: 'Files added to staging area.' }]);
          toast.info('Arquivos adicionados à staging area');
        }
        break;
      case 'commit':
        if (!isRepoInit) {
          setTerminalHistory(prev => [...prev, { type: 'error', content: 'fatal: not a git repository' }]);
        } else if (stagedFiles.length === 0) {
          setTerminalHistory(prev => [...prev, { type: 'output', content: 'nothing to commit, working tree clean' }]);
        } else {
          const msg = parts.slice(2).join(' ').replace(/['"]/g, '') || 'Manual commit';
          const newCommit: Commit = {
            id: Math.random().toString(16).substring(2, 10),
            message: msg,
            author: 'User',
            date: new Date().toLocaleString(),
            branch: currentBranch
          };
          setCommits(prev => [...prev, newCommit]);
          setStagedFiles([]);
          setTerminalHistory(prev => [...prev, { type: 'output', content: `[${currentBranch} ${newCommit.id}] ${msg}\n 2 files changed, 45 insertions(+)` }]);
          toast.success('Commit realizado com sucesso!');
        }
        break;
      case 'branch':
        const branchName = parts[2];
        if (branchName) {
          setBranches(prev => [...prev, { name: branchName, isCurrent: false }]);
          setTerminalHistory(prev => [...prev, { type: 'output', content: `Created branch ${branchName}` }]);
          toast.info(`Branch ${branchName} criada`);
        } else {
          const list = branches.map(b => `${b.name === currentBranch ? '*' : ' '} ${b.name}`).join('\n');
          setTerminalHistory(prev => [...prev, { type: 'output', content: list }]);
        }
        break;
      case 'checkout':
        const target = parts[2];
        const exists = branches.find(b => b.name === target);
        if (exists) {
          setCurrentBranch(target);
          setTerminalHistory(prev => [...prev, { type: 'output', content: `Switched to branch '${target}'` }]);
          toast.success(`Mudou para branch ${target}`);
        } else {
          setTerminalHistory(prev => [...prev, { type: 'error', content: `error: pathspec '${target}' did not match any file(s) known to git` }]);
        }
        break;
      case 'help':
        setTerminalHistory(prev => [...prev, { type: 'output', content: 'Comandos: init, status, add, commit, branch, checkout, log' }]);
        break;
      case 'log':
        if (commits.length === 0) {
          setTerminalHistory(prev => [...prev, { type: 'error', content: 'fatal: your current branch \'main\' does not have any commits yet' }]);
        } else {
          const log = commits.slice().reverse().map(c => `commit ${c.id}\nAuthor: ${c.author}\nDate: ${c.date}\n\n    ${c.message}`).join('\n\n');
          setTerminalHistory(prev => [...prev, { type: 'output', content: log }]);
        }
        break;
      default:
        setTerminalHistory(prev => [...prev, { type: 'error', content: `git: '${sub}' is not a git command. See 'git help'.` }]);
    }
  };

  const toggleSection = (section: Section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-emerald-500/30 overflow-hidden">
      <Toaster position="top-right" theme="dark" richColors expand={true} />
      
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - DataCamp Style */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0D1117] border-r border-zinc-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${!isSidebarOpen && 'lg:w-20'}
      `}>
        <div className="h-full flex flex-col relative">
          {/* Desktop Sidebar Toggle - Floating on border */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex absolute -right-3 top-5 z-[60] w-6 h-6 bg-[#0D1117] border border-zinc-800 rounded-full items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all shadow-xl hover:scale-110"
          >
            {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>

          <div className={`p-6 flex items-center gap-3 ${!isSidebarOpen && 'lg:justify-center'}`}>
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
              <GitBranch className="text-white" size={20} />
            </div>
            {(isSidebarOpen || isMobileMenuOpen) && (
              <span className="text-lg font-bold text-white tracking-tight truncate">GitAcademy</span>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden ml-auto text-zinc-500 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <NavItem icon={Home} label="Dashboard" active={activeSection === 'home'} onClick={() => toggleSection('home')} collapsed={!isSidebarOpen && !isMobileMenuOpen} />
            <NavItem icon={BookOpen} label="Currículo" active={activeSection === 'curriculum'} onClick={() => toggleSection('curriculum')} collapsed={!isSidebarOpen && !isMobileMenuOpen} />
            <NavItem icon={TerminalIcon} label="Prática Real" active={activeSection === 'terminal'} onClick={() => toggleSection('terminal')} collapsed={!isSidebarOpen && !isMobileMenuOpen} />
            <NavItem icon={Trophy} label="Desafios & Quiz" active={activeSection === 'quiz'} onClick={() => toggleSection('quiz')} collapsed={!isSidebarOpen && !isMobileMenuOpen} />
            <NavItem icon={Crown} label="Ranking Global" active={activeSection === 'ranking'} onClick={() => toggleSection('ranking')} collapsed={!isSidebarOpen && !isMobileMenuOpen} />
            <NavItem icon={BarChart3} label="Meu Progresso" active={activeSection === 'progress'} onClick={() => toggleSection('progress')} collapsed={!isSidebarOpen && !isMobileMenuOpen} />
          </nav>

          <div className="p-4 mt-auto">
            {user ? (
              <div className={`bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800 transition-all ${!isSidebarOpen && !isMobileMenuOpen ? 'lg:p-2' : ''}`}>
                <div className={`flex items-center gap-3 mb-3 ${!isSidebarOpen && !isMobileMenuOpen ? 'lg:justify-center lg:mb-0' : ''}`}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-10 h-10 rounded-full border border-zinc-700 shrink-0" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                      <User size={20} />
                    </div>
                  )}
                  {(isSidebarOpen || isMobileMenuOpen) && (
                    <div className="truncate flex-1">
                      <p className="text-sm font-bold text-white truncate">{user.displayName || 'Usuário'}</p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Nível {Math.floor(xp / 100) + 1}</p>
                    </div>
                  )}
                  {(isSidebarOpen || isMobileMenuOpen) && (
                    <button onClick={logout} className="text-zinc-500 hover:text-red-400 transition-colors">
                      <LogOut size={16} />
                    </button>
                  )}
                </div>
                {(isSidebarOpen || isMobileMenuOpen) && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500">
                      <span>PROGRESSO XP</span>
                      <span>{xp % 100} / 100</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${xp % 100}%` }} />
                    </div>
                    {isSyncing && <p className="text-[8px] text-emerald-500/50 text-center animate-pulse">Sincronizando...</p>}
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={loginWithGoogle}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all ${!isSidebarOpen && !isMobileMenuOpen ? 'lg:justify-center lg:px-0' : ''}`}
              >
                <LogIn size={18} />
                {(!isSidebarOpen && !isMobileMenuOpen) ? null : <span>Entrar</span>}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 bg-[#0D1117]/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-zinc-400 p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text" 
                placeholder="Buscar lições..." 
                className="bg-zinc-900 border border-zinc-800 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="text-zinc-400 hover:text-white relative p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <Bell size={20} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#0D1117]" />
                )}
              </button>
              <AnimatePresence>
                {isNotificationsOpen && (
                  <NotificationCenter 
                    notifications={notifications} 
                    onClose={() => setIsNotificationsOpen(false)}
                    onMarkAsRead={handleMarkAsRead}
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Nível {Math.floor(xp / 100) + 1}</p>
                <p className="text-[10px] text-emerald-400 font-bold uppercase">
                  {xp < 500 ? 'Iniciante' : xp < 1500 ? 'Git Explorer' : 'Git Master'}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#050505]">
          <div className="max-w-7xl mx-auto p-6 md:p-10">
            <AnimatePresence mode="wait">
              {activeSection === 'home' && (
                <motion.div 
                  key="home"
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  className="space-y-10"
                >
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-3xl p-10 text-white relative overflow-hidden">
                  <div className="relative z-10 max-w-lg space-y-4">
                    {completedLessons.length === 0 ? (
                      <>
                        <h1 className="text-4xl font-bold leading-tight">Comece sua jornada: <br/><span className="text-emerald-200">Fundamentos do Git</span></h1>
                        <p className="text-emerald-50/80">Aprenda a ferramenta essencial para todo desenvolvedor moderno. Comece do zero agora!</p>
                        <button 
                          onClick={() => {
                            setActiveSection('curriculum');
                            setActiveLesson('Instalando o Git');
                          }} 
                          className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2"
                        >
                          Iniciar Curso <ChevronRight size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <h1 className="text-4xl font-bold leading-tight">Continue de onde você parou: <br/><span className="text-emerald-200">Seu Progresso Atual</span></h1>
                        <p className="text-emerald-50/80">Você já completou {Math.round((completedLessons.length / 20) * 100)}% do curso. Mantenha o foco!</p>
                        <button 
                          onClick={() => {
                            setActiveSection('curriculum');
                            // Find first incomplete lesson from all modules
                            const m1 = ['Instalando o Git', 'Configurando Identidade'];
                            const m2 = ['O que é Controle de Versão?', 'Git vs SVN: As Diferenças', 'O Ciclo de Vida do Arquivo no Git', 'Primeiro Repositório: git init'];
                            const m3 = ['Staging Area: O Coração do Git', 'git add: Preparando Mudanças', 'git commit: Registrando a História', 'git status e git log: Monitoramento', 'Desfazendo Alterações: git checkout e restore'];
                            const m4 = ['O Poder das Branches', 'Criando e Alternando Branches', 'Merge: Unindo Histórias', 'Resolvendo Conflitos de Merge', 'Trabalhando com Repositórios Remotos'];
                            const m5 = ['Git Rebase: Mantendo a História Limpa', 'Git Stash: Pausando o Trabalho', 'Git Cherry-pick: Escolhendo Commits', 'Git Bisect: Encontrando Bugs'];
                            const allLessons = [...m1, ...m2, ...m3, ...m4, ...m5];
                            const nextLesson = allLessons.find(l => !completedLessons.includes(l)) || allLessons[0];
                            setActiveLesson(nextLesson);
                          }} 
                          className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2"
                        >
                          Retomar Lição <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>
                  <GitBranch className="absolute -right-10 -bottom-10 text-white/10 w-64 h-64 rotate-12" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-white">Lições Recomendadas</h3>
                    <div className="grid gap-4">
                      <LessonCard 
                        title="Instalando o Git" 
                        duration="5 min" 
                        xp="100" 
                        status={completedLessons.includes('Instalando o Git') ? 'new' : 'new'} 
                        onClick={() => {
                          setActiveLesson('Instalando o Git');
                          setActiveSection('curriculum');
                        }}
                      />
                      <LessonCard 
                        title="Configurando Identidade" 
                        duration="5 min" 
                        xp="120" 
                        status={completedLessons.includes('Configurando Identidade') ? 'new' : 'new'} 
                        onClick={() => {
                          setActiveLesson('Configurando Identidade');
                          setActiveSection('curriculum');
                        }}
                      />
                      <LessonCard 
                        title="O Poder das Branches" 
                        duration="15 min" 
                        xp="200" 
                        status={completedLessons.length < 10 ? 'locked' : 'new'} 
                        onClick={() => {
                          if (completedLessons.length >= 10) {
                            setActiveLesson('O Poder das Branches');
                            setActiveSection('curriculum');
                          } else {
                            toast.error('Complete mais lições para desbloquear esta recomendação!');
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white">Atividade Recente</h3>
                    <div className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-6 space-y-4">
                      {commits.length > 0 ? (
                        commits.slice(-3).reverse().map(c => (
                          <div key={c.id} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400">
                              <History size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white truncate w-40">{c.message}</p>
                              <p className="text-[10px] text-zinc-500">{c.date}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-zinc-500 italic">Nenhuma atividade registrada.</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'curriculum' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <AnimatePresence mode="wait">
                  {activeLesson ? (
                    <LessonView 
                      lessonTitle={activeLesson} 
                      onBack={() => setActiveLesson(null)}
                      onComplete={(lessonXp) => {
                        if (!completedLessons.includes(activeLesson)) {
                          setXp(prev => prev + lessonXp);
                          setCompletedLessons(prev => [...prev, activeLesson]);
                          toast.success(`Lição concluída! +${lessonXp} XP`);
                        }
                        setActiveLesson(null);
                      }}
                    />
                  ) : (
                    <motion.div 
                      key="curriculum-list"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-3xl font-bold text-white">Currículo do Curso</h2>
                        <p className="text-zinc-500">Trilha completa de Git e GitHub para profissionais.</p>
                      </div>
                      <div className="space-y-6">
                        <Module 
                          title="Módulo 1: Instalação e Configuração" 
                          lessons={[
                            'Instalando o Git',
                            'Configurando Identidade'
                          ]} 
                          completedLessons={completedLessons}
                          onStartLesson={(lesson) => setActiveLesson(lesson)}
                          isOpen={openModule === 0}
                          onToggle={() => setOpenModule(openModule === 0 ? null : 0)}
                        />
                        <Module 
                          title="Módulo 2: Fundamentos do Controle de Versão" 
                          lessons={[
                            'O que é Controle de Versão?', 
                            'Git vs SVN: As Diferenças', 
                            'O Ciclo de Vida do Arquivo no Git',
                            'Primeiro Repositório: git init'
                          ]} 
                          completedLessons={completedLessons}
                          onStartLesson={(lesson) => setActiveLesson(lesson)}
                          isOpen={openModule === 1}
                          onToggle={() => setOpenModule(openModule === 1 ? null : 1)}
                        />
                        <Module 
                          title="Módulo 3: O Fluxo de Trabalho Essencial" 
                          lessons={[
                            'Staging Area: O Coração do Git',
                            'git add: Preparando Mudanças', 
                            'git commit: Registrando a História', 
                            'git status e git log: Monitoramento',
                            'Desfazendo Alterações: git checkout e restore'
                          ]} 
                          completedLessons={completedLessons}
                          onStartLesson={(lesson) => setActiveLesson(lesson)}
                          isOpen={openModule === 2}
                          onToggle={() => setOpenModule(openModule === 2 ? null : 2)}
                        />
                        <Module 
                          title="Módulo 4: Branches e Colaboração" 
                          lessons={[
                            'O Poder das Branches',
                            'Criando e Alternando Branches', 
                            'Merge: Unindo Histórias', 
                            'Resolvendo Conflitos de Merge',
                            'Trabalhando com Repositórios Remotos'
                          ]} 
                          completedLessons={completedLessons}
                          onStartLesson={(lesson) => setActiveLesson(lesson)}
                          isOpen={openModule === 3}
                          onToggle={() => setOpenModule(openModule === 3 ? null : 3)}
                        />
                        <Module 
                          title="Módulo 5: Técnicas Avançadas" 
                          lessons={[
                            'Git Rebase: Mantendo a História Limpa',
                            'Git Stash: Pausando o Trabalho', 
                            'Git Cherry-pick: Escolhendo Commits', 
                            'Git Bisect: Encontrando Bugs'
                          ]} 
                          completedLessons={completedLessons}
                          onStartLesson={(lesson) => setActiveLesson(lesson)}
                          isOpen={openModule === 4}
                          onToggle={() => setOpenModule(openModule === 4 ? null : 4)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeSection === 'terminal' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white">Laboratório Interativo</h2>
                    <p className="text-zinc-500">Pratique comandos reais em um ambiente seguro.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-bold text-white flex items-center gap-2">
                      <History size={14} /> Ver Logs
                    </button>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-xs font-bold text-white flex items-center gap-2">
                      <Github size={14} /> Conectar GitHub
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Terminal onCommand={handleCommand} history={terminalHistory} />
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
                      <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <Layers size={16} className="text-emerald-400" /> Estado do Repositório
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Branch Atual</p>
                          <p className="text-lg font-mono text-emerald-400">{currentBranch}</p>
                        </div>
                        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                          <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Arquivos em Staging</p>
                          <p className="text-lg font-mono text-white">{stagedFiles.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <BranchVisualizer branches={branches} currentBranch={currentBranch} />
                    <CommitHistory commits={commits} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'quiz' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12">
                <Quiz completedLessonsCount={completedLessons.length} />
              </motion.div>
            )}

            {activeSection === 'progress' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 md:py-12">
                <ProgressView xp={xp} completedLessons={completedLessons} />
              </motion.div>
            )}

            {activeSection === 'ranking' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 md:py-12">
                <RankingView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  </div>
);
}

// --- Helper Components ---

function NavItem({ icon: Icon, label, active, onClick, collapsed }: { icon: any, label: string, active: boolean, onClick: () => void, collapsed?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
        active 
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
          : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
      } ${collapsed ? 'justify-center px-0' : ''}`}
    >
      <Icon size={18} className={`${active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'} shrink-0`} />
      {!collapsed && <span className="text-sm font-bold truncate">{label}</span>}
      {collapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </button>
  );
}

function LessonCard({ title, duration, xp, status, onClick }: { title: string, duration: string, xp: string, status: 'new' | 'in-progress' | 'locked', onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-[#0D1117] border border-zinc-800 p-5 rounded-2xl hover:border-zinc-700 transition-all group flex items-center justify-between cursor-pointer ${status === 'locked' ? 'opacity-60 grayscale cursor-not-allowed' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          status === 'locked' ? 'bg-zinc-900 text-zinc-700' : 'bg-emerald-500/10 text-emerald-400'
        }`}>
          {status === 'locked' ? <X size={20} /> : <Play size={20} />}
        </div>
        <div>
          <h4 className="text-white font-bold group-hover:text-emerald-400 transition-colors">{title}</h4>
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
            <span>{duration}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-emerald-500">+{xp} XP</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {status === 'in-progress' && (
          <div className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase rounded-full">Em progresso</div>
        )}
        {status === 'new' && (
          <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase rounded-full">Novo</div>
        )}
        <ChevronRight size={20} className="text-zinc-700 group-hover:text-zinc-400" />
      </div>
    </div>
  );
}

function Module({ title, lessons, completedLessons, onStartLesson, isOpen, onToggle }: { title: string, lessons: string[], completedLessons: string[], onStartLesson: (lesson: string) => void, isOpen: boolean, onToggle: () => void }) {
  const completedCount = lessons.filter(l => completedLessons.includes(l)).length;
  const total = lessons.length;

  return (
    <div className={`rounded-3xl border transition-all duration-300 ${isOpen ? 'bg-[#0D1117] border-emerald-500/30 ring-1 ring-emerald-500/10' : 'bg-[#0D1117]/50 border-zinc-800 hover:border-zinc-700'}`}>
      <div 
        className="p-6 flex items-center justify-between cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isOpen ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-zinc-800 text-zinc-500'}`}>
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{title}</h3>
            <p className="text-xs text-zinc-500 font-medium">{completedCount} de {total} lições completadas</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-zinc-400 mb-1">{Math.round((completedCount/total)*100)}%</p>
            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500" 
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount/total)*100}%` }}
              />
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            className="text-zinc-600"
          >
            <ChevronRight size={24} />
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-2 border-t border-zinc-800/50 pt-4">
              {lessons.map((lesson, i) => {
                const isCompleted = completedLessons.includes(lesson);
                return (
                  <div 
                    key={i} 
                    onClick={() => onStartLesson(lesson)}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-800/50 transition-all cursor-pointer group border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-4">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                          <CheckCircle2 size={14} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-zinc-800 group-hover:border-emerald-500/50 transition-colors" />
                      )}
                      <span className={`text-sm font-medium transition-colors ${isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-300 group-hover:text-white'}`}>
                        {lesson}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        {isCompleted ? 'Revisar' : 'Iniciar'}
                      </span>
                      <Play size={14} className={`transition-all ${isCompleted ? 'text-zinc-500' : 'text-zinc-700 group-hover:text-emerald-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

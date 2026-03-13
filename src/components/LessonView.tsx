import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Play, 
  BookOpen, 
  Info, 
  ArrowRight, 
  GitBranch, 
  Database, 
  ShieldCheck, 
  History, 
  X, 
  Layers,
  Settings,
  Terminal,
  FileCode,
  Search,
  RotateCcw,
  Globe,
  Zap,
  Archive,
  Target,
  Bug
} from 'lucide-react';

interface LessonContent {
  title: string;
  content: React.ReactNode;
  xp: number;
}

const LESSONS_DATA: Record<string, LessonContent> = {
  'O que é Controle de Versão?': {
    title: 'O que é Controle de Versão?',
    xp: 100,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Imagine que você está escrevendo um livro. Você faz alterações, apaga parágrafos, adiciona capítulos. De repente, você percebe que a versão de ontem estava melhor. Como você volta?
        </p>
        
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex gap-4">
          <Info className="text-emerald-400 shrink-0" size={24} />
          <div>
            <h4 className="text-white font-bold mb-1">Definição Simples</h4>
            <p className="text-sm">Controle de versão é um sistema que registra as mudanças em um arquivo ou conjunto de arquivos ao longo do tempo, para que você possa recuperar versões específicas mais tarde.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mt-8">Por que usar?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3">
              <History size={18} />
            </div>
            <h5 className="text-white font-bold mb-1 text-sm">Histórico Completo</h5>
            <p className="text-xs text-zinc-500">Saiba exatamente quem alterou o quê, quando e por quê.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-3">
              <GitBranch size={18} />
            </div>
            <h5 className="text-white font-bold mb-1 text-sm">Trabalho em Equipe</h5>
            <p className="text-xs text-zinc-500">Várias pessoas podem trabalhar no mesmo projeto sem sobrescrever o trabalho umas das ordens.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck size={18} />
            </div>
            <h5 className="text-white font-bold mb-1 text-sm">Segurança</h5>
            <p className="text-xs text-zinc-500">Se você cometer um erro grave, pode reverter para um estado funcional em segundos.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3">
              <ArrowRight size={18} />
            </div>
            <h5 className="text-white font-bold mb-1 text-sm">Experimentação</h5>
            <p className="text-xs text-zinc-500">Crie "branches" para testar ideias novas sem quebrar o código principal.</p>
          </div>
        </div>
      </div>
    )
  },
  'Git vs SVN: As Diferenças': {
    title: 'Git vs SVN: As Diferenças',
    xp: 150,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Existem dois tipos principais de sistemas de controle de versão: <strong>Centralizados (SVN)</strong> e <strong>Distribuídos (Git)</strong>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-zinc-500" />
              <h4 className="text-white font-bold">SVN (Centralizado)</h4>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Database className="text-zinc-500" size={18} />
                <span>Existe apenas um servidor central.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <X className="text-red-400" size={18} />
                <span>Se o servidor cair, ninguém consegue trabalhar.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Play className="text-zinc-500" size={18} />
                <span>Operações são lentas (precisam de rede).</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h4 className="text-emerald-400 font-bold">Git (Distribuído)</h4>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Layers className="text-emerald-400" size={18} />
                <span>Cada desenvolvedor tem uma cópia completa.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="text-emerald-400" size={18} />
                <span>Funciona offline. Você commita localmente.</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Play className="text-emerald-400" size={18} />
                <span>Operações são instantâneas.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
          <h4 className="text-white font-bold mb-4">Veredito</h4>
          <p className="text-sm text-zinc-400">
            O Git venceu a guerra dos VCS porque é mais rápido, mais seguro e permite fluxos de trabalho muito mais flexíveis (como o uso intenso de branches). Hoje, é o padrão absoluto na indústria de software.
          </p>
        </div>
      </div>
    )
  },
  'Instalação e Configuração Global': {
    title: 'Instalação e Configuração Global',
    xp: 120,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Antes de começar a usar o Git, precisamos dizer a ele quem somos. Isso é importante porque cada commit do Git usa essa informação.
        </p>

        <div className="space-y-4">
          <h4 className="text-white font-bold flex items-center gap-2">
            <Settings className="text-emerald-400" size={20} />
            Configurando sua identidade
          </h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800">
            <p className="text-zinc-500"># Define seu nome globalmente</p>
            <p className="text-emerald-400">git config --global user.name <span className="text-zinc-300">"Seu Nome"</span></p>
            <p className="text-zinc-500 mt-2"># Define seu e-mail globalmente</p>
            <p className="text-emerald-400">git config --global user.email <span className="text-zinc-300">"seu@email.com"</span></p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h4 className="text-white font-bold mb-3">Dica de Ouro</h4>
          <p className="text-sm text-zinc-400">
            Use o mesmo e-mail que você usa no GitHub. Isso garantirá que seus commits sejam vinculados corretamente ao seu perfil e que você ganhe aqueles "quadradinhos verdes" no seu histórico de contribuições.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold">Verificando as configurações</h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800">
            <p className="text-emerald-400">git config --list</p>
          </div>
        </div>
      </div>
    )
  },
  'O Ciclo de Vida do Arquivo no Git': {
    title: 'O Ciclo de Vida do Arquivo no Git',
    xp: 200,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Entender os estados de um arquivo é a chave para dominar o Git. Um arquivo pode estar em um de quatro estados principais:
        </p>

        <div className="grid grid-cols-1 gap-4 mt-6">
          <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">1</div>
            <div>
              <h5 className="text-white font-bold">Untracked (Não monitorado)</h5>
              <p className="text-sm text-zinc-500">O Git vê o arquivo, mas não está rastreando suas mudanças ainda.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">2</div>
            <div>
              <h5 className="text-white font-bold">Unmodified (Não modificado)</h5>
              <p className="text-sm text-zinc-500">O arquivo está no repositório e não sofreu alterações desde o último commit.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">3</div>
            <div>
              <h5 className="text-white font-bold">Modified (Modificado)</h5>
              <p className="text-sm text-zinc-500">Você alterou o arquivo, mas ainda não marcou para o próximo commit.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">4</div>
            <div>
              <h5 className="text-white font-bold">Staged (Preparado)</h5>
              <p className="text-sm text-zinc-500">Você marcou o arquivo modificado para ir no próximo commit.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'Primeiro Repositório: git init': {
    title: 'Primeiro Repositório: git init',
    xp: 150,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Tudo começa com um comando simples. O <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded">git init</code> transforma uma pasta comum em um repositório Git.
        </p>

        <div className="space-y-4">
          <h4 className="text-white font-bold flex items-center gap-2">
            <Terminal className="text-emerald-400" size={20} />
            Na prática
          </h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800">
            <p className="text-zinc-500"># Entra na pasta do seu projeto</p>
            <p className="text-emerald-400">cd <span className="text-zinc-300">meu-projeto</span></p>
            <p className="text-zinc-500 mt-2"># Inicializa o Git</p>
            <p className="text-emerald-400">git init</p>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
          <h4 className="text-white font-bold mb-2">O que acontece por baixo dos panos?</h4>
          <p className="text-sm text-zinc-400">
            O Git cria uma pasta oculta chamada <code className="text-emerald-400">.git</code>. É lá que toda a mágica acontece: o histórico, as configurações e os objetos do seu projeto ficam guardados nessa pasta. <strong>Nunca apague essa pasta</strong> a menos que queira perder todo o histórico do Git!
          </p>
        </div>
      </div>
    )
  },
  'Staging Area: O Coração do Git': {
    title: 'Staging Area: O Coração do Git',
    xp: 180,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          A <strong>Staging Area</strong> (ou Index) é uma das características mais poderosas e confusas do Git. Pense nela como uma "sala de embarque".
        </p>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl text-center space-y-6">
          <div className="flex justify-center items-center gap-4 md:gap-8">
            <div className="p-4 bg-zinc-800 rounded-xl border border-zinc-700">
              <FileCode className="text-zinc-400 mx-auto mb-2" size={24} />
              <p className="text-[10px] font-bold uppercase">Working Dir</p>
            </div>
            <ArrowRight className="text-zinc-700" />
            <div className="p-6 bg-emerald-500/10 rounded-2xl border-2 border-dashed border-emerald-500/40">
              <Layers className="text-emerald-400 mx-auto mb-2" size={32} />
              <p className="text-xs font-bold uppercase text-emerald-400">Staging Area</p>
            </div>
            <ArrowRight className="text-zinc-700" />
            <div className="p-4 bg-zinc-800 rounded-xl border border-zinc-700">
              <Database className="text-zinc-400 mx-auto mb-2" size={24} />
              <p className="text-[10px] font-bold uppercase">Repository</p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 max-w-md mx-auto italic">
            "Você não joga tudo no repositório de uma vez. Você escolhe o que está pronto, coloca na Staging Area, e depois faz o commit."
          </p>
        </div>

        <h3 className="text-xl font-bold text-white">Por que isso é bom?</h3>
        <ul className="space-y-3">
          <li className="flex gap-3 text-sm">
            <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
            <span>Permite fazer commits parciais (apenas alguns arquivos).</span>
          </li>
          <li className="flex gap-3 text-sm">
            <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
            <span>Dá uma chance de revisar o que será enviado.</span>
          </li>
          <li className="flex gap-3 text-sm">
            <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
            <span>Facilita a organização de commits atômicos e limpos.</span>
          </li>
        </ul>
      </div>
    )
  },
  'git add: Preparando Mudanças': {
    title: 'git add: Preparando Mudanças',
    xp: 140,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          O comando <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded">git add</code> é como você move arquivos do seu diretório de trabalho para a Staging Area.
        </p>

        <div className="space-y-4">
          <h4 className="text-white font-bold">Comandos comuns</h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800 space-y-3">
            <div>
              <p className="text-zinc-500"># Adiciona um arquivo específico</p>
              <p className="text-emerald-400">git add <span className="text-zinc-300">index.html</span></p>
            </div>
            <div>
              <p className="text-zinc-500"># Adiciona todos os arquivos modificados e novos</p>
              <p className="text-emerald-400">git add .</p>
            </div>
            <div>
              <p className="text-zinc-500"># Adiciona todos os arquivos de uma pasta</p>
              <p className="text-emerald-400">git add <span className="text-zinc-300">src/</span></p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl">
          <h4 className="text-amber-400 font-bold mb-2">Atenção!</h4>
          <p className="text-sm text-zinc-400">
            Se você alterar um arquivo <strong>depois</strong> de ter dado <code className="text-amber-400">git add</code>, você precisará rodar o comando novamente para que a nova alteração vá para o commit. O Git tira um "snapshot" do arquivo no momento exato do <code className="text-amber-400">add</code>.
          </p>
        </div>
      </div>
    )
  },
  'git commit: Registrando a História': {
    title: 'git commit: Registrando a História',
    xp: 160,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          O <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded">git commit</code> é o momento em que você salva permanentemente suas alterações no histórico do projeto.
        </p>

        <div className="space-y-4">
          <h4 className="text-white font-bold">Fazendo seu primeiro commit</h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800">
            <p className="text-emerald-400">git commit -m <span className="text-zinc-300">"feat: adiciona estrutura inicial do projeto"</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
            <h5 className="text-white font-bold mb-3">Boas Práticas</h5>
            <ul className="text-xs text-zinc-500 space-y-2">
              <li>• Use o imperativo ("Adiciona" em vez de "Adicionado").</li>
              <li>• Seja descritivo, mas conciso.</li>
              <li>• Commite com frequência (commits pequenos).</li>
              <li>• Um commit deve resolver apenas um problema.</li>
            </ul>
          </div>
          <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
            <h5 className="text-emerald-400 font-bold mb-3">O que é o SHA?</h5>
            <p className="text-xs text-zinc-400">
              Cada commit gera um código único de 40 caracteres (ex: <code className="text-emerald-400">a1b2c3d...</code>). Esse é o ID do seu commit, permitindo que você o identifique e recupere no futuro.
            </p>
          </div>
        </div>
      </div>
    )
  },
  'git status e git log: Monitoramento': {
    title: 'git status e git log: Monitoramento',
    xp: 130,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Como saber o que está acontecendo no seu repositório? O Git oferece dois olhos poderosos: <code className="text-emerald-400">status</code> e <code className="text-emerald-400">log</code>.
        </p>

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-white font-bold flex items-center gap-2">
              <Search className="text-blue-400" size={20} />
              git status
            </h4>
            <p className="text-sm text-zinc-400">Mostra o estado atual: quais arquivos foram modificados, quais estão no staging e em qual branch você está.</p>
            <div className="bg-black rounded-xl p-4 font-mono text-xs border border-zinc-800">
              <p className="text-zinc-500">On branch main</p>
              <p className="text-zinc-500">Changes not staged for commit:</p>
              <p className="text-red-400">  modified:   index.html</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold flex items-center gap-2">
              <History className="text-emerald-400" size={20} />
              git log
            </h4>
            <p className="text-sm text-zinc-400">Mostra a linha do tempo do projeto: quem fez o quê e quando.</p>
            <div className="bg-black rounded-xl p-4 font-mono text-xs border border-zinc-800">
              <p className="text-amber-400">commit 7f8e9a2b...</p>
              <p className="text-zinc-300">Author: Bruno Silva</p>
              <p className="text-zinc-500">Date: Wed Mar 11 10:00:00 2026</p>
              <p className="text-white mt-2">    feat: cria sistema de login</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'Desfazendo Alterações: git checkout e restore': {
    title: 'Desfazendo Alterações: git checkout e restore',
    xp: 170,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Errou? Não tem problema. O Git é uma máquina do tempo e permite que você desfaça quase qualquer coisa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-white font-bold flex items-center gap-2">
              <RotateCcw className="text-amber-400" size={20} />
              Desfazendo no Working Dir
            </h4>
            <p className="text-xs text-zinc-500">Você alterou um arquivo mas quer voltar ao que estava no último commit.</p>
            <div className="bg-black rounded-xl p-4 font-mono text-xs border border-zinc-800">
              <p className="text-emerald-400">git restore <span className="text-zinc-300">arquivo.js</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold flex items-center gap-2">
              <Layers className="text-blue-400" size={20} />
              Tirando do Staging
            </h4>
            <p className="text-xs text-zinc-500">Você deu <code className="text-zinc-300">git add</code> mas se arrependeu e não quer que o arquivo vá no commit.</p>
            <div className="bg-black rounded-xl p-4 font-mono text-xs border border-zinc-800">
              <p className="text-emerald-400">git restore --staged <span className="text-zinc-300">arquivo.js</span></p>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl mt-6">
          <h4 className="text-red-400 font-bold mb-2">Cuidado Extremo!</h4>
          <p className="text-sm text-zinc-400">
            Comandos que desfazem alterações no diretório de trabalho (como <code className="text-red-400">git restore</code>) são <strong>destrutivos</strong>. Você perderá as mudanças que fez e não poderá recuperá-las. Tenha certeza antes de rodar!
          </p>
        </div>
      </div>
    )
  },
  'O Poder das Branches': {
    title: 'O Poder das Branches',
    xp: 220,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          As <strong>Branches</strong> (ramos) são a funcionalidade mais amada do Git. Elas permitem que você saia da linha principal de desenvolvimento para trabalhar em algo novo sem medo.
        </p>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
          <div className="flex flex-col items-center space-y-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="w-20 h-1 bg-emerald-500/30" />
              <div className="w-4 h-4 rounded-full bg-emerald-500" />
              <div className="w-20 h-1 bg-emerald-500/30" />
              <div className="w-4 h-4 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-400 ml-2">MAIN</span>
            </div>
            
            <div className="flex items-center gap-4 self-end mr-12">
              <div className="w-1 h-12 bg-purple-500/30 -mt-12 ml-2" />
              <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <div className="w-20 h-1 bg-purple-500/30" />
              <div className="w-4 h-4 rounded-full bg-purple-500" />
              <span className="text-[10px] font-bold text-purple-400 ml-2">FEATURE-X</span>
            </div>
          </div>
          <GitBranch className="absolute -right-10 -bottom-10 text-white/5 w-64 h-64 rotate-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <h5 className="text-white font-bold mb-2">Isolamento</h5>
            <p className="text-xs text-zinc-500">Trabalhe em uma nova funcionalidade sem quebrar a versão estável do projeto.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <h5 className="text-white font-bold mb-2">Paralelismo</h5>
            <p className="text-xs text-zinc-500">Vários desenvolvedores podem trabalhar em tarefas diferentes ao mesmo tempo.</p>
          </div>
        </div>
      </div>
    )
  },
  'Criando e Alternando Branches': {
    title: 'Criando e Alternando Branches',
    xp: 150,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Criar e navegar entre branches é algo que você fará dezenas de vezes por dia.
        </p>

        <div className="space-y-4">
          <h4 className="text-white font-bold">Comandos fundamentais</h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800 space-y-4">
            <div>
              <p className="text-zinc-500"># Lista todas as branches</p>
              <p className="text-emerald-400">git branch</p>
            </div>
            <div>
              <p className="text-zinc-500"># Cria uma nova branch</p>
              <p className="text-emerald-400">git branch <span className="text-zinc-300">nova-feature</span></p>
            </div>
            <div>
              <p className="text-zinc-500"># Alterna para uma branch existente</p>
              <p className="text-emerald-400">git checkout <span className="text-zinc-300">nova-feature</span></p>
            </div>
            <div className="pt-2 border-t border-zinc-800">
              <p className="text-zinc-500"># Atalho: Cria e alterna em um só comando</p>
              <p className="text-emerald-400">git checkout -b <span className="text-zinc-300">outra-feature</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'Merge: Unindo Histórias': {
    title: 'Merge: Unindo Histórias',
    xp: 190,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Depois de terminar o trabalho em uma branch, você precisa trazer essas mudanças de volta para a linha principal. Isso é o <strong>Merge</strong>.
        </p>

        <div className="space-y-4">
          <h4 className="text-white font-bold">Como fazer um merge</h4>
          <div className="bg-black rounded-xl p-6 font-mono text-sm border border-zinc-800 space-y-4">
            <div>
              <p className="text-zinc-500"># 1. Vá para a branch que vai RECEBER as mudanças</p>
              <p className="text-emerald-400">git checkout main</p>
            </div>
            <div>
              <p className="text-zinc-500"># 2. Una a outra branch à atual</p>
              <p className="text-emerald-400">git merge <span className="text-zinc-300">nova-feature</span></p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <Zap className="text-amber-400" size={18} />
            Fast-forward
          </h4>
          <p className="text-sm text-zinc-400">
            Se a branch <code className="text-emerald-400">main</code> não tiver novos commits desde que você criou a sua feature, o Git apenas "move o ponteiro" para frente. É o merge mais limpo e rápido possível!
          </p>
        </div>
      </div>
    )
  },
  'Resolvendo Conflitos de Merge': {
    title: 'Resolvendo Conflitos de Merge',
    xp: 250,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          O pesadelo de todo iniciante, mas uma rotina para profissionais. Conflitos acontecem quando duas pessoas alteram a <strong>mesma linha</strong> do <strong>mesmo arquivo</strong>.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="bg-zinc-800 px-4 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Visualizando o conflito</div>
          <div className="p-6 font-mono text-xs space-y-1">
            <p className="text-blue-400">{"<<<<<<< HEAD"}</p>
            <p className="text-white">console.log("Olá do Main");</p>
            <p className="text-zinc-500">{"======="}</p>
            <p className="text-white">console.log("Olá da Feature");</p>
            <p className="text-blue-400">{">>>>>>> feature-x"}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold">Passo a passo para resolver:</h4>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
              <p className="text-sm text-zinc-400">Abra o arquivo e escolha qual versão manter (ou combine as duas).</p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
              <p className="text-sm text-zinc-400">Remova as marcações do Git (<code className="text-zinc-300">{"<<<<<<<, =======, >>>>>>>"}</code>).</p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
              <p className="text-sm text-zinc-400">Dê um <code className="text-emerald-400">git add</code> no arquivo resolvido.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold shrink-0">4</div>
              <p className="text-sm text-zinc-400">Finalize com um <code className="text-emerald-400">git commit</code>.</p>
            </li>
          </ol>
        </div>
      </div>
    )
  },
  'Trabalhando com Repositórios Remotos': {
    title: 'Trabalhando com Repositórios Remotos',
    xp: 200,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Até agora tudo foi local. Repositórios remotos (como no GitHub) permitem que você compartilhe seu código com o mundo e colabore com outros.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
            <Globe className="text-blue-400 mx-auto mb-2" size={24} />
            <h5 className="text-white font-bold text-xs mb-1">git clone</h5>
            <p className="text-[10px] text-zinc-500">Baixa um projeto existente para sua máquina.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
            <ArrowRight className="text-emerald-400 mx-auto mb-2 rotate-[-90deg]" size={24} />
            <h5 className="text-white font-bold text-xs mb-1">git push</h5>
            <p className="text-[10px] text-zinc-500">Envia seus commits locais para o servidor.</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
            <ArrowRight className="text-amber-400 mx-auto mb-2 rotate-[90deg]" size={24} />
            <h5 className="text-white font-bold text-xs mb-1">git pull</h5>
            <p className="text-[10px] text-zinc-500">Baixa as novidades do servidor para sua máquina.</p>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <h4 className="text-white font-bold">Conectando ao GitHub</h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800">
            <p className="text-zinc-500"># Adiciona o endereço do servidor com o apelido "origin"</p>
            <p className="text-emerald-400">git remote add origin <span className="text-zinc-300">https://github.com/user/repo.git</span></p>
            <p className="text-zinc-500 mt-2"># Envia pela primeira vez</p>
            <p className="text-emerald-400">git push -u origin main</p>
          </div>
        </div>
      </div>
    )
  },
  'Git Rebase: Mantendo a História Limpa': {
    title: 'Git Rebase: Mantendo a História Limpa',
    xp: 280,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          O <strong>Rebase</strong> é uma alternativa ao Merge. Em vez de criar um commit de união, ele "reescreve" seus commits no topo da branch de destino, criando uma história linear e limpa.
        </p>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-4">
          <h4 className="text-white font-bold flex items-center gap-2">
            <Zap className="text-emerald-400" size={18} />
            A Regra de Ouro do Rebase
          </h4>
          <p className="text-sm text-zinc-400">
            <strong>Nunca faça rebase em branches públicas</strong> (como a main). Use rebase apenas em suas branches locais de feature antes de enviá-las. Reescrever a história que outros já baixaram causará confusão e erros graves.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold">Como usar</h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800">
            <p className="text-zinc-500"># Na sua branch de feature</p>
            <p className="text-emerald-400">git rebase main</p>
          </div>
        </div>
      </div>
    )
  },
  'Git Stash: Pausando o Trabalho': {
    title: 'Git Stash: Pausando o Trabalho',
    xp: 180,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Imagine que você está no meio de uma tarefa complexa e surge um bug urgente na <code className="text-emerald-400">main</code>. Você não quer commitar um código quebrado. O <strong>Stash</strong> salva seu trabalho atual em uma "gaveta" temporária.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
            <Archive className="text-blue-400" size={24} />
            <h5 className="text-white font-bold">Guardar na gaveta</h5>
            <div className="bg-black p-2 rounded font-mono text-xs text-emerald-400">git stash</div>
            <p className="text-[10px] text-zinc-500">Limpa seu diretório de trabalho e guarda as mudanças.</p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
            <RotateCcw className="text-emerald-400" size={24} />
            <h5 className="text-white font-bold">Pegar de volta</h5>
            <div className="bg-black p-2 rounded font-mono text-xs text-emerald-400">git stash pop</div>
            <p className="text-[10px] text-zinc-500">Aplica as mudanças guardadas e remove da gaveta.</p>
          </div>
        </div>
      </div>
    )
  },
  'Git Cherry-pick: Escolhendo Commits': {
    title: 'Git Cherry-pick: Escolhendo Commits',
    xp: 230,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          O <strong>Cherry-pick</strong> permite que você escolha um commit específico de uma branch e o aplique na sua branch atual. É como "colher uma cereja".
        </p>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Target className="text-red-400" size={20} />
            Quando usar?
          </h4>
          <p className="text-sm text-zinc-400">
            Útil quando você corrigiu um bug em uma branch de teste e precisa dessa mesma correção na branch de produção imediatamente, sem trazer todas as outras mudanças experimentais.
          </p>
        </div>

        <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800">
          <p className="text-zinc-500"># Aplica o commit especificado pelo SHA</p>
          <p className="text-emerald-400">git cherry-pick <span className="text-zinc-300">a1b2c3d</span></p>
        </div>
      </div>
    )
  },
  'Git Bisect: Encontrando Bugs': {
    title: 'Git Bisect: Encontrando Bugs',
    xp: 300,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Um bug apareceu e você não sabe qual commit o introduziu? O <strong>Bisect</strong> usa busca binária para encontrar o commit culpado rapidamente.
        </p>

        <div className="space-y-4">
          <h4 className="text-white font-bold flex items-center gap-2">
            <Bug className="text-red-400" size={20} />
            O processo
          </h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800 space-y-2">
            <p className="text-emerald-400">git bisect start</p>
            <p className="text-emerald-400">git bisect bad <span className="text-zinc-500"># Marca o atual como ruim</span></p>
            <p className="text-emerald-400">git bisect good <span className="text-zinc-300">v1.0</span> <span className="text-zinc-500"># Marca um commit antigo que estava bom</span></p>
          </div>
          <p className="text-sm text-zinc-400">
            O Git vai alternar entre os commits e perguntar se cada um está "bom" ou "ruim" até encontrar o primeiro commit que quebrou o código.
          </p>
        </div>
      </div>
    )
  },
  'Instalando o Git': {
    title: 'Instalando o Git',
    xp: 100,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          O Git está disponível para Linux, macOS e Windows. A instalação é simples e direta.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <h5 className="text-white font-bold mb-2">Windows</h5>
            <p className="text-xs text-zinc-500 mb-3">Baixe o instalador oficial "Git for Windows".</p>
            <a href="https://git-scm.com/download/win" target="_blank" className="text-[10px] text-emerald-400 font-bold hover:underline">git-scm.com</a>
          </div>
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <h5 className="text-white font-bold mb-2">macOS</h5>
            <p className="text-xs text-zinc-500 mb-3">Use o Homebrew ou instale via Xcode.</p>
            <code className="text-[10px] bg-black p-1 rounded text-emerald-400">brew install git</code>
          </div>
          <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <h5 className="text-white font-bold mb-2">Linux</h5>
            <p className="text-xs text-zinc-500 mb-3">Use o gerenciador de pacotes da sua distro.</p>
            <code className="text-[10px] bg-black p-1 rounded text-emerald-400">sudo apt install git</code>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
          <h4 className="text-white font-bold mb-2">Verificando a instalação</h4>
          <p className="text-sm text-zinc-400 mb-3">Abra seu terminal e digite:</p>
          <div className="bg-black p-3 rounded-xl font-mono text-sm text-emerald-400 border border-zinc-800">
            git --version
          </div>
        </div>
      </div>
    )
  },
  'Configurando Identidade': {
    title: 'Configurando Identidade',
    xp: 120,
    content: (
      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Agora que o Git está instalado, você precisa configurar seu nome e e-mail. Isso é fundamental para que seus commits sejam identificados corretamente.
        </p>

        <div className="space-y-4">
          <h4 className="text-white font-bold flex items-center gap-2">
            <Settings className="text-emerald-400" size={20} />
            Configuração Global
          </h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800 space-y-3">
            <div>
              <p className="text-zinc-500"># Seu nome (aparecerá nos commits)</p>
              <p className="text-emerald-400">git config --global user.name <span className="text-zinc-300">"Seu Nome"</span></p>
            </div>
            <div>
              <p className="text-zinc-500"># Seu e-mail (de preferência o do GitHub)</p>
              <p className="text-emerald-400">git config --global user.email <span className="text-zinc-300">"seu@email.com"</span></p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h4 className="text-white font-bold mb-2">Por que isso importa?</h4>
          <p className="text-sm text-zinc-400">
            O Git anexa essas informações a cada commit que você faz. Se você colaborar em projetos open source, as pessoas saberão quem contribuiu com aquele código.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold">Listando configurações</h4>
          <div className="bg-black rounded-xl p-4 font-mono text-sm border border-zinc-800">
            <p className="text-emerald-400">git config --list</p>
          </div>
        </div>
      </div>
    )
  }
};

interface LessonViewProps {
  lessonTitle: string;
  onBack: () => void;
  onComplete: (xp: number) => void;
}

export function LessonView({ lessonTitle, onBack, onComplete }: LessonViewProps) {
  const lesson = LESSONS_DATA[lessonTitle] || {
    title: lessonTitle,
    xp: 50,
    content: (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
          <BookOpen size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Conteúdo em Desenvolvimento</h3>
          <p className="text-zinc-500 max-w-xs">Estamos preparando o melhor material para esta lição. Volte em breve!</p>
        </div>
      </div>
    )
  };

  // Determine module based on lesson title (simplified for demo)
  const getModuleLabel = (title: string) => {
    if (['Instalando o Git', 'Configurando Identidade'].includes(title)) return 'Módulo 1';
    if (['O que é Controle de Versão?', 'Git vs SVN: As Diferenças', 'Instalação e Configuração Global', 'O Ciclo de Vida do Arquivo no Git', 'Primeiro Repositório: git init'].includes(title)) return 'Módulo 2';
    if (['Staging Area: O Coração do Git', 'git add: Preparando Mudanças', 'git commit: Registrando a História', 'git status e git log: Monitoramento', 'Desfazendo Alterações: git checkout e restore'].includes(title)) return 'Módulo 3';
    if (['O Poder das Branches', 'Criando e Alternando Branches', 'Merge: Unindo Histórias', 'Resolvendo Conflitos de Merge', 'Trabalhando com Repositórios Remotos'].includes(title)) return 'Módulo 4';
    return 'Módulo 5';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold">Voltar ao Currículo</span>
      </button>

      <div className="bg-[#0D1117] border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-8 md:p-12 border-b border-zinc-800 bg-gradient-to-br from-zinc-900 to-[#0D1117]">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase rounded-full tracking-wider">{getModuleLabel(lesson.title)}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">{lesson.xp} XP</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{lesson.title}</h1>
        </div>

        <div className="p-8 md:p-12">
          {lesson.content}
          
          <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-end">
            <button 
              onClick={() => onComplete(lesson.xp)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3 group"
            >
              Concluir Lição
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

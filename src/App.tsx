import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { products } from './data';
import { ShoppingCart, ArrowRight, Zap, Search, Smartphone, Trophy, Gamepad2, BookOpen, Monitor, Headphones, Star, MessageSquare, ShieldCheck, Clock, Mail, HelpCircle, AlertTriangle, Bomb, Gift, Skull, Flame, Crosshair, Users, Bell } from 'lucide-react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [villainMode, setVillainMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [timeLeft, setTimeLeft] = useState(3600);
  const [lootBoxOpen, setLootBoxOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState({ name: '', item: '' });
  
  // Easter Eggs
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  
  interface ClickEffect {
    id: number;
    x: number;
    y: number;
    text: string;
  }
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const nextEffectId = useRef(0);

  // Konami Code Listener
  useEffect(() => {
    let index = 0;
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          setKonamiUnlocked(true);
          index = 0;
          setTimeout(() => setKonamiUnlocked(false), 5000); // Hide after 5 seconds
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Global Click Listener for POW!
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only show POW on clickable elements
      if (target.closest('button') || target.closest('a') || target.closest('[role="button"]') || target.closest('.cursor-pointer')) {
        const id = nextEffectId.current++;
        const text = Math.random() > 0.5 ? 'POW!' : 'BAM!';
        setClickEffects(prev => [...prev, { id, x: e.clientX, y: e.clientY, text }]);
        
        setTimeout(() => {
          setClickEffects(prev => prev.filter(effect => effect.id !== id));
        }, 800);
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    const names = ['João M.', 'Carlos S.', 'Ana P.', 'Felipe R.', 'Mariana G.', 'Lucas B.'];
    const items = ['PlayStation 5', 'Kindle Paperwhite', 'Monitor LG Ultrawide', 'Box Harry Potter', 'Cadeira Gamer Ninja'];
    
    const showRandomToast = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const item = items[Math.floor(Math.random() * items.length)];
      setToastMessage({ name, item });
      setToastVisible(true);
      
      setTimeout(() => setToastVisible(false), 4000);
    };

    // Initial delay before first toast
    const initialTimeout = setTimeout(showRandomToast, 5000);
    
    // Then show a toast every 15-25 seconds
    const interval = setInterval(() => {
      showRandomToast();
    }, Math.floor(Math.random() * 10000) + 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredProducts = activeFilter === 'todos' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  // Setup Parallax Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background parallax layers
  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const yTitle = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div 
      ref={containerRef} 
      className={`relative min-h-screen overflow-hidden font-sans text-black selection:bg-yellow-400 selection:text-black flex flex-col p-4 md:p-8 ${villainMode ? 'villain-mode' : ''}`}
      style={villainMode ? {} : {
        backgroundImage: 'radial-gradient(#00000033 1px, transparent 1px)',
        backgroundSize: '8px 8px',
        backgroundColor: '#1e3a8a'
      }}
    >
      {/* Background Parallax Elements */}
      <motion.div 
        style={{ y: yBg1 }}
        className="absolute top-10 left-10 md:top-20 md:left-20 w-64 h-64 bg-yellow-400 rounded-full mix-blend-overlay blur-3xl opacity-40 z-0 pointer-events-none"
      />
      <motion.div 
        style={{ y: yBg2 }}
        className="absolute top-1/2 right-10 md:right-32 w-96 h-96 bg-red-500 rounded-full mix-blend-overlay blur-3xl opacity-30 z-0 pointer-events-none"
      />

      <div className="relative z-10 w-full mx-auto flex flex-col h-full 2xl:px-14">
        
        {/* Painéis Laterais Decorativos (Scrolling Vertical) */}
        <div className="hidden 2xl:flex fixed left-2 top-0 bottom-0 w-12 pointer-events-none flex-col justify-center items-center overflow-hidden opacity-40 z-0 border-r-4 border-dashed border-black/20">
          <motion.div 
            animate={{ y: ["0%", "-50%"] }} 
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex flex-col gap-12 font-comic text-4xl text-white uppercase tracking-widest whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <span>🚨 OFERTAS MUTANTES 🚨 CAÇADA NERD 🚨 LOOT LENDÁRIO 🚨</span>
            <span>🚨 OFERTAS MUTANTES 🚨 CAÇADA NERD 🚨 LOOT LENDÁRIO 🚨</span>
          </motion.div>
        </div>

        <div className="hidden 2xl:flex fixed right-2 top-0 bottom-0 w-12 pointer-events-none flex-col justify-center items-center overflow-hidden opacity-40 z-0 border-l-4 border-dashed border-black/20">
          <motion.div 
            animate={{ y: ["-50%", "0%"] }} 
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex flex-col gap-12 font-comic text-4xl text-yellow-400 uppercase tracking-widest whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <span>🔥 PREÇO BUGADO 🔥 GAFANHOTOS 🔥 CUPOM SECRETO 🔥</span>
            <span>🔥 PREÇO BUGADO 🔥 GAFANHOTOS 🔥 CUPOM SECRETO 🔥</span>
          </motion.div>
        </div>

        {/* Header / Hero Section */}
        <motion.header 
          style={{ y: yTitle, opacity: opacityTitle }}
          className="flex flex-col md:flex-row items-center justify-between mb-8 z-10"
        >
          <div className="bg-yellow-400 border-4 border-black px-4 py-2 shadow-[6px_6px_0px_#000] -rotate-2 mb-4 md:mb-0"> 
            <img src="/grupologo.png" alt="Grupo de Ofertas Amazon" className="h-12 md:h-16 object-contain" />
          </div> 
          <div className="flex gap-4 items-center"> 
            <button onClick={() => setVillainMode(!villainMode)} className={`border-4 border-black px-3 py-2 font-black uppercase shadow-[4px_4px_0px_#000] cursor-pointer flex items-center gap-2 transition-colors ${villainMode ? 'bg-purple-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
              <Skull className="w-5 h-5" /> 
              <span className="hidden sm:inline">Modo Vilão</span>
            </button>
            <div className="bg-white border-4 border-black px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_#000] hover:bg-yellow-100 cursor-pointer">Início</div> 
            <div className="bg-red-600 text-white border-4 border-black px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_#000] hover:bg-red-700 cursor-pointer">Super Promoção</div> 
          </div>
        </motion.header>

        {/* Marquee Alert Banner */}
        <div className="w-full bg-red-600 border-4 border-black py-2 mb-8 overflow-hidden z-20 shadow-[4px_4px_0px_#000] transform -rotate-1 relative flex items-center">
          <div className="absolute left-0 bg-yellow-400 border-r-4 border-black z-30 h-full px-4 flex items-center justify-center">
            <span className="font-black uppercase italic text-black">PLANTÃO</span>
          </div>
          <div className="flex whitespace-nowrap animate-marquee font-bold text-white uppercase tracking-wider text-sm md:text-base ml-28">
            <span className="mx-4">⚡ PS5 COM 30% OFF - ESTOQUE ACABANDO</span>
            <span className="mx-4">🔥 BOX HARRY POTTER: MENOR PREÇO DO ANO</span>
            <span className="mx-4">🚨 KINDLE PAPERWHITE COM DESCONTO + FRETE GRÁTIS</span>
            <span className="mx-4">⚡ CUPOM 'AMZGEEK10' ATIVO PARA PERIFÉRICOS</span>
            {/* Duplicate for seamless scrolling */}
            <span className="mx-4">⚡ PS5 COM 30% OFF - ESTOQUE ACABANDO</span>
            <span className="mx-4">🔥 BOX HARRY POTTER: MENOR PREÇO DO ANO</span>
            <span className="mx-4">🚨 KINDLE PAPERWHITE COM DESCONTO + FRETE GRÁTIS</span>
            <span className="mx-4">⚡ CUPOM 'AMZGEEK10' ATIVO PARA PERIFÉRICOS</span>
          </div>
        </div>

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative w-full bg-white border-4 border-black shadow-[12px_12px_0px_#000] overflow-hidden flex flex-col md:flex-row items-stretch z-20"
        >
          <div className="absolute inset-0 bg-halftone opacity-[0.15] pointer-events-none z-0"></div>
          
          {/* Hero Content */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col items-start justify-center">
            <div className="inline-block bg-red-600 border-4 border-black px-4 py-1 mb-6 transform -rotate-2 shadow-[4px_4px_0px_#000]">
              <span className="font-black uppercase tracking-wider text-white text-sm md:text-base">Acesso VIP Liberado</span>
            </div>
            
            <h2 className="font-comic text-4xl md:text-6xl text-black uppercase leading-[1.1] mb-6 text-shadow-comic text-white">
              Os Maiores <span className="text-yellow-400 text-shadow-comic">Descontos</span> do Multiverso Nerd!
            </h2>
            
            <p className="font-bold text-base md:text-xl text-gray-800 mb-8 max-w-lg leading-relaxed">
              Monitoramos a Amazon 24/7 para trazer as melhores ofertas em games, livros, eletrônicos e HQs. Economize até 80% todos os dias!
            </p>
            
            <button className="bg-yellow-400 text-black font-black uppercase text-xl md:text-2xl py-4 px-8 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 transform -rotate-1 group">
              <Zap className="w-8 h-8 fill-black group-hover:scale-110 transition-transform" />
              ENTRAR NO GRUPO VIP
            </button>
          </div>

          {/* Hero Image Showcase */}
          <div className="flex-1 relative w-full min-h-[350px] md:min-h-[500px] bg-gradient-to-br from-blue-500 to-blue-700 border-t-4 md:border-t-0 md:border-l-4 border-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-halftone opacity-30 mix-blend-overlay"></div>
            
            {/* Dynamic Background Circle */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-blue-400 rounded-full border-4 border-black border-dashed opacity-50"
            />
            
            {/* Product Image placeholder - will be updated with actual data later */}
            <motion.img 
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src={products[1].image} 
              alt="Destaque"
              className="relative z-10 w-3/4 h-3/4 object-contain drop-shadow-2xl mix-blend-multiply"
            />
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [12, 16, 12] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute top-8 right-8 md:top-12 md:right-12 bg-red-600 border-4 border-black p-3 shadow-[6px_6px_0px_#000] z-20 flex flex-col items-center justify-center"
            >
              <span className="font-black text-white text-lg leading-none">OFERTA</span>
              <span className="font-comic text-4xl text-yellow-400 leading-none">ÉPICA!</span>
            </motion.div>
          </div>
        </motion.section>

        {/* Flash Deal Alert - Bomba Relógio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full bg-red-600 border-4 border-black p-4 md:p-6 mb-8 flex flex-col md:flex-row items-center justify-between shadow-[6px_6px_0px_#000] z-20 relative transform rotate-1"
        >
           <div className="absolute inset-0 bg-halftone opacity-20 mix-blend-overlay pointer-events-none"></div>
           <div className="flex items-center gap-4 relative z-10 w-full md:w-auto mb-4 md:mb-0">
             <motion.div animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 0.5 }}>
               <Bomb className="w-12 h-12 md:w-16 md:h-16 text-black" />
             </motion.div>
             <div>
               <h3 className="font-comic text-2xl md:text-3xl text-white uppercase leading-none mb-1 text-shadow-comic text-black">A Bomba vai explodir!</h3>
               <p className="font-bold text-yellow-400 text-sm uppercase tracking-wider">O maior cupom do dia expira em:</p>
             </div>
           </div>
           
           <div className="flex items-center justify-center gap-2 font-comic text-4xl md:text-6xl text-white text-shadow-comic bg-black px-6 py-2 shadow-[4px_4px_0px_#facc15] relative z-10 border-4 border-white">
             {formatTime(timeLeft)}
           </div>
        </motion.div>

        {/* Loot Box Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 w-full relative z-20 flex flex-col items-center justify-center bg-purple-600 border-4 border-black p-8 shadow-[8px_8px_0px_#000]"
        >
          <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none"></div>
          <h3 className="font-comic text-3xl md:text-5xl text-white uppercase text-shadow-comic mb-2 z-10 text-center">Caixa de Loot Misteriosa!</h3>
          <p className="font-bold text-yellow-300 uppercase mb-8 z-10 text-center">Clique para revelar o maior bug de preço do dia</p>
          
          <div 
            className="cursor-pointer relative z-10"
            onClick={() => setLootBoxOpen(true)}
          >
            {!lootBoxOpen ? (
              <motion.div 
                animate={{ rotate: [-2, 2, -2], y: [0, -5, 0] }} 
                transition={{ repeat: Infinity, duration: 0.3 }}
                className="w-32 h-32 md:w-40 md:h-40 bg-yellow-400 border-4 border-black shadow-[6px_6px_0px_#000] flex items-center justify-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 border-[8px] border-yellow-500 opacity-50"></div>
                <Gift className="w-16 h-16 text-black group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-2 text-black font-black uppercase text-xs">CLIQUE!</div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1, rotate: [0, 5, 0] }}
                className="w-64 bg-white border-4 border-black shadow-[6px_6px_0px_#000] p-4 text-center transform -rotate-2"
              >
                <h4 className="font-black text-red-600 uppercase text-xl mb-2 flex items-center justify-center gap-2"><Flame className="w-6 h-6" />CUPOM ACHADO!</h4>
                <div className="bg-yellow-400 border-2 border-black border-dashed py-2 mb-2">
                  <span className="font-comic text-3xl tracking-wider text-black">GIGABUG50</span>
                </div>
                <p className="font-bold text-xs text-black">50% OFF em monitores hoje!</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* O Chefão do Dia (Deal of the Day) */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 w-full z-20 relative bg-black border-4 border-white shadow-[12px_12px_0px_#ef4444] p-1 transform rotate-1"
        >
          <div className="bg-[repeating-linear-gradient(45deg,#000,#000_10px,#1a1a1a_10px,#1a1a1a_20px)] border-4 border-black p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            
            <div className="absolute top-4 left-4 bg-red-600 text-white font-black uppercase px-4 py-2 border-2 border-white shadow-[4px_4px_0px_#000] z-30 transform -rotate-6">
              🔥 CHEFÃO DO DIA
            </div>

            <div className="w-full md:w-1/2 relative z-20 flex justify-center mt-8 md:mt-0">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-500 blur-2xl opacity-40 rounded-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=600&h=600" 
                  alt="PS5 Boss" 
                  className="relative z-10 w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transform -scale-x-100"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 relative z-20 text-center md:text-left text-white">
              <h3 className="font-comic text-4xl md:text-6xl uppercase leading-none mb-2 text-shadow-comic text-yellow-400">
                Console PS5 <br/> Edição Digital
              </h3>
              
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <span className="font-black text-gray-400 text-xl line-through">R$ 4.499</span>
                <span className="font-comic text-5xl text-red-500 text-shadow-comic">R$ 3.899</span>
              </div>
              
              <div className="bg-red-900 border-2 border-red-500 p-4 mb-6">
                <div className="flex justify-between font-bold uppercase text-xs text-red-200 mb-1">
                  <span>HP do Estoque</span>
                  <span>12% Restante</span>
                </div>
                <div className="w-full bg-black h-4 border-2 border-black">
                  <motion.div 
                    initial={{ width: "100%" }}
                    animate={{ width: "12%" }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="h-full bg-red-600"
                  />
                </div>
              </div>

              <button className="w-full md:w-auto bg-red-600 text-white font-black uppercase text-2xl py-4 px-8 border-4 border-white shadow-[6px_6px_0px_#000] hover:bg-red-500 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3">
                <ShoppingCart className="w-8 h-8" />
                ATACAR (COMPRAR)
              </button>
            </div>
          </div>
        </motion.section>

        {/* Status da Guerra (Amazon Servers) */}
        <div className="w-full bg-black border-4 border-black p-4 mb-8 flex items-center justify-between font-mono text-xs md:text-sm shadow-[6px_6px_0px_#000] z-20 relative">
          <div className="flex items-center gap-3 text-green-400">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
            <span className="font-bold uppercase tracking-wider hidden sm:inline">Servidores Amazon:</span>
            <span className="text-white uppercase font-black">SUANDO FRIO</span>
          </div>
          <div className="text-yellow-400 font-bold uppercase flex gap-4">
            <span className="hidden md:inline">Bugs Ativos: 42</span>
            <span>Gafanhotos Online: 1.337</span>
          </div>
        </div>

        {/* Arcade Filters */}
        <div className="w-full flex flex-wrap gap-4 mb-8 relative z-20 justify-center">
          {[
            { id: 'todos', label: 'TODOS', icon: <Crosshair className="w-5 h-5" /> },
            { id: 'games', label: 'GAMES', icon: <Gamepad2 className="w-5 h-5" /> },
            { id: 'livros', label: 'HQs & MANGÁS', icon: <BookOpen className="w-5 h-5" /> },
            { id: 'eletronicos', label: 'ALERTAS VERMELHOS', icon: <Flame className="w-5 h-5" /> },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 border-4 border-black px-4 py-2 font-black uppercase shadow-[4px_4px_0px_#000] transition-all hover:translate-y-1 hover:translate-x-1 hover:shadow-none ${activeFilter === filter.id ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Product Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[minmax(180px,auto)] gap-6 w-full z-20 relative pb-8">
          {filteredProducts.map((product, index) => {
            let bentoClasses = "";
            let innerBg = "bg-white";
            let textColor = "text-black";
            let showButton = true;
            let priceColor = "text-blue-800";
            
            if (index === 0) {
              bentoClasses = "md:col-span-7 md:row-span-4 bg-gradient-to-br from-blue-400 to-blue-600";
              innerBg = "bg-white";
            } else if (index === 1) {
              bentoClasses = "md:col-span-5 md:row-span-3 bg-white";
            } else if (index === 2) {
              bentoClasses = "md:col-span-5 md:row-span-3 bg-yellow-400";
            } else if (index === 3) {
              bentoClasses = "md:col-span-3 md:row-span-2 bg-red-600 text-white";
              innerBg = "bg-white/20 border-white/50 border-2";
              textColor = "text-white";
              priceColor = "text-white";
              showButton = false;
            } else if (index === 4) {
              bentoClasses = "md:col-span-4 md:row-span-2 bg-blue-400";
              innerBg = "bg-black/10 border-black/20 border-2";
              showButton = false;
            } else {
              bentoClasses = "md:col-span-12 md:row-span-2 bg-white";
              showButton = true;
            }
            
            const isHero = index === 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group border-4 border-black shadow-[8px_8px_0px_#000] p-4 md:p-6 flex ${isHero ? 'flex-col md:flex-row md:items-center' : index === 5 ? 'flex-col sm:flex-row' : 'flex-col'} h-full relative overflow-hidden bg-white ${bentoClasses}`}
              >
                {/* Image Container */}
                <div className={`relative ${isHero ? 'w-full md:w-1/2 h-64 md:h-full order-1 md:order-2 flex items-center justify-center' : index === 5 ? 'w-full sm:w-1/3 h-48 sm:h-full flex-shrink-0' : 'w-full h-48'} mb-4 ${index === 5 ? 'sm:mb-0 sm:mr-6' : ''}`}>
                  <div className={`w-full h-full flex items-center justify-center ${isHero ? 'bg-white border-4 border-black rounded-full shadow-inner overflow-hidden max-w-sm max-h-[350px]' : 'bg-blue-100 border-2 border-black overflow-hidden'} p-2`}>
                     <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-contain relative z-10 mix-blend-multiply"
                    />
                  </div>
                  
                  {product.badge && (
                    <div className="absolute top-0 right-0 md:-right-4 bg-red-500 text-white border-4 border-black px-4 py-2 font-black italic text-lg md:text-xl transform rotate-12 z-20 shadow-md">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`flex-grow flex flex-col justify-between ${isHero ? 'w-full md:w-1/2 order-2 md:order-1 h-full' : index === 5 ? 'w-full sm:w-2/3' : 'h-full'}`}>
                  <div className={`${!isHero && index !== 3 && index !== 4 ? 'bg-white p-3 border-4 border-black mb-4' : 'mb-4'}`}>
                    <p className={`text-xs font-bold uppercase mb-1 ${textColor === 'text-white' ? 'text-white/80' : 'text-blue-800'}`}>Destaque Oferta</p>
                    <h3 className={`font-comic text-2xl uppercase leading-none mb-2 ${textColor === 'text-white' ? 'text-white' : 'text-black'}`}>
                      {product.title}
                    </h3>
                    <p className={`font-bold text-sm ${textColor === 'text-white' ? 'text-white/90' : 'text-gray-700'}`}>
                      Oferta especial do Grupo Amazon!
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`line-through text-sm font-bold ${textColor === 'text-white' ? 'text-white/80' : 'text-gray-500'}`}>
                        R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="bg-black text-white font-black italic px-2 py-0.5 text-xs uppercase">
                        -{Math.round(((product.originalPrice - product.dealPrice) / product.originalPrice) * 100)}%
                      </span>
                    </div>
                    <div className={`font-comic text-4xl mb-4 flex items-baseline gap-1 ${priceColor}`}>
                      <span className="text-xl">R$</span>
                      {product.dealPrice.toFixed(2).replace('.', ',')}
                    </div>
                    
                    {showButton && (
                      <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase text-xl py-3 px-4 border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2">
                        COMPRAR AGORA
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Radar de Bugs / Leaderboard */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 w-full z-20 relative bg-black border-4 border-black shadow-[8px_8px_0px_#facc15] p-6 md:p-10 font-mono"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
          
          <div className="flex flex-col items-center mb-8 relative z-10 text-green-400">
            <Trophy className="w-16 h-16 mb-4 animate-bounce" />
            <h3 className="font-black text-4xl md:text-5xl uppercase tracking-widest text-center text-shadow-comic">HIGH SCORES</h3>
            <p className="font-bold uppercase text-sm mt-2 text-center tracking-wider text-green-200">Radar de Bugs - As Maiores Caçadas da Semana</p>
          </div>
          
          <div className="flex flex-col gap-2 relative z-10">
            {/* Header Row */}
            <div className="flex justify-between items-center bg-green-900/50 border-2 border-green-500 p-2 font-bold uppercase text-xs md:text-sm text-green-300">
              <div className="w-12 text-center">RANK</div>
              <div className="flex-1 px-2">LOOT ACHEI</div>
              <div className="w-32 text-right hidden sm:block">PREÇO ORIG.</div>
              <div className="w-24 text-right text-yellow-400">DANO (OFF)</div>
            </div>
            
            {/* Rows */}
            {[
              { title: 'Monitor Gamer Ultrawide', original: 'R$ 1.800', off: '68%', score: '1ST', color: 'text-yellow-400' },
              { title: 'Placa de Vídeo RTX', original: 'R$ 3.500', off: '52%', score: '2ND', color: 'text-gray-300' },
              { title: 'Kindle 11ª Geração', original: 'R$ 499', off: '45%', score: '3RD', color: 'text-orange-400' },
              { title: 'Cadeira Gamer Max', original: 'R$ 1.200', off: '40%', score: '4TH', color: 'text-green-400' },
              { title: 'Controle PS5 DualSense', original: 'R$ 450', off: '35%', score: '5TH', color: 'text-green-400' },
            ].map((score, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-green-900/50 py-3 font-bold uppercase text-xs md:text-sm hover:bg-green-900/30 transition-colors">
                <div className={`w-12 text-center text-xl ${score.color}`}>{score.score}</div>
                <div className="flex-1 px-2 text-green-400 truncate">{score.title}</div>
                <div className="w-32 text-right text-green-600 hidden sm:block">{score.original}</div>
                <div className="w-24 text-right text-red-500 animate-pulse">-{score.off}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 z-10 relative">
            <span className="text-green-500 text-xs uppercase animate-pulse">Insert Coin to Join (Entra no Telegram!)</span>
          </div>
        </motion.section>

        {/* Como Funciona - Tirinha em Quadrinhos */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 w-full z-20 relative"
        >
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none"></div>
            <h3 className="font-comic text-3xl md:text-4xl uppercase mb-6 text-center text-black relative z-10">Como funciona nossa <span className="text-blue-600">Base Secreta?</span></h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black bg-black relative z-10">
              {/* Panel 1 */}
              <div className="bg-yellow-400 p-6 md:p-8 border-b-4 md:border-b-0 md:border-r-4 border-black relative min-h-[220px] flex flex-col items-center justify-center text-center group transition-colors hover:bg-yellow-300">
                <div className="absolute top-0 left-0 bg-white border-b-4 border-r-4 border-black px-3 py-1 font-black text-sm uppercase">Quadro 1</div>
                <Search className="w-16 h-16 mb-4 mt-6 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
                <h4 className="font-black uppercase text-xl mb-2 leading-none">Radar Ligado 24/7</h4>
                <p className="font-bold text-sm text-black/80">Nossos bots rastreiam a Amazon sem parar atrás de bugs e quedas de preço absurdas.</p>
              </div>
              
              {/* Panel 2 */}
              <div className="bg-blue-400 p-6 md:p-8 border-b-4 md:border-b-0 md:border-r-4 border-black relative min-h-[220px] flex flex-col items-center justify-center text-center group transition-colors hover:bg-blue-300">
                <div className="absolute top-0 left-0 bg-white border-b-4 border-r-4 border-black px-3 py-1 font-black text-sm uppercase">Quadro 2</div>
                <Smartphone className="w-16 h-16 mb-4 mt-6 text-black transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                <h4 className="font-black uppercase text-xl mb-2 leading-none text-black">Alerta Vermelho</h4>
                <p className="font-bold text-sm text-black/80">Achou oferta? O link vai direto pro nosso grupo VIP na velocidade da luz.</p>
              </div>
              
              {/* Panel 3 */}
              <div className="bg-red-500 p-6 md:p-8 relative min-h-[220px] flex flex-col items-center justify-center text-center group transition-colors hover:bg-red-400">
                <div className="absolute top-0 left-0 bg-white border-b-4 border-r-4 border-black px-3 py-1 font-black text-sm uppercase">Quadro 3</div>
                <Trophy className="w-16 h-16 mb-4 mt-6 text-white transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                <h4 className="font-black uppercase text-xl mb-2 text-white leading-none">Vitória Épica!</h4>
                <p className="font-bold text-sm text-white/90">Você clica, garante seu desconto e compra antes que o estoque acabe. Simples assim!</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Categories Section - Bento Style */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 w-full z-20 relative"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-purple-500 border-4 border-black p-4 shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex flex-col items-center justify-center text-center group">
              <Gamepad2 className="w-12 h-12 text-white mb-2 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform" />
              <h4 className="font-black text-white uppercase italic text-lg md:text-xl">Games</h4>
            </div>
            
            <div className="bg-green-500 border-4 border-black p-4 shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex flex-col items-center justify-center text-center group">
              <Monitor className="w-12 h-12 text-white mb-2 transform group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              <h4 className="font-black text-white uppercase italic text-lg md:text-xl">Hardware</h4>
            </div>
            
            <div className="bg-orange-500 border-4 border-black p-4 shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex flex-col items-center justify-center text-center group">
              <BookOpen className="w-12 h-12 text-white mb-2 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
              <h4 className="font-black text-white uppercase italic text-lg md:text-xl">Livros & HQs</h4>
            </div>
            
            <div className="bg-pink-500 border-4 border-black p-4 shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex flex-col items-center justify-center text-center group">
              <Headphones className="w-12 h-12 text-white mb-2 transform group-hover:scale-110 group-hover:rotate-6 transition-transform" />
              <h4 className="font-black text-white uppercase italic text-lg md:text-xl">Áudio</h4>
            </div>
          </div>
        </motion.section>

        {/* Testimonials / Social Proof Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 w-full z-20 relative bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 md:p-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="font-comic text-4xl uppercase text-black leading-none mb-2">Relatos do Front!</h3>
              <p className="font-bold text-gray-700">Veja o que o esquadrão está dizendo sobre as ofertas.</p>
            </div>
            <div className="bg-yellow-400 border-4 border-black px-4 py-2 mt-4 md:mt-0 flex items-center gap-2 transform rotate-2">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-black uppercase text-sm">Mais de 50k membros</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Testimonial 1 */}
            <div className="relative">
              <div className="bg-blue-100 border-4 border-black p-6 rounded-2xl rounded-bl-none shadow-[4px_4px_0px_#000] mb-4">
                <div className="flex text-yellow-500 mb-2">
                  <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                </div>
                <p className="font-bold text-gray-800 italic">"Consegui meu PS5 por um preço que eu achei que era golpe! O bot deles avisa muito rápido, se piscar perdeu."</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500 border-2 border-black rounded-full flex items-center justify-center font-comic text-white text-xl">R</div>
                <div>
                  <h4 className="font-black uppercase text-sm leading-none">Rafael "Sniper"</h4>
                  <span className="text-xs font-bold text-gray-600">Membro Elite</span>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="relative md:mt-8">
              <div className="bg-yellow-100 border-4 border-black p-6 rounded-2xl rounded-br-none shadow-[4px_4px_0px_#000] mb-4">
                <div className="flex text-yellow-500 mb-2">
                  <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                </div>
                <p className="font-bold text-gray-800 italic">"Minha coleção de mangás agradece. Todo dia tem uma loucura de cupom que comba com desconto da Amazon. Bom demais!"</p>
              </div>
              <div className="flex items-center gap-3 justify-end text-right">
                <div>
                  <h4 className="font-black uppercase text-sm leading-none">Camila Geek</h4>
                  <span className="text-xs font-bold text-gray-600">Caçadora de HQs</span>
                </div>
                <div className="w-12 h-12 bg-purple-500 border-2 border-black rounded-full flex items-center justify-center font-comic text-white text-xl">C</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ - Manual de Sobrevivência */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 w-full z-20 relative bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 md:p-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8 relative z-10 text-center md:text-left">
            <div className="w-16 h-16 bg-blue-600 border-4 border-black rounded-full flex items-center justify-center transform -rotate-12 shadow-[4px_4px_0px_#000]">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-comic text-4xl uppercase text-black leading-none">Manual de Sobrevivência</h3>
              <p className="font-bold text-gray-700 uppercase text-sm mt-1">O que você precisa saber antes de caçar ofertas.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-blue-100 border-4 border-black p-5 shadow-[4px_4px_0px_#000] hover:bg-blue-200 transition-colors cursor-pointer group">
              <h4 className="font-black uppercase text-lg mb-2 flex items-center gap-2 group-hover:text-blue-800 transition-colors">
                <AlertTriangle className="w-6 h-6 text-red-500" /> É seguro comprar?
              </h4>
              <p className="font-bold text-sm text-gray-700">100% Seguro! Todos os links te levam direto para a Amazon Brasil. Nós apenas encontramos os "bugs" e descontos para você.</p>
            </div>
            
            <div className="bg-yellow-100 border-4 border-black p-5 shadow-[4px_4px_0px_#000] hover:bg-yellow-200 transition-colors cursor-pointer group">
              <h4 className="font-black uppercase text-lg mb-2 flex items-center gap-2 group-hover:text-yellow-800 transition-colors">
                <Zap className="w-6 h-6 text-blue-500" /> Preços mudam rápido?
              </h4>
              <p className="font-bold text-sm text-gray-700">Lei da selva nerd! Quando achamos um bug agressivo, o estoque evapora em minutos. Você precisa ser muito rápido!</p>
            </div>
            
            <div className="bg-green-100 border-4 border-black p-5 shadow-[4px_4px_0px_#000] hover:bg-green-200 transition-colors cursor-pointer group">
              <h4 className="font-black uppercase text-lg mb-2 flex items-center gap-2 group-hover:text-green-800 transition-colors">
                <ShieldCheck className="w-6 h-6 text-green-600" /> Custa algo para entrar?
              </h4>
              <p className="font-bold text-sm text-gray-700">Nunca! Nossa base secreta no Telegram e WhatsApp é e sempre será 100% gratuita. O esquadrão é livre!</p>
            </div>
            
            <div className="bg-purple-100 border-4 border-black p-5 shadow-[4px_4px_0px_#000] hover:bg-purple-200 transition-colors cursor-pointer group">
              <h4 className="font-black uppercase text-lg mb-2 flex items-center gap-2 group-hover:text-purple-800 transition-colors">
                <Star className="w-6 h-6 text-purple-500" /> Tem outras lojas?
              </h4>
              <p className="font-bold text-sm text-gray-700">Nosso radar foca na Amazon (frete Prime, etc), mas se rolar um loot lendário em outra loja super confiável, nós avisamos!</p>
            </div>
          </div>
        </motion.section>

      {/* Meta da Comunidade */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 w-full z-20 relative bg-black border-4 border-black p-6 shadow-[8px_8px_0px_#facc15] transform -rotate-1"
        >
          <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-white">
              <Users className="w-12 h-12 text-yellow-400" />
              <div>
                <h3 className="font-comic text-2xl md:text-3xl uppercase leading-none mb-1 text-shadow-comic">Missão: 60k Membros</h3>
                <p className="font-bold text-gray-300 text-sm uppercase">Sorteio de um PS5 no grupo secreto quando bater a meta!</p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 bg-gray-800 border-4 border-white h-12 relative overflow-hidden flex items-center">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-500 border-r-4 border-black"
              >
                {/* Diagonal stripes overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>
              </motion.div>
              <div className="absolute w-full text-center font-black uppercase text-white mix-blend-difference z-10 text-xl tracking-widest">
                85% Concluído (51.240)
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mega CTA Telegram/WhatsApp */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-12 w-full z-20 relative bg-yellow-400 border-4 border-black shadow-[12px_12px_0px_#000] p-8 md:p-12 overflow-hidden text-center transform rotate-1"
        >
          <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-600 border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_#000] transform -rotate-6">
              <MessageSquare className="w-10 h-10 text-white fill-current" />
            </div>
            
            <h2 className="font-comic text-4xl md:text-6xl text-black uppercase leading-[1.1] mb-4 text-shadow-comic text-white">
              JUNTE-SE AO QUARTEL GENERAL!
            </h2>
            
            <p className="font-bold text-lg md:text-xl text-black max-w-2xl mx-auto mb-8 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000]">
              Não perca mais nenhuma batalha contra os preços altos. Receba as notificações de erro de preço e promoções relâmpago diretamente no seu celular.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button className="bg-[#0088cc] text-white font-black uppercase text-xl py-4 px-8 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3">
                <MessageSquare className="w-6 h-6" />
                ENTRAR NO TELEGRAM
              </button>
              <button className="bg-[#25D366] text-white font-black uppercase text-xl py-4 px-8 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3">
                <Smartphone className="w-6 h-6" />
                GRUPO NO WHATSAPP
              </button>
            </div>
            
            <p className="mt-6 font-bold text-sm uppercase">100% Grátis • Mais de 50.000 Membros • Ofertas 24h</p>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-auto flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase text-blue-200 border-t-2 border-blue-800 pt-4 w-full z-20 relative"
        >
          <p className="mb-2 md:mb-0">© 2024 GRUPO DE OFERTAS AMAZON | TODOS OS DIREITOS RESERVADOS</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white transition-colors">Telegram</span>
            <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-white transition-colors">Twitter</span>
          </div>
        </motion.footer>

      </div>
      
      {/* FOMO Toast Notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="fixed bottom-6 right-6 z-50 bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] flex items-center gap-4 max-w-sm"
          >
            <div className="w-12 h-12 bg-green-500 border-2 border-black rounded-full flex items-center justify-center shrink-0">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-600 mb-1">
                <span className="text-black font-black uppercase">{toastMessage.name}</span> acabou de comprar:
              </p>
              <p className="font-black text-blue-600 uppercase leading-none">{toastMessage.item}</p>
              <p className="text-xs font-bold text-gray-500 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Agora mesmo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami Code Popup */}
      <AnimatePresence>
        {konamiUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: [-10, 10, -5, 5, 0] }}
            exit={{ opacity: 0, scale: 0, rotate: 20 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.6 }}
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="bg-yellow-400 border-8 border-black p-8 max-w-2xl w-full text-center shadow-[16px_16px_0px_#f00] relative z-10 transform -rotate-2">
              <Star className="w-24 h-24 text-red-600 mx-auto mb-4 animate-spin-slow" />
              <h2 className="font-comic text-5xl md:text-7xl uppercase text-white text-shadow-comic mb-4 leading-none">LOOT LENDÁRIO DESBLOQUEADO!</h2>
              <p className="font-black text-2xl uppercase bg-black text-yellow-400 p-4 border-4 border-white mb-6 inline-block">CUPOM: KONAMI99 (99% OFF)</p>
              <p className="font-bold text-xl uppercase">Você encontrou o código secreto dos deuses!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Effects (POW! BAM!) */}
      <AnimatePresence>
        {clickEffects.map(effect => (
          <motion.div
            key={effect.id}
            initial={{ scale: 0, opacity: 1, rotate: Math.random() * 60 - 30, x: '-50%', y: '-50%' }}
            animate={{ scale: [0, 1.5, 1], opacity: [1, 1, 0], y: ['-50%', '-100%'] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed pointer-events-none z-[100] font-comic font-black text-3xl md:text-5xl text-yellow-400 text-shadow-comic"
            style={{ left: effect.x, top: effect.y }}
          >
            <div className="bg-red-600 px-4 py-2 border-4 border-black transform skew-x-12 -skew-y-6 flex items-center justify-center shadow-[4px_4px_0px_#000]">
               {effect.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

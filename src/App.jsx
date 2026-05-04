import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, GraduationCap, Trophy, FileText, BarChart3, 
  MapPin, Calendar, CheckCircle2, ChevronRight, Zap, Star, 
  ShieldCheck, Mail, Send, X, MessageSquare, Sliders, Target, Menu
} from 'lucide-react';

const LOGO_URL = "https://github.com/justsummon/smartapply/blob/main/%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-copy-0.png?raw=true";

const translations = {
  ru: {
    dash: "Дашборд", unis: "Университеты", grants: "Стипендии", apps: "Заявки", insights: "Аналитика",
    fit: "Шанс поступления", grantFit: "Шанс на грант", roadmap: "План зачисления",
    upgrade: "ПЕРЕЙТИ НА ELITE", simulator: "SmartApply™ Симулятор баллов", plans: "Тарифы успеха",
    mostPopular: "ПОПУЛЯРНЫЙ ВЫБОР", compatibility: "Совместимость"
  },
  en: {
    dash: "Dashboard", unis: "Universities", grants: "Scholarships", apps: "Applications", insights: "Insights",
    fit: "Admission Chance", grantFit: "Grant Probability", roadmap: "Admission Roadmap",
    upgrade: "UPGRADE TO ELITE", simulator: "SmartApply™ Score Simulator", plans: "Success Plans",
    mostPopular: "MOST POPULAR", compatibility: "Compatibility"
  },
  kk: {
    dash: "Басқару", unis: "Университеттер", grants: "Шәкіртақылар", apps: "Өтінімдер", insights: "Талдау",
    fit: "Түсу мүмкіндігі", grantFit: "Грант мүмкіндігі", roadmap: "Жол картасы",
    upgrade: "ELITE-КЕ ӨТУ", simulator: "SmartApply™ Симуляторы", plans: "Тарифтер",
    mostPopular: "ЕҢ ТАНЫМАЛ", compatibility: "Сәйкестік"
  }
};

export default function App() {
  const [lang, setLang] = useState('ru');
  const [activeUni, setActiveUni] = useState('aitu');
  const [scores, setScores] = useState({ gpa: 4.7, sat: 1380, ielts: 7.0 });
  const [data, setData] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ type: 'bot', text: 'Привет! Я SmartApply AI.' }]);
  const [input, setInput] = useState('');
  
  const t = translations[lang];

  useEffect(() => {
    fetch('http://localhost:5000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...scores, uniId: activeUni })
    }).then(res => res.json()).then(setData);
  }, [scores, activeUni]);

  const sendChat = () => {
    if (!input) return;
    setChatMessages([...chatMessages, { type: 'user', text: input }, { type: 'bot', text: 'Анализирую ваш профиль... У вас отличные шансы на грант!' }]);
    setInput('');
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  if (!data) return null;

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white font-sans overflow-x-hidden">
      
      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0F172A] border-r border-slate-800 z-[70] transition-transform duration-300
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* LOGO IN SIDEBAR */}
            <img src={LOGO_URL} alt="SmartApply Logo" className="h-10 w-auto object-contain" />
            <span className="font-black text-lg tracking-tighter uppercase">SmartApply</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="lg:hidden text-slate-400"><X /></button>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'dash', label: t.dash, icon: LayoutDashboard },
            { id: 'unis', label: t.unis, icon: GraduationCap },
            { id: 'grants', label: t.grants, icon: Trophy },
            { id: 'insights', label: t.insights, icon: BarChart3 },
          ].map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-slate-500 hover:text-white hover:bg-slate-800/50 transition-all">
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6">
          <button className="w-full py-4 bg-blue-600 rounded-2xl text-[10px] font-black tracking-widest shadow-xl shadow-blue-600/20 uppercase">
            {t.upgrade}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 min-w-0">
        
        {/* TOP NAV */}
        <header className="h-20 border-b border-slate-800 flex justify-between items-center px-4 md:px-12 sticky top-0 bg-[#0F172A]/80 backdrop-blur-xl z-40">
           <div className="flex items-center gap-4">
             <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-slate-400 border border-slate-800 rounded-lg">
               <Menu />
             </button>
             {/* LOGO IN MOBILE HEADER */}
             <img src={LOGO_URL} alt="SmartApply Logo" className="h-8 w-auto lg:hidden" />
           </div>
           
           <div className="flex gap-2 bg-slate-800/50 p-1 rounded-xl border border-slate-700 scale-90 md:scale-100">
              {['ru', 'en', 'kk'].map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-2 md:px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase ${lang === l ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>{l}</button>
              ))}
           </div>

           <div className="flex items-center gap-2 md:gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-black text-blue-500 uppercase italic">Pro Member</p>
                <p className="text-xs font-bold uppercase tracking-tight">Alexander</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-slate-800 shadow-xl overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
              </div>
           </div>
        </header>

        <div className="p-4 md:p-12 space-y-12 md:space-y-24">
          
          {/* HERO SECTION */}
          <section id="dash" className="flex flex-col lg:flex-row justify-between items-start gap-10">
            <div className="space-y-6 w-full">
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${data.strategy === 'Safety' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{data.strategy} School</span>
                {data.isLead && <span className="text-[9px] font-black text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-lg animate-pulse">🔥 University Target</span>}
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1]">{data.university.name}</h1>
              <div className="flex flex-wrap gap-4 text-slate-400 font-bold text-xs">
                <span className="flex items-center gap-1"><MapPin size={14} className="text-blue-500"/> {data.university.city}</span>
                <span className="flex items-center gap-1"><Calendar size={14} className="text-blue-500"/> {data.university.deadline}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="bg-slate-800/50 border border-slate-700 p-6 md:p-10 rounded-[32px] text-center flex-1 lg:min-w-[200px]">
                 <div className="text-5xl md:text-7xl font-black text-blue-500">{data.fitScore}%</div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-2">{t.fit}</p>
              </div>
              <div className="bg-blue-600 p-6 md:p-10 rounded-[32px] text-center flex-1 lg:min-w-[200px] shadow-2xl shadow-blue-600/20">
                 <div className="text-5xl md:text-7xl font-black text-white">{data.grantScore}%</div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-blue-100 mt-2">{t.grantFit}</p>
              </div>
            </div>
          </section>

          {/* SIMULATOR */}
          <section className="bg-slate-900 border border-slate-800 rounded-[40px] p-6 md:p-12">
             <div className="flex items-center gap-3 mb-10">
                <Sliders size={24} className="text-blue-500"/>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{t.simulator}</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4">
                  <div className="flex justify-between font-black text-[10px] uppercase text-slate-500 tracking-widest">GPA <span>{scores.gpa}</span></div>
                  <input type="range" min="2.0" max="5.0" step="0.1" value={scores.gpa} onChange={(e) => setScores({...scores, gpa: parseFloat(e.target.value)})} className="w-full h-3 bg-slate-800 rounded-lg cursor-pointer accent-blue-600" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between font-black text-[10px] uppercase text-slate-500 tracking-widest">SAT <span>{scores.sat}</span></div>
                  <input type="range" min="800" max="1600" step="10" value={scores.sat} onChange={(e) => setScores({...scores, sat: parseInt(e.target.value)})} className="w-full h-3 bg-slate-800 rounded-lg cursor-pointer accent-blue-600" />
                </div>
                <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl">
                   <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Target size={14}/> ML Advice:</p>
                   <p className="text-xs font-bold text-slate-300 italic leading-relaxed">"{data.advice}"</p>
                </div>
             </div>
          </section>

          {/* PRICING PLANS */}
          <section id="grants" className="space-y-16">
            <h2 className="text-3xl md:text-5xl font-black text-center uppercase tracking-tight">{t.plans}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-6xl mx-auto">
              {/* BASIC */}
              <motion.div whileHover={{y: -10}} className="bg-white text-slate-900 p-8 rounded-[40px] h-fit">
                <h3 className="font-bold text-lg mb-6 tracking-tight italic">Basic</h3>
                <div className="text-5xl font-black mb-8 tracking-tighter">0$</div>
                <button className="w-full py-4 border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400">Current Plan</button>
              </motion.div>
              {/* PRO */}
              <motion.div whileHover={{y: -10}} className="bg-white text-slate-900 p-8 md:p-10 rounded-[40px] border-4 border-blue-600 shadow-2xl relative scale-100 md:scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase whitespace-nowrap tracking-widest">{t.mostPopular}</div>
                <h3 className="font-bold text-lg mb-6 tracking-tight italic">Pro</h3>
                <div className="text-5xl font-black mb-10 tracking-tighter">29$</div>
                <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20">Upgrade Now</button>
              </motion.div>
              {/* ELITE */}
              <motion.div whileHover={{y: -10}} className="bg-slate-800 p-8 rounded-[40px] border border-slate-700 h-fit">
                <h3 className="font-bold text-lg mb-6 tracking-tight italic">Elite</h3>
                <div className="text-5xl font-black mb-10 tracking-tighter">79$</div>
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">Get Elite</button>
              </motion.div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-20 pb-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {/* LOGO IN FOOTER */}
                  <img src={LOGO_URL} alt="SmartApply Logo" className="h-8 w-auto opacity-80" />
                  <span className="font-black text-xs uppercase tracking-widest">© 2026 SmartApply Global</span>
                </div>
                <p className="text-[9px] font-bold text-slate-600 max-w-sm tracking-wide">The world's leading ML platform for academic admission intelligence. Shaping futures through data.</p>
             </div>
             <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
             </div>
          </footer>

        </div>
      </main>

      {/* --- AI CHAT --- */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {showChat && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-96 bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden text-slate-900">
              <div className="bg-blue-600 p-5 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <img src={LOGO_URL} alt="Bot Logo" className="h-5 w-auto brightness-200" />
                   <span className="font-black text-[10px] uppercase tracking-widest">AI Assistant</span>
                </div>
                <button onClick={() => setShowChat(false)}><X size={18}/></button>
              </div>
              <div className="h-64 p-5 overflow-y-auto space-y-4 bg-slate-50 font-bold text-[11px] leading-relaxed">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[85%] ${m.type === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 shadow-sm rounded-bl-none border border-slate-100'}`}>{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white flex gap-2 border-t">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} placeholder="Задать вопрос..." className="flex-1 text-xs outline-none font-bold text-slate-900" />
                <button onClick={sendChat} className="p-2 bg-blue-600 text-white rounded-xl"><Send size={16}/></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setShowChat(!showChat)} className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 text-white rounded-[20px] md:rounded-[24px] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-blue-500/30">
          <MessageSquare size={28} />
        </button>
      </div>

    </div>
  );
}
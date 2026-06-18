import { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Menu, X, Server } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemTime, setSystemTime] = useState('');
  const [pingRate, setPingRate] = useState(24);

  // Sync real-time digital clock format
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(
        now.toLocaleTimeString('zh-TW', { hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    
    // Simulate slight network jitter for realism
    const pingTimer = setInterval(() => {
      setPingRate(Math.floor(20 + Math.random() * 8));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(pingTimer);
    };
  }, []);

  const menuItems = [
    { label: '數據總覽', value: 'dashboard', id: '#dashboard' },
    { label: '系統模組', value: 'modules', id: '#modules' },
    { label: '作業流程', value: 'workflow', id: '#workflow' },
    { label: '批號庫存', value: 'inventory', id: '#inventory' },
    { label: '付款對帳', value: 'payments', id: '#payments' },
    { label: '權限角色', value: 'roles', id: '#roles' },
    { label: '導入價值', value: 'values', id: '#values' },
  ];

  const handleNavClick = (id: string, value: string) => {
    setActiveSection(value);
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header id="control-header" className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#07111F]/95 backdrop-blur-md border-b border-slate-800/80 font-sans">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Core Logo Branding */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-inner group overflow-hidden">
            {/* SVG replica of the high-tech upward metallic double-arrow logo */}
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              <defs>
                <linearGradient id="silver-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <linearGradient id="glow-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <path d="M15 85 L50 25 L85 85" fill="none" stroke="url(#glow-gradient)" strokeWidth="3" opacity="0.4" />
              <path d="M50 15 L80 65 L68 65 L50 35 L32 65 L20 65 Z" fill="url(#silver-gradient)" />
              <path d="M50 23 L62 55 L50 45 L38 55 Z" fill="url(#glow-gradient)" />
              <circle cx="50" cy="45" r="3" fill="#38bdf8" />
            </svg>
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-white text-base leading-none">達創智能科技</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono leading-none font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 rounded">SaaS</span>
            </div>
            <span className="text-[9px] tracking-wider text-slate-400 font-mono block mt-0.5">DACHUANG AI TECHNOLOGY</span>
          </div>
        </div>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm">
          {menuItems.map((item) => (
            <button
              key={item.value}
              id={`nav-link-${item.value}`}
              onClick={() => handleNavClick(item.id, item.value)}
              className={`px-3 py-1.5 rounded-md font-semibold tracking-wide transition-all duration-300 relative ${
                activeSection === item.value
                  ? 'text-cyan-400 bg-slate-900 border border-slate-800'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {item.label}
              {activeSection === item.value && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Control Room Telemetry Status */}
        <div className="hidden lg:flex items-center gap-5 border-l border-slate-800 pl-5 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">連線狀態</span>
            <span className="text-emerald-400 font-bold uppercase">Active</span>
          </div>
          <div className="text-slate-400 bg-slate-900/80 px-2.5 py-1.5 border border-slate-800 rounded flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-cyan-400 font-bold">{systemTime}</span>
          </div>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center lg:hidden gap-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-[10px]">
            <span className="relative flex h-1.5 w-1.5 mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Drawer Menu overlays */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#07111F]/98 border-b border-slate-800/80 backdrop-blur-lg flex flex-col py-4 px-6 gap-2 transition-all duration-300">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.id, item.value)}
              className={`w-full py-3 px-4 rounded text-left font-semibold transition-colors ${
                activeSection === item.value
                  ? 'text-cyan-400 bg-slate-900 border-l-2 border-cyan-500'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-slate-800 font-mono text-xs text-slate-400 flex flex-wrap gap-x-6 gap-y-2 justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              服務連接狀態: <span className="text-emerald-400 font-bold">NORMAL</span>
            </span>
            <span>系統時間: <span className="text-cyan-400 font-bold">{systemTime}</span></span>
          </div>
        </div>
      )}
    </header>
  );
}

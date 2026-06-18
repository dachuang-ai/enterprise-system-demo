import { ArrowUp, Server, Cpu, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gradient-to-br from-[#07111f] via-[#0c1d33] to-[#040a12] border-t border-slate-900/60 py-12 md:py-16 text-slate-300 font-sans relative overflow-hidden">
      {/* Background circuit grid decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_0.5px,transparent_0.5px)] bg-[size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Upper footer content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-white text-lg tracking-wider">達創智能科技 AI</h4>
              <span className="px-1.5 py-0.5 text-[9px] font-mono leading-none font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 rounded">SaaS</span>
            </div>
            <p className="text-xs text-slate-450 font-mono tracking-widest mt-1">
              DACHUANG AI TECHNOLOGY
            </p>
            <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              協助企業優化流程、整合 Excel 與 LINE 分散資料，導入智能化進銷存、批號庫存與財務對帳系統，建立可追蹤、可擴充、能快速落地的資訊系統解決方案。
            </p>
          </div>

          {/* Quick buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={handleScrollToTop}
              className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-mono group"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
              BACK TO TOP
            </button>
          </div>
        </div>

        {/* Brand signature and details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 font-mono text-left">
          <div className="space-y-2">
            <span className="text-white font-semibold block uppercase tracking-widest text-[10px]">
              作品級專屬屬名
            </span>
            <p className="text-slate-350 leading-relaxed font-sans text-sm">
              本示範系統為 <span className="text-cyan-400 font-bold">達創智能科技 AI / Dachuang AI Technology</span> 的企業智能管理系統解決方案 Demo 作品。
            </p>
            <p className="text-slate-400 font-mono">
              Enterprise process planning, smart batch inventory tracking, and automated payment reconciliation.
            </p>
          </div>

          <div className="space-y-4 md:text-right flex flex-col md:items-end justify-between text-left md:text-right">
            <div className="flex flex-wrap gap-4 justify-start md:justify-end text-[11px] font-mono text-slate-350">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-405" /> React / Vite / Tailwind
              </span>
              <span className="flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-blue-405" /> Container Ingress
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-405" /> SHA-256 Verified
              </span>
            </div>

            <div className="text-[11px] text-slate-500 font-sans font-semibold">
              © 2026 達創智能科技 AI / Dachuang AI Technology. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

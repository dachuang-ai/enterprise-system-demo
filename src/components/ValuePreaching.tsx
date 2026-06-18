import { ShieldAlert, Fingerprint, Activity, Zap } from 'lucide-react';

export default function ValuePreaching() {
  const values = [
    {
      id: 1,
      title: '降低人工錯誤',
      desc: '杜絕各部門散落在 Excel、LINE 對聯與紙本中資訊零碎的窘局，將流向全數對位，大幅免除人為疏失或庫存對不齊等耗損。',
      icon: ShieldAlert,
      badge: '98% ERR REDUCTION',
      color: 'text-cyan-600 border-cyan-100 bg-cyan-50/50'
    },
    {
      id: 2,
      title: '作業流程可追蹤',
      desc: '每一次進貨入庫、出貨指扣庫、收付款登記，皆自動生成序批與操作審計摘要，確保每筆交易明細都擁有對應人核可核。',
      icon: Fingerprint,
      badge: '100% AUDIT TRAIL',
      color: 'text-blue-600 border-blue-100 bg-blue-50/50'
    },
    {
      id: 3,
      title: '管理決策即時化',
      desc: '管理者透過即時資訊看板，快速審察本週過期警告、庫存臨界、合作協調商款額狀況，免去期末人工拉表對帳。',
      icon: Activity,
      badge: 'REAL TIME INSIGHTS',
      color: 'text-emerald-600 border-emerald-100 bg-emerald-50/50'
    },
    {
      id: 4,
      title: '靈活、擴充力強',
      desc: '採用低代碼敏捷開發架構，可後續對接 Google Calendar 日曆、AI 自動化排程通知、進階會計傳票對帳或是 ERP 異量擴充。',
      icon: Zap,
      badge: 'AI READY ARCHITECTURE',
      color: 'text-purple-600 border-purple-100 bg-purple-50/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      {values.map((v) => {
        const Icon = v.icon;
        return (
          <div
            key={v.id}
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-350 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative shadow-sm overflow-hidden"
          >
            {/* Ambient glow decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-150/20 transition-all duration-500" />
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl border ${v.color} transition-all duration-300 group-hover:scale-105`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 px-2.5 py-1 rounded bg-slate-50 border border-slate-150">
                {v.badge}
              </span>
            </div>

            <h4 className="text-lg font-bold text-slate-800 tracking-wide text-left">
              {v.title}
            </h4>
            
            <p className="text-sm text-slate-500 mt-2.5 leading-relaxed text-left">
              {v.desc}
            </p>

            <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400 flex justify-between">
              <span>導入效益等級: 企業級 AAA</span>
              <span>回收週期: 1個月內</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

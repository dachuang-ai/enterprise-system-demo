import { useState } from 'react';
import { Package, Users, Download, Upload, AlertTriangle, FileText } from 'lucide-react';

export default function DashboardStats() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    {
      id: 1,
      num: '1,248',
      title: '商品總數',
      desc: '已建立完整 SKU 商品主檔',
      icon: Package,
      color: 'from-cyan-500/20 to-blue-500/5',
      borderColor: 'group-hover:border-cyan-500/50',
      iconColor: 'text-cyan-400',
      shadowColor: 'shadow-cyan-950/20',
      badge: 'SKU 主檔'
    },
    {
      id: 2,
      num: '86',
      title: '合作供應商',
      desc: '維護中之協力廠商通訊與合約',
      icon: Users,
      color: 'from-blue-500/20 to-indigo-500/5',
      borderColor: 'group-hover:border-blue-500/50',
      iconColor: 'text-blue-400',
      shadowColor: 'shadow-blue-950/20',
      badge: '供應廠商'
    },
    {
      id: 3,
      num: '32 批',
      title: '今日入庫',
      desc: '已簽收並完成批號綁定入庫份數',
      icon: Download,
      color: 'from-emerald-500/20 to-teal-500/5',
      borderColor: 'group-hover:border-emerald-500/50',
      iconColor: 'text-emerald-400',
      shadowColor: 'shadow-emerald-950/20',
      badge: '進貨單'
    },
    {
      id: 4,
      num: '47 批',
      title: '今日出貨',
      desc: '已核對批號扣庫並指支出貨通知',
      icon: Upload,
      color: 'from-teal-500/20 to-cyan-500/5',
      borderColor: 'group-hover:border-teal-500/50',
      iconColor: 'text-teal-400',
      shadowColor: 'shadow-teal-950/20',
      badge: '出貨單'
    },
    {
      id: 5,
      num: '12 類',
      title: '低庫存警示',
      desc: '實體庫存量低於安全再訂購水平',
      icon: AlertTriangle,
      color: 'from-amber-500/20 to-orange-500/5',
      borderColor: 'group-hover:border-amber-500/50',
      iconColor: 'text-amber-400',
      shadowColor: 'shadow-amber-950/20',
      badge: '補貨警示'
    },
    {
      id: 6,
      num: '18 筆',
      title: '待對帳付款',
      desc: '會計部待收付核銷與差額對帳單',
      icon: FileText,
      color: 'from-purple-500/20 to-fuchsia-500/5',
      borderColor: 'group-hover:border-purple-500/50',
      iconColor: 'text-purple-400',
      shadowColor: 'shadow-purple-950/20',
      badge: '應收應付'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            id={`stat-card-${stat.id}`}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative group bg-white p-6 rounded-xl border border-slate-200/80 hover:border-cyan-400 hover:-translate-y-1.5 duration-300 transition-all shadow-sm hover:shadow-lg hover:shadow-cyan-100/50"
          >
            {/* Soft inner blue highlight glow asset */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-400 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex justify-between items-start">
              <div className="space-y-1.5 z-10">
                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase block">
                  {stat.title}
                </span>
                <h3 className="text-3xl font-black tracking-tight text-slate-900 font-sans mr-2">
                  <span className="text-cyan-500 group-hover:text-cyan-600 transition-colors font-mono">{stat.num.split(' ')[0]}</span>
                  {stat.num.split(' ')[1] && <span className="text-sm font-semibold text-slate-500 ml-1">{stat.num.split(' ')[1]}</span>}
                </h3>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 z-10 transition-all duration-300 group-hover:scale-105 group-hover:bg-cyan-50 group-hover:border-cyan-100">
                <Icon className="w-5 h-5 text-cyan-500 drop-shadow-[0_0_6px_rgba(6,182,212,0.15)]" />
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed z-10 relative">
              {stat.desc}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] font-mono text-slate-400 z-10 relative">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                雲端同步: 持續監控中
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-250">
                {stat.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

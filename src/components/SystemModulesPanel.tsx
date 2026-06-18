import { useState } from 'react';
import { 
  Tv, LayoutDashboard, Database, UserCheck, ShieldClose, ShieldAlert,
  ArrowDownLeft, ArrowUpRight, Container, BadgeDollarSign, Lock,
  Plus, Edit, Eye, Shield, Check, Calendar, HelpCircle
} from 'lucide-react';

export default function SystemModulesPanel() {
  const [selectedModule, setSelectedModule] = useState('dashboard');

  const modules = [
    {
      id: 'dashboard',
      name: 'Dashboard 總覽',
      englishName: 'INTELLIGENT DASHBOARD',
      desc: '集中呈現訂單、庫存、付款狀態、待處理事項與異常提醒。',
      icon: LayoutDashboard,
      badge: '決策大腦'
    },
    {
      id: 'products',
      name: '商品主檔管理',
      englishName: 'PRODUCT REGISTER',
      desc: '管理商品名稱、規格、分類、單位、條碼、售價與庫存警戒值。',
      icon: Database,
      badge: '資料核心'
    },
    {
      id: 'suppliers',
      name: '供應商主檔',
      englishName: 'SUPPLIER REGISTER',
      desc: '維護供應商名稱、聯絡方式、付款起迄條件與交易歷程紀錄。',
      icon: UserCheck,
      badge: '關係維護'
    },
    {
      id: 'incoming',
      name: '進貨單管理',
      englishName: 'INBOUND MANAGEMENT',
      desc: '登錄進貨明細、進貨單價、綁定商品批號、到期效期及進儲儲位。',
      icon: ArrowDownLeft,
      badge: '入庫對流'
    },
    {
      id: 'outgoing',
      name: '出貨與扣庫',
      englishName: 'OUTBOUND DISPATCH',
      desc: '記錄出貨客戶、物流明細、選定特定批號出庫、自動扣減實體庫存。',
      icon: ArrowUpRight,
      badge: '配銷出庫'
    },
    {
      id: 'batch',
      name: '批號庫存追蹤',
      englishName: 'BATCH & EXPIRY CONTROL',
      desc: '依批號、進貨批、效期天數劃分，追蹤在庫數量及預警臨期貨品。',
      icon: Container,
      badge: '精準批溯'
    },
    {
      id: 'payments',
      name: '收付款與對帳',
      englishName: 'RECONCILIATION ENGINE',
      desc: '應收應付明細建立、核銷狀態切換（未付款/部分/結清）及憑單核對。',
      icon: BadgeDollarSign,
      badge: '財務核銷'
    },
    {
      id: 'permissions',
      name: '權限與角色管理',
      englishName: 'ROLES & AUDITS',
      desc: '系統使用者角色帳號定義，劃分模組讀寫權限及操作修訂歷史審計。',
      icon: Lock,
      badge: '資訊安全'
    }
  ];

  const renderMockUI = () => {
    switch (selectedModule) {
      case 'dashboard':
        return (
          <div className="space-y-4 text-xs font-sans text-slate-300">
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-900">
              <span className="font-semibold text-cyan-400">📊 達創智能資訊中心</span>
              <span className="text-[10px] text-slate-500 font-mono">更新: 即時</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px]">昨日累計銷額</span>
                <div className="text-base font-bold text-white mt-1">$412,800</div>
                <span className="text-[9px] text-emerald-400">較前週 +12%</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px]">庫存週轉率</span>
                <div className="text-base font-bold text-cyan-400 mt-1">94.2%</div>
                <span className="text-[9px] text-emerald-400">平均週轉天數 14 天</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/40 rounded border border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold mb-2">批號效期週預警</span>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between items-center p-1 px-2 rounded bg-slate-950">
                  <span className="text-amber-400">山胡椒 B20260311</span>
                  <span className="text-slate-400">剩 73 天</span>
                </div>
                <div className="flex justify-between items-center p-1 px-2 rounded bg-slate-950">
                  <span className="text-slate-300">紅藜 B20260422</span>
                  <span className="text-slate-400">剩 116 天</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-900">
              <span className="font-semibold text-cyan-400">📦 商品主檔寄存器</span>
              <button className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded border border-cyan-800/60 text-[10px] flex items-center gap-1 cursor-pointer">
                <Plus className="w-3 h-3" /> 新增商品 SKU
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] text-slate-500">
                    <th className="pb-1.5">代碼 SKU</th>
                    <th className="pb-1.5">商品名稱</th>
                    <th className="pb-1.5">規格庫存</th>
                    <th className="pb-1.5 text-right">批售價</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-[11px] text-slate-300">
                  <tr>
                    <td className="py-2 text-cyan-400">SKU-MI-01</td>
                    <td className="py-2 text-slate-200">有機小米</td>
                    <td className="py-2">500g/包 (320 包)</td>
                    <td className="py-2 text-right text-emerald-400">$180</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-cyan-400">SKU-RO-02</td>
                    <td className="py-2 text-slate-200">洛神花乾</td>
                    <td className="py-2">100g/包 (48 包)</td>
                    <td className="py-2 text-right text-emerald-400">$220</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-cyan-400">SKU-QU-03</td>
                    <td className="py-2 text-slate-200">優質紅藜</td>
                    <td className="py-2">300g/包 (156 包)</td>
                    <td className="py-2 text-right text-emerald-400">$250</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'suppliers':
        return (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-900">
              <span className="font-semibold text-cyan-400">🤝 供應商綜合信貸主檔</span>
              <span className="text-[10px] text-slate-500">合作中：86 錄</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <div className="flex justify-between">
                  <span className="font-bold text-white">泰盛有機農產</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800">主推特約</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-slate-400">
                  <span>結帳條件: 月結 30 天</span>
                  <span>承辦人: 陳經理 (LINE 聯絡)</span>
                </div>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <div className="flex justify-between">
                  <span className="font-bold text-white">百安堂參藥行</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-950 text-cyan-400 border border-slate-800">普通合作</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-slate-400">
                  <span>結帳條件: 貨到付款</span>
                  <span>聯絡信箱: baiantang@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'incoming':
        return (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-900">
              <span className="font-semibold text-cyan-400">📥 智能進貨入庫表單</span>
              <span className="text-[10px] text-slate-400 font-mono">單號: IN-20260618-01</span>
            </div>

            <form className="space-y-2.5 text-[11px]" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500 block mb-1">進貨商品</label>
                  <input type="text" disabled defaultValue="優質紅藜" className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-slate-300" />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">入庫倉庫</label>
                  <input type="text" disabled defaultValue="主倉 (A-04 貨架)" className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-slate-300" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-500 block mb-1">進貨數量</label>
                  <input type="text" disabled defaultValue="200" className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-slate-300 font-mono" />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">指配批號</label>
                  <input type="text" disabled defaultValue="B20260618" className="w-full bg-slate-900 border border-slate-850 rounded p-1.5 text-amber-400 font-mono" />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">過期判定日</label>
                  <input type="text" disabled defaultValue="2027-06-18" className="w-full bg-slate-900 border border-slate-850 rounded p-1.5 text-rose-400 font-mono" />
                </div>
              </div>
              <button disabled className="w-full bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 p-2 rounded text-center font-bold tracking-wider opacity-60">
                模擬登陸入庫 (已鎖定)
              </button>
            </form>
          </div>
        );
      case 'outgoing':
        return (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-900">
              <span className="font-semibold text-cyan-400">📤 智能出貨與庫存扣減</span>
              <span className="text-[10px] text-slate-400 font-mono">單號: OUT-20260618-12</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="p-3 rounded bg-slate-900/60 border border-slate-800 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">出貨託運：綠意生機</span>
                  <span className="text-cyan-400 font-mono font-semibold">自動扣庫核准</span>
                </div>
                <div className="text-slate-300 border-t border-slate-800/80 pt-1.5 mt-1.5 space-y-1">
                  <div>- 有機小米 50 包 (扣除批號: #B20260601)</div>
                  <div>- 洛神花乾 10 包 (扣除批號: #B20260518)</div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 flex items-center gap-1.5 bg-slate-950 p-2 rounded border border-slate-900">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>出貨通知單確認後，系統自動依「先進先出 (FIFO)」指配適用批號扣庫。</span>
              </div>
            </div>
          </div>
        );
      case 'batch':
        return (
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-900">
              <span className="font-semibold text-cyan-400">📦 多晶粒/批次庫存追蹤</span>
              <span className="text-[10px] text-slate-400">先進先出核對中</span>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              {/* Batch 1 */}
              <div className="p-2 bg-slate-900/50 rounded border-l-2 border-emerald-500 border-y border-r border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-white block font-semibold text-xs">有機小米 [批號 B20260601]</span>
                  <span className="text-slate-500 text-[10px]">效期: 2027-06-01 | 存放: 主倉</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold block">320 kg</span>
                  <span className="px-1.5 py-0.2 rounded text-[8px] bg-emerald-950 text-emerald-400">綠色安檢</span>
                </div>
              </div>
              {/* Batch 2 */}
              <div className="p-2 bg-slate-900/50 rounded border-l-2 border-rose-500 border-y border-r border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-white block font-semibold text-xs">山胡椒 [批號 B20260311]</span>
                  <span className="text-slate-500 text-[10px]">效期: 2026-08-30 | 存放: 備用倉</span>
                </div>
                <div className="text-right">
                  <span className="text-rose-400 font-bold block">25 kg</span>
                  <span className="px-1.5 py-0.2 rounded text-[8px] bg-rose-950 text-rose-400">效期提醒</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-900">
              <span className="font-semibold text-cyan-400">🧾 進銷應收應付帳齡分析</span>
              <span className="text-[10px] text-slate-500">待收結餘 $40,000</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-300">單號: REC-2026-03</span>
                  <span className="px-2 py-0.5 rounded text-[9px] bg-yellow-950/80 text-yellow-500 border border-yellow-800">部分付款</span>
                </div>
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-xs text-slate-400">客戶: 綠意生機</span>
                  <span className="font-mono text-white">$120,000 <span className="text-[10px] text-slate-500">(已付 $80,000)</span></span>
                </div>
              </div>
              
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-300">單號: PAY-2026-08</span>
                  <span className="px-2 py-0.5 rounded text-[9px] bg-rose-950/80 text-rose-500 border border-rose-800">未付款</span>
                </div>
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-xs text-slate-400">協力廠: 百安堂</span>
                  <span className="font-mono text-white">$28,000 <span className="text-[10px] text-slate-500">(已付 $0)</span></span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'permissions':
        return (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-900">
              <span className="font-semibold text-cyan-400">🔒 隔離式角色權限設定</span>
              <span className="text-[10px] text-emerald-400 font-mono">系統已加密加密</span>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                <span className="text-slate-200">全能管理者 (Administrator)</span>
                <span className="text-cyan-400 font-bold uppercase">Full Control</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                <span className="text-slate-200">進貨操作員 (Operator)</span>
                <span className="text-blue-400 font-bold uppercase">Registry / View</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                <span className="text-slate-200">會計查核員 (Accountant)</span>
                <span className="text-purple-400 font-bold uppercase">Billing / Reconciliation</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans items-stretch">
      {/* Left panel: Modules checklist selection list */}
      <div id="system-modules-sidebar" className="lg:col-span-12 xl:col-span-7 space-y-3">
        {modules.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedModule === m.id;

          return (
            <div
              key={m.id}
              onClick={() => setSelectedModule(m.id)}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-white border-cyan-400 shadow-md shadow-cyan-100/50 translate-x-1.5'
                  : 'bg-white border-slate-200/80 hover:bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg border transition-colors shrink-0 mt-0.5 ${
                  isSelected 
                    ? 'bg-cyan-50 border-cyan-200 text-cyan-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-base font-bold transition-colors ${
                      isSelected ? 'text-slate-900' : 'text-slate-700'
                    }`}>
                      {m.name}
                    </h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected 
                        ? 'bg-cyan-50 text-cyan-600 border border-cyan-200' 
                        : 'bg-slate-50 text-slate-500 border border-slate-200'
                    }`}>
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5 uppercase tracking-wider">
                    {m.englishName}
                  </p>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {m.desc}
                  </p>

                  {/* Accompanying mobile accordion mock ui presentation */}
                  {isSelected && (
                    <div className="xl:hidden mt-4 p-4 rounded-lg bg-[#07111F] border border-slate-800 animate-fadeIn pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                        <Tv className="w-3 h-3 text-cyan-400" /> 行動版模擬預覽：{m.name}
                      </div>
                      {renderMockUI()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right panel: Live graphic GUI monitor placeholder */}
      <div className="hidden xl:col-span-5 xl:flex flex-col justify-between rounded-xl bg-[#07111F] border border-slate-800 p-5 shadow-xl relative sticky top-24 self-start">
        {/* Abstract structural grid decor */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 pb-3 border-b border-slate-800 mb-4">
            <span className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-cyan-400" />
              模組 UI 運作展示 (Dachuang IMS-Client)
            </span>
            <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400 uppercase text-[10px]">
              1080P ACTIVE
            </span>
          </div>

          {/* Renders simulated module interface inside interactive card panel */}
          <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-800 shadow-inner min-h-[300px] flex flex-col justify-center">
            {renderMockUI()}
          </div>
        </div>

        {/* Footer info explaining client-centric utility */}
        <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 font-mono flex items-center justify-between">
          <span>達創低代碼智能架構</span>
          <span>支援 PC/iPad/RWD</span>
        </div>
      </div>
    </div>
  );
}

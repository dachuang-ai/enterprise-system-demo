import { useState, useEffect } from 'react';
import { 
  Package, Truck, AlertTriangle, BadgeDollarSign, 
  CheckCircle2, Clock, Terminal, RefreshCw 
} from 'lucide-react';

interface HeroTask {
  id: string;
  category: 'incoming' | 'outgoing' | 'billing' | 'batch';
  title: string;
  detail: string;
  time: string;
  completed: boolean;
}

export default function InteractiveHeroPanel() {
  const [tasks, setTasks] = useState<HeroTask[]>([
    { id: '1', category: 'incoming', title: '完成 有機小米 #B20260601 入庫驗收', detail: '數量: 320 kg | 存放: 主倉', time: '10:14', completed: false },
    { id: '2', category: 'billing', title: '財務對帳 百安堂參藥行 應付款核消', detail: '金額: $28,000 | 狀態: 未付款', time: '11:30', completed: false },
    { id: '3', category: 'batch', title: '效期警示 山胡椒 #B20260311 即將到期', detail: '效期: 2026-08-30 | 剩餘 2.5 個月', time: '13:00', completed: false },
    { id: '4', category: 'outgoing', title: '完成 洛神花乾 出貨批號扣庫作業', detail: '數量: 80 包 | 批號: #B20260518', time: '14:25', completed: true },
    { id: '5', category: 'incoming', title: '台中倉 補貨到庫登記', detail: '商品: 洛神花乾 | 庫存已達警示門檻', time: '15:10', completed: false },
  ]);

  const [activeTab, setActiveTab] = useState<'status' | 'tasks' | 'log'>('status');
  const [simLogs, setSimLogs] = useState<string[]>([
    '[IMS-CORE] 系統初始連線啟動...',
    '[INIT] 載入商品主檔 1,248 筆資料...',
    '[DB-SYNC] 倉庫庫存同步... [主倉 OK] [台中倉 OK]',
    '[NETWORK] 連線至達創 AI 智能雲伺服器...',
  ]);

  // Simulate automated operational activity
  useEffect(() => {
    const logPool = [
      '[MONITOR] 偵測到紅藜主倉儲位移動：10 kg',
      '[LOGISTICS] 完成單號 OUT-2026-107 出貨包裝核對',
      '[BATCH] 自動巡檢：批號 B20260422 效期安全無異常',
      '[BILLING] 自動更新對帳單：綠意生機股份有限公司已入帳部分款項',
      '[AI-OPTIMIZE] 自動分析：建議補貨商品「山胡椒」，目前庫存低於預設門檻',
    ];

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-TW', { hour12: false });
      setSimLogs(prev => [`[${timeStr}] ${randomLog}`, ...prev.slice(0, 8)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleResetTasks = () => {
    setTasks(prev => prev.map(t => ({ ...t, completed: false })));
  };

  // Helper values derived from state
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div id="interactive-preview-card" className="relative w-full rounded-2xl bg-[#09101d] p-1 border border-[#1b2b41]/70 backdrop-blur-xl shadow-2xl shadow-slate-900/10 group overflow-hidden font-sans text-left">
      {/* Dynamic glow decoration overlay */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-700" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Control console glass header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#03070c] rounded-t-xl border-b border-[#142335]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5 ml-2 border-l border-[#142335] pl-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span> dachuang-ims-core v5.12 </span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs">
          <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/85 text-emerald-400 font-mono tracking-wider flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
            LIVE MODE
          </span>
        </div>
      </div>

      {/* Main interactive window */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-[#060c14] to-[#04080e] rounded-b-xl text-left">
        
        {/* Navigation tabs in the panel */}
        <div className="flex border-b border-[#142335] mb-4 text-xs">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-2.5 px-3 font-bold relative transition-colors ${
              activeTab === 'status' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-250 cursor-pointer'
            }`}
          >
            數據控制盤
            {activeTab === 'status' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400" />}
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`pb-2.5 px-3 font-bold relative transition-colors flex items-center gap-1.5 ${
              activeTab === 'tasks' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-250 cursor-pointer'
            }`}
          >
            待處理清單
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold">
              {pendingCount}
            </span>
            {activeTab === 'tasks' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400" />}
          </button>
          <button
            onClick={() => setActiveTab('log')}
            className={`pb-2.5 px-3 font-bold relative transition-colors ${
              activeTab === 'log' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-250 cursor-pointer'
            }`}
          >
            日誌主程序流
            {activeTab === 'log' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400" />}
          </button>
        </div>

        {/* Tab content 1: Control Panel status */}
        {activeTab === 'status' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Live widgets rows */}
            <div className="grid grid-cols-2 gap-3">
              {/* Box 1: Procurement / Incoming */}
              <div className="p-3 rounded-lg bg-[#070e17] border border-[#142335] hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold">今日進貨作業</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono text-white">32</span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center">↑ 14%</span>
                </div>
                <div className="w-full bg-[#142335] h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1.5 font-mono">已完成 24 批 | 8 批入庫中</span>
              </div>

              {/* Box 2: Dispatch / Outgoing */}
              <div className="p-3 rounded-lg bg-[#070e17] border border-[#142335] hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Package className="w-4 h-4 text-emerald-450" />
                  <span className="text-xs font-bold">今日出貨作業</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono text-white">47</span>
                  <span className="text-[10px] text-emerald-450 font-bold">↑ 22%</span>
                </div>
                <div className="w-full bg-[#142335] h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style={{ width: '88%' }} />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1.5 font-mono">已裝車 41 批 | 6 批待檢核</span>
              </div>
            </div>

            {/* Expiring batch warn ticker */}
            <div className="p-3 rounded-lg bg-amber-500/5 border border-yellow-500/20">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">批號安全預警：1 筆效期到期警告</span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">倉庫：備用倉</span>
                  </div>
                  <p className="text-xs text-slate-350 mt-1 truncate">
                    商品: <span className="text-white font-bold">山胡椒</span> (批號 B20260311) 於 <span className="text-amber-400 font-mono font-bold">2026-08-30</span> 過期
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Reconciliation Progress */}
            <div className="p-3 rounded-lg bg-[#070e17] border border-[#142335]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BadgeDollarSign className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-slate-300">對帳付款健康度</span>
                </div>
                <span className="text-xs text-cyan-400 font-mono font-bold">82.4%</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-1 px-2 rounded bg-[#03060a] border border-[#142335]">
                  <span className="text-[9px] text-slate-500 block">待付款</span>
                  <span className="text-xs font-bold font-mono text-rose-455">18 筆</span>
                </div>
                <div className="p-1 px-2 rounded bg-[#03060a] border border-[#142335]">
                  <span className="text-[9px] text-slate-500 block">部分支付</span>
                  <span className="text-xs font-bold font-mono text-amber-455">6 筆</span>
                </div>
                <div className="p-1 px-2 rounded bg-[#03060a] border border-emerald-950/60">
                  <span className="text-[9px] text-slate-400 block">已結清</span>
                  <span className="text-xs font-bold font-mono text-emerald-455">142 筆</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab content 2: Live interactive task toggle list */}
        {activeTab === 'tasks' && (
          <div className="space-y-2.5 animate-in fade-in duration-200 text-left">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-semibold">
              <span>點擊核取框模擬對帳、扣庫、排程確認系統即時反應：</span>
              {completedCount > 0 && (
                <button 
                  onClick={handleResetTasks}
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-mono cursor-pointer font-bold"
                >
                  <RefreshCw className="w-3 h-3" /> 重設
                </button>
              )}
            </div>
            
            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-2.5 rounded-lg border transition-all duration-300 cursor-pointer flex items-start gap-2.5 ${
                    task.completed 
                      ? 'bg-[#050a10] border-[#0e1724] opacity-50' 
                      : 'bg-[#070e17] border-[#142335] hover:bg-[#0c1624]'
                  }`}
                >
                  <div className="mt-0.5" onClick={(e) => { e.stopPropagation(); handleToggleTask(task.id); }}>
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 cursor-pointer" />
                    ) : (
                      <div className="w-4 h-4 rounded border border-slate-600 hover:border-cyan-400 transition-colors cursor-pointer" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-bold truncate ${task.completed ? 'line-through text-slate-550' : 'text-slate-200'}`}>
                        {task.title}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 shrink-0 font-bold">{task.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{task.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 text-center text-[10px] text-slate-550 bg-[#03060a] py-1.5 rounded border border-[#142335] font-mono font-semibold">
              任務核准進度: {completedCount} / {tasks.length} 
              <span className="ml-1 text-slate-450">({Math.round((completedCount/tasks.length)*100)}%)</span>
            </div>
          </div>
        )}

        {/* Tab content 3: System logs flow */}
        {activeTab === 'log' && (
          <div className="space-y-2 animate-in fade-in duration-200 font-mono text-[11px] sm:text-xs">
            <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-[#142335] font-bold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-550" />
                核心事件監聽已啟用
              </span>
              <span>主程序段 0</span>
            </div>
            
            <div className="bg-[#03060a] p-3 rounded border border-[#142335] h-[178px] overflow-y-auto space-y-1.5 text-left">
              {simLogs.map((log, index) => {
                let colorClass = 'text-cyan-400/90';
                if (log.includes('[INIT]')) colorClass = 'text-slate-400';
                if (log.includes('[DB-SYNC]')) colorClass = 'text-emerald-400';
                if (log.includes('[MONITOR]')) colorClass = 'text-blue-400';
                if (log.includes('[BATCH]') || log.includes('[AI-OPTIMIZE]')) colorClass = 'text-amber-400';
                
                return (
                  <div key={index} className={`whitespace-pre-wrap leading-relaxed ${colorClass} ${index === 0 ? 'border-b border-[#142335]/60 pb-1 font-bold bg-[#0c1624] px-1 rounded' : ''}`}>
                    {index === 0 && <span className="inline-block w-1.5 h-3 bg-cyan-400 animate-pulse mr-1" />}
                    {log}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1 font-sans font-semibold">
              <span className="text-[10px] text-slate-550">串接模式：低延遲 AI 驅動 WebSocket 流</span>
              <button 
                onClick={() => {
                  const now = new Date();
                  const timeStr = now.toLocaleTimeString('zh-TW', { hour12: false });
                  setSimLogs(prev => [`[${timeStr}] [MANUAL] 用戶執行全域同步庫存指令... 成功`, ...prev.slice(0, 10)]);
                }}
                className="text-[10px] bg-[#070e17] hover:bg-[#0c1624] border border-[#142335] px-2.5 py-1 text-slate-350 rounded cursor-pointer flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> 手動同步主庫存
              </button>
            </div>
          </div>
        )}

        {/* Small Control room hint text */}
        <div className="mt-4 border-t border-[#142335] pt-3 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            對接端點：IMS-Gateway-AWS-TPE
          </span>
          <span>AES-GCM 聯同加密</span>
        </div>
      </div>
    </div>
  );
}

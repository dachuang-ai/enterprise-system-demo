import { useState, useEffect } from 'react';
import { 
  Database, UserCheck, PlusCircle, ArrowDownLeft, 
  RefreshCw, ArrowUpRight, BadgeDollarSign, HeartHandshake,
  Play, Pause, ChevronRight
} from 'lucide-react';

export default function WorkflowTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      no: '01',
      title: '商品建立',
      desc: '於主檔登入產品基本參數、SKU 規格與分類。',
      icon: Database,
      flowDetail: '商品存檔完畢，系統配發獨有 Barcode 與安全庫存警戒值。'
    },
    {
      no: '02',
      title: '供應商建立',
      desc: '建立特約協作商、付款帳戶與專屬合約年限條件。',
      icon: UserCheck,
      flowDetail: '供應鏈主控台同步新增資料，授權後續採購採購程序。'
    },
    {
      no: '03',
      title: '進貨單建立',
      desc: '指採人員輸入採購清單、核定批量、單單對帳金額。',
      icon: PlusCircle,
      flowDetail: '產出擬入庫草單，指派主辦倉管入庫對接儲架。'
    },
    {
      no: '04',
      title: '批號入庫',
      desc: '到貨時確認實物效期、登載對應序號/批號儲存。',
      icon: ArrowDownLeft,
      flowDetail: '綁定商品效期批號 B2026xxxx，先進先出追踪鏈啟動。'
    },
    {
      no: '05',
      title: '庫存同步',
      desc: '系統過帳後，跨分倉實體庫存同步完成變動發佈。',
      icon: RefreshCw,
      flowDetail: '自動發出 Slack/LINE 異常水位通知，Dashboard 即刻推播。'
    },
    {
      no: '06',
      title: '出貨扣庫',
      desc: '訂單成立後，依先进先出(FIFO)自動鎖批、扣減庫存。',
      icon: ArrowUpRight,
      flowDetail: '扣減紀錄歸檔出貨明細，產生交車託運隨附單。'
    },
    {
      no: '07',
      title: '付款登記',
      desc: '登載對應請款項目並標明「部分付款」或核發款項。',
      icon: BadgeDollarSign,
      flowDetail: '產生應收與應付明細，遞交財務對帳台執行餘額核對。'
    },
    {
      no: '08',
      title: '對帳結清',
      desc: '會計經由流水核對並鎖定款項，正式完結對帳狀態。',
      icon: HeartHandshake,
      flowDetail: '單據狀態改為「已結清」，關聯批號在財務及倉儲鏈完整歸案。'
    }
  ];

  // Auto progression of steps when simulate button is active
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const toggleSimulation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="font-sans space-y-8">
      {/* Simulation Controller header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl bg-slate-50 border border-slate-200 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-500 uppercase tracking-widest block mb-1">
            WORKFLOW SIMULATION
          </span>
          <h4 className="text-lg font-bold text-slate-900 tracking-wide">
            智能進銷存與財務對帳流模擬
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            點擊各階段節點即可檢視對應之資料流自動整合機制。
          </p>
        </div>
        
        <button
          onClick={toggleSimulation}
          className={`px-4 py-2 rounded-lg font-bold text-sm tracking-wider flex items-center gap-2 border transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer shrink-0 ${
            isPlaying
              ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-600'
              : 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200 text-cyan-600'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 animate-pulse" /> 暫停模擬流通
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-cyan-600 text-cyan-600" /> 開始自動流程播放
            </>
          )}
        </button>
      </div>

      {/* HORIZONTAL TIMELINE FOR TABLET / DESKTOP */}
      <div className="hidden md:block relative bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm overflow-x-auto">
        {/* Track connector bar background */}
        <div className="absolute top-1/2 left-12 right-12 h-[2px] bg-slate-100 -translate-y-5" />
        <div 
          className="absolute top-1/2 left-12 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 -translate-y-5 transition-all duration-500"
          style={{ width: `${(activeStep / (steps.length - 1)) * 90}%` }}
        />

        {/* Nodes Grid */}
        <div className="grid grid-cols-8 gap-4 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= activeStep;
            const isCurrent = index === activeStep;

            return (
              <div 
                key={step.no}
                onClick={() => {
                  setActiveStep(index);
                  setIsPlaying(false);
                }}
                className="group flex flex-col items-center text-center cursor-pointer relative"
              >
                {/* Node Ring wrapper */}
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                  isCurrent
                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-md shadow-cyan-100 ring-4 ring-cyan-100'
                    : isCompleted
                      ? 'bg-cyan-50 border-cyan-200 text-cyan-500'
                      : 'bg-white border-slate-250 text-slate-400 group-hover:border-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="mt-4 space-y-1">
                  <span className={`text-[10px] font-mono font-bold tracking-wider block ${
                    isCurrent ? 'text-cyan-600 font-extrabold' : 'text-slate-400'
                  }`}>
                    STEP {step.no}
                  </span>
                  <h5 className={`text-sm font-bold transition-all duration-305 ${
                    isCurrent ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-800'
                  }`}>
                    {step.title}
                  </h5>
                  <p className="text-xs text-slate-500 leading-normal line-clamp-2 px-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VERTICAL TIMELINE FOR MOBILE */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= activeStep;
          const isCurrent = index === activeStep;

          return (
            <div 
              key={step.no}
              onClick={() => {
                setActiveStep(index);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-xl border transition-all duration-305 cursor-pointer relative overflow-hidden flex items-start gap-4 ${
                isCurrent
                  ? 'bg-cyan-50/50 border-cyan-400/80 shadow-sm shadow-cyan-100/30'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className={`p-2.5 rounded-lg border shrink-0 transition-colors ${
                isCurrent 
                  ? 'bg-cyan-500 text-white border-cyan-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-cyan-600' : 'text-slate-400'}`}>
                    STEP {step.no}
                  </span>
                  {isCurrent && (
                    <span className="px-1.5 py-0.2 rounded text-[8px] bg-cyan-100 text-cyan-600 border border-cyan-200 font-bold">
                      模擬指向中
                    </span>
                  )}
                </div>
                <h5 className={`text-base font-bold mt-0.5 ${isCurrent ? 'text-slate-900' : 'text-slate-700'}`}>
                  {step.title}
                </h5>
                <p className="text-sm text-slate-500 mt-1">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded step details card */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between shadow-sm">
        <div className="flex items-center gap-4.5">
          <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-500 flex items-center justify-center shrink-0 font-black font-mono">
            {steps[activeStep].no}
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
              各節點自動機制說明 ({steps[activeStep].title})
            </span>
            <p className="text-sm font-medium text-slate-700 italic mt-1 leading-relaxed">
              「{steps[activeStep].flowDetail}」
            </p>
          </div>
        </div>
        
        <div className="text-xs text-cyan-600 bg-cyan-50 px-3 py-1.5 border border-cyan-200 rounded flex items-center gap-1.5 shrink-0 self-end md:self-auto font-mono font-bold">
          <span>達創低代碼控制流自動化</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

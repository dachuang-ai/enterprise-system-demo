import { useState, FormEvent } from 'react';
import { 
  ArrowRight, Sparkles, Loader2, Send, BookmarkCheck, CheckSquare, RefreshCw
} from 'lucide-react';

export default function ConsultationForm() {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [painPoints, setPainPoints] = useState<string[]>([]);
  
  // Simulation states
  const [submitting, setSubmitting] = useState(false);
  const [blueprint, setBlueprint] = useState<any | null>(null);

  const availablePainPoints = [
    { value: 'excel-scatter', label: '資料分散 (Excel, LINE群組, 紙本雜亂對不攏)' },
    { value: 'stock-match', label: '庫存不準 (實體庫存常與手動表登記有出入)' },
    { value: 'expiry-warn', label: '過期耗損 (多批效期難追蹤，臨期損壞率高)' },
    { value: 'billing-lag', label: '對帳落後 (應收應付不對位，月底對帳慢)' },
    { value: 'permission-mess', label: '權限不清 (缺乏權限細分，資料誤填修訂無紀錄)' },
  ];

  const handlePainPointToggle = (val: string) => {
    setPainPoints(prev => 
      prev.includes(val) ? prev.filter(p => p !== val) : [...prev, val]
    );
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!company || !name || !phone) return;

    setSubmitting(true);
    
    // Simulate high-tech AI calculations
    setTimeout(() => {
      // Calculate custom recommendations based on checkboxes
      const recommendedModules: string[] = ['Dashboard 全域控制看板'];
      let hourSavings = 12;
      
      if (painPoints.includes('excel-scatter') || painPoints.includes('stock-match')) {
        recommendedModules.push('商品與供應商主檔');
        recommendedModules.push('進貨出貨自動化對位扣庫');
        hourSavings += 6;
      }
      if (painPoints.includes('expiry-warn')) {
        recommendedModules.push('批次先進先出 (FIFO) 批號庫存管轄');
        recommendedModules.push('預警效期主動通訊提示');
        hourSavings += 5;
      }
      if (painPoints.includes('billing-lag')) {
        recommendedModules.push('收付款狀態與應付沖賬模組');
        hourSavings += 7;
      }
      if (painPoints.includes('permission-mess')) {
        recommendedModules.push('RBAC 雙因子使用者權限審查歷史');
        hourSavings += 3;
      }

      setBlueprint({
        company,
        name,
        recommendedModules,
        savings: hourSavings,
        riskLevel: painPoints.length >= 3 ? '高度改善核心' : '穩定優化核心',
        blueprintId: 'DC-' + Math.floor(100000 + Math.random() * 900000)
      });
      setSubmitting(false);
    }, 1200);
  };

  const resetSimulation = () => {
    setCompany('');
    setName('');
    setPhone('');
    setPainPoints([]);
    setBlueprint(null);
  };

  // Pre-fill helper for user quick-start demo testing
  const handleQuickDemoFill = () => {
    setCompany('綠島自然生機農莊');
    setName('林守信 經理');
    setPhone('0912-345-678');
    setPainPoints(['excel-scatter', 'stock-match', 'expiry-warn']);
  };

  return (
    <div className="font-sans max-w-4xl mx-auto">
      {/* Blueprint generated display */}
      {blueprint ? (
        <div className="bg-white border-2 border-cyan-400 rounded-2xl p-6 md:p-8 shadow-xl relative animate-in fade-in-50 duration-300">
          <div className="absolute -top-3.5 right-6 bg-cyan-500 text-white font-mono font-bold text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-white" /> ARCHITECTURE GENERATED
          </div>

          <div className="border-b border-slate-100 pb-5 mb-6 text-left">
            <span className="text-xs font-mono text-cyan-600 font-bold uppercase tracking-widest block mb-1">
              {blueprint.blueprintId} // 達創智能科技諮詢
            </span>
            <h4 className="text-2xl font-black text-slate-800">
              {blueprint.company} 系統導入藍圖建議
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              本藍圖由達創低代碼專家評估引擎，依據您選填之營運痛點自動配對產生。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch text-left">
            {/* KPI details card */}
            <div className="md:col-span-4 bg-slate-50 rounded-xl border border-slate-200/80 p-5 flex flex-col justify-between text-center">
              <div>
                <span className="text-slate-400 text-[11px] font-bold block">預計可節省人時 / 週</span>
                <span className="text-4xl font-extrabold text-cyan-600 font-mono mt-2 block">
                  {blueprint.savings} +1 hr
                </span>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  告別 Excel 手工查核
                </p>
              </div>

              <div className="border-t border-slate-200/60 pt-4 mt-4">
                <span className="text-slate-400 text-[11px] font-bold block">系統優化評估級別</span>
                <span className="text-xs font-bold text-amber-600 font-sans block mt-1">
                  {blueprint.riskLevel}
                </span>
              </div>
            </div>

            {/* Modules advice */}
            <div className="md:col-span-8 space-y-4">
              <h5 className="text-sm font-bold text-slate-700">
                🚀 專屬客製化系統模組配置建議：
              </h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {blueprint.recommendedModules.map((module: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <BookmarkCheck className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span className="font-bold">{module}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                *註：達創智能系統開發底層搭載彈性 API Gateway 設計，日後可視企業擴張，在不推翻系統前提下彈性新增 ERP 或 ERP模組。
              </p>
            </div>
          </div>

          {/* Consultation final actions */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
            <span className="text-xs text-slate-500 font-medium">
              專員將於 <span className="text-cyan-600 font-bold">24 小時內</span> 以電話 <span className="font-mono text-cyan-600 font-bold">{blueprint.phone}</span> 親自為您引導 Demo 演示與細部估價。
            </span>
            <div className="flex gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={resetSimulation}
                className="flex-1 sm:flex-initial bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> 重新評估
              </button>
              <button
                onClick={() => {
                  alert(`感謝您的預約！林專員已被系統分指。系統藍圖代碼為: ${blueprint.blueprintId}`);
                }}
                className="flex-1 sm:flex-initial bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-cyan-300 transition-all hover:scale-[1.02]"
              >
                確認預約規劃
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* The interactive form layout */
        <div id="interactive-consult-card" className="bg-white border border-slate-200 shadow-xl rounded-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Accent top line element */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-500" />

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Context Left Panel */}
            <div className="md:w-5/12 space-y-4 text-left">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono leading-none font-bold text-cyan-600 bg-cyan-50 border border-cyan-200 uppercase">
                STRATEGIC PLANNING
              </span>
              <h4 className="text-xl md:text-2xl font-black text-slate-800 tracking-wide leading-tight">
                客製化您的管理系統
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                只需填妥右方基本表格並核取目前所面臨的痛點程序，達創系統評估引擎將當場為您建立專屬導入配置建議及估計省下的手工耗時！
              </p>
              
              <div className="space-y-2 pt-2 text-xs text-slate-500 font-sans font-semibold">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-cyan-600" />
                  <span>支援先進先出 (FIFO)、批號庫存</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-cyan-600" />
                  <span>多用戶權限分配隔離系統</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-cyan-600" />
                  <span>應收應付雙向財務沖抵核心</span>
                </div>
              </div>

              {/* Quick fill button */}
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="mt-4 text-xs font-semibold text-slate-400 underline hover:text-cyan-600 block cursor-pointer transition-colors"
              >
                點此快速帶入 Demo 資料 (Quick Fill)
              </button>
            </div>

            {/* Main Interactive Form Block */}
            <div className="w-full md:w-7/12 text-left">
              <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-sm pb-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">企業名稱 <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="例如：達創智能食品"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-cyan-500 placeholder-slate-400 font-medium text-[15px] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">聯絡人姓名與稱謂 <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="例如：陳經理"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-cyan-500 placeholder-slate-400 font-medium text-[15px] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">聯絡電話 <span className="text-rose-500">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="手機或公司有線電話"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-cyan-500 placeholder-slate-400 font-medium text-[15px] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-2">
                    勾選目前正面臨的程序痛點 (可複選)
                  </label>
                  <div className="space-y-1.5">
                    {availablePainPoints.map((point) => {
                      const active = painPoints.includes(point.value);
                      return (
                        <div
                          key={point.value}
                          onClick={() => handlePainPointToggle(point.value)}
                          className={`p-2.5 rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-between text-xs ${
                            active 
                              ? 'bg-cyan-50 border-cyan-300 text-cyan-705 font-bold' 
                              : 'bg-slate-50/50 border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span>{point.label}</span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            active ? 'border-cyan-500 bg-cyan-500 text-white' : 'border-slate-350 bg-white'
                          }`}>
                            {active && <span className="block w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 flex gap-4 text-center">
                  <button
                    type="submit"
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold p-3 rounded-xl hover:scale-[1.01] transition-all cursor-pointer shadow-md shadow-cyan-200 flex items-center justify-center gap-2 text-[15px]"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        評估核心規劃中...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        產生初步系統規劃建議
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import Navbar from './components/Navbar';
import InteractiveHeroPanel from './components/InteractiveHeroPanel';
import DashboardStats from './components/DashboardStats';
import SystemModulesPanel from './components/SystemModulesPanel';
import WorkflowTimeline from './components/WorkflowTimeline';
import BatchInventoryTracker from './components/BatchInventoryTracker';
import PaymentReconciliationTable from './components/PaymentReconciliationTable';
import RolePermissionMatrix from './components/RolePermissionMatrix';
import ValuePreaching from './components/ValuePreaching';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import { ChevronRight, ArrowRight, Activity, Terminal, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
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
    <div id="control-dashboard-root" className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-cyan-500 selection:text-white font-sans antialiased overflow-x-hidden pt-20">
      {/* Decorative ambient background flares */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-10 w-[600px] h-[600px] bg-blue-500/5 pointer-events-none rounded-full blur-[150px]" />
      <div className="absolute top-[2200px] left-5 w-[500px] h-[500px] bg-purple-500/3 pointer-events-none rounded-full blur-[130px]" />

      {/* FIXED NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative py-12 md:py-20 lg:py-24 border-b border-slate-200/80 bg-gradient-to-br from-[#e5edf5] via-[#f1f6fa] to-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Core CTA and Branding text */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-xs text-cyan-705 font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                <span>達創智能科技 // 企業級系統能力 Demo 作品首發</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  企業智能管理系統 Demo
                </h1>
                <p className="text-lg sm:text-xl font-bold text-cyan-600 leading-relaxed max-w-2xl">
                  把分散的資料、流程與管理節點，整合成可追蹤、可管理、可擴充的智能系統。
                </p>
                <p className="text-[15px] sm:text-[16px] text-slate-500 font-medium leading-relaxed max-w-2xl">
                  從商品主檔、供應商、進貨、出貨、批號庫存到付款對帳，達創協助企業重新整理流程，建立真正能落地運作的管理系統。
                </p>
              </div>

              {/* Action Buttons row */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => handleScrollToSection('#modules')}
                  className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl text-center cursor-pointer shadow-lg shadow-cyan-200 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group h-12"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    查看系統模組
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  {/* Sweep scan light hover animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] transition-transform" />
                </button>
                
                <button
                  onClick={() => handleScrollToSection('#workflow')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl text-center cursor-pointer transition-all h-12 flex items-center justify-center"
                >
                  查看流程展示
                </button>
              </div>

              {/* Trust statement badges */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs font-mono text-slate-400">
                <div>
                  <span className="text-slate-800 block font-bold">100% Client-Side</span>
                  <span>無後端零依存展示箱</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-slate-800 block font-bold">RWD Responsive</span>
                  <span>支援行動/平板/電腦端</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-slate-800 block font-bold">Full Audit Trail</span>
                  <span>流程對位可追蹤</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive GUI screen panel mockup */}
            <div className="lg:col-span-5 relative w-full">
              <InteractiveHeroPanel />
            </div>

          </div>
        </div>
      </section>

      {/* DASHBOARD STATUS CARD SLATE OVERVIEW */}
      <section id="dashboard" className="py-16 md:py-24 border-b border-slate-200/80 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3 text-left">
            <span className="text-xs font-mono font-bold text-cyan-600 tracking-widest uppercase block">
              📊 REAL-TIME OVERVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              數據狀態監控總覽
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              點擊下列對應模組進行資料對帳、新增與安全核銷沖減。本區為綜合控制中心大腦。
            </p>
          </div>

          <DashboardStats />
        </div>
      </section>

      {/* SYSTEM MODULES DETAILED CHECKLIST PANEL */}
      <section id="modules" className="py-16 md:py-24 border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3 text-left">
            <span className="text-xs font-mono font-bold text-cyan-600 tracking-widest uppercase block">
              🛡️ SYSTEM MODULES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              企業級智能八大系統模組
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              點擊模組可模擬 PC 級別 Client 端工作流與 UI 視圖，協助您了解達創系統架構的完美整合度。
            </p>
          </div>

          <SystemModulesPanel />
        </div>
      </section>

      {/* WORKFLOW PIPELINE SIMULATOR */}
      <section id="workflow" className="py-16 md:py-24 border-b border-slate-200/85 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3 text-left">
            <span className="text-xs font-mono font-bold text-cyan-600 tracking-widest uppercase block">
              🔄 AUTOMATION PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              進貨到出貨財務自動化流程
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              從商品建立、對帳、進貨，一路追溯至出貨與沖抵核結，達創以全域聯動將人工作業降至最低。
            </p>
          </div>

          <WorkflowTimeline />
        </div>
      </section>

      {/* BATCH INVENTORY TRACKER TABLE GRID */}
      <section id="inventory" className="py-16 md:py-24 border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3 text-left">
            <span className="text-xs font-mono font-bold text-cyan-600 tracking-widest uppercase block">
              📦 BATCH LOT TRACKING
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              多分倉 & 批號效期在庫追蹤
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              避免高價原料到期損耗，依據批次效期及倉庫格位精密追蹤。點擊按鈕可模擬真實進貨排程入庫。
            </p>
          </div>

          <BatchInventoryTracker />
        </div>
      </section>

      {/* PAYMENT RECONCILIATION ENGINE */}
      <section id="payments" className="py-16 md:py-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3 text-left">
            <span className="text-xs font-mono font-bold text-cyan-600 tracking-widest uppercase block">
              🧾 CREDIT LEDGER沖帳核銷
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              全對位收付款與對帳主控台
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              精準控制每一張付款單據的已付、未付、部分核銷。點擊「沖帳對帳」即可模擬沖抵款額。
            </p>
          </div>

          <PaymentReconciliationTable />
        </div>
      </section>

      {/* ROLE PERMISSION SECURITY GRID MATRIX */}
      <section id="roles" className="py-16 md:py-24 border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3 text-left">
            <span className="text-xs font-mono font-bold text-cyan-600 tracking-widest uppercase block">
              🛡️ RBAC GUARD MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              多角色模組權限分配矩陣
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              安全性的重要基石，區分管理、會計、操作人與查核員的讀寫與呼叫職掌。點擊左側檢視保護切換。
            </p>
          </div>

          <RolePermissionMatrix />
        </div>
      </section>

      {/* VALUE PREACHING BENEFITS CARD BLOCK */}
      <section id="values" className="py-16 md:py-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-3 text-left">
            <span className="text-xs font-mono font-bold text-cyan-600 tracking-widest uppercase block">
              💎 DACHUANG VALUES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              達創智能管理系統導入價值
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              達創協助中小企業把手動 Excel 重整成高抗震、資料即時整合的智能控制台。
            </p>
          </div>

          <ValuePreaching />
        </div>
      </section>

      {/* CTA CONSULTATION ENGINE BLUEPRINT BLOCK */}
      <section id="consult" className="py-16 md:py-24 bg-gradient-to-br from-[#0c192c] via-[#11243f] to-[#07111f] relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-950/[0.04] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3.5 py-1 rounded bg-cyan-950/45 border border-cyan-800 inline-block">
              讓企業管理從分散走向可控
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              立即開啟屬於您的智能系統規劃
            </h2>
            <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
              如果你的企業仍依賴 Excel、LINE、紙本或人工記憶管理流程，達創可以協助你從第一個可落地的系統開始，逐步建立屬於企業自己的智能管理架構。
            </p>
          </div>

          <ConsultationForm />
        </div>
      </section>

      {/* FOOTER SIGNATURE */}
      <Footer />
    </div>
  );
}

import { useState, FormEvent } from 'react';
import { 
  BadgeDollarSign, CheckCircle2, AlertCircle, Clock, 
  HelpCircle, Search, CreditCard, ChevronRight, ArrowUpDown, Filter, Edit3 
} from 'lucide-react';
import { ReconciliationLog } from '../types';

export default function PaymentReconciliationTable() {
  const [logs, setLogs] = useState<ReconciliationLog[]>([
    { id: '1', invoiceNo: 'INV-2026-001', party: '泰盛有機農產 (供應商)', type: '應付', amount: 45000, paidAmount: 45000, status: '已結清' },
    { id: '2', invoiceNo: 'INV-2026-002', party: '綠意生機股份有限公司 (客戶)', type: '應收', amount: 120000, paidAmount: 80000, status: '部分付款' },
    { id: '3', invoiceNo: 'INV-2026-003', party: '百安堂參藥行 (供應商)', type: '應付', amount: 28000, paidAmount: 0, status: '未付款' },
    { id: '4', invoiceNo: 'INV-2026-004', party: '萬家香食品行 (客戶)', type: '應收', amount: 65000, paidAmount: 65000, status: '處理中' },
  ]);

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [statusFilter, setStatusFilter] = useState('全部');
  
  // Selected invoice for reconciliation modal
  const [selectedInvoice, setSelectedInvoice] = useState<ReconciliationLog | null>(null);
  const [reconcileAmount, setReconcileAmount] = useState<number>(0);

  // States count metrics
  const totalReceivables = logs
    .filter(l => l.type === '應收')
    .reduce((sum, l) => sum + (l.amount - l.paidAmount), 0);
  const totalPayables = logs
    .filter(l => l.type === '應付')
    .reduce((sum, l) => sum + (l.amount - l.paidAmount), 0);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '已結清':
        return 'bg-emerald-50 text-emerald-600 border-emerald-150';
      case '部分付款':
        return 'bg-amber-50 text-amber-600 border-amber-150';
      case '處理中':
        return 'bg-blue-50 text-blue-600 border-blue-150';
      case '未付款':
      default:
        return 'bg-rose-50 text-rose-600 border-rose-150';
    }
  };

  const handleOpenReconcile = (invoice: ReconciliationLog) => {
    setSelectedInvoice(invoice);
    // Suggest the remaining balance as the default amount
    setReconcileAmount(invoice.amount - invoice.paidAmount);
  };

  const handleExecuteReconcile = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    const addedPayment = Number(reconcileAmount);
    
    setLogs(prev => prev.map(item => {
      if (item.id === selectedInvoice.id) {
        const newPaidAmount = Math.min(item.paidAmount + addedPayment, item.amount);
        let newStatus: '未付款' | '部分付款' | '處理中' | '已結清' = '未付款';
        
        if (newPaidAmount === item.amount) {
          newStatus = '已結清';
        } else if (newPaidAmount > 0) {
          newStatus = '部分付款';
        } else {
          newStatus = '未付款';
        }

        return {
          ...item,
          paidAmount: newPaidAmount,
          status: newStatus
        };
      }
      return item;
    }));

    setSelectedInvoice(null);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.invoiceNo.toLowerCase().includes(search.toLowerCase()) || 
                          log.party.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === '全部' || log.type === typeFilter;
    const matchesStatus = statusFilter === '全部' || log.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="font-sans space-y-6">
      {/* 4 Status summary display cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Card 1 */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-500">
            <span className="text-xs font-bold">未付款 (Unpaid)</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold font-mono text-slate-800">
              {logs.filter(l => l.status === '未付款').length} 筆
            </span>
            <p className="text-[11px] text-slate-400 mt-1">需審查合作契約付款日</p>
          </div>
        </div>

        {/* Status Card 2 */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-xs font-bold">部分付款 (Partial)</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold font-mono text-slate-800">
              {logs.filter(l => l.status === '部分付款').length} 筆
            </span>
            <p className="text-[11px] text-slate-400 mt-1">尾款待財務對應核銷</p>
          </div>
        </div>

        {/* Status Card 3 */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-500">
            <span className="text-xs font-bold">處理中 (Pending)</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold font-mono text-slate-800">
              {logs.filter(l => l.status === '處理中').length} 筆
            </span>
            <p className="text-[11px] text-slate-400 mt-1">銀行流水傳票配對比對中</p>
          </div>
        </div>

        {/* Status Card 4 */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-xs font-bold">已結清 (Settled)</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold font-mono text-slate-800">
              {logs.filter(l => l.status === '已結清').length} 筆
            </span>
            <p className="text-[11px] text-slate-400 mt-1">完成雙向沖抵帳目鎖定</p>
          </div>
        </div>
      </div>

      {/* Mini quick summary details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <span className="text-slate-500 font-medium">當前應收結餘 (客戶欠款):</span>
          <span className="font-mono text-emerald-600 font-bold text-base">${totalReceivables.toLocaleString()} 元</span>
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-4 sm:border-l sm:border-slate-200 sm:pl-6">
          <span className="text-slate-500 font-medium">當前應付未結 (欠供應商):</span>
          <span className="font-mono text-rose-600 font-bold text-base">${totalPayables.toLocaleString()} 元</span>
        </div>
      </div>

      {/* Control ledger view query toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜尋編號、客戶/供應商商戶..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-slate-700 pl-10 pr-4 py-2 border border-slate-250 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 rounded-lg text-sm focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 shrink-0 font-mono">科目別:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex-1 bg-white border border-slate-250 rounded-lg px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="全部">全部科目</option>
              <option value="應收">應收 (客戶帳)</option>
              <option value="應付">應付 (進貨帳)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 shrink-0 font-mono">狀態:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 bg-white border border-slate-250 rounded-lg px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="全部">全部狀態</option>
              <option value="未付款">未付款</option>
              <option value="部分付款">部分付款</option>
              <option value="處理中">處理中</option>
              <option value="已結清">已結清</option>
            </select>
          </div>
        </div>
      </div>

      {/* LEDGER ENTRIES TABLE */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* DESKTOP VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-mono text-xs uppercase tracking-wider">
                <th className="py-3 px-5">項目單號</th>
                <th className="py-3 px-5">客戶 / 供應商對象</th>
                <th className="py-3 px-4">科目</th>
                <th className="py-3 px-4 text-right">憑證金額</th>
                <th className="py-3 px-4 text-right">已付代收</th>
                <th className="py-3 px-4 text-center">結算進度</th>
                <th className="py-3 px-4 text-right">會計作業</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-mono text-xs">
                    沒有匹配的收付款帳務明細
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const remaining = log.amount - log.paidAmount;
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 font-mono text-cyan-600 font-bold">{log.invoiceNo}</td>
                      <td className="py-4 px-5 font-semibold text-slate-700">{log.party}</td>
                      <td className="py-4 px-4 font-semibold">
                        <span className={`px-2 py-0.5 rounded text-xs border ${
                          log.type === '應收' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                          {log.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-semibold text-slate-700">${log.amount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right font-mono text-cyan-600">${log.paidAmount.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col items-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(log.status)}`}>
                            {log.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-1">
                            {remaining === 0 ? '完成沖抵' : `剩餘 $${remaining.toLocaleString()}`}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {remaining > 0 ? (
                          <button
                            onClick={() => handleOpenReconcile(log)}
                            className="bg-cyan-50/80 hover:bg-cyan-500 border border-cyan-200 text-cyan-600 hover:text-white px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center gap-1.5 ml-auto"
                          >
                            <CreditCard className="w-3.5 h-3.5" /> 沖帳對帳
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-sans pr-2">鎖定結案</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW CARD */}
        <div className="block md:hidden divide-y divide-slate-100 bg-white">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-mono text-xs">
              沒有匹配的收付款帳務明細
            </div>
          ) : (
            filteredLogs.map((log) => {
              const remaining = log.amount - log.paidAmount;
              return (
                <div key={log.id} className="p-4 bg-white hover:bg-slate-50/30 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[14px] font-mono text-cyan-600 font-bold block">
                        單號: {log.invoiceNo}
                      </span>
                      <h5 className="font-semibold text-slate-800 mt-0.5 text-[16px]">{log.party}</h5>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(log.status)}`}>
                      {log.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-[15px] border-t border-slate-100 pt-2 text-slate-500">
                    <div>
                      <span className="text-[12px] text-slate-400 block pb-1">科目/應付款金額:</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs border ${
                        log.type === '應收' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        {log.type}
                      </span>
                      <span className="font-mono text-slate-700 block font-semibold mt-1">${log.amount.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[12px] text-slate-400 block">已付款/剩餘:</span>
                      <span className="font-mono text-cyan-600 block font-bold">${log.paidAmount.toLocaleString()}</span>
                      <span className="font-mono text-slate-400 block text-xs mt-0.5">
                        {remaining === 0 ? '完成沖抵' : `未結: $${remaining.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  {remaining > 0 && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleOpenReconcile(log)}
                        className="bg-cyan-50 border border-cyan-150 text-cyan-600 hover:bg-cyan-500 hover:text-white p-1.5 px-3 rounded text-xs font-semibold cursor-pointer transition-colors"
                      >
                        執行沖帳對帳
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RECONCILIATION AUDIT TRANSACTION MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-205 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-zoomIn font-sans">
            <h4 className="text-lg font-bold text-slate-900 mb-2">🧾 模擬帳務沖減與會計核銷</h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              您正在此處模擬 Dachuang Reconciliation Module 整合。輸入款項並確認，系統將即刻更新未結分析。
            </p>

            <div className="p-3 bg-slate-50 rounded border border-slate-150 space-y-1.5 mb-4 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">憑証編號:</span>
                <span className="text-cyan-600 font-bold">{selectedInvoice.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">合作對象:</span>
                <span className="text-slate-700">{selectedInvoice.party}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 mt-1.5 text-sm">
                <span className="text-slate-400">未結帳目餘額:</span>
                <span className="text-rose-600 font-bold">
                  ${(selectedInvoice.amount - selectedInvoice.paidAmount).toLocaleString()} 元
                </span>
              </div>
            </div>

            <form onSubmit={handleExecuteReconcile} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  請輸入本次對帳核銷款額 ($)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={selectedInvoice.amount - selectedInvoice.paidAmount}
                  value={reconcileAmount}
                  onChange={(e) => setReconcileAmount(Number(e.target.value))}
                  className="w-full bg-white border border-slate-250 text-slate-800 rounded-lg p-2.5 font-mono text-base focus:outline-none focus:border-cyan-500"
                />
                <span className="text-[10px] text-slate-400 block mt-1.5">
                  結餘沖帳：若核銷全額，本單將自動鎖定，狀態轉移為「已結清」。
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 p-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors"
                >
                  放棄沖帳
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2.5 rounded-lg text-sm font-bold hover:scale-[1.02] transition-all cursor-pointer shadow-sm shadow-cyan-405"
                >
                  確認核銷此款額
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

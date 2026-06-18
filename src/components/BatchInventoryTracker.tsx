import { useState, FormEvent } from 'react';
import { 
  Plus, Search, Filter, Container, Warehouse, 
  Calendar, RefreshCw, Layers, CheckCircle2, AlertTriangle, Play 
} from 'lucide-react';
import { InventoryItem } from '../types';

export default function BatchInventoryTracker() {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: '1', name: '有機小米', batchNo: 'B20260601', expiryDate: '2027-06-01', warehouse: '主倉', stock: 320, status: '正常' },
    { id: '2', name: '洛神花乾', batchNo: 'B20260518', expiryDate: '2026-12-20', warehouse: '台中倉', stock: 48, status: '低庫存' },
    { id: '3', name: '紅藜', batchNo: 'B20260422', expiryDate: '2026-10-12', warehouse: '主倉', stock: 156, status: '正常' },
    { id: '4', name: '山胡椒', batchNo: 'B20260311', expiryDate: '2026-08-30', warehouse: '備用倉', stock: 25, status: '效期提醒' },
  ]);

  const [search, setSearch] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('全部');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [modalOpen, setModalOpen] = useState(false);

  // Form states for simulation
  const [formName, setFormName] = useState('有機小米');
  const [formQty, setFormQty] = useState(100);
  const [formBatch, setFormBatch] = useState('B20260618');
  const [formExpiry, setFormExpiry] = useState('2027-06-18');
  const [formWarehouse, setFormWarehouse] = useState('主倉');

  // Computed counters
  const totalStockCount = items.reduce((sum, item) => sum + item.stock, 0);
  const alarmCount = items.filter(item => item.status === '低庫存' || item.status === '效期提醒').length;

  const handleInboundSimulation = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple status auto checker
    let computedStatus: '正常' | '低庫存' | '效期提醒' = '正常';
    if (formQty < 50) computedStatus = '低庫存';
    
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: formName,
      batchNo: formBatch,
      expiryDate: formExpiry,
      warehouse: formWarehouse,
      stock: Number(formQty),
      status: computedStatus,
    };

    setItems(prev => [newItem, ...prev]);
    setModalOpen(false);

    // Reset default form items
    setFormQty(100);
    setFormBatch('B' + new Date().toISOString().slice(0, 10).replace(/[^0-9]/g, ''));
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.batchNo.toLowerCase().includes(search.toLowerCase());
    const matchesWarehouse = warehouseFilter === '全部' || item.warehouse === warehouseFilter;
    const matchesStatus = statusFilter === '全部' || item.status === statusFilter;
    
    return matchesSearch && matchesWarehouse && matchesStatus;
  });

  return (
    <div className="font-sans space-y-6">
      {/* Tracker metrics banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">在庫總合數量</span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">{totalStockCount} kg</span>
          </div>
          <div className="p-2 rounded bg-cyan-50 text-cyan-600 border border-cyan-100">
            <Container className="w-4 h-4" />
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">營運動態物儲</span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">{items.length} 個活躍批號</span>
          </div>
          <div className="p-2 rounded bg-blue-50 text-blue-600 border border-blue-100">
            <Warehouse className="w-4 h-4" />
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">異動預警提示</span>
            <span className="text-xl font-bold font-mono text-rose-600 mt-1 block">{alarmCount} 筆待追蹤</span>
          </div>
          <div className="p-2 rounded bg-rose-50 text-rose-600 border border-rose-100">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Control query panel bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜尋品名、庫存編號批號..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-slate-700 pl-10 pr-4 py-2 border border-slate-250 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-50 rounded-lg text-sm focus:outline-none transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 shrink-0 font-mono">倉庫:</span>
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="flex-1 bg-white border border-slate-250 rounded-lg px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none font-sans cursor-pointer focus:border-cyan-400"
            >
              <option value="全部">全部倉庫</option>
              <option value="主倉">主倉</option>
              <option value="台中倉">台中倉</option>
              <option value="備用倉">備用倉</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 shrink-0 font-mono">狀態:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 bg-white border border-slate-250 rounded-lg px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none font-sans cursor-pointer focus:border-cyan-400"
            >
              <option value="全部">全部狀態</option>
              <option value="正常">正常</option>
              <option value="低庫存">低庫存</option>
              <option value="效期提醒">效期提醒</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] duration-200 transition-all shrink-0 h-10"
        >
          <Plus className="w-4 h-4 stroke-[3px]" /> 模擬登陸新批號入庫
        </button>
      </div>

      {/* TABLE GRID SYSTEM */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-mono text-xs uppercase tracking-wider">
                <th className="py-3 px-5">商品名稱</th>
                <th className="py-3 px-5">批號 (Batch No.)</th>
                <th className="py-3 px-5">效期 (Expiry Date)</th>
                <th className="py-3 px-4">儲儲結構 (Loc)</th>
                <th className="py-3 px-4 text-right">現有庫存 (kg)</th>
                <th className="py-3 px-4 text-center">安全狀態</th>
                <th className="py-3 px-4 text-right">作業</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-mono text-xs">
                    沒有匹配的批次庫存紀錄
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                    <td className="py-4 px-5 font-semibold text-slate-800">{item.name}</td>
                    <td className="py-4 px-5 font-mono text-cyan-600 font-semibold">{item.batchNo}</td>
                    <td className="py-4 px-5 font-mono text-slate-500">{item.expiryDate}</td>
                    <td className="py-4 px-4 font-sans text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Warehouse className="w-3.5 h-3.5 text-slate-400" />
                        {item.warehouse}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-slate-800">{item.stock}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        {item.status === '正常' && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {item.status}
                          </span>
                        )}
                        {item.status === '低庫存' && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> {item.status}
                          </span>
                        )}
                        {item.status === '效期提醒' && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" /> {item.status}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-xs font-mono text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 bg-white hover:bg-rose-50 p-1 px-2.5 rounded transition-all cursor-pointer"
                      >
                        移出 (Delete)
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="block md:hidden divide-y divide-slate-100 bg-white">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-mono text-xs">
              沒有匹配的批次庫存紀錄
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="p-4 bg-white hover:bg-slate-50/30 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-slate-800 text-[16px]">{item.name}</h5>
                    <span className="text-[14px] font-mono text-cyan-600 font-semibold block mt-0.5">
                      批號: {item.batchNo}
                    </span>
                  </div>
                  <div>
                    {item.status === '正常' && (
                      <span className="px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                        {item.status}
                      </span>
                    )}
                    {item.status === '低庫存' && (
                      <span className="px-2 py-0.5 rounded text-xs bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-1">
                        {item.status}
                      </span>
                    )}
                    {item.status === '效期提醒' && (
                      <span className="px-2 py-0.5 rounded text-xs bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1">
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-[15px] border-t border-slate-100 pt-2 text-slate-500">
                  <div>
                    <span className="text-[12px] text-slate-400 block">儲別/效期:</span>
                    <span className="font-semibold text-slate-700">{item.warehouse}</span>
                    <span className="font-mono text-slate-450 block text-xs mt-0.5">{item.expiryDate}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] text-slate-400 block">在庫重量:</span>
                    <span className="font-mono text-slate-800 text-base font-extrabold">{item.stock} kg</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-xs bg-white border border-slate-200 text-slate-400 hover:text-red-500 p-1.5 px-3 rounded cursor-pointer transition-colors"
                  >
                    移出主檔庫存
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL SIMULATION FOR INBOUND CHECKOUT */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-zoomIn">
            <h4 className="text-lg font-bold text-slate-900 mb-2">📥 模擬貨品批號進貨登記</h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              填寫下方採購單入庫細節，驗核送出後，Dachuang 智能流程核心將自動進行批號對位同步更新實存表。
            </p>

            <form onSubmit={handleInboundSimulation} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">貨品品項</label>
                <select
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-white border border-slate-250 text-slate-800 rounded-lg p-2 text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="有機小米">有機小米</option>
                  <option value="洛神花乾">洛神花乾</option>
                  <option value="紅藜">紅藜</option>
                  <option value="山胡椒">山胡椒</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">入庫倉庫</label>
                  <select
                    value={formWarehouse}
                    onChange={(e) => setFormWarehouse(e.target.value)}
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-lg p-2 text-sm focus:outline-none"
                  >
                    <option value="主倉">主倉</option>
                    <option value="台中倉">台中倉</option>
                    <option value="備用倉">備用倉</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">入庫數量 (kg)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formQty}
                    onChange={(e) => setFormQty(Number(e.target.value))}
                    className="w-full bg-white border border-slate-250 text-slate-850 rounded-lg p-2 text-sm font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">進貨批號</label>
                  <input
                    type="text"
                    required
                    value={formBatch}
                    onChange={(e) => setFormBatch(e.target.value)}
                    className="w-full bg-white border border-slate-250 text-slate-850 rounded-lg p-2 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">到期日期</label>
                  <input
                    type="date"
                    required
                    value={formExpiry}
                    onChange={(e) => setFormExpiry(e.target.value)}
                    className="w-full bg-white border border-slate-250 text-slate-850 rounded-lg p-2 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-2.5 rounded-lg text-sm font-bold hover:scale-[1.02] transition-all cursor-pointer shadow-sm shadow-cyan-400/20"
                >
                  確認入庫
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

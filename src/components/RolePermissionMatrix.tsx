import { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle2, Lock, Eye, Edit3, XCircle } from 'lucide-react';

export default function RolePermissionMatrix() {
  const [selectedRole, setSelectedRole] = useState('admin');

  const roles = [
    {
      id: 'admin',
      name: '管理者',
      englishName: 'SYSTEM ADMINISTRATOR',
      color: 'border-l-cyan-500 hover:border-cyan-300',
      activeColor: 'bg-cyan-50/80 border-cyan-400 text-cyan-600 shadow-sm',
      desc: '擁有系統全權掌控權，支援設定安全參數與分配使用者角色。',
    },
    {
      id: 'accounting',
      name: '會計人員',
      englishName: 'FISCAL ACCOUNTANT',
      color: 'border-l-purple-500 hover:border-purple-300',
      activeColor: 'bg-purple-50/80 border-purple-400 text-purple-600 shadow-sm',
      desc: '主責處理付款、應收應付對帳、傳票流水稽核與財務報表匯出作業。',
    },
    {
      id: 'operator',
      name: '操作人員',
      englishName: 'LOGISTICS OPERATOR',
      color: 'border-l-blue-500 hover:border-blue-300',
      activeColor: 'bg-blue-50/80 border-blue-400 text-blue-600 shadow-sm',
      desc: '執行商品進貨登記、效期批號綁定、出貨配送通知與實體扣庫異動。',
    },
    {
      id: 'viewer',
      name: '查閱人員',
      englishName: 'GUEST VIEWER',
      color: 'border-l-slate-400 hover:border-slate-350',
      activeColor: 'bg-slate-100 border-slate-350 text-slate-700 shadow-sm',
      desc: '提供給稽核或主管，僅能閱覽各倉庫分析看板，禁止任何編輯修改。',
    }
  ];

  // Modules permission matrix row data
  const permissionData = [
    { module: '儀表板總覽', key: 'dashboard', admin: 'W', accounting: 'R', operator: 'R', viewer: 'R' },
    { module: '商品供應主檔', key: 'products', admin: 'W', accounting: 'R', operator: 'R', viewer: 'R' },
    { module: '採購進貨登記', key: 'incoming', admin: 'W', accounting: '-', operator: 'W', viewer: 'R' },
    { module: '批號扣指分裝', key: 'outgoing', admin: 'W', accounting: '-', operator: 'W', viewer: 'R' },
    { module: '收付沖抵沖帳', key: 'payments', admin: 'W', accounting: 'W', operator: '-', viewer: '-' },
    { module: '使用者與權限', key: 'permissions', admin: 'W', accounting: '-', operator: '-', viewer: '-' }
  ];

  const renderBadge = (perm: string) => {
    switch (perm) {
      case 'W':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-[11px] font-mono font-bold tracking-wider">
            <Edit3 className="w-3.5 h-3.5" /> 讀寫 (Write)
          </span>
        );
      case 'R':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200 text-[11px] font-mono font-bold tracking-wider">
            <Eye className="w-3.5 h-3.5" /> 唯讀 (Read)
          </span>
        );
      case '-':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-550 border border-rose-150 text-[11px] font-mono font-bold tracking-wider">
            <XCircle className="w-3.5 h-3.5 opacity-80" /> 禁用 (Deny)
          </span>
        );
    }
  };

  return (
    <div className="font-sans grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left Column: Role selection checklist tabs */}
      <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
        <div className="space-y-3">
          {roles.map((r) => {
            const isSelected = selectedRole === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`p-4 rounded-xl border-l-4 border-y border-r transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? r.activeColor + ' translate-x-1'
                    : 'bg-white border-slate-200 hover:bg-slate-50/70 text-slate-700'
                } ${r.color}`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-800">{r.name}</h4>
                  <Shield className="w-4 h-4 opacity-50" />
                </div>
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase block mt-0.5">
                  {r.englishName}
                </span>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security posture statement */}
        <div className="hidden lg:block p-4 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-500 leading-relaxed font-mono mt-4">
          <ShieldAlert className="w-4 h-4 text-cyan-600 mb-2" />
          Dachuang Security Matrix 採用模組化路由保護，未經授權角色將從 Client & Server-side API 端即刻阻斷。
        </div>
      </div>

      {/* Right Column: Permission Matrix details table */}
      <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2 font-bold text-slate-705">
              <Lock className="w-4 h-4 text-cyan-600" />
              模組全權變更矩陣 (RBAC Matrix)
            </span>
            <span className="font-semibold text-slate-500">
              選定角色：
              <span className="text-cyan-600 font-bold underline">
                {roles.find(r => r.id === selectedRole)?.name}
              </span>
            </span>
          </div>

          {/* Grid Layout Representing Permissions for the Current Role */}
          <div className="space-y-3">
            {permissionData.map((row) => {
              // Extract the permission character for the current active role
              const currentPerm = row[selectedRole as 'admin' | 'accounting' | 'operator' | 'viewer'];
              
              return (
                <div 
                  key={row.key} 
                  className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-200/60 hover:bg-slate-50/80 hover:border-slate-300 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-sm font-bold text-slate-700">
                      {row.module}
                    </span>
                  </div>
                  
                  {/* Glowing highlighted permission badge */}
                  <div>
                    {renderBadge(currentPerm)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-400 gap-2 font-sans font-semibold">
          <span>對接角色目錄：ActiveDirectory / OAuth 2.0</span>
          <span>防纂改：完整密鑰數位簽章</span>
        </div>
      </div>
    </div>
  );
}

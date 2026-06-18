"use client";

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { LayoutShell } from '@/components/layout-shell';

interface Project {
  id: string;
  project_name: string;
  organization: string;
  execution_year?: string;
  project_code?: string;
}

interface BudgetItem {
  id: string;
  project_id: string;
  category: string;
  item_name: string;
  total_price: number;
}

interface ExpenseItem {
  id: string;
  budget_item_id: string;
  description: string;
  category: string;
  amount: number;
  receipt_url: string;
}

interface KeyResultWithExpenses {
  id: string;
  objective_name: string;
  key_result_desc: string;
  budget_amount: number;
  result_description: string;
  progress_percentage: number;
  expenses: ExpenseItem[];
}

interface MonthlyReport {
  id: string;
  project_id: string;
  report_no: string;
  report_month: string;
  created_at: string;
}

interface MonthlyReportWithItems extends MonthlyReport {
  project: Project;
  items: KeyResultWithExpenses[];
}

export default function MonthlyReportsPage() {
  const { profile, isOperator } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [reports, setReports] = useState<MonthlyReportWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [reportMonth, setReportMonth] = useState('');
  const [editingReport, setEditingReport] = useState<MonthlyReportWithItems | null>(null);
  const [formItems, setFormItems] = useState<KeyResultWithExpenses[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadTarget, setCurrentUploadTarget] = useState<{krIdx: number, expIdx: number} | null>(null);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);

  useEffect(() => {
    loadData();
  }, [profile]);

  async function loadData() {
    try {
      let projectQuery = supabase.from('projects').select('*');
      if (isOperator && profile?.project_id) {
        projectQuery = projectQuery.eq('id', profile.project_id);
      }
      const { data: projectsData } = await projectQuery;
      setProjects(projectsData || []);

      const { data: budgetData } = await supabase.from('budget_items').select('*');
      setBudgetItems(budgetData || []);

      const { data: reportsData } = await supabase
        .from('monthly_reports')
        .select('*')
        .order('created_at', { ascending: false });

      const reportsWithItems: MonthlyReportWithItems[] = [];
      for (const report of reportsData || []) {
        const project = projectsData?.find(p => p.id === report.project_id);
        if (!project) continue;

        const { data: items } = await supabase
          .from('monthly_report_items')
          .select('*')
          .eq('monthly_report_id', report.id);

        const keyResultItems: KeyResultWithExpenses[] = [];
        for (const item of items || []) {
          const { data: kr } = await supabase
            .from('key_results')
            .select('*, objectives!inner(objective_name)')
            .eq('id', item.key_result_id)
            .single();
          
          const { data: expensesData } = await supabase
            .from('report_expenses')
            .select('*')
            .eq('report_item_id', item.id);

          if (kr) {
            keyResultItems.push({
              id: kr.id,
              objective_name: (kr as any).objectives?.objective_name || '',
              key_result_desc: kr.key_result_desc,
              budget_amount: kr.budget_amount || 0,
              result_description: item.result_description || '',
              progress_percentage: item.progress_percentage || 0,
              expenses: (expensesData || []).map((e: any) => ({
                id: e.id,
                budget_item_id: e.budget_item_id || '',
                description: e.description,
                category: e.category || '',
                amount: e.amount,
                receipt_url: e.receipt_url || '',
              })),
            });
          }
        }

        reportsWithItems.push({ ...report, project, items: keyResultItems });
      }
      setReports(reportsWithItems);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateReport() {
    if (!selectedProject || !reportMonth) return;
    const project = projects.find(p => p.id === selectedProject);
    if (!project) return;

    const existingCount = reports.filter(r => r.project_id === selectedProject).length;
    const reportNo = `${project.execution_year || '114'}-${project.project_code || 'A001'}-${String(existingCount + 1).padStart(2, '0')}`;

    const { data: objectives } = await supabase.from('objectives').select('*').eq('project_id', selectedProject);

    const keyResults: KeyResultWithExpenses[] = [];
    for (const obj of objectives || []) {
      const { data: krs } = await supabase.from('key_results').select('*').eq('objective_id', obj.id);
      for (const kr of krs || []) {
        keyResults.push({
          id: kr.id, objective_name: obj.objective_name, key_result_desc: kr.key_result_desc,
          budget_amount: kr.budget_amount || 0, result_description: '', progress_percentage: 0, expenses: [],
        });
      }
    }

    setFormItems(keyResults);
    setEditingReport({ id: '', project_id: selectedProject, report_no: reportNo, report_month: reportMonth, created_at: '', project, items: keyResults });
    setShowForm(true);
  }

  async function handleSaveReport() {
    if (!editingReport) return;
    let reportId = editingReport.id;

    if (!reportId) {
      const { data } = await supabase.from('monthly_reports').insert({ project_id: editingReport.project_id, report_no: editingReport.report_no, report_month: editingReport.report_month }).select().single();
      reportId = data?.id;
    } else {
      await supabase.from('monthly_reports').update({ report_month: editingReport.report_month }).eq('id', reportId);
      const { data: oldItems } = await supabase.from('monthly_report_items').select('id').eq('monthly_report_id', reportId);
      for (const oldItem of oldItems || []) { await supabase.from('report_expenses').delete().eq('report_item_id', oldItem.id); }
      await supabase.from('monthly_report_items').delete().eq('monthly_report_id', reportId);
    }

    if (reportId) {
      for (const item of formItems) {
        const { data: insertedItem } = await supabase.from('monthly_report_items').insert({ monthly_report_id: reportId, key_result_id: item.id, result_description: item.result_description, progress_percentage: item.progress_percentage, actual_amount: item.expenses.reduce((sum, e) => sum + e.amount, 0) }).select().single();
        if (insertedItem && item.expenses.length > 0) {
          await supabase.from('report_expenses').insert(item.expenses.map(e => ({ report_item_id: insertedItem.id, budget_item_id: e.budget_item_id || null, category: e.category, description: e.description, amount: e.amount, receipt_url: e.receipt_url })));
        }
      }
    }
    setShowForm(false); setEditingReport(null); setFormItems([]); loadData();
  }

  function handleEditReport(report: MonthlyReportWithItems) { setEditingReport(report); setFormItems(report.items); setShowForm(true); }

  async function handleDeleteReport(reportId: string) {
    if (!confirm('確定要刪除此月報嗎？')) return;
    const { data: items } = await supabase.from('monthly_report_items').select('id').eq('monthly_report_id', reportId);
    for (const item of items || []) { await supabase.from('report_expenses').delete().eq('report_item_id', item.id); }
    await supabase.from('monthly_report_items').delete().eq('monthly_report_id', reportId);
    await supabase.from('monthly_reports').delete().eq('id', reportId);
    loadData();
  }

  function addExpenseItem(krIdx: number) {
    const updated = [...formItems];
    updated[krIdx].expenses.push({ id: `new_${Date.now()}`, budget_item_id: '', description: '', category: '', amount: 0, receipt_url: '' });
    setFormItems(updated);
  }

  function handleBudgetItemSelect(krIdx: number, expIdx: number, budgetItemId: string) {
    const updated = [...formItems];
    if (budgetItemId === 'manual') {
      updated[krIdx].expenses[expIdx] = { ...updated[krIdx].expenses[expIdx], budget_item_id: '', description: '', category: '', amount: 0 };
    } else {
      const selectedBudget = budgetItems.find(b => b.id === budgetItemId);
      if (selectedBudget) {
        updated[krIdx].expenses[expIdx] = { ...updated[krIdx].expenses[expIdx], budget_item_id: budgetItemId, description: selectedBudget.item_name, category: selectedBudget.category, amount: selectedBudget.total_price || 0 };
      }
    }
    setFormItems(updated);
  }

  function removeExpenseItem(krIdx: number, expIdx: number) { const updated = [...formItems]; updated[krIdx].expenses.splice(expIdx, 1); setFormItems(updated); }
  function updateExpenseItem(krIdx: number, expIdx: number, field: string, value: any) { const updated = [...formItems]; (updated[krIdx].expenses[expIdx] as any)[field] = value; setFormItems(updated); }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0] || !currentUploadTarget) return;
    const file = e.target.files[0];
    const { krIdx, expIdx } = currentUploadTarget;
    setUploading(`${krIdx}-${expIdx}`);
    const fileName = `receipts/${Date.now()}_${Math.random().toString(36).slice(2)}.${file.name.split('.').pop()}`;
    const { data, error } = await supabase.storage.from('report-receipts').upload(fileName, file);
    if (!error && data) {
      const { data: urlData } = supabase.storage.from('report-receipts').getPublicUrl(fileName);
      updateExpenseItem(krIdx, expIdx, 'receipt_url', urlData.publicUrl);
    }
    setUploading(null); setCurrentUploadTarget(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function triggerFileUpload(krIdx: number, expIdx: number) { setCurrentUploadTarget({ krIdx, expIdx }); fileInputRef.current?.click(); }

  if (loading) return <LayoutShell><div className="p-6">載入中...</div></LayoutShell>;

  return (
    <LayoutShell>
      <div className="p-6">
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,.pdf" className="hidden" />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">月報填報</h1>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">匯出 Excel</button>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-3">建立新月報</h3>
          <div className="flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">選擇計畫</label>
              <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded">
                <option value="">請選擇</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.project_name} - {p.organization}</option>)}
              </select>
            </div>
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">填報月份</label>
              <input type="month" value={reportMonth} onChange={e => setReportMonth(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <button onClick={handleCreateReport} disabled={!selectedProject || !reportMonth} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300">建立月報</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">序號</th>
                <th className="px-4 py-3 text-left">填報月份</th>
                <th className="px-4 py-3 text-left">計畫名稱</th>
                <th className="px-4 py-3 text-left">執行單位</th>
                <th className="px-4 py-3 text-center">關鍵結果數</th>
                <th className="px-4 py-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{report.report_no}</td>
                  <td className="px-4 py-3">{report.report_month}</td>
                  <td className="px-4 py-3">{report.project.project_name}</td>
                  <td className="px-4 py-3">{report.project.organization}</td>
                  <td className="px-4 py-3 text-center">{report.items.length}</td>
                  <td className="px-4 py-3 text-center space-x-3">
                    <button onClick={() => handleEditReport(report)} className="text-blue-600 hover:underline">編輯</button>
                    <button onClick={() => handleDeleteReport(report.id)} className="text-red-600 hover:underline">刪除</button>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">尚無月報資料</td></tr>}
            </tbody>
          </table>
        </div>

        {showForm && editingReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{editingReport.id ? '編輯月報' : '新增月報'} - {editingReport.report_no}</h2>
              <div className="mb-4 p-3 bg-blue-50 rounded">
                <p><strong>計畫：</strong>{editingReport.project.project_name}</p>
                <p><strong>執行單位：</strong>{editingReport.project.organization}</p>
                <p><strong>填報月份：</strong>{editingReport.report_month}</p>
              </div>

              {formItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">此計畫尚未設定關鍵項目，請先在計畫資料中設定</div>
              ) : formItems.map((item, krIdx) => {
                const totalExpense = item.expenses.reduce((sum, e) => sum + e.amount, 0);
                return (
                  <div key={item.id} className="mb-6 border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-3 flex justify-between items-start flex-wrap gap-2">
                      <div><p className="text-sm text-gray-600">{item.objective_name}</p><p className="font-medium">{item.key_result_desc}</p></div>
                      <div className="text-right">
                        <p className="text-sm">預算：<span className="font-bold text-blue-600">{item.budget_amount.toLocaleString()}</span> 元</p>
                        <p className="text-sm">已支出：<span className="font-bold text-orange-600">{totalExpense.toLocaleString()}</span> 元</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">成果說明</label>
                          <textarea value={item.result_description} onChange={e => { const updated = [...formItems]; updated[krIdx].result_description = e.target.value; setFormItems(updated); }} className="w-full px-3 py-2 border rounded" rows={2} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">進度 (%)</label>
                          <input type="number" min="0" max="100" value={item.progress_percentage} onChange={e => { const updated = [...formItems]; updated[krIdx].progress_percentage = parseInt(e.target.value) || 0; setFormItems(updated); }} className="w-full px-3 py-2 border rounded" />
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-700">💰 支出明細</h4>
                          <button onClick={() => addExpenseItem(krIdx)} className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">+ 新增支出</button>
                        </div>
                        {item.expenses.length === 0 ? <p className="text-gray-500 text-sm py-4 text-center">尚無支出明細</p> : (
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50"><tr><th className="px-3 py-2 text-left">預算項目</th><th className="px-3 py-2 text-left">說明</th><th className="px-3 py-2 text-right">金額</th><th className="px-3 py-2 text-center">單據</th><th className="px-3 py-2">操作</th></tr></thead>
                            <tbody>
                              {item.expenses.map((exp, expIdx) => (
                                <tr key={exp.id} className="border-t">
                                  <td className="px-3 py-2"><select value={exp.budget_item_id || 'manual'} onChange={e => handleBudgetItemSelect(krIdx, expIdx, e.target.value)} className="w-full px-2 py-1 border rounded text-sm"><option value="manual">手動輸入</option>{budgetItems.filter(b => b.project_id === editingReport.project_id).map(b => <option key={b.id} value={b.id}>[{b.category}] {b.item_name}</option>)}</select></td>
                                  <td className="px-3 py-2"><input type="text" value={exp.description} onChange={e => updateExpenseItem(krIdx, expIdx, 'description', e.target.value)} className="w-full px-2 py-1 border rounded" /></td>
                                  <td className="px-3 py-2"><input type="number" value={exp.amount} onChange={e => updateExpenseItem(krIdx, expIdx, 'amount', parseInt(e.target.value) || 0)} className="w-full px-2 py-1 border rounded text-right" /></td>
                                  <td className="px-3 py-2 text-center">{exp.receipt_url ? <a href={exp.receipt_url} target="_blank" className="text-blue-600 text-xs">查看</a> : <button onClick={() => triggerFileUpload(krIdx, expIdx)} className="px-2 py-1 bg-gray-100 text-xs rounded">{uploading === `${krIdx}-${expIdx}` ? '上傳中...' : '上傳'}</button>}</td>
                                  <td className="px-3 py-2 text-center"><button onClick={() => removeExpenseItem(krIdx, expIdx)} className="text-red-600 text-xs">刪除</button></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-end space-x-2 mt-6 border-t pt-4">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded hover:bg-gray-50">取消</button>
                <button onClick={handleSaveReport} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">儲存月報</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutShell>
  );
}

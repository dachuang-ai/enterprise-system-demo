"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { LayoutShell } from '@/components/layout-shell';

interface Project {
  id: string;
  project_name: string;
  organization: string;
  approved_amount: number;
}

interface KeyResult {
  id: string;
  project_id: string;
  status: string;
  deadline: string;
  actual_amount: number;
}

interface ProjectStats {
  project: Project;
  keyResults: KeyResult[];
  completionRate: number;
  budgetRate: number;
  delayedCount: number;
  normalCount: number;
}

export default function Dashboard() {
  const { profile, isAdmin } = useAuth();
  const [stats, setStats] = useState<ProjectStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [profile]);

  async function loadStats() {
    try {
      let projectQuery = supabase.from('projects').select('*');
      
      if (!isAdmin && profile?.project_id) {
        projectQuery = projectQuery.eq('id', profile.project_id);
      }

      const { data: projects, error } = await projectQuery;
      if (error || !projects) {
        console.error('Error loading projects:', error);
        setLoading(false);
        return;
      }

      const projectStats: ProjectStats[] = [];
      const today = new Date().toISOString().split('T')[0];

      for (const project of projects) {
        const { data: keyResults } = await supabase
          .from('key_results')
          .select('*')
          .eq('project_id', project.id);

        const krs = keyResults || [];
        const completed = krs.filter((kr: KeyResult) => kr.status === '已完成').length;
        const completionRate = krs.length > 0 ? (completed / krs.length) * 100 : 0;
        
        const actualTotal = krs.reduce((sum: number, kr: KeyResult) => sum + (kr.actual_amount || 0), 0);
        const budgetRate = project.approved_amount > 0 
          ? (actualTotal / project.approved_amount) * 100 
          : 0;

        const delayedCount = krs.filter((kr: KeyResult) => 
          kr.deadline < today && kr.status !== '已完成'
        ).length;
        const normalCount = krs.length - delayedCount;

        projectStats.push({
          project,
          keyResults: krs,
          completionRate,
          budgetRate,
          delayedCount,
          normalCount
        });
      }

      setStats(projectStats);
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  }

  const totalDelayed = stats.reduce((sum, s) => sum + s.delayedCount, 0);
  const totalNormal = stats.reduce((sum, s) => sum + s.normalCount, 0);

  if (loading) {
    return (
      <LayoutShell>
        <div className="p-6">載入中...</div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">儀表板</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-1">計畫總數</h3>
            <p className="text-3xl font-bold">{stats.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-1">預警統計</h3>
            <p className="text-lg">
              <span className="text-red-600 font-bold">{totalDelayed} 落後</span>
              {' / '}
              <span className="text-green-600 font-bold">{totalNormal} 正常</span>
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-1">平均達成率</h3>
            <p className="text-3xl font-bold">
              {stats.length > 0 
                ? (stats.reduce((sum, s) => sum + s.completionRate, 0) / stats.length).toFixed(1)
                : 0}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">計畫名稱</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">執行單位</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">達成率</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">經費執行率</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">預警</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    暫無計畫資料
                  </td>
                </tr>
              ) : (
                stats.map(({ project, completionRate, budgetRate, delayedCount }) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{project.project_name}</td>
                    <td className="px-4 py-3 text-sm">{project.organization}</td>
                    <td className="px-4 py-3 text-center text-sm">{completionRate.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-center text-sm">{budgetRate.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-center">
                      {delayedCount > 0 ? (
                        <span className="inline-block w-3 h-3 rounded-full bg-red-500" title="落後" />
                      ) : (
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500" title="正常" />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutShell>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Search, FileEdit, Trash2, Info, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { useData } from "@/lib/data-context";
import { cn } from "@/lib/utils";

export default function ProjectDataPage() {
  const { profile, isAdmin, isOperator } = useAuth();
  const { projects: dataProjects, budgetItems } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Use projects from data context and augment with metadata
  const projectInfo = useMemo(() => {
    const meta = {
      "PJ001": { code: "MOC-114-001", type: "文化傳承", manager: "金惠雯", startDate: "2026-01-01", endDate: "2026-12-31", status: "進行中" },
      "PJ002": { code: "MOC-114-002", type: "環境推廣", manager: "李曉明", startDate: "2026-02-01", endDate: "2026-11-30", status: "規劃中" },
      "PJ003": { code: "MOC-113-085", type: "社會福利", manager: "張美玲", startDate: "2025-01-01", endDate: "2025-12-31", status: "已結案" },
      "PJ004": { code: "MOC-115-01-01", type: "文化復振", manager: "金惠雯", startDate: "2026-01-01", endDate: "2026-12-31", status: "進行中" },
    };
    
    return dataProjects.map(p => ({
      ...p,
      ...(meta[p.id as keyof typeof meta] || { code: p.id, type: "其他", manager: "未指派", startDate: "-", endDate: "-", status: "進行中" })
    }));
  }, [dataProjects]);

  const filteredProjects = useMemo(() => {
    return projectInfo.filter(p => {
      const matchesSearch = p.name.includes(searchTerm) || p.code.includes(searchTerm) || p.manager.includes(searchTerm);
      if (isOperator && profile?.project_id) {
        return matchesSearch && p.id === profile.project_id;
      }
      return matchesSearch;
    });
  }, [projectInfo, searchTerm, isOperator, profile]);

  // Auto-select first project if none selected
  const selectedProject = useMemo(() => {
    if (selectedProjectId) {
      return projectInfo.find(p => p.id === selectedProjectId);
    }
    return filteredProjects.length > 0 ? filteredProjects[0] : null;
  }, [selectedProjectId, projectInfo, filteredProjects]);

  const projectBudgetItems = useMemo(() => {
    return budgetItems.filter(item => item.projectId === selectedProject?.id);
  }, [budgetItems, selectedProject]);

  const categories = Array.from(new Set(projectBudgetItems.map(item => item.category)));
  const totalBudget = projectBudgetItems.reduce((sum, item) => sum + item.budget, 0);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">計畫資料</h1>
          <p className="text-zinc-500 mt-1">管理與查看所有執行中計畫的預算配置</p>
        </div>
        {isAdmin && (
          <Button className="bg-blue-600 hover:bg-blue-700 flex gap-2 shadow-lg shadow-blue-500/20">
            <Plus className="h-4 w-4" />
            新增計畫
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-none shadow-xl bg-white/50 backdrop-blur-sm">
            <CardHeader className="bg-white/80 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                    <Info className="h-5 w-5" />
                  </div>
                  計畫清單
                </CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    placeholder="搜尋計畫名稱、代碼..."
                    className="pl-10 h-10 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-zinc-50/50">
                      <TableHead className="w-24 pl-6">計畫代碼</TableHead>
                      <TableHead>計畫名稱</TableHead>
                      <TableHead>負責人</TableHead>
                      <TableHead>狀態</TableHead>
                      <TableHead className="text-right pr-6">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project) => (
                        <TableRow 
                          key={project.id} 
                          className={cn(
                            "cursor-pointer transition-all duration-200",
                            selectedProject?.id === project.id ? "bg-blue-50/80 border-l-4 border-l-blue-600" : "hover:bg-zinc-50 border-l-4 border-l-transparent"
                          )}
                          onClick={() => setSelectedProjectId(project.id)}
                        >
                          <TableCell className="font-mono text-xs pl-6">{project.code}</TableCell>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{project.name}</span>
                              <span className="text-[10px] text-zinc-500">{project.type}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{project.manager}</TableCell>
                          <TableCell>
                            <Badge variant={project.status === "已結案" ? "secondary" : "default"} className="text-[10px] px-2 py-0">
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white hover:text-blue-600 shadow-sm">
                              <FileEdit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-zinc-400">
                          找不到相符的計畫資料
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedProject && (
            <Card className="border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between py-5 px-6 gap-4">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  預算配置 - <span className="text-blue-400">{selectedProject.name}</span>
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-bold bg-white/10 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-sm">
                    核定總額：<span className="text-blue-300 text-lg ml-1">${totalBudget.toLocaleString()}</span>
                  </div>
                  {isAdmin && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg shadow-blue-500/40">
                      <Plus className="h-4 w-4 mr-1" />
                      新增項目
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-zinc-50">
                        <TableHead className="w-[120px] font-bold pl-6 text-zinc-900">分類</TableHead>
                        <TableHead className="font-bold text-zinc-900">工作事項 / 預算科目</TableHead>
                        <TableHead className="w-[100px] text-center font-bold text-zinc-900">數量</TableHead>
                        <TableHead className="w-[100px] text-center font-bold text-zinc-900">單位</TableHead>
                        <TableHead className="w-[140px] text-right font-bold text-zinc-900">單價</TableHead>
                        <TableHead className="w-[140px] text-right font-bold pr-6 text-blue-600">預算金額</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.length > 0 ? (
                        categories.map((category) => {
                          const items = projectBudgetItems.filter(i => i.category === category);
                          const catTotal = items.reduce((sum, i) => sum + i.budget, 0);
                          
                          return (
                            <React.Fragment key={category}>
                              <TableRow className="bg-zinc-100/30">
                                <TableCell className="font-bold text-blue-700 pl-6 border-l-4 border-l-blue-600 bg-blue-50/30">{category}</TableCell>
                                <TableCell colSpan={5} className="p-0"></TableCell>
                              </TableRow>
                              {items.map((item) => (
                                <TableRow key={item.id} className="hover:bg-zinc-50 transition-colors group">
                                  <TableCell className="text-zinc-500 pl-6"></TableCell>
                                  <TableCell>
                                    <div className="flex flex-col gap-1 py-1">
                                      <span className="font-semibold text-zinc-800">{item.name}</span>
                                      {item.description && <span className="text-xs text-zinc-500 leading-relaxed">{item.description}</span>}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-center font-medium">{item.quantity}</TableCell>
                                  <TableCell className="text-center text-zinc-600">{item.unit}</TableCell>
                                  <TableCell className="text-right font-mono text-sm">${item.unitPrice.toLocaleString()}</TableCell>
                                  <TableCell className="text-right font-bold pr-6 text-zinc-900 bg-zinc-50/30 group-hover:bg-blue-50/30 transition-colors">${item.budget.toLocaleString()}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow className="bg-blue-50/10 font-bold border-t border-blue-100/50">
                                <TableCell className="pl-6"></TableCell>
                                <TableCell className="text-right text-zinc-500 text-sm" colSpan={4}>{category} 小計</TableCell>
                                <TableCell className="text-right text-blue-700 pr-6 border-l border-zinc-100">${catTotal.toLocaleString()}</TableCell>
                              </TableRow>
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-16 text-zinc-400 bg-zinc-50/30">
                            <div className="flex flex-col items-center gap-2">
                              <DollarSign className="h-8 w-8 text-zinc-300" />
                              <p>尚未設定預算項目</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow className="bg-zinc-900 text-white font-bold h-14">
                        <TableCell colSpan={5} className="text-right pr-6 pl-6 text-zinc-400 uppercase tracking-wider text-xs">預算總計</TableCell>
                        <TableCell className="text-right text-blue-400 text-lg pr-6">
                          ${totalBudget.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {selectedProject && (
            <Card className="border-none shadow-xl bg-white overflow-hidden">
              <CardHeader className="border-b bg-zinc-50/80">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  詳細資訊
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">計畫編號</p>
                    <p className="font-mono text-sm font-bold">{selectedProject.code}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">計畫類型</p>
                    <p className="font-semibold text-sm">{selectedProject.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">負責人</p>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                        {selectedProject.manager.charAt(0)}
                      </div>
                      <p className="font-semibold text-sm">{selectedProject.manager}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">當前狀態</p>
                    <Badge className={cn(
                      "text-[10px] font-bold px-2 py-0.5",
                      selectedProject.status === "進行中" ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-100"
                    )} variant="outline">
                      {selectedProject.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">執行期間</p>
                  <div className="flex items-center justify-between text-sm font-semibold text-zinc-700">
                    <span>{selectedProject.startDate}</span>
                    <span className="text-zinc-300">→</span>
                    <span>{selectedProject.endDate}</span>
                  </div>
                </div>

                {isAdmin && (
                  <div className="pt-2 flex gap-3">
                    <Button className="flex-1 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 shadow-sm" variant="outline">
                      編輯計畫
                    </Button>
                    <Button variant="ghost" className="text-zinc-400 hover:text-red-600 hover:bg-red-50" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          <Card className="bg-zinc-900 text-white border-none shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <PieChart className="h-24 w-24" />
            </div>
            <CardHeader className="relative">
              <CardTitle className="text-lg font-bold">統計概況</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 relative">
              <div className="flex items-center justify-between group">
                <span className="text-zinc-400 text-sm font-medium group-hover:text-white transition-colors">專案總數</span>
                <span className="text-3xl font-black text-white">{projectInfo.length}</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-xs font-medium">進行中專案</span>
                  <span className="text-lg font-bold text-emerald-400">2</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-xs font-medium">規劃中專案</span>
                  <span className="text-lg font-bold text-amber-400">1</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { PieChart } from "lucide-react";

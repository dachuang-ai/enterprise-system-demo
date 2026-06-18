"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface BudgetItem {
  id: string;
  projectId: string;
  category: string;
  goal: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  budget: number;
  description: string;
}

export interface ReportItem {
  id: string;
  budgetItemId: string; // Linked to BudgetItem
  content: string;
  expense: number;
  files?: string[];
}

export interface MonthlyReport {
  id: string;
  projectId: string;
  month: string;
  items: ReportItem[];
  status: "草稿" | "待審核" | "已核定";
  submittedAt: string;
}

interface DataContextType {
  projects: { id: string; name: string }[];
  budgetItems: BudgetItem[];
  monthlyReports: MonthlyReport[];
  addMonthlyReport: (report: MonthlyReport) => void;
  updateMonthlyReport: (report: MonthlyReport) => void;
  deleteMonthlyReport: (id: string) => void;
  getSpentAmount: (budgetItemId: string) => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const projects = [
      { id: "PJ001", name: "原鄉文化傳承計畫" },
      { id: "PJ002", name: "有機農業推廣計畫" },
      { id: "PJ003", name: "偏鄉教育支援專案" },
      { id: "PJ004", name: "從庫房到衣著,拔馬部落衣飾復刻及日常化計畫" },
    ];

    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
      { id: "i1", projectId: "PJ001", category: "軟體開發", goal: "目標一：系統開發與建置", name: "軟體開發費", quantity: 1, unit: "項", unitPrice: 500000, budget: 500000, description: "" },
      { id: "i2", projectId: "PJ001", category: "硬體設備", goal: "目標一：系統開發與建置", name: "伺服器租賃", quantity: 12, unit: "月", unitPrice: 4166, budget: 50000, description: "" },
      { id: "i3", projectId: "PJ001", category: "系統維護", goal: "目標一：系統開發與建置", name: "系統維護費", quantity: 1, unit: "式", unitPrice: 100000, budget: 100000, description: "" },
      
      { id: "i4-1", projectId: "PJ004", category: "人事費", goal: "核心工作", name: "專案經理", quantity: 1, unit: "人", unitPrice: 350000, budget: 350000, description: "負責計畫統籌" },
      { id: "i4-2", projectId: "PJ004", category: "業務費", goal: "活動辦理", name: "傳統服飾復刻工坊", quantity: 1, unit: "場", unitPrice: 200000, budget: 200000, description: "辦理部落工作坊" },
      { id: "i4-3", projectId: "PJ004", category: "雜支", goal: "行政庶務", name: "辦公用品與雜項", quantity: 1, unit: "式", unitPrice: 150000, budget: 150000, description: "" },
    ]);

  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("monthly_reports");
    if (saved) {
      setMonthlyReports(JSON.parse(saved));
    } else {
      // Default mock data
      const defaultHistory: MonthlyReport[] = [
        {
          id: "hist-1",
          projectId: "PJ001",
          month: "2025-12",
          status: "已核定",
          submittedAt: "2025-12-28 14:30",
          items: [
            { id: "h1-1", budgetItemId: "i1", content: "完成使用者訪談與需求規格書彙整", expense: 8000 }
          ]
        }
      ];
      setMonthlyReports(defaultHistory);
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    if (monthlyReports.length > 0) {
      localStorage.setItem("monthly_reports", JSON.stringify(monthlyReports));
    }
  }, [monthlyReports]);

  const addMonthlyReport = (report: MonthlyReport) => {
    setMonthlyReports(prev => [report, ...prev]);
  };

    const updateMonthlyReport = (updatedReport: MonthlyReport) => {
      setMonthlyReports(prev => prev.map(r => r.id === updatedReport.id ? updatedReport : r));
    };

    const deleteMonthlyReport = (id: string) => {
      setMonthlyReports(prev => prev.filter(r => r.id !== id));
      // Force immediate save to localStorage for consistency
      const current = JSON.parse(localStorage.getItem("monthly_reports") || "[]");
      const updated = current.filter((r: any) => r.id !== id);
      localStorage.setItem("monthly_reports", JSON.stringify(updated));
    };

    const getSpentAmount = (budgetItemId: string) => {
    return monthlyReports
      .filter(r => r.status === "已核定" || r.status === "待審核") // Cumulative spent includes pending
      .reduce((total, report) => {
        const itemExpense = report.items
          .filter(i => i.budgetItemId === budgetItemId)
          .reduce((sum, item) => sum + (Number(item.expense) || 0), 0);
        return total + itemExpense;
      }, 0);
  };

  return (
    <DataContext.Provider value={{ 
      projects, 
      budgetItems, 
      monthlyReports, 
      addMonthlyReport, 
      updateMonthlyReport,
      deleteMonthlyReport,
      getSpentAmount 
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

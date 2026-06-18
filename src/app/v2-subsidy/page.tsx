"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, Clock, AlertCircle, Check, FileEdit, Save, X, ListTodo } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const projects = [
  { id: "PJ001", name: "原鄉文化傳承計畫" },
  { id: "PJ002", name: "有機農業推廣計畫" },
  { id: "PJ003", name: "偏鄉教育支援專案" },
];

const initialPayments = [
  { 
    id: 1, 
    projectId: "PJ001", 
    phase: "第一期", 
    amount: 500000, 
    status: "paid", 
    date: "2026-01-15", 
    docSentDate: "2026-01-10", 
    entryDate: "2026-01-15", 
    mocReviewStatus: "已完成", 
    associationStatus: "已完成",
    remarks: "首期款項已全數撥付",
    docs: [
      { id: "d1", name: "補助契約書", checked: true },
      { id: "d2", name: "切結書", checked: true },
      { id: "d3", name: "第一期款收據", checked: true }
    ]
  },
  { 
    id: 2, 
    projectId: "PJ001", 
    phase: "第二期", 
    amount: 800000, 
    status: "approved", 
    date: "2026-02-20", 
    docSentDate: "", 
    entryDate: "", 
    mocReviewStatus: "—", 
    associationStatus: "未完成",
    remarks: "",
    docs: [
      { id: "d4", name: "進度報告", checked: true },
      { id: "d5", name: "經費執行明細表", checked: true },
      { id: "d6", name: "第二期款收據", checked: false }
    ]
  }
];

export default function V2SubsidyPage() {
  const { profile, isAdmin, isOperator } = useAuth();
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [payments, setPayments] = useState(initialPayments);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<any>({});

  const filteredPayments = payments.filter(p => p.projectId === selectedProject);
  const totalAmount = filteredPayments.reduce((acc, p) => acc + p.amount, 0);
  const paidAmount = filteredPayments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const paidRate = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  const handleSave = () => {
    setPayments(prev => prev.map(p => p.id === editingId ? { ...p, ...editValues } : p));
    setEditingId(null);
    toast.success("撥付資訊已更新 (V2)");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between animate-in fade-in slide-in-from-top duration-500">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">🚀 強制更新路徑 (V2)</h2>
            <p className="text-xs text-blue-100 opacity-90">如果您看到此橫幅，代表您正處於最新版本的路徑中。</p>
          </div>
        </div>
        <Badge variant="outline" className="text-white border-white/50 bg-white/10">v1.1.2</Badge>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">撥付進度追蹤 (V2)</h1>
        {isAdmin && <Button className="bg-blue-600">新增撥付記錄</Button>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <span className="font-bold text-blue-900 whitespace-nowrap">專案：</span>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-full bg-blue-50/50 border-blue-200">
                  <SelectValue placeholder="請選擇專案" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">累計撥付率</p>
              <div className="flex items-center gap-4 w-full px-6">
                <p className="text-3xl font-black text-blue-700">{paidRate.toFixed(1)}%</p>
                <Progress value={paidRate} className="h-3 flex-1 bg-white border border-blue-100" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-2 border-blue-100">
        <CardHeader className="bg-blue-50/50 border-b">
          <CardTitle className="text-blue-900">撥付進度總覽 (最新版本)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600/5 hover:bg-blue-600/5">
                <TableHead className="font-bold text-blue-900">撥款期數</TableHead>
                <TableHead className="font-bold text-blue-900">檢核文件</TableHead>
                <TableHead className="text-center font-bold text-blue-900">原促會</TableHead>
                <TableHead className="text-center font-bold text-blue-900">文化部</TableHead>
                <TableHead className="text-center font-bold text-blue-900">公文日期</TableHead>
                <TableHead className="text-center font-bold text-blue-900">入帳日期</TableHead>
                <TableHead className="text-right font-bold text-blue-900">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((p) => (
                <TableRow key={p.id} className="hover:bg-blue-50/30 transition-colors">
                  <TableCell className="font-bold text-zinc-900">{p.phase}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {p.docs.map(doc => (
                        <div key={doc.id} className="flex items-center gap-2 text-xs">
                          <div className={`w-3 h-3 rounded-sm ${doc.checked ? 'bg-blue-600' : 'bg-zinc-200'}`} />
                          <span className={doc.checked ? 'text-zinc-900' : 'text-zinc-400'}>{doc.name}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={p.associationStatus === "已完成" ? "bg-blue-600" : "bg-zinc-400"}>
                      {p.associationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={p.mocReviewStatus === "已完成" ? "border-blue-600 text-blue-600" : "text-zinc-400"}>
                      {p.mocReviewStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-mono text-sm">{p.docSentDate || "—"}</TableCell>
                  <TableCell className="text-center font-mono text-sm">{p.entryDate || "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600 font-bold hover:bg-blue-50">
                      <FileEdit className="h-4 w-4 mr-1" />
                      編輯
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

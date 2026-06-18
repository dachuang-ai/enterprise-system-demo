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

const paymentStatus = {
  pending: { label: "待申請", color: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  applied: { label: "已申請", color: "bg-blue-100 text-blue-600 border-blue-200" },
  approved: { label: "已核定", color: "bg-amber-100 text-amber-600 border-amber-200" },
  paid: { label: "已撥付", color: "bg-green-100 text-green-600 border-green-200" },
};

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
  },
  { 
    id: 3, 
    projectId: "PJ001", 
    phase: "第三期", 
    amount: 700000, 
    status: "pending", 
    date: "-", 
    docSentDate: "", 
    entryDate: "", 
    mocReviewStatus: "—", 
    associationStatus: "未完成",
    remarks: "",
    docs: [
      { id: "d7", name: "結案報告", checked: false },
      { id: "d8", name: "全案經費執行表", checked: false },
      { id: "d9", name: "第三期款收據", checked: false }
    ]
  },
];

export default function SubsidyPaymentsPage() {
  const { profile, isAdmin, isOperator } = useAuth();
  // Force default to PJ001 if profile doesn't have project_id
  const defaultProjectId = (isOperator && profile?.project_id) ? profile.project_id : projects[0].id;
  const [selectedProject, setSelectedProject] = useState(defaultProjectId);
  const [payments, setPayments] = useState(initialPayments);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<any>({});

  // Ensure selectedProject is valid
  useEffect(() => {
    if (isOperator && profile?.project_id) {
      setSelectedProject(profile.project_id);
    }
  }, [profile, isOperator]);

  const filteredPayments = payments.filter(p => p.projectId === selectedProject);
  
  const totalAmount = filteredPayments.reduce((acc, p) => acc + p.amount, 0);
  const paidAmount = filteredPayments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const paidRate = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  const startEditing = (payment: any) => {
    setEditingId(payment.id);
    setEditValues({ ...payment });
  };

  const handleSave = () => {
    setPayments(prev => prev.map(p => p.id === editingId ? { ...p, ...editValues } : p));
    setEditingId(null);
    toast.success("撥付資訊已更新");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">撥付進度追蹤</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-600 border-blue-100">
              系統版本: v2.0
            </Badge>
            <span className="text-[10px] text-zinc-400">最後更新: 2026-01-30</span>
          </div>
        </div>
        {isAdmin && (
          <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            新增撥付記錄
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-medium text-zinc-700 whitespace-nowrap text-sm">選擇專案：</span>
              <Select 
                value={selectedProject} 
                onValueChange={setSelectedProject}
              >
                <SelectTrigger className="w-full bg-white">
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

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <p className="text-sm text-zinc-500 font-medium">累計撥付率</p>
              <div className="flex items-center gap-4 w-full px-6">
                <p className="text-3xl font-bold text-blue-600">{paidRate.toFixed(1)}%</p>
                <Progress value={paidRate} className="h-3 flex-1 bg-zinc-100" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-500">待申請期數</p>
                <p className="text-2xl font-bold">{filteredPayments.filter(p => p.status === 'pending').length} 筆</p>
              </div>
              <div className="rounded-full bg-zinc-100 p-2 text-zinc-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-500">核定中期數</p>
                <p className="text-2xl font-bold">{filteredPayments.filter(p => p.status === 'approved').length} 筆</p>
              </div>
              <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-500">已撥付期數</p>
                <p className="text-2xl font-bold">{filteredPayments.filter(p => p.status === 'paid').length} 筆</p>
              </div>
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <Check className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>撥付進度總覽</CardTitle>
          <Button variant="outline" size="sm">匯出報表</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
                <TableRow className="bg-zinc-50 border-b-2">
                  <TableHead className="w-[120px] font-bold text-zinc-700">撥款期數</TableHead>
                  <TableHead className="min-w-[220px] font-bold text-zinc-700">
                    <div className="flex items-center gap-2">
                      <ListTodo className="h-4 w-4 text-blue-600" />
                      檢核文件確認
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-bold text-zinc-700">原促會檢核</TableHead>
                  <TableHead className="text-center font-bold text-zinc-700">文化部檢核</TableHead>
                  <TableHead className="text-center font-bold text-zinc-700">公文寄出日期</TableHead>
                  <TableHead className="text-left font-bold text-zinc-700">備註</TableHead>
                  <TableHead className="text-center font-bold text-zinc-700">入帳日期</TableHead>
                  <TableHead className="text-right font-bold text-zinc-700">操作</TableHead>
                </TableRow>
            </TableHeader>
                  <TableBody>
                    {filteredPayments.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.phase}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1.5 p-2 bg-zinc-50/50 rounded-md border border-zinc-100">
                            {editingId === p.id ? (
                              editValues.docs.map((doc: any, idx: number) => (
                                <div key={doc.id} className="flex items-center gap-2">
                                  <Checkbox 
                                    id={doc.id} 
                                    checked={doc.checked} 
                                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                    onCheckedChange={(checked) => {
                                      const newDocs = [...editValues.docs];
                                      newDocs[idx] = { ...doc, checked: !!checked };
                                      setEditValues({ ...editValues, docs: newDocs });
                                    }}
                                  />
                                  <Label htmlFor={doc.id} className="text-xs font-medium cursor-pointer text-zinc-700">{doc.name}</Label>
                                </div>
                              ))
                            ) : (
                              p.docs.map((doc) => (
                                <div key={doc.id} className="flex items-center gap-2">
                                  <div className={`h-4 w-4 rounded border flex items-center justify-center ${doc.checked ? 'bg-green-100 border-green-200 text-green-600' : 'bg-zinc-100 border-zinc-200 text-zinc-400'}`}>
                                    {doc.checked && <Check className="h-3 w-3" />}
                                  </div>
                                  <span className={`text-xs ${doc.checked ? 'text-zinc-900 font-medium' : 'text-zinc-400'}`}>{doc.name}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {editingId === p.id ? (
                            <Select 
                              value={editValues.associationStatus} 
                              onValueChange={(val) => setEditValues({ ...editValues, associationStatus: val })}
                            >
                              <SelectTrigger className="h-8 w-28 mx-auto">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="已完成">已完成</SelectItem>
                                <SelectItem value="未完成">未完成</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge 
                              variant="outline" 
                              className={
                                p.associationStatus === "已完成" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                "bg-zinc-50 text-zinc-600 border-zinc-100"
                              }
                            >
                              {p.associationStatus || "未完成"}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingId === p.id ? (
                            <Select 
                              value={editValues.mocReviewStatus} 
                              onValueChange={(val) => setEditValues({ ...editValues, mocReviewStatus: val })}
                            >
                              <SelectTrigger className="h-8 w-28 mx-auto">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="—">—</SelectItem>
                                <SelectItem value="已完成">已完成</SelectItem>
                                <SelectItem value="進行中">進行中</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge 
                              variant="secondary" 
                              className={
                                p.mocReviewStatus === "已完成" ? "bg-green-50 text-green-600 border-green-100" :
                                p.mocReviewStatus === "進行中" ? "bg-amber-50 text-amber-600 border-amber-100" :
                                "bg-zinc-50 text-zinc-600 border-zinc-100"
                              }
                            >
                              {p.mocReviewStatus || "—"}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingId === p.id ? (
                            <Input 
                              type="date" 
                              value={editValues.docSentDate} 
                              onChange={(e) => setEditValues({ ...editValues, docSentDate: e.target.value })}
                              className="h-8 w-32 mx-auto"
                            />
                          ) : (
                            <span className="text-zinc-500 text-sm">{p.docSentDate || "-"}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-left">
                          {editingId === p.id ? (
                            <Input 
                              value={editValues.remarks} 
                              onChange={(e) => setEditValues({ ...editValues, remarks: e.target.value })}
                              placeholder="備註說明"
                              className="h-8 w-full min-w-[120px]"
                            />
                          ) : (
                            <span className="text-sm text-zinc-500">{p.remarks || "-"}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingId === p.id ? (
                            <Input 
                              type="date" 
                              value={editValues.entryDate} 
                              onChange={(e) => setEditValues({ ...editValues, entryDate: e.target.value })}
                              className="h-8 w-32 mx-auto"
                            />
                          ) : (
                            <span className="text-zinc-500 text-sm">{p.entryDate || "-"}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                    {editingId === p.id ? (
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} className="h-8 w-8 p-0">
                          <X className="h-4 w-4 text-zinc-400" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleSave} className="h-8 w-8 p-0">
                          <Save className="h-4 w-4 text-blue-600" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => startEditing(p)} className="flex gap-1 ml-auto">
                        <FileEdit className="h-4 w-4" />
                        編輯
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isOperator && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 flex items-center gap-2 text-xs text-blue-700">
              <AlertCircle className="h-4 w-4" />
              <span>操作人員權限：僅限編輯「公文寄出日期」與「入帳日期」。</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

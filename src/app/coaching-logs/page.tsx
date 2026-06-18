"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, MapPin, Calendar, User, FileEdit, Link2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

const mockLogs = [
  { id: 1, projectId: "PJ001", projectName: "114年度文化部計畫 - 數位轉型實務", date: "2026-01-25", coach: "王專家", status: "已完成", seq: "001" },
  { id: 2, projectId: "PJ001", projectName: "114年度文化部計畫 - 數位轉型實務", date: "2026-01-20", coach: "李顧問", status: "草稿", seq: "002" },
  { id: 3, projectId: "PJ002", projectName: "文化平權推廣計畫", date: "2026-01-15", coach: "張老師", status: "已完成", seq: "001" },
];

export default function CoachingLogsPage() {
  const { profile, isAdmin, isOperator } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.projectName.includes(searchTerm) || log.coach.includes(searchTerm);
    if (isOperator) {
      return matchesSearch && log.projectId === profile?.project_id;
    }
    return matchesSearch;
  });

  const getGuidanceId = (log: any) => `${log.projectId}-${log.seq}`;

  const handleOpenForm = (id: string) => {
    toast.info(`正在開啟輔導紀錄表: ${id}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">輔導紀錄管理</h1>
        {isAdmin && (
          <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            新增輔導紀錄
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="搜尋計畫名稱、專家或日期..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">進階篩選</Button>
      </div>

      {isOperator && (
        <div className="p-3 bg-blue-50 rounded-md border border-blue-100 flex items-center gap-2 text-xs text-blue-700">
          <AlertCircle className="h-4 w-4" />
          <span>操作人員權限：僅顯示與計畫編號 {profile?.project_id} 相關的輔導紀錄。</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>輔導紀錄列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50">
                <TableHead>序號 (計畫編號+流水號)</TableHead>
                <TableHead>計畫名稱</TableHead>
                <TableHead>輔導日期</TableHead>
                <TableHead>專家/顧問</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge variant="outline" className="font-mono bg-zinc-50 border-zinc-200">
                      {getGuidanceId(log)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.projectName}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.coach}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === '已完成' ? 'default' : 'secondary'}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleOpenForm(getGuidanceId(log))} 
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      查看詳情
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-zinc-500">
                    尚無符合條件的輔導紀錄
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

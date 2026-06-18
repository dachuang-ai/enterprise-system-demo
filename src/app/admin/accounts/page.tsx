"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { UserPlus, Loader2, Shield, User, Building2, Mail } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AdminAccountsPage() {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [accounts, setAccounts] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    email: "",
    projectId: "",
    projectName: "",
    role: "OPERATOR" as "ADMIN" | "OPERATOR"
  });

  const fetchAccounts = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/accounts");
      const data = await res.json();
      if (data.profiles) {
        setAccounts(data.profiles);
      }
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAccounts();
    }
  }, [isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      toast.success("帳號已建立並送出邀請郵件");
      setFormData({ email: "", projectId: "", projectName: "", role: "OPERATOR" });
      fetchAccounts();
    } catch (error: any) {
      toast.error(error.message || "建立帳號失敗");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return <div className="p-8 text-center">您沒有權限訪問此頁面</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">帳號權限管理</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>建立新帳號</CardTitle>
              <CardDescription>設定計畫編號與聯絡人 Email，系統將自動寄送邀請信，聯絡人可透過郵件設定初始密碼。</CardDescription>
            </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">權限角色</Label>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant={formData.role === 'OPERATOR' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setFormData({...formData, role: 'OPERATOR'})}
                  >
                    <User className="mr-2 h-4 w-4" />
                    操作員
                  </Button>
                  <Button 
                    type="button" 
                    variant={formData.role === 'ADMIN' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setFormData({...formData, role: 'ADMIN'})}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    管理員
                  </Button>
                </div>
              </div>

              {formData.role === 'OPERATOR' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="projectId">計畫編號</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                      <Input 
                        id="projectId" 
                        placeholder="例如: PJ001" 
                        value={formData.projectId}
                        onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectName">計畫名稱</Label>
                    <Input 
                      id="projectName" 
                      placeholder="請輸入完整計畫名稱" 
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">聯絡人 Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="example@email.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><UserPlus className="mr-2 h-4 w-4" /> 建立帳號</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>帳號列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>計畫</TableHead>
                  <TableHead>建立日期</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fetching ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin text-zinc-400" />
                    </TableCell>
                  </TableRow>
                ) : accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.email || '邀請中...'}</TableCell>
                    <TableCell>
                      <Badge variant={account.role === 'ADMIN' ? 'default' : 'secondary'}>
                        {account.role === 'ADMIN' ? '管理員' : '操作員'}
                      </Badge>
                    </TableCell>
                    <TableCell>{account.projects?.name || '-'}</TableCell>
                    <TableCell className="text-zinc-500 text-xs">
                      {new Date(account.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
                {!fetching && accounts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-zinc-400">尚無帳號資料</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

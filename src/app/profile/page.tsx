"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { KeyRound, Loader2, UserCircle, Shield, Building2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { user, profile, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("密碼不一致");
      return;
    }
    if (password.length < 6) {
      toast.error("密碼長度至少需 6 個字元");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("密碼已成功更新");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.message || "密碼更新失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">個人帳號設定</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>帳號資訊</CardTitle>
          <CardDescription>您的基本帳號資訊與權限。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-lg">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-white text-xl ${isAdmin ? 'bg-blue-600' : 'bg-emerald-600'}`}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">{user?.email}</span>
              <span className="text-zinc-500 flex items-center gap-1 text-sm">
                {isAdmin ? (
                  <><Shield className="h-4 w-4" /> 管理員權限</>
                ) : (
                  <><UserCircle className="h-4 w-4" /> 操作人員權 her 限</>
                )}
              </span>
            </div>
          </div>

          {!isAdmin && profile?.project_id && (
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Building2 className="h-5 w-5 text-zinc-400" />
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 font-medium">所屬計畫編號</span>
                <span className="font-medium">{profile.project_id}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>修改密碼</CardTitle>
          <CardDescription>為了安全起見，請定期更換您的密碼。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">新密碼</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input 
                  id="new-password" 
                  type="password"
                  placeholder="請輸入新密碼" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">確認新密碼</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input 
                  id="confirm-password" 
                  type="password"
                  placeholder="請再次輸入新密碼" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "更新密碼"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

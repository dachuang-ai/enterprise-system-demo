"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { KeyRound, Mail, Loader2, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("登入成功");
    } catch (error: any) {
      toast.error(error.message || "登入失敗");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("請輸入電子郵件");
      return;
    }
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("密碼重設郵件已寄出，請檢查您的信箱");
      setShowForgotPassword(false);
    } catch (error: any) {
      toast.error(error.message || "重設失敗");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
        <Card className="w-full max-w-md border-t-4 border-blue-600">
          <div className="bg-blue-600 text-white text-[10px] py-1 px-3 text-center font-mono">
            BUILD_ID: 20260130-V2-FORCE-REFRESH
          </div>
          <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-600">文化部計畫專案管理系統 (已更新 v1.1)</CardTitle>
          <CardDescription className="text-center">
            {showForgotPassword ? "重設您的密碼" : "請登入以繼續使用系統"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showForgotPassword ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">電子郵件</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密碼</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                  >
                    忘記密碼？
                  </button>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "登入"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">電子郵件</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit" disabled={resetLoading}>
                {resetLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "寄送重設郵件"}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                type="button"
                onClick={() => setShowForgotPassword(false)}
                disabled={resetLoading}
              >
                返回登入
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 border-t p-4 bg-zinc-50/50">
          <p className="text-sm text-center text-zinc-600">
            還沒有帳號嗎？{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:underline">
              立即註冊
            </Link>
          </p>
          <p className="text-xs text-center text-zinc-500 pt-2 border-t w-full">
            © 2026 ATIPD 專案管理系統
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

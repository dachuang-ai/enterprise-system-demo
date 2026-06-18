"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { KeyRound, Mail, Loader2 } from "lucide-react";

export default function V2LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
      toast.success("登入成功 (V2)");
    } catch (error: any) {
      toast.error(error.message || "登入失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50/50 p-4">
      <div className="mb-8 p-4 bg-blue-600 text-white rounded-lg shadow-lg animate-bounce font-bold">
        🚀 系統已更新 v1.1 - 這是強制更新頁面 (V2-LOGIN)
      </div>
      
      <Card className="w-full max-w-md border-2 border-blue-600 shadow-xl">
        <div className="bg-blue-600 text-white text-[10px] py-1 px-3 text-center font-mono">
          REFRESH_TAG: 20260130-V2-PATH-BYPASS
        </div>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-600">文化部計畫專案管理系統 (已更新 v1.1)</CardTitle>
          <CardDescription className="text-center font-medium text-blue-800">
            {showForgotPassword ? "重設您的密碼" : "請由新網址登入以確保版本正確"}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg" type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "登入系統 (V2)"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 border-t p-4 bg-white">
          <p className="text-sm text-center text-zinc-600">
            若仍看到舊版，請清除瀏覽器快取。
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

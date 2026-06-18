"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { ArrowRight, RefreshCw, Loader2 } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-8 p-12 bg-white rounded-2xl shadow-xl border-2 border-blue-100">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold animate-bounce">
          <RefreshCw className="h-4 w-4" />
          系統已更新 v1.1
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            文化部計畫專案管理系統
          </h1>
          <p className="text-xl text-zinc-600">
            如果您在舊網址看不到更改，請點擊下方「新版入口」以確保瀏覽正確版本。
          </p>
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-500 font-mono">
            目前部署網址：<span className="text-blue-600 font-bold">vk48brpx1v7a.space.minimax.io</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/v2-login" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
          >
            新版登入入口 (強制刷新)
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <Link 
            href={user ? "/subsidy-payments" : "/login"} 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-900 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all"
          >
            {user ? "進入系統" : "一般登入入口"}
          </Link>
        </div>

        <div className="pt-8 border-t">
          <p className="text-sm text-zinc-500">
            如遇版本問題，請按 <kbd className="px-2 py-1 bg-zinc-100 border rounded text-xs font-sans">Ctrl + F5</kbd> 或使用無痕模式
          </p>
        </div>
      </div>
    </div>
  );
}

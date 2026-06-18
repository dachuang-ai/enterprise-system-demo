"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    DollarSign,
    TrendingUp,
    ClipboardCheck,
    BarChart3,
    PieChart,
    Users,
    Menu,
    X,
    ShieldCheck,
    UserCircle,
    Settings,
    LogOut,
    UserPlus
  } from "lucide-react";
  import { useState } from "react";
  import { Button } from "@/components/ui/button";
  import { useAuth } from "@/lib/auth-context";
  import { useRouter } from "next/navigation";
  
    const navigation = [
      { name: "儀表板", href: "/dashboard", icon: LayoutDashboard },
      { name: "計畫資料", href: "/project-data", icon: FileText },
      { name: "月報表", href: "/monthly-reports", icon: ClipboardCheck },
      { name: "經費撥付", href: "/subsidy-payments", icon: TrendingUp },
      { name: "輔導紀錄", href: "/coaching-logs", icon: Users },
    ];
  
  export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const { user, profile, isAdmin, signOut } = useAuth();
    const router = useRouter();
  
    const handleSignOut = async () => {
      await signOut();
      router.push("/login");
    };
  
    return (
      <>
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-zinc-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          !isOpen && "-translate-x-full lg:hidden"
        )}>
          <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-800">
            <span className="text-xl font-bold tracking-wider text-blue-400">文化部原村計畫管考系統</span>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-white" : "text-zinc-400 group-hover:text-white"
                  )} />
                  {item.name}
                </Link>
              );
            })}

            {isAdmin && (
              <>
                <div className="pt-4 pb-2 px-3 text-[10px] uppercase tracking-wider text-zinc-500 font-bold">管理專區</div>
                <Link
                  href="/admin/accounts"
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === "/admin/accounts"
                      ? "bg-blue-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  )}
                >
                  <UserPlus className={cn(
                    "h-5 w-5 shrink-0",
                    pathname === "/admin/accounts" ? "text-white" : "text-zinc-400 group-hover:text-white"
                  )} />
                  帳號權限管理
                </Link>
              </>
            )}
          </nav>
          
          <div className="p-4 space-y-4 border-t border-zinc-800">
            <Link 
              href="/profile"
              className={cn(
                "flex items-center gap-3 px-3 py-2 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors",
                pathname === "/profile" && "ring-1 ring-blue-500"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center font-bold text-white shrink-0",
                isAdmin ? "bg-blue-600" : "bg-emerald-600"
              )}>
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">{user?.email?.split('@')[0]}</span>
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  {isAdmin ? (
                    <><ShieldCheck className="h-3 w-3" /> 管理員</>
                  ) : (
                    <><UserCircle className="h-3 w-3" /> 操作人員</>
                  )}
                </span>
              </div>
              <Settings className="h-4 w-4 ml-auto text-zinc-500" />
            </Link>

            <Button 
              variant="ghost" 
              className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-400/10"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              登出系統
            </Button>
          </div>
        </div>
      </>
    );
  }



"use client";

import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { DataProvider } from "@/lib/data-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname() || "";
  const router = useRouter();

  // Normalize pathname to remove trailing slash for comparison
  const normalizedPathname = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  const publicRoutes = ["/login", "/register", "/reset-password", "/v2-login", "/v2-subsidy"];
  const isPublic = publicRoutes.includes(normalizedPathname);

  // Force V2 routes to bypass ALL logic to prevent blank screens
  const isV2 = normalizedPathname.startsWith("/v2-");

  console.log("[AuthGuard] pathname:", pathname, "normalized:", normalizedPathname, "user:", !!user, "isV2:", isV2, "isPublic:", isPublic);

  useEffect(() => {
    if (!loading && !isV2) {
      if (!user && !isPublic) {
        console.log("[AuthGuard] Not logged in and not public, redirecting to /login");
        router.push("/login");
      } else if (user && normalizedPathname === "/login") {
        console.log("[AuthGuard] Logged in and on /login, redirecting to /");
        router.push("/");
      }
    }
  }, [user, loading, isPublic, isV2, normalizedPathname, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-blue-600 animate-pulse">系統載入中...</p>
        </div>
      </div>
    );
  }

  // CRITICAL: Mandatory bypass for V2 pages
  if (isV2) {
    return <>{children}</>;
  }

  if (!user && !isPublic) {
    return null;
  }

  if (user && normalizedPathname === "/login") {
    return null;
  }

  if (isPublic) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <AuthGuard>{children}</AuthGuard>
      <Toaster />
    </DataProvider>
  );
}

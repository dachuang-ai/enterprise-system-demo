import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout-shell";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATIPD 專案管理系統 (已更新 v1.1)",
  description: "文化部專案管理與田間訪視系統",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full bg-zinc-50`}>
        <div className="bg-blue-600 text-white text-xs py-1 px-4 text-center font-bold sticky top-0 z-[100] shadow-md animate-pulse">
          系統已全面更新至 v1.1 (包含權限優化與報表調整) - 若看到舊版請按 Ctrl+F5
        </div>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <LayoutShell>{children}</LayoutShell>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

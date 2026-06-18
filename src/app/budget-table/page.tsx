"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BudgetTableRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/project-data");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
}

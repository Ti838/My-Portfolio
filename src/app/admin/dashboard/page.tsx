"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Force redirect to Home for Visual Editor
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
         <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
         <p className="text-slate-500 font-medium">Launching Visual Editor...</p>
      </div>
    </div>
  );
}

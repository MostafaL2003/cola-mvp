"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <main className="min-h-screen w-full bg-white">{children}</main>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

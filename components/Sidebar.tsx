"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Section 1: Main navigation items
  const mainNavItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      isActive: (path: string) =>
        path === "/" ||
        (!path.startsWith("/machines") &&
          !path.startsWith("/planning") &&
          !path.startsWith("/reports") &&
          !path.startsWith("/settings") &&
          !path.startsWith("/login")),
    },
    {
      label: "Machines",
      href: "/machines",
      icon: Cpu,
      isActive: (path: string) => path.startsWith("/machines"),
    },
    {
      label: "Planning",
      href: "/planning",
      icon: CalendarDays,
      isActive: (path: string) => path.startsWith("/planning"),
    },
    {
      label: "Reports",
      href: "/reports",
      icon: BarChart3,
      isActive: (path: string) => path.startsWith("/reports"),
    },
  ];

  // Section 2: Settings & Logout (positioned a bit down from the main section)
  const secondaryNavItems = [
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      isActive: (path: string) => path.startsWith("/settings"),
    },
    {
      label: "Logout",
      href: "/login",
      icon: LogOut,
      isActive: () => false,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col w-full h-full bg-[#F40009] text-white select-none">
      {/* Top Header: MES Logo + "MES" text next to it (Centered) */}
      <div className="h-20 px-6 flex items-center justify-center gap-3.5 border-b border-white/15 shrink-0">
        <Image
          src="/factoryIcon.svg"
          alt="MES Factory Logo"
          width={32}
          height={24}
          className="w-8 h-auto object-contain"
          priority
        />
        <span className="font-montserrat font-extrabold text-2xl tracking-wider text-white">
          MES
        </span>
      </div>

      {/* Navigation Body */}
      <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto">
        {/* Section 1: Main navigation (Dashboard, Machines, Planning, Reports) */}
        <div className="space-y-2">
          {mainNavItems.map((item) => {
            const active = item.isActive(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                prefetch={true}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-montserrat transition-all duration-200 ease-in-out cursor-pointer ${
                  active
                    ? "bg-white/20 text-white font-bold shadow-sm"
                    : "text-white/80 font-medium hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Section 2: Settings & Logout (spaced a bit further down from the main section) */}
        <div className="mt-10 pt-6 border-t border-white/15 space-y-2">
          {secondaryNavItems.map((item) => {
            const active = item.isActive(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                prefetch={true}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-montserrat transition-all duration-200 ease-in-out cursor-pointer ${
                  active
                    ? "bg-white/20 text-white font-bold shadow-sm"
                    : "text-white/80 font-medium hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Section 3: Lowest point - Coca-Cola Logo taking full width of sidebar */}
      <div className="mt-auto px-2 py-4 w-full flex items-center justify-center shrink-0 border-t border-white/10">
        <Image
          src="/coca-cola-white.svg"
          alt="Coca-Cola"
          width={280}
          height={110}
          className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar - Full height, pure red background without any trailing border line */}
      <aside className="hidden md:flex w-72 shrink-0 h-full bg-[#F40009] z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Top Header with Hamburger Toggle */}
      <div className="md:hidden flex items-center justify-between px-5 py-3.5 bg-[#F40009] text-white z-40 shrink-0">
        <div className="flex items-center gap-2.5">
          <Image
            src="/factoryIcon.svg"
            alt="MES Factory Logo"
            width={26}
            height={20}
            className="w-6.5 h-auto object-contain"
          />
          <span className="font-montserrat font-extrabold text-xl tracking-wider text-white">
            MES
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 bg-[#F40009]">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

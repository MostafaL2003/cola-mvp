"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  SlidersHorizontal,
  Rocket,
  Calendar,
  Factory,
} from "lucide-react";
import { FactoryData, LineData } from "@/types/mes";

export interface TopBarProps {
  factories?: FactoryData[];
  currentFactoryId?: string;
  lines?: LineData[];
  currentLineId?: string;
}

function TopBarContent({
  factories = [],
  currentFactoryId,
  lines,
  currentLineId,
}: TopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [factoryDropdownOpen, setFactoryDropdownOpen] = useState(false);
  const [lineDropdownOpen, setLineDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lineDropdownRef = useRef<HTMLDivElement>(null);

  const dateParam = searchParams.get("date");
  const activeDateFilter: "Today" | "Yesterday" | "Last Week" =
    dateParam === "Yesterday" ||
    dateParam === "Last Week" ||
    dateParam === "Today"
      ? dateParam
      : "Today";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFactoryDropdownOpen(false);
      }
      if (
        lineDropdownRef.current &&
        !lineDropdownRef.current.contains(event.target as Node)
      ) {
        setLineDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentFactory = factories.find((f) => f.id === currentFactoryId);
  const selectedLabel = currentFactory ? currentFactory.name : "All Factories";

  const availableLines: LineData[] =
    lines && lines.length > 0 ? lines : currentFactory?.lines || [];
  const currentLine = availableLines.find((l) => l.id === currentLineId);
  const lineSelectedLabel = currentLine ? currentLine.name : "Line Name";

  const handleSelectFactory = (factoryId?: string) => {
    setFactoryDropdownOpen(false);
    setLineDropdownOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    if (pathname.startsWith("/machines") || pathname.startsWith("/planning")) {
      if (factoryId) {
        params.set("factoryId", factoryId);
        const targetFactory = factories.find((f) => f.id === factoryId);
        if (targetFactory && targetFactory.lines.length > 0) {
          params.set("lineId", targetFactory.lines[0].id);
        } else {
          params.delete("lineId");
        }
      } else {
        params.delete("factoryId");
        params.delete("lineId");
      }
      const qs = params.toString() ? `?${params.toString()}` : "";
      router.push(`${pathname}${qs}`);
      return;
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";
    if (!factoryId) {
      router.push(`/${queryString}`);
    } else {
      router.push(`/${factoryId}${queryString}`);
    }
  };

  const handleSelectLine = (lineId?: string) => {
    setLineDropdownOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    if (pathname.startsWith("/machines") || pathname.startsWith("/planning")) {
      if (lineId) {
        params.set("lineId", lineId);
      } else {
        params.delete("lineId");
      }
      const qs = params.toString() ? `?${params.toString()}` : "";
      router.push(`${pathname}${qs}`);
      return;
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";
    if (!lineId) {
      router.push(`/${currentFactoryId}${queryString}`);
    } else {
      router.push(`/${currentFactoryId}/${lineId}${queryString}`);
    }
  };

  const handleDateFilterChange = (
    filter: "Today" | "Yesterday" | "Last Week",
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
      <div className="flex items-center gap-2.5">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setFactoryDropdownOpen(!factoryDropdownOpen)}
            className="bg-brand-navy hover:bg-brand-navy/90 text-white px-3.5 py-2 rounded-lg flex items-center gap-2.5 text-sm font-montserrat font-medium shadow-sm transition-colors cursor-pointer"
          >
            <Factory className="w-4 h-4 text-white/90 shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-[240px]">
              {selectedLabel}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-white/80 transition-transform duration-200 ${
                factoryDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {factoryDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                type="button"
                onClick={() => handleSelectFactory(undefined)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                  !currentFactoryId
                    ? "font-semibold text-brand-navy bg-slate-50"
                    : "text-slate-700"
                }`}
              >
                <span>All Factories</span>
                {!currentFactoryId && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F40009]" />
                )}
              </button>
              <div className="h-px bg-slate-100 my-1" />
              {factories.map((f) => {
                const isSelected = f.id === currentFactoryId;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleSelectFactory(f.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                      isSelected
                        ? "font-semibold text-brand-navy bg-slate-50"
                        : "text-slate-700"
                    }`}
                  >
                    <span className="truncate">{f.name}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F40009]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {currentFactoryId && (
          <div className="relative" ref={lineDropdownRef}>
            <button
              type="button"
              onClick={() => setLineDropdownOpen(!lineDropdownOpen)}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-2 text-sm font-montserrat font-medium shadow-sm transition-colors cursor-pointer ${
                currentLineId
                  ? "bg-brand-navy hover:bg-brand-navy/90 text-white"
                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80"
              }`}
            >
              <SlidersHorizontal
                className={`w-4 h-4 shrink-0 ${
                  currentLineId ? "text-white/90" : "text-slate-500"
                }`}
              />
              <span className="truncate max-w-[150px] sm:max-w-[200px]">
                {lineSelectedLabel}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  currentLineId ? "text-white/80" : "text-slate-400"
                } ${lineDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {lineDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  type="button"
                  onClick={() => handleSelectLine(undefined)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                    !currentLineId
                      ? "font-semibold text-brand-navy bg-slate-50"
                      : "text-slate-700"
                  }`}
                >
                  <span>All Lines (Factory Overview)</span>
                  {!currentLineId && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F40009]" />
                  )}
                </button>
                <div className="h-px bg-slate-100 my-1" />
                {availableLines.map((line) => {
                  const isSelected = line.id === currentLineId;
                  return (
                    <button
                      key={line.id}
                      type="button"
                      onClick={() => handleSelectLine(line.id)}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        isSelected
                          ? "font-semibold text-brand-navy bg-slate-50"
                          : "text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            line.status === "running"
                              ? "bg-[#20C997]"
                              : line.status === "downtime"
                              ? "bg-[#F40009]"
                              : "bg-[#CBD5E1]"
                          }`}
                        />
                        <span className="truncate">{line.name}</span>
                      </div>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F40009] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          aria-label="Quick action"
          className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-lg transition-colors cursor-pointer"
        >
          <Rocket className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
        {(["Today", "Yesterday", "Last Week"] as const).map((filter) => {
          const isActive = activeDateFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => handleDateFilterChange(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-montserrat transition-all cursor-pointer ${
                isActive
                  ? "bg-brand-navy text-white shadow-sm font-semibold"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/80"
              }`}
            >
              {filter}
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Select custom date"
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

export default function TopBar(props: TopBarProps) {
  return (
    <Suspense
      fallback={
        <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between h-[61px] sticky top-0 z-20" />
      }
    >
      <TopBarContent {...props} />
    </Suspense>
  );
}

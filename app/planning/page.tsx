import React from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import {
  getAllFactories,
  getShiftsForLine,
  getWorkOrdersForLine,
} from "@/lib/data";
import ShiftOverview from "@/components/planning/ShiftOverview";
import WorkOrdersCard from "@/components/planning/WorkOrdersCard";

export default async function PlanningPage({
  searchParams,
}: {
  searchParams: Promise<{ factoryId?: string; lineId?: string }>;
}) {
  const { factoryId: paramFactoryId, lineId: paramLineId } =
    await searchParams;
  const factories = getAllFactories();

  // Inherit Berlin Packaging Hub / Line A — 330ml Euro Can context by default
  const defaultFactory =
    factories.find((f) => f.id === "berlin") || factories[0];
  const currentFactory = paramFactoryId
    ? factories.find((f) => f.id === paramFactoryId) || defaultFactory
    : defaultFactory;

  const availableLines = currentFactory?.lines || [];
  const defaultLine =
    availableLines.find((l) => l.id === "line-b1") || availableLines[0];
  const currentLine = paramLineId
    ? availableLines.find((l) => l.id === paramLineId) || defaultLine
    : defaultLine;

  const currentFactoryId = currentFactory?.id || "berlin";
  const currentLineId = currentLine?.id || "line-b1";
  const factoryName = currentFactory?.name || "Berlin Packaging Hub";
  const lineName = currentLine?.name || "Line A — 330ml Euro Can";

  // Dynamic shifts & work orders loaded directly from lib/data.ts
  const shifts =
    currentLine?.shifts ||
    getShiftsForLine(currentFactoryId, currentLineId);
  const workOrders =
    currentLine?.workOrders ||
    getWorkOrdersForLine(currentFactoryId, currentLineId);

  const activeShift =
    shifts.find((s) => s.isActiveShift || s.status === "RUNNING") || shifts[1];

  return (
    <div className="flex-1 flex flex-col min-h-full bg-[#F4F6F9]">
      {/* TopBar with plant and line context */}
      <TopBar
        factories={factories}
        currentFactoryId={currentFactoryId}
        lines={availableLines}
        currentLineId={currentLineId}
      />

      <main className="p-6 md:p-8 space-y-6 max-w-[1920px] w-full mx-auto">
        {/* Page Title Header with Breadcrumbs & Plant Context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <nav className="flex items-center gap-1.5 text-xs font-montserrat text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Factories
              </Link>
              <span>/</span>
              <Link
                href={`/${currentFactoryId}`}
                className="hover:text-slate-900 transition-colors"
              >
                {factoryName}
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">
                Planning &amp; Scheduling
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-bold font-montserrat text-slate-900 tracking-tight flex items-center gap-2">
                <span>Production Planning &amp; Scheduling</span>
              </h1>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-montserrat font-semibold text-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active {activeShift?.name || "Shift B"}
              </span>
            </div>

            <p className="text-xs font-roboto text-slate-500 flex items-center gap-2">
              <span className="font-medium text-slate-700">{factoryName}</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-700">{lineName}</span>
              <span className="text-slate-300">•</span>
              <span>24h Shift Production Plan</span>
            </p>
          </div>
        </div>

        {/* Section 1: Daily Shift Execution (Top Row) - Dynamic from lib/data.ts */}
        <ShiftOverview shifts={shifts} />

        {/* Section 2: Production Batch Work Orders (Bottom Main Table) - Dynamic from lib/data.ts */}
        <WorkOrdersCard
          key={`${currentFactoryId}-${currentLineId}`}
          initialOrders={workOrders}
          lineName={lineName}
        />
      </main>
    </div>
  );
}

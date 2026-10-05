"use client";

import React from "react";
import LineProductionCard from "./LineProductionCard";
import LinePerformanceCard from "./LinePerformanceCard";
import LinePowerCard from "./LinePowerCard";
import CurrentActivityCard from "@/components/factory/CurrentActivityCard";
import TimelineBar from "@/components/factory/TimelineBar";
import CycleTimePanel from "@/components/factory/CycleTimePanel";
import MachineGrid from "@/components/machines/MachineGrid";
import { FactoryData, LineData } from "@/types/mes";
import { useLiveTelemetry } from "@/hooks/useLiveTelemetry";

export interface LineLiveDashboardProps {
  factory: FactoryData;
  line: LineData;
}

export default function LineLiveDashboard({
  factory,
  line,
}: LineLiveDashboardProps) {
  const { cycleTime, bph, activityTrend, trendData, telemetryLine } =
    useLiveTelemetry(line);

  const lineAsFactory: FactoryData = {
    ...factory,
    name: line.name,
    kpi: {
      ...line.kpi,
      actualSpeed: bph,
      lastHourCycleTime: cycleTime,
    },
    timeline: line.timeline,
    trendData: trendData,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Main Left Column (3/4 width) */}
      <div className="lg:col-span-3 space-y-4">
        {/* Top Row: KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <LineProductionCard
            line={telemetryLine}
            ratePerHour={bph}
            className="col-span-12 sm:col-span-6 xl:col-span-3 order-1"
          />
          <LinePerformanceCard
            line={telemetryLine}
            className="col-span-12 xl:col-span-6 order-2 sm:order-3 xl:order-2"
          />
          <LinePowerCard
            line={telemetryLine}
            className="col-span-12 sm:col-span-6 xl:col-span-3 order-3 sm:order-2 xl:order-3"
          />
        </div>

        {/* Middle Row: Current Activity Card (Toggleable OEE / MTBF / UPTIME Chart) */}
        <CurrentActivityCard data={activityTrend} factory={lineAsFactory} />

        {/* Bottom Row: Timeline Bar */}
        <TimelineBar
          factory={factory}
          timeline={line.timeline}
          lineName={line.name}
        />

        {/* Machine Vitals & Diagnostics Grid */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold font-montserrat text-slate-800">
              Line Machines &amp; Diagnostics
            </h2>
            <span className="text-xs font-roboto text-slate-500">
              4 Units Monitored
            </span>
          </div>
          <MachineGrid machines={telemetryLine.machines || line.machines} />
        </div>
      </div>

      {/* Right Column: Shared Trend Panel (1/4 width) */}
      <div className="lg:col-span-1">
        <CycleTimePanel factory={lineAsFactory} />
      </div>
    </div>
  );
}

"use client";

import React, { useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { FactoryData } from "@/types/mes";

export interface LossTreeCardProps {
  factory?: FactoryData;
  className?: string;
}

interface StoppageReasonItem {
  id: string;
  name: string;
  lines: string[];
  percentage: number;
  durationMinutes: number;
  topPct: number;
  heightPct: number;
}

const DEFAULT_STOPPAGES: StoppageReasonItem[] = [
  {
    id: "breakdown",
    name: "Breakdown",
    lines: ["Break-", "down"],
    percentage: 5,
    durationMinutes: 72,
    topPct: 0,
    heightPct: 40,
  },
  {
    id: "cleansing",
    name: "Cleansing process",
    lines: ["Cleansing", "process"],
    percentage: 1,
    durationMinutes: 14,
    topPct: 35,
    heightPct: 18,
  },
  {
    id: "changeover",
    name: "Change over time",
    lines: ["Change", "over time"],
    percentage: 2,
    durationMinutes: 29,
    topPct: 48,
    heightPct: 22,
  },
  {
    id: "idle",
    name: "Idle",
    lines: ["Idle"],
    percentage: 2,
    durationMinutes: 29,
    topPct: 60,
    heightPct: 22,
  },
  {
    id: "minor_stops",
    name: "Minor stops",
    lines: ["Minor", "stops"],
    percentage: 5,
    durationMinutes: 72,
    topPct: 62,
    heightPct: 38,
  },
];

export default function LossTreeCard({
  factory,
  className = "",
}: LossTreeCardProps) {
  const data = useMemo(() => {
    const raw = factory?.lossTree;

    const onPercentage = raw?.onPercentage ? Math.round(raw.onPercentage) : 75;
    const offPercentage = raw?.offPercentage
      ? Math.round(raw.offPercentage)
      : 25;

    // Quality loss and Speed loss add up to the full ON section (onPercentage)
    const qualityLossPercentage = raw?.qualityLossPercentage
      ? Math.round(raw.qualityLossPercentage)
      : 45;
    const speedLossPercentage = onPercentage - qualityLossPercentage;

    // Visual proportional heights inside the ON zone track
    const qualityFillPct = Math.round(
      (qualityLossPercentage / onPercentage) * 100
    );
    const speedFillPct = 100 - qualityFillPct;

    const onHours = Number(((onPercentage / 100) * 24).toFixed(1));
    const offHours = Number(((offPercentage / 100) * 24).toFixed(1));

    const stoppages = DEFAULT_STOPPAGES.map((item) => {
      const match = raw?.reasons?.find((r) => r.name === item.name);
      return {
        ...item,
        percentage: match?.percentage ?? item.percentage,
        durationMinutes: match?.durationMinutes ?? item.durationMinutes,
      };
    });

    return {
      onPercentage,
      offPercentage,
      onHours,
      offHours,
      qualityLossPercentage,
      speedLossPercentage,
      qualityFillPct,
      speedFillPct,
      stoppages,
    };
  }, [factory]);

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ArrowDown className="w-4 h-4 text-[#2C3E50] stroke-[2.5]" />
          <h3 className="font-montserrat font-bold text-sm sm:text-base text-[#2C3E50] tracking-wide">
            Loss Tree
          </h3>
        </div>
        <div className="text-xs font-montserrat text-[#8D9192] font-medium flex items-center gap-2">
          <span>Shift 1</span>
          <span>•</span>
          <span>
            24h Operating Window ({data.onHours}h ON / {data.offHours}h OFF)
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto pt-6 pb-2">
        <div className="min-w-[680px] max-w-5xl mx-auto flex items-stretch justify-between select-none px-2 sm:px-6">
          {/* SECTION 1: Level 1 - Overall Operating Status (ON vs OFF) */}
          <div className="flex items-stretch gap-1.5 shrink-0">
            {/* Axis labels: OFF (top), ON (bottom) */}
            <div className="flex flex-col justify-between w-5 shrink-0 py-2">
              <div className="h-[90px] flex items-center justify-center">
                <span className="font-montserrat font-bold text-[11px] text-metric-label tracking-wider -rotate-90 whitespace-nowrap">
                  OFF
                </span>
              </div>
              <div className="h-4" />
              <div className="h-[140px] flex items-center justify-center">
                <span className="font-montserrat font-bold text-[11px] text-metric-label tracking-wider -rotate-90 whitespace-nowrap">
                  ON
                </span>
              </div>
            </div>

            {/* Split Main Bar */}
            <div className="flex flex-col shrink-0">
              <div className="h-7 mb-1.5" />
              <div className="flex flex-col">
                {/* OFF Bar */}
                <div className="h-[90px] flex items-center gap-1.5">
                  <div className="w-7 sm:w-8 h-full bg-[#F40009] rounded-lg shadow-2xs relative group cursor-pointer">
                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-slate-900 text-white text-[11px] font-montserrat rounded-lg py-1 px-2.5 shadow-xl whitespace-nowrap">
                      <div className="font-bold">Total Downtime (OFF)</div>
                      <div className="text-slate-300 text-[10px]">
                        {data.offPercentage}% • {data.offHours} hours
                      </div>
                      <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    </div>
                  </div>
                  <span className="font-montserrat font-bold text-xs text-slate-800">
                    {data.offPercentage}%
                  </span>
                </div>

                <div className="h-4" />

                {/* ON Bar */}
                <div className="h-[140px] flex items-center gap-1.5">
                  <div className="w-7 sm:w-8 h-full bg-[#20C997] rounded-lg shadow-2xs relative group cursor-pointer">
                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-slate-900 text-white text-[11px] font-montserrat rounded-lg py-1 px-2.5 shadow-xl whitespace-nowrap">
                      <div className="font-bold">Operating Time (ON)</div>
                      <div className="text-slate-300 text-[10px]">
                        {data.onPercentage}% • {data.onHours} hours
                      </div>
                      <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    </div>
                  </div>
                  <span className="font-montserrat font-bold text-xs text-slate-800">
                    {data.onPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Level 2 - ON Operational Losses (Quality Loss & Speed Loss) */}
          <div className="flex items-stretch gap-6 sm:gap-8 shrink-0">
            {/* Quality Loss (fills bottom portion) */}
            <div className="flex flex-col shrink-0">
              <div className="h-7 mb-1.5" />
              <div className="h-[90px]" />
              <div className="h-4" />
              <div className="h-[140px] flex items-end gap-1.5">
                <div className="w-7 sm:w-8 h-full bg-[#20C997]/15 rounded-lg relative overflow-hidden group cursor-pointer">
                  <div
                    style={{ height: `${data.qualityFillPct}%` }}
                    className="w-full absolute bottom-0 left-0 bg-[#20C997] rounded-b-lg transition-all duration-300"
                  />
                  <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-slate-900 text-white text-[11px] font-montserrat rounded-lg py-1 px-2.5 shadow-xl whitespace-nowrap">
                    <div className="font-bold">Quality Loss</div>
                    <div className="text-slate-300 text-[10px]">
                      {data.qualityLossPercentage}% of total time •{" "}
                      {data.qualityFillPct}% of operating time
                    </div>
                    <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                  </div>
                </div>
                <span
                  style={{
                    marginBottom: `${Math.max(data.qualityFillPct * 1.1, 8)}px`,
                  }}
                  className="font-montserrat font-bold text-xs text-slate-800"
                >
                  {data.qualityLossPercentage}%
                </span>
              </div>
              <div className="font-montserrat font-bold text-[11px] text-slate-800 text-center leading-tight mt-2">
                Quality<br />Loss
              </div>
            </div>

            {/* Speed Loss (fills top portion so together they equal the full ON bar) */}
            <div className="flex flex-col shrink-0">
              <div className="h-7 mb-1.5" />
              <div className="h-[90px]" />
              <div className="h-4" />
              <div className="h-[140px] flex items-start gap-1.5">
                <div className="w-7 sm:w-8 h-full bg-[#20C997]/15 rounded-lg relative overflow-hidden group cursor-pointer">
                  <div
                    style={{ height: `${data.speedFillPct}%` }}
                    className="w-full absolute top-0 left-0 bg-[#20C997] rounded-t-lg transition-all duration-300"
                  />
                  <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-slate-900 text-white text-[11px] font-montserrat rounded-lg py-1 px-2.5 shadow-xl whitespace-nowrap">
                    <div className="font-bold">Speed Loss</div>
                    <div className="text-slate-300 text-[10px]">
                      {data.speedLossPercentage}% of total time •{" "}
                      {data.speedFillPct}% of operating time
                    </div>
                    <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                  </div>
                </div>
                <span className="font-montserrat font-bold text-xs text-slate-800 pt-1">
                  {data.speedLossPercentage}%
                </span>
              </div>
              <div className="font-montserrat font-bold text-[11px] text-slate-800 text-center leading-tight mt-2">
                Speed<br />Loss
              </div>
            </div>
          </div>

          {/* SECTION 3: Level 3 - OFF Downtime Categories (5 Cascading Stoppages) */}
          <div className="flex items-stretch gap-3 sm:gap-4 md:gap-5 shrink-0">
            {data.stoppages.map((item) => (
              <div key={item.id} className="flex flex-col shrink-0">
                <div className="h-7 mb-1.5 flex flex-col justify-end items-center">
                  {item.lines.map((line, idx) => (
                    <span
                      key={idx}
                      className="font-montserrat font-bold text-[11px] text-slate-800 text-center leading-tight whitespace-nowrap"
                    >
                      {line}
                    </span>
                  ))}
                </div>

                <div className="h-[90px] flex items-center gap-1.5">
                  <div className="w-7 sm:w-8 h-full bg-[#F40009]/10 rounded-lg relative overflow-hidden group cursor-pointer">
                    <div
                      style={{
                        top: `${item.topPct}%`,
                        height: `${item.heightPct}%`,
                      }}
                      className="w-full absolute left-0 bg-[#F40009] rounded-md transition-all duration-300"
                    />
                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-slate-900 text-white text-[11px] font-montserrat rounded-lg py-1 px-2.5 shadow-xl whitespace-nowrap">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-slate-300 text-[10px]">
                        {item.percentage}% • {item.durationMinutes} min
                      </div>
                      <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    </div>
                  </div>
                  <span
                    style={{ paddingTop: `${item.topPct * 0.7}px` }}
                    className="font-montserrat font-bold text-xs text-slate-800"
                  >
                    {item.percentage}%
                  </span>
                </div>

                <div className="h-4" />
                <div className="h-[140px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

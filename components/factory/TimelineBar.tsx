"use client";

import React, { useMemo } from "react";
import { Activity } from "lucide-react";
import {
  FactoryData,
  TimelineSegment,
  TimelineStatistics,
  TimelineStatus,
} from "@/types/mes";
import { sampleTimeline } from "@/lib/data";

export interface TimelineBarProps {
  factory?: FactoryData;
  timeline?: TimelineSegment[];
  statistics?: TimelineStatistics;
  lineName?: string;
  className?: string;
  showStats?: boolean;
}

const STATUS_CONFIG: Record<
  TimelineStatus,
  { label: string; bgClass: string; hex: string }
> = {
  ON: {
    label: "Uptime (Running)",
    bgClass: "bg-[#20C997]",
    hex: "#20C997",
  },
  OFF: {
    label: "Downtime (Breakdown)",
    bgClass: "bg-[#F40009]",
    hex: "#F40009",
  },
  IDLE: {
    label: "Scheduled Downtime (Idle)",
    bgClass: "bg-[#CBD5E1]",
    hex: "#CBD5E1",
  },
};

export default function TimelineBar({
  factory,
  timeline,
  statistics,
  lineName,
  className = "",
  showStats = true,
}: TimelineBarProps) {
  const segments = useMemo(() => {
    return timeline || factory?.timeline || sampleTimeline;
  }, [timeline, factory]);

  const totalDuration = useMemo(() => {
    return segments.reduce((sum, s) => sum + s.durationMinutes, 0) || 1;
  }, [segments]);

  const stats = useMemo<TimelineStatistics>(() => {
    if (statistics) return statistics;
    if (factory?.timelineStats) return factory.timelineStats;

    const uptimeMins = segments
      .filter((s) => s.status === "ON")
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    const downtimeMins = segments
      .filter((s) => s.status === "OFF")
      .reduce((sum, s) => sum + s.durationMinutes, 0);
    const scheduledMins = segments
      .filter((s) => s.status === "IDLE")
      .reduce((sum, s) => sum + s.durationMinutes, 0);

    return {
      uptimePercentage: Math.round((uptimeMins / totalDuration) * 100),
      downtimePercentage: Math.round((downtimeMins / totalDuration) * 100),
      scheduledDowntimePercentage: Math.round(
        (scheduledMins / totalDuration) * 100
      ),
      uptimeMinutes: uptimeMins,
      downtimeMinutes: downtimeMins,
      scheduledDowntimeMinutes: scheduledMins,
    };
  }, [statistics, factory, segments, totalDuration]);

  const displayLineName = lineName || "LINE\nNAME";

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 ${className}`}
    >
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-metric-label stroke-[2.2]" />
          <h3 className="font-montserrat font-bold text-sm text-metric-label tracking-wide">
            Time line
          </h3>
        </div>

        {showStats && (
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-montserrat">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#20C997] shrink-0" />
              <span className="text-slate-600 font-medium hidden sm:inline">
                Uptime
              </span>
              <span className="font-bold text-slate-900">
                {stats.uptimePercentage}%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F40009] shrink-0" />
              <span className="text-slate-600 font-medium hidden sm:inline">
                Downtime
              </span>
              <span className="font-bold text-slate-900">
                {stats.downtimePercentage}%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] shrink-0" />
              <span className="text-slate-600 font-medium hidden sm:inline">
                Scheduled
              </span>
              <span className="font-bold text-slate-900">
                {stats.scheduledDowntimePercentage}%
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full border-b border-slate-100 mb-4" />

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="shrink-0 w-12 sm:w-16 font-montserrat font-bold text-[11px] leading-tight text-metric-label uppercase tracking-wider text-center sm:text-left">
          {displayLineName.includes("\n") ? (
            displayLineName.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i === 0 && <br />}
              </React.Fragment>
            ))
          ) : (
            <span className="truncate block" title={displayLineName}>
              {displayLineName}
            </span>
          )}
        </div>

        <div className="flex-1 h-7 sm:h-8 rounded-lg overflow-hidden flex bg-slate-100 shadow-2xs">
          {segments.map((segment) => {
            const widthPct = (segment.durationMinutes / totalDuration) * 100;
            const config = STATUS_CONFIG[segment.status];

            return (
              <div
                key={segment.id}
                style={{ width: `${widthPct}%` }}
                className={`h-full ${config.bgClass} relative group cursor-pointer transition-opacity hover:opacity-90`}
              >
                <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-slate-900 text-white text-[11px] font-montserrat rounded-lg py-1.5 px-3 shadow-xl whitespace-nowrap">
                  <div className="font-bold text-xs">{config.label}</div>
                  <div className="text-slate-300 text-[10px] mt-0.5">
                    {segment.startTime} – {segment.endTime} ({segment.durationMinutes} min)
                  </div>
                  {segment.reason && (
                    <div className="text-slate-400 text-[10px] mt-0.5 max-w-[200px] truncate">
                      {segment.reason}
                    </div>
                  )}
                  <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

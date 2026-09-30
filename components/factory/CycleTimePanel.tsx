"use client";

import React, { useMemo } from "react";
import { FactoryData } from "@/types/mes";
import { sampleHourlyTrend } from "@/lib/data";
import MetricSparklineRow from "./MetricSparklineRow";
import {
  MetricSummary,
  normalizeTrend,
  normalizeCycleTime,
  calculateCycleTimeMetrics,
  calculateSpeedMetrics,
  calculateUptimeMetrics,
} from "@/lib/helpers/chart-transforms";

export type { MetricSummary };

export interface CycleTimePanelProps {
  factory?: FactoryData;
  className?: string;
  cycleTimeMetrics?: MetricSummary;
  speedMetrics?: MetricSummary;
  uptimeMetrics?: MetricSummary;
}

export default function CycleTimePanel({
  factory,
  className = "",
  cycleTimeMetrics,
  speedMetrics,
  uptimeMetrics,
}: CycleTimePanelProps) {
  const trendData = factory?.trendData || sampleHourlyTrend;

  const sections = useMemo(() => {
    const cycleVals = trendData.map((d) => d.cycleTime);
    const speedVals = trendData.map((d) => d.speed);
    const uptimeVals = trendData.map((d) => d.uptime);

    const cycleData = normalizeCycleTime(cycleVals);
    const speedData = normalizeTrend(speedVals);
    const uptimeData = normalizeTrend(uptimeVals);

    const computedCycleMetrics = calculateCycleTimeMetrics(cycleVals);
    const computedSpeedMetrics = calculateSpeedMetrics(speedVals);
    const computedUptimeMetrics = calculateUptimeMetrics(uptimeVals);

    return [
      {
        gradientId: "cycle-time-gradient",
        title: "CYCLE TIME",
        unit: "[seconds]",
        dotColor: "#F59E0B",
        strokeColor: "#F59E0B",
        data: cycleData,
        metrics: cycleTimeMetrics || computedCycleMetrics,
      },
      {
        gradientId: "speed-gradient",
        title: "SPEED",
        unit: "[pbh]",
        dotColor: "#CE3B6E",
        strokeColor: "#CE3B6E",
        data: speedData,
        metrics: speedMetrics || computedSpeedMetrics,
      },
      {
        gradientId: "uptime-gradient",
        title: "UPTIME",
        unit: "[bottle]",
        dotColor: "#14B8A6",
        strokeColor: "#14B8A6",
        data: uptimeData,
        metrics: uptimeMetrics || computedUptimeMetrics,
      },
    ];
  }, [trendData, cycleTimeMetrics, speedMetrics, uptimeMetrics]);

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-full min-h-[580px] overflow-hidden ${className}`}
    >
      {sections.map((section, index) => (
        <MetricSparklineRow
          key={section.title}
          title={section.title}
          unit={section.unit}
          dotColor={section.dotColor}
          strokeColor={section.strokeColor}
          gradientId={section.gradientId}
          data={section.data}
          metrics={section.metrics}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}

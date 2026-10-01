"use client";

import React, { useState, useMemo, useSyncExternalStore } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Activity } from "lucide-react";
import { ActivityDataPoint, FactoryData } from "@/types/mes";
import { sampleActivityData } from "@/lib/data";

export type ActivityMetricKey = "OEE" | "MTBF" | "UPTIME";

export interface MetricTabConfig {
  key: ActivityMetricKey;
  label: string;
  dataKey: "oee" | "mtbf" | "uptime";
  unit: string;
  domain: [number, number];
  ticks: number[];
}

const METRIC_CONFIGS: Record<ActivityMetricKey, MetricTabConfig> = {
  OEE: {
    key: "OEE",
    label: "OEE",
    dataKey: "oee",
    unit: "%",
    domain: [50, 100],
    ticks: [50, 60, 70, 80, 90, 100],
  },
  MTBF: {
    key: "MTBF",
    label: "MTBF[h]",
    dataKey: "mtbf",
    unit: "h",
    domain: [100, 300],
    ticks: [100, 150, 200, 250, 300],
  },
  UPTIME: {
    key: "UPTIME",
    label: "UPTIME",
    dataKey: "uptime",
    unit: "%",
    domain: [50, 100],
    ticks: [50, 60, 70, 80, 90, 100],
  },
};

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: ActivityDataPoint }>;
  metricConfig: MetricTabConfig;
}

function CustomActivityTooltip({
  active,
  payload,
  metricConfig,
}: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const dataPoint = payload[0].payload;
  const value = payload[0].value;

  return (
    <div className="bg-slate-900/95 backdrop-blur-xs text-white text-xs font-montserrat rounded-xl py-2 px-3 shadow-xl border border-slate-800">
      <div className="text-[10px] text-slate-400 font-medium mb-1">
        {dataPoint.date} • {dataPoint.time}
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#3B6B88]" />
        <span className="font-semibold text-slate-200">
          {metricConfig.label}:
        </span>
        <span className="font-bold text-white text-sm">
          {value} {metricConfig.unit}
        </span>
      </div>
    </div>
  );
}

export interface CurrentActivityCardProps {
  factory?: FactoryData;
  data?: ActivityDataPoint[];
  className?: string;
}

export default function CurrentActivityCard({
  factory,
  data,
  className = "",
}: CurrentActivityCardProps) {
  const [selectedMetric, setSelectedMetric] =
    useState<"OEE" | "MTBF" | "UPTIME">("OEE");
  const mounted = useIsMounted();

  const chartData = useMemo(() => {
    return data || factory?.activityData || sampleActivityData;
  }, [data, factory]);

  const activeConfig = METRIC_CONFIGS[selectedMetric];

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#2C3E50] stroke-[2.2]" />
          <h3 className="font-montserrat font-bold text-sm sm:text-base text-[#2C3E50] tracking-wide">
            Current Activity
          </h3>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-auto">
          {(Object.keys(METRIC_CONFIGS) as ActivityMetricKey[]).map(
            (metricKey) => {
              const config = METRIC_CONFIGS[metricKey];
              const isActive = selectedMetric === metricKey;
              return (
                <button
                  key={metricKey}
                  type="button"
                  onClick={() => setSelectedMetric(metricKey)}
                  className={`relative pb-1.5 sm:pb-2 font-montserrat text-xs sm:text-sm font-bold tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#2C3E50]"
                      : "text-[#8D9192] hover:text-slate-700"
                  }`}
                >
                  {config.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E51937] rounded-full" />
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div className="w-full h-[250px] sm:h-[280px] pt-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 16, right: 16, left: -14, bottom: 4 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
              />
              <XAxis
                dataKey="date"
                axisLine={{ stroke: "#E2E8F0", strokeWidth: 1 }}
                tickLine={false}
                tick={{
                  fill: "#94A3B8",
                  fontSize: 11,
                  fontFamily: "var(--font-roboto)",
                }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94A3B8",
                  fontSize: 11,
                  fontFamily: "var(--font-roboto)",
                }}
                domain={activeConfig.domain}
                ticks={activeConfig.ticks}
                dx={-4}
              />
              <Tooltip
                content={<CustomActivityTooltip metricConfig={activeConfig} />}
                cursor={{
                  stroke: "#CBD5E1",
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
              />
              <Line
                type="monotone"
                dataKey={activeConfig.dataKey}
                stroke="#3B6B88"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3B6B88", stroke: "#3B6B88" }}
                activeDot={{
                  r: 6,
                  fill: "#3B6B88",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                isAnimationActive={true}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-3/4 rounded-lg bg-slate-50/80 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

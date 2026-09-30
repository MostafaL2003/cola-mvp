"use client";

import React, { useSyncExternalStore } from "react";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface MetricSparklineRowProps {
  title: string;
  unit: string;
  dotColor: string;
  strokeColor: string;
  gradientId: string;
  data: Array<{ v: number }>;
  metrics: {
    avg: string | number;
    min: string | number;
    max: string | number;
  };
  isFirst?: boolean;
}

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export default function MetricSparklineRow({
  title,
  unit,
  dotColor,
  strokeColor,
  gradientId,
  data,
  metrics,
  isFirst = false,
}: MetricSparklineRowProps) {
  const mounted = useIsMounted();

  return (
    <div
      className={`flex-1 flex flex-col justify-between ${
        !isFirst ? "border-t border-slate-100" : ""
      }`}
    >
      <div>
        <div className="px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: dotColor }}
            />
            <span className="font-montserrat font-bold text-xs sm:text-[13px] tracking-wide text-metric-label uppercase">
              {title}
            </span>
          </div>
          <span className="font-montserrat text-xs text-[#5B7083] font-medium">
            {unit}
          </span>
        </div>
        <div className="w-full border-b border-slate-100" />
      </div>

      <div className="px-4 py-2 h-28 sm:h-32 w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={strokeColor}
                    stopOpacity={0.28}
                  />
                  <stop
                    offset="100%"
                    stopColor={strokeColor}
                    stopOpacity={0.04}
                  />
                </linearGradient>
              </defs>
              <YAxis hide domain={[0, 2.3]} />
              <Area
                type="natural"
                dataKey="v"
                stroke={strokeColor}
                strokeWidth={3}
                fill={`url(#${gradientId})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-16 bg-slate-50/50 rounded animate-pulse" />
          </div>
        )}
      </div>

      <div className="px-5 pt-1 pb-4 flex items-center justify-between">
        <div className="flex items-baseline">
          <span className="font-montserrat text-xs text-metric-label font-normal">
            Avg.
          </span>
          <span className="font-montserrat text-xl sm:text-2xl font-extrabold text-slate-900 ml-1.5 leading-none">
            {metrics.avg}
          </span>
        </div>

        <div className="flex items-center text-metric-label">
          <ChevronDown className="w-3.5 h-3.5 text-slate-800 shrink-0 stroke-[2.5]" />
          <span className="font-montserrat text-[11px] text-metric-label font-medium ml-0.5">
            Min.
          </span>
          <span className="font-montserrat text-sm font-bold text-slate-900 ml-1">
            {metrics.min}
          </span>
        </div>

        <div className="flex items-center text-metric-label">
          <ChevronUp className="w-3.5 h-3.5 text-slate-800 shrink-0 stroke-[2.5]" />
          <span className="font-montserrat text-[11px] text-metric-label font-medium ml-0.5">
            Max.
          </span>
          <span className="font-montserrat text-sm font-bold text-slate-900 ml-1">
            {metrics.max}
          </span>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import CircularProgressBar from "@/components/CircularProgressBar";
import { FactoryData } from "@/types/mes";

export interface PerformanceKpiCardProps {
  factory?: FactoryData;
  className?: string;
}

export default function PerformanceKpiCard({
  factory,
  className = "",
}: PerformanceKpiCardProps) {
  const oee = factory?.kpi?.oee ?? 76;
  const sle = factory?.kpi?.sle ?? 76;
  const usle = factory?.kpi?.usle ?? 76;
  const performance = factory?.performanceKpi?.performance ?? 30;
  const quality = factory?.performanceKpi?.quality ?? 60;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 lg:p-4 xl:p-6 flex flex-col justify-between h-full min-h-[200px] ${className}`}
    >
      <div className="flex items-center gap-2 text-metric-label font-montserrat font-bold text-sm sm:text-base">
        <SlidersHorizontal
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-metric-label shrink-0"
          strokeWidth={2}
        />
        <span className="truncate">Performance Indicator KPI</span>
      </div>

      <div className="w-full border-t border-slate-100 my-3 sm:my-4" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 xl:gap-6 flex-1">
        <div className="flex items-center justify-around gap-1.5 sm:gap-2.5 xl:gap-3 flex-1 w-full sm:w-auto">
          <CircularProgressBar
            value={oee}
            label="OEE"
            color="#F59E0B"
            size={52}
            strokeWidth={5}
            valueClassName="font-montserrat font-bold text-xs"
            labelClassName="text-[10px] sm:text-[11px]"
          />
          <CircularProgressBar
            value={sle}
            label="SLE"
            color="#06B6D4"
            size={52}
            strokeWidth={5}
            valueClassName="font-montserrat font-bold text-xs"
            labelClassName="text-[10px] sm:text-[11px]"
          />
          <CircularProgressBar
            value={usle}
            label="USLE"
            color="#EC4899"
            size={52}
            strokeWidth={5}
            valueClassName="font-montserrat font-bold text-xs"
            labelClassName="text-[10px] sm:text-[11px]"
          />
        </div>

        <div className="w-px h-14 bg-slate-100 shrink-0 self-center hidden sm:block" />

        <div className="flex flex-col justify-center gap-2.5 sm:gap-3 min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] w-full sm:w-auto flex-1 sm:flex-none">
          <div className="flex items-center gap-2.5 sm:gap-3 justify-between">
            <div className="flex-1">
              <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-metric-label rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(Math.max(performance, 0), 100)}%`,
                  }}
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-montserrat font-medium text-slate-400 mt-0.5 block">
                Performance
              </span>
            </div>
            <span className="font-montserrat font-bold text-sm sm:text-base xl:text-lg text-metric-label shrink-0">
              {Math.round(performance)}%
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 justify-between">
            <div className="flex-1">
              <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-metric-label rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max(quality, 0), 100)}%` }}
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-montserrat font-medium text-slate-400 mt-0.5 block">
                Quality
              </span>
            </div>
            <span className="font-montserrat font-bold text-sm sm:text-base xl:text-lg text-metric-label shrink-0">
              {Math.round(quality)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

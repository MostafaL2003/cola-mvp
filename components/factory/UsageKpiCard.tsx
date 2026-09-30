import React from "react";
import { ArrowUpDown, Zap, Droplet } from "lucide-react";
import { FactoryData, UsageKpiData } from "@/types/mes";
import { formatProductionNumber } from "@/helpers";

export interface UsageKpiCardProps {
  factory?: FactoryData;
  data?: UsageKpiData;
  className?: string;
}

export default function UsageKpiCard({
  factory,
  data,
  className = "",
}: UsageKpiCardProps) {
  const usage = data ||
    factory?.usageKpi || {
      energy: {
        perLiter: 500,
        perBottle: 500,
        unit: "J",
      },
      water: {
        perLiter: 500,
        perBottle: 500,
        unit: "L",
      },
    };

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 lg:p-4 xl:p-6 flex flex-col justify-between h-full min-h-[200px] ${className}`}
    >
      <div className="flex items-center gap-2 text-metric-label font-montserrat font-bold text-sm sm:text-base">
        <ArrowUpDown
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-metric-label shrink-0"
          strokeWidth={2}
        />
        <span className="truncate">Usage KPI</span>
      </div>

      <div className="w-full border-t border-slate-100 my-3 sm:my-4" />

      <div className="space-y-4 sm:space-y-5 my-auto">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-metric-label font-montserrat font-bold text-xs sm:text-[13px]">
            <Zap
              className="w-4 h-4 text-metric-label shrink-0"
              strokeWidth={1.8}
            />
            <span>Energy</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 xl:gap-5 shrink-0">
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-montserrat font-semibold text-brand-navy leading-tight">
                Per Liter
              </span>
              <span className="font-montserrat font-semibold text-base sm:text-lg text-metric-data leading-tight">
                {formatProductionNumber(usage.energy.perLiter)}
                <span className="text-xs font-normal ml-0.5">
                  {usage.energy.unit}
                </span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-montserrat font-semibold text-brand-navy leading-tight">
                Per Bottle
              </span>
              <span className="font-montserrat font-semibold text-base sm:text-lg text-metric-data leading-tight">
                {formatProductionNumber(usage.energy.perBottle)}
                <span className="text-xs font-normal ml-0.5">
                  {usage.energy.unit}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-metric-label font-montserrat font-bold text-xs sm:text-[13px]">
            <Droplet
              className="w-4 h-4 text-metric-label shrink-0"
              strokeWidth={1.8}
            />
            <span>Water</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 xl:gap-5 shrink-0">
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-montserrat font-semibold text-brand-navy leading-tight">
                Per Liter
              </span>
              <span className="font-montserrat font-semibold text-base sm:text-lg text-metric-data leading-tight">
                {formatProductionNumber(usage.water.perLiter)}
                <span className="text-xs font-normal ml-0.5">
                  {usage.water.unit}
                </span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-montserrat font-semibold text-brand-navy leading-tight">
                Per Bottle
              </span>
              <span className="font-montserrat font-semibold text-base sm:text-lg text-metric-data leading-tight">
                {formatProductionNumber(usage.water.perBottle)}
                <span className="text-xs font-normal ml-0.5">
                  {usage.water.unit}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

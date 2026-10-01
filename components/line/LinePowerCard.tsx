import React from "react";
import { Zap } from "lucide-react";
import { LineData, LinePowerData, PowerMetricItem } from "@/types/mes";

export interface LinePowerCardProps {
  line?: LineData;
  data?: LinePowerData;
  title?: string;
  energyUsed?: number | string;
  energyUnit?: string;
  powerFactor?: number | string;
  secondaryEnergyUsed?: number | string;
  secondaryEnergyUnit?: string;
  metrics?: PowerMetricItem[];
  className?: string;
}

function formatDisplayValue(val: number | string | undefined, fallback: string): string {
  if (val === undefined || val === null) return fallback;
  if (typeof val === "number") {
    return val.toLocaleString();
  }
  return String(val);
}

export default function LinePowerCard({
  line,
  data,
  title = "Power KPI",
  energyUsed,
  energyUnit,
  powerFactor,
  secondaryEnergyUsed,
  secondaryEnergyUnit,
  metrics,
  className = "",
}: LinePowerCardProps) {
  const linePwr = data || line?.powerKpi;

  const defaultMetrics: PowerMetricItem[] = [
    {
      value: formatDisplayValue(
        energyUsed ?? linePwr?.energyUsed,
        "5,000"
      ),
      unit: energyUnit ?? linePwr?.energyUnit ?? "KWH",
      label: "Energy Used",
    },
    {
      value: formatDisplayValue(
        powerFactor ?? linePwr?.powerFactor,
        "7,000"
      ),
      label: "Power factor",
    },
    {
      value: formatDisplayValue(
        secondaryEnergyUsed ?? linePwr?.secondaryEnergyUsed ?? energyUsed ?? linePwr?.energyUsed,
        "5,000"
      ),
      unit: secondaryEnergyUnit ?? linePwr?.secondaryEnergyUnit ?? energyUnit ?? linePwr?.energyUnit ?? "KWH",
      label: "Energy Used",
    },
  ];

  const activeMetrics = metrics || linePwr?.metrics || defaultMetrics;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 lg:p-4 xl:p-6 flex flex-col justify-between h-full min-h-[200px] ${className}`}
    >
      <div>
        <div className="flex items-center gap-2.5 text-metric-label font-montserrat font-bold text-sm sm:text-base">
          <Zap className="w-5 h-5 text-slate-800 shrink-0" strokeWidth={1.8} />
          <span className="truncate">{title}</span>
        </div>

        <div className="w-full border-t border-slate-100 my-3 sm:my-4" />
      </div>

      <div className="grid grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-4 flex-1 content-start my-auto">
        {activeMetrics.map((item, idx) => (
          <div key={`${item.label}-${idx}`}>
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl font-bold font-montserrat text-slate-900 tracking-tight">
                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
              </span>
              {item.unit && (
                <span className="text-xs sm:text-sm font-semibold font-montserrat text-slate-700 ml-1.5 uppercase">
                  {item.unit}
                </span>
              )}
            </div>
            <div className="text-xs font-medium font-montserrat text-slate-400 mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

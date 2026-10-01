import { Scan } from "lucide-react";
import { LineData, LineProductionData } from "@/types/mes";
import { getProgressColor } from "@/helpers";

export interface LineProductionCardProps {
  line?: LineData;
  data?: LineProductionData;
  title?: string;
  ratePerHour?: number | string;
  rateUnit?: string;
  rateLabel?: string;
  actualProduction?: number | string;
  actualUnit?: string;
  actualLabel?: string;
  yieldPercentage?: number;
  yieldLabel?: string;
  color?: string;
  className?: string;
}

function formatDisplayValue(val: number | string | undefined, fallback: string): string {
  if (val === undefined || val === null) return fallback;
  if (typeof val === "number") {
    return val.toLocaleString();
  }
  return String(val);
}

export default function LineProductionCard({
  line,
  data,
  title = "Total Production",
  ratePerHour,
  rateUnit,
  rateLabel = "Production /h",
  actualProduction,
  actualUnit,
  actualLabel = "Actual Production",
  yieldPercentage,
  yieldLabel = "Production Yield",
  color,
  className = "",
}: LineProductionCardProps) {
  const lineProd = data || line?.lineProduction;

  const displayRate = formatDisplayValue(
    ratePerHour ?? lineProd?.ratePerHour ?? line?.kpi?.actualSpeed,
    "5,000"
  );
  const displayRateUnit = rateUnit ?? lineProd?.rateUnit ?? "bph";

  const displayActual = formatDisplayValue(
    actualProduction ?? lineProd?.actualProduction ?? line?.kpi?.actualProduction,
    "7,000"
  );
  const displayActualUnit = actualUnit ?? lineProd?.actualUnit ?? "KM";

  const rawYield = yieldPercentage ?? lineProd?.yieldPercentage ?? line?.kpi?.productionQuality ?? 75;
  const clampedYield = Math.min(Math.max(Number.isFinite(rawYield) ? rawYield : 75, 0), 100);
  const barColor = color || getProgressColor(clampedYield);

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 lg:p-4 xl:p-6 flex flex-col justify-between h-full min-h-[200px] ${className}`}
    >
      <div>
        <div className="flex items-center gap-2.5 text-metric-label font-montserrat font-bold text-sm sm:text-base">
          <Scan className="w-5 h-5 text-slate-800 shrink-0" strokeWidth={1.8} />
          <span className="truncate">{title}</span>
        </div>

        <div className="w-full border-t border-slate-100 my-3 sm:my-4" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl font-bold font-montserrat text-slate-900 tracking-tight">
                {displayRate}
              </span>
              {displayRateUnit && (
                <span className="text-xs sm:text-sm font-semibold font-montserrat text-slate-700 ml-1.5">
                  {displayRateUnit}
                </span>
              )}
            </div>
            <div className="text-xs font-medium font-montserrat text-slate-400 mt-1">
              {rateLabel}
            </div>
          </div>

          <div>
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl font-bold font-montserrat text-slate-900 tracking-tight">
                {displayActual}
              </span>
              {displayActualUnit && (
                <span className="text-xs sm:text-sm font-semibold font-montserrat text-slate-700 ml-1.5">
                  {displayActualUnit}
                </span>
              )}
            </div>
            <div className="text-xs font-medium font-montserrat text-slate-400 mt-1">
              {actualLabel}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${clampedYield}%`,
                backgroundColor: barColor,
              }}
            />
          </div>
          <span className="text-lg sm:text-xl font-bold font-montserrat text-slate-900 shrink-0 min-w-[45px] text-right">
            {Math.round(clampedYield)}%
          </span>
        </div>
        <div className="text-xs font-medium font-montserrat text-slate-400 mt-1">
          {yieldLabel}
        </div>
      </div>
    </div>
  );
}

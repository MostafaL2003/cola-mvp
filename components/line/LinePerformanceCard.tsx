import { SlidersHorizontal } from "lucide-react";
import { LineData, LinePerformanceData } from "@/types/mes";
import { getProgressColor } from "@/helpers";

export interface ProgressMetricItem {
  label: string;
  value: number;
  color?: string;
}

export interface LinePerformanceCardProps {
  line?: LineData;
  data?: LinePerformanceData;
  title?: string;
  oee?: number;
  gaugeLabel?: string;
  gaugeColor?: string;
  availability?: number;
  performance?: number;
  quality?: number;
  metrics?: ProgressMetricItem[];
  className?: string;
}

export default function LinePerformanceCard({
  line,
  data,
  title = "Performance Indicator KPI",
  oee,
  gaugeLabel = "OEE",
  gaugeColor = "#0A3344",
  availability,
  performance,
  quality,
  metrics,
  className = "",
}: LinePerformanceCardProps) {
  const linePerf = data || line?.linePerformance;

  const rawOee = oee ?? linePerf?.oee ?? line?.kpi?.oee ?? 76;
  const clampedOee = Math.min(Math.max(Number.isFinite(rawOee) ? rawOee : 76, 0), 100);

  const rawAvailability =
    availability ?? linePerf?.availability ?? line?.kpi?.sle ?? 80;
  const clampedAvailability = Math.min(
    Math.max(Number.isFinite(rawAvailability) ? rawAvailability : 80, 0),
    100
  );

  const rawPerformance =
    performance ?? linePerf?.performance ?? 30;
  const clampedPerformance = Math.min(
    Math.max(Number.isFinite(rawPerformance) ? rawPerformance : 30, 0),
    100
  );

  const rawQuality =
    quality ?? linePerf?.quality ?? line?.kpi?.productionQuality ?? 60;
  const clampedQuality = Math.min(
    Math.max(Number.isFinite(rawQuality) ? rawQuality : 60, 0),
    100
  );

  const defaultMetrics: ProgressMetricItem[] = [
    { label: "Availability", value: clampedAvailability },
    { label: "Performance", value: clampedPerformance },
    { label: "Quality", value: clampedQuality },
  ];

  const activeMetrics = metrics || defaultMetrics;

  // Gauge calculations
  const size = 76;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedOee / 100) * circumference;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 lg:p-4 xl:p-6 flex flex-col justify-between h-full min-h-[200px] ${className}`}
    >
      <div>
        <div className="flex items-center gap-2.5 text-metric-label font-montserrat font-bold text-sm sm:text-base">
          <SlidersHorizontal
            className="w-5 h-5 text-slate-800 shrink-0"
            strokeWidth={1.8}
          />
          <span className="truncate">{title}</span>
        </div>

        <div className="w-full border-t border-slate-100 my-3 sm:my-4" />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 flex-1 my-auto">
        {/* Left column: Circular gauge */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="block -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={gaugeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-lg sm:text-xl font-bold font-montserrat text-slate-900 leading-none">
                {Math.round(clampedOee)}%
              </span>
            </div>
          </div>

          <span className="text-xs sm:text-sm font-bold font-montserrat text-slate-800 tracking-wider uppercase mt-1.5 text-center">
            {gaugeLabel}
          </span>
        </div>

        {/* Right column: 3 Progress Bars */}
        <div className="flex-1 w-full flex flex-col justify-center gap-2.5 sm:gap-3">
          {activeMetrics.map((item) => {
            const val = Math.min(Math.max(Number.isFinite(item.value) ? item.value : 0, 0), 100);
            const itemColor = item.color || getProgressColor(val);
            return (
              <div key={item.label} className="w-full">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${val}%`,
                        backgroundColor: itemColor,
                      }}
                    />
                  </div>
                  <span className="text-base sm:text-lg xl:text-xl font-bold font-montserrat text-slate-900 shrink-0 min-w-[45px] text-right">
                    {Math.round(val)}%
                  </span>
                </div>
                <span className="text-[11px] font-medium font-montserrat text-slate-400 block -mt-0.5">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

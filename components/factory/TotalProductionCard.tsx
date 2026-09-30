import React from "react";
import { Scan, Box } from "lucide-react";
import { FactoryData, TotalProductionData } from "@/types/mes";
import { formatProductionNumber } from "@/helpers";

export interface TotalProductionCardProps {
  factory?: FactoryData;
  data?: TotalProductionData;
  className?: string;
}

export default function TotalProductionCard({
  factory,
  data,
  className = "",
}: TotalProductionCardProps) {
  const production = data ||
    factory?.totalProduction || {
      bottles: 500000,
      packs: 50000,
      pallets: 10000,
    };

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 lg:p-4 xl:p-6 flex flex-col justify-between h-full min-h-[200px] ${className}`}
    >
      <div className="flex items-center gap-2 text-metric-label font-montserrat font-bold text-sm sm:text-base">
        <Scan
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-metric-label shrink-0"
          strokeWidth={2}
        />
        <span className="truncate">Total Production</span>
      </div>

      <div className="w-full border-t border-slate-100 my-3 sm:my-4" />

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-metric-label font-montserrat font-bold text-xs sm:text-[13px]">
            <svg
              className="w-4 h-4 text-metric-label shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 2h4" />
              <path d="M10 2v3a3 3 0 0 1-.88 2.12L8 8.24A4 4 0 0 0 7 11v8a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-8a4 4 0 0 0-1-2.76l-1.12-1.12A3 3 0 0 1 14 5V2" />
            </svg>
            <span>Bottle</span>
          </div>
          <span className="font-montserrat font-semibold text-base sm:text-lg text-metric-data shrink-0">
            {formatProductionNumber(production.bottles)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-metric-label font-montserrat font-bold text-xs sm:text-[13px]">
            <Box
              className="w-4 h-4 text-metric-label shrink-0"
              strokeWidth={1.8}
            />
            <span>Pack</span>
          </div>
          <span className="font-montserrat font-semibold text-base sm:text-lg text-metric-data shrink-0">
            {formatProductionNumber(production.packs)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 text-metric-label font-montserrat font-bold text-xs sm:text-[13px]">
            <svg
              className="w-4 h-4 text-metric-label shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 17h16" />
              <path d="M4 21h16" />
              <path d="M6 17v4" />
              <path d="M12 17v4" />
              <path d="M18 17v4" />
              <rect x="5" y="10" width="6" height="7" rx="1" />
              <rect x="13" y="10" width="6" height="7" rx="1" />
              <rect x="9" y="3" width="6" height="7" rx="1" />
            </svg>
            <span>Pallete</span>
          </div>
          <span className="font-montserrat font-semibold text-base sm:text-lg text-metric-data shrink-0">
            {formatProductionNumber(production.pallets)}
          </span>
        </div>
      </div>
    </div>
  );
}

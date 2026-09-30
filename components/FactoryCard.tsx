import React from "react";
import Link from "next/link";
import {
  Gauge,
  Settings,
  RotateCcw,
  Activity,
  BarChart3,
  Award,
} from "lucide-react";
import CircularProgressBar from "./CircularProgressBar";
import { KPICardData } from "@/types/mes";
import { formatActiveLinesRatio, formatQualityDisplay } from "@/helpers";

export interface FactoryCardProps {
  id?: string;
  name?: string;
  kpi: KPICardData;
  href?: string;
  shiftLabel?: string;
  speedUnit?: string;
  productionUnit?: string;
  cycleTimeUnit?: string;
  volumeUnit?: string;
  className?: string;
}

export default function FactoryCard({
  id,
  name,
  kpi,
  href,
  shiftLabel = "Last Shift",
  speedUnit = "L/s",
  productionUnit = "L",
  cycleTimeUnit = "s",
  volumeUnit = "L",
  className = "",
}: FactoryCardProps) {
  const displayName = name || kpi.factoryName;
  const targetHref = href ?? (id ? `/${id}` : undefined);
  const ratioString = formatActiveLinesRatio(kpi.activeLinesRatio);
  const qualityDisplay = formatQualityDisplay(kpi.productionQuality);

  const cardContent = (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col ${
        targetHref ? "cursor-pointer group" : ""
      } ${className}`}
    >
      <div className="bg-brand-navy px-5 py-3 flex items-center justify-between transition-colors">
        <h3 className="font-montserrat font-semibold text-[14px] text-white tracking-wide truncate">
          {displayName}
        </h3>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2 text-metric-label font-montserrat font-bold">
              <Gauge className="w-4 h-4 shrink-0" />
              <span>Actual speed</span>
            </div>
            <div className="text-base font-semibold text-metric-data font-montserrat">
              {kpi.actualSpeed.toLocaleString()}
              {speedUnit && (
                <span className="text-[11px] font-normal text-metric-data ml-1 font-roboto">
                  {speedUnit}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2 text-metric-label font-montserrat font-bold">
              <Settings className="w-4 h-4 shrink-0" />
              <span>Actual production</span>
            </div>
            <div className="text-base font-semibold text-metric-data font-montserrat">
              {kpi.actualProduction.toLocaleString()}
              {productionUnit && (
                <span className="text-[11px] font-normal text-metric-data ml-1 font-roboto">
                  {productionUnit}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2 text-metric-label font-montserrat font-bold">
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>Last hour cycle time</span>
            </div>
            <div className="text-base font-semibold text-metric-data font-montserrat">
              {kpi.lastHourCycleTime}
              {cycleTimeUnit && (
                <span className="text-[11px] font-normal text-metric-data ml-1 font-roboto">
                  {cycleTimeUnit}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2 text-metric-label font-montserrat font-bold">
              <Activity className="w-4 h-4 shrink-0" />
              <span>Ratio of active lines</span>
            </div>
            <div className="text-base font-semibold text-metric-data font-montserrat">
              {ratioString}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center my-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-2.5 text-[11px] font-medium text-slate-500 font-montserrat">
            {shiftLabel}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center justify-items-center py-1">
          <CircularProgressBar
            value={kpi.oee}
            label="OEE"
            color="#F59E0B"
            size={58}
            strokeWidth={5}
            valueClassName="font-montserrat font-bold text-sm"
          />
          <CircularProgressBar
            value={kpi.sle}
            label="SLE"
            color="#06B6D4"
            size={58}
            strokeWidth={5}
            valueClassName="font-montserrat font-bold text-sm"
          />
          <CircularProgressBar
            value={kpi.usle}
            label="USLE"
            color="#EC4899"
            size={58}
            strokeWidth={5}
            valueClassName="font-montserrat font-bold text-sm"
          />
        </div>

        <div className="space-y-2.5 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2 text-metric-label font-montserrat font-bold">
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Production volume</span>
            </div>
            <div className="text-base font-semibold text-metric-data font-montserrat">
              {kpi.productionVolume.toLocaleString()}
              {volumeUnit && (
                <span className="text-[11px] font-normal text-metric-data ml-1 font-roboto">
                  {volumeUnit}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2 text-metric-label font-montserrat font-bold">
              <Award className="w-4 h-4 shrink-0" />
              <span>Production quality</span>
            </div>
            <div className="text-base font-semibold text-metric-data font-montserrat">
              {qualityDisplay}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (targetHref) {
    return (
      <Link href={targetHref} className="block no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

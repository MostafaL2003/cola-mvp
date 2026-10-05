"use client";

import React, { useState } from "react";
import {
  Activity,
  Wrench,
  SlidersHorizontal,
  RotateCcw,
  Gauge,
  Timer,
  Thermometer,
  Waves,
  ShieldCheck,
  Droplets,
  Calendar,
  CalendarClock,
} from "lucide-react";
import { MachineData } from "@/types/mes";

export interface MachineCardProps {
  machine?: MachineData;
  id?: string | number;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function MachineCard({
  machine,
  id = 1,
  title,
  subtitle,
  className = "",
}: MachineCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const displayTitle = machine?.name || title || `Machine ${String(id).padStart(2, "0")}`;
  const displaySubtitle = machine?.subtitle || subtitle || "Production Equipment";
  const status = machine?.status || "running";

  // Front Face Vitals
  const speedVal = machine?.vitals?.speed?.value
    ? machine.vitals.speed.value.toLocaleString()
    : "54,000";
  const speedUnit = machine?.vitals?.speed?.unit || "BPM";

  const cycleVal = machine?.vitals?.cycleTime?.value !== undefined
    ? machine.vitals.cycleTime.value
    : 1.08;
  const cycleUnit = machine?.vitals?.cycleTime?.unit || "sec";

  const tempVal = machine?.vitals?.operatingTemp?.value !== undefined
    ? machine.vitals.operatingTemp.value
    : 21.4;
  const tempUnit = machine?.vitals?.operatingTemp?.unit || "°C";

  const pressureVal = machine?.vitals?.pressure?.value !== undefined
    ? machine.vitals.pressure.value
    : 5.2;
  const pressureUnit = machine?.vitals?.pressure?.unit || "bar";

  const telemetryStatus = machine?.vitals?.telemetryStatus || "Live stream nominal (100ms)";

  // Back Face Maintenance
  const vibrationVal = machine?.maintenance?.motorVibration?.value !== undefined
    ? machine.maintenance.motorVibration.value
    : 1.25;
  const vibrationUnit = machine?.maintenance?.motorVibration?.unit || "mm/s";

  const fluidVal = machine?.maintenance?.oilFluidLevel?.value !== undefined
    ? machine.maintenance.oilFluidLevel.value
    : 92;
  const fluidUnit = machine?.maintenance?.oilFluidLevel?.unit || "%";

  const serviceDate = machine?.maintenance?.lastServiceDate || "18 Sep 2026";

  const healthScore = machine?.maintenance?.healthScore?.value !== undefined
    ? machine.maintenance.healthScore.value
    : 96;
  const healthUnit = machine?.maintenance?.healthScore?.unit || "%";

  const nextMaintenance = machine?.maintenance?.nextScheduledMaintenance || "In 72h (Shift A)";

  const statusConfig =
    status === "downtime"
      ? {
          label: "Downtime",
          textColor: "text-[#ef4444]",
          dotColor: "bg-[#ef4444]",
        }
      : status === "idle"
      ? {
          label: "Idle",
          textColor: "text-[#6b7280]",
          dotColor: "bg-[#6b7280]",
        }
      : {
          label: "Running",
          textColor: "text-[#22c55e]",
          dotColor: "bg-[#22c55e]",
        };

  return (
    <div
      className={`perspective-1000 w-full min-h-[400px] h-[400px] select-none ${className}`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ease-in-out transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Face (Operational Vitals) */}
        <div
          className={`w-full h-full bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between backface-hidden transition-opacity duration-300 ${
            isFlipped
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto opacity-100"
          }`}
        >
          {/* Header */}
          <div>
            {/* Current Status Small Text on Top */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100/80">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${statusConfig.dotColor} ${
                    status === "running" ? "animate-pulse" : ""
                  }`}
                />
                <span className="text-[11px] font-roboto text-slate-500 font-medium">
                  Current status:
                </span>
                <span
                  className={`text-[11px] font-montserrat font-bold uppercase tracking-wider ${statusConfig.textColor}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              <span className="text-[10px] font-montserrat font-semibold px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200/60">
                Live Operations
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="font-montserrat font-bold text-sm text-slate-800 truncate">
                {displayTitle}
              </h3>
              <p className="text-xs font-roboto text-slate-400 mt-0.5 truncate">
                {displaySubtitle}
              </p>
            </div>

            <div className="w-full border-t border-gray-100 my-3" />

            {/* Operational Vitals Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-montserrat font-bold uppercase tracking-wider text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span>Operational Vitals</span>
                  {status === "running" && (
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                      LIVE
                    </span>
                  )}
                </div>
                <Activity
                  className={`w-3.5 h-3.5 ${
                    status === "running"
                      ? "text-emerald-500 animate-pulse"
                      : "text-slate-400"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 1: Speed */}
                <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-roboto text-slate-500 mb-1">
                    <Gauge className="w-3 h-3 text-slate-400" />
                    <span>Speed</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold font-montserrat text-slate-900 tracking-tight tabular-nums transition-all">
                      {speedVal}
                    </span>
                    <span className="text-[10px] font-montserrat font-semibold text-slate-400">
                      {speedUnit}
                    </span>
                  </div>
                </div>

                {/* 2: Cycle Time */}
                <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-roboto text-slate-500 mb-1">
                    <Timer className="w-3 h-3 text-slate-400" />
                    <span>Cycle Time</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold font-montserrat text-slate-900 tracking-tight tabular-nums transition-all">
                      {cycleVal}
                    </span>
                    <span className="text-[10px] font-montserrat font-semibold text-slate-400">
                      {cycleUnit}
                    </span>
                  </div>
                </div>

                {/* 3: Operating Temp */}
                <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-roboto text-slate-500 mb-1">
                    <Thermometer className="w-3 h-3 text-slate-400" />
                    <span>Operating Temp</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold font-montserrat text-slate-900 tracking-tight tabular-nums transition-all">
                      {tempVal}
                    </span>
                    <span className="text-[10px] font-montserrat font-semibold text-slate-400">
                      {tempUnit}
                    </span>
                  </div>
                </div>

                {/* 4: Pressure */}
                <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-roboto text-slate-500 mb-1">
                    <Waves className="w-3 h-3 text-slate-400" />
                    <span>Pressure</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold font-montserrat text-slate-900 tracking-tight tabular-nums transition-all">
                      {pressureVal}
                    </span>
                    <span className="text-[10px] font-montserrat font-semibold text-slate-400">
                      {pressureUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Telemetry Status */}
              <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-200/70 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      status === "running"
                        ? "bg-[#22c55e] animate-pulse"
                        : status === "downtime"
                        ? "bg-[#ef4444]"
                        : "bg-[#6b7280]"
                    }`}
                  />
                  <span className="text-[11px] font-roboto font-medium text-slate-500">
                    Telemetry Status
                  </span>
                </div>
                <span className="text-[10px] font-montserrat font-semibold text-slate-700 truncate text-right tabular-nums">
                  {telemetryStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button at Bottom */}
          <div className="pt-3">
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/80 rounded-lg text-xs font-montserrat font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>View Diagnostics</span>
            </button>
          </div>
        </div>

        {/* Back Face (Diagnostics & Maintenance) */}
        <div
          className={`absolute inset-0 w-full h-full bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between backface-hidden rotate-y-180 transition-opacity duration-300 ${
            isFlipped
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          {/* Header */}
          <div>
            {/* Current Status Small Text on Top */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100/80">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${statusConfig.dotColor} ${
                    status === "running" ? "animate-pulse" : ""
                  }`}
                />
                <span className="text-[11px] font-roboto text-slate-500 font-medium">
                  Current status:
                </span>
                <span
                  className={`text-[11px] font-montserrat font-bold uppercase tracking-wider ${statusConfig.textColor}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              <span className="shrink-0 text-[10px] font-montserrat font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                Diagnostics &amp; Maintenance
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="font-montserrat font-bold text-sm text-slate-800 truncate">
                {displayTitle}
              </h3>
              <p className="text-xs font-roboto text-slate-400 mt-0.5 truncate">
                Diagnostics &amp; Health
              </p>
            </div>

            <div className="w-full border-t border-gray-100 my-3" />

            {/* Diagnostics & Maintenance Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-montserrat font-bold uppercase tracking-wider text-slate-400">
                <span>Diagnostics &amp; Maintenance</span>
                <Wrench className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 1: Motor Vibration */}
                <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-roboto text-slate-500 mb-1">
                    <Waves className="w-3 h-3 text-slate-400" />
                    <span className="truncate">Motor Vibration</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold font-montserrat text-slate-900 tracking-tight tabular-nums transition-all">
                      {vibrationVal}
                    </span>
                    <span className="text-[10px] font-montserrat font-semibold text-slate-400">
                      {vibrationUnit}
                    </span>
                  </div>
                </div>

                {/* 2: Oil / Fluid Level */}
                <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-roboto text-slate-500 mb-1">
                    <Droplets className="w-3 h-3 text-slate-400" />
                    <span className="truncate">Oil / Fluid Level</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold font-montserrat text-slate-900 tracking-tight tabular-nums transition-all">
                      {fluidVal}
                    </span>
                    <span className="text-[10px] font-montserrat font-semibold text-slate-400">
                      {fluidUnit}
                    </span>
                  </div>
                </div>

                {/* 3: Last Service Date */}
                <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-roboto text-slate-500 mb-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span className="truncate">Last Service Date</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold font-montserrat text-slate-900 truncate">
                      {serviceDate}
                    </span>
                  </div>
                </div>

                {/* 4: Health Score */}
                <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-roboto text-slate-500 mb-1">
                    <ShieldCheck className="w-3 h-3 text-slate-400" />
                    <span className="truncate">Health Score</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-base font-bold font-montserrat tracking-tight tabular-nums transition-all ${
                        healthScore < 80 ? "text-amber-600" : "text-slate-900"
                      }`}
                    >
                      {healthScore}
                    </span>
                    <span className="text-[10px] font-montserrat font-semibold text-slate-400">
                      {healthUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Next Scheduled Maintenance */}
              <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-200/70 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <CalendarClock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-roboto font-medium text-slate-500">
                    Next Scheduled Maintenance
                  </span>
                </div>
                <span className="text-[10px] font-montserrat font-semibold text-slate-700 truncate text-right tabular-nums">
                  {nextMaintenance}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button at Bottom */}
          <div className="pt-3">
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/80 rounded-lg text-xs font-montserrat font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Vitals</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

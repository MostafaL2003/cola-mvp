import React from "react";
import { CheckCircle2, Clock, Users } from "lucide-react";

export interface ShiftExecutionData {
  id: string;
  name: string;
  timeWindow: string;
  isActiveShift?: boolean;
  sku: string;
  packageType: string;
  producedUnits: number;
  targetUnits: number;
  percentage: number;
  status: "COMPLETED" | "RUNNING" | "QUEUED";
  lineLead: string;
}

export interface DailyShiftCardsProps {
  shifts: ShiftExecutionData[];
}

export default function DailyShiftCards({
  shifts = [],
}: DailyShiftCardsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold font-montserrat text-slate-800 tracking-tight">
            Daily Shift Execution
          </h2>
          <p className="text-xs font-roboto text-slate-500">
            Plant shift tracking &amp; operational batch progress
          </p>
        </div>
        <span className="text-xs font-medium font-montserrat bg-white px-2.5 py-1 rounded-md border border-slate-200/80 text-slate-600 shadow-2xs">
          3 Operating Shifts (24h)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {shifts.map((shift) => {
          const isCompleted = shift.status === "COMPLETED";
          const isRunning = shift.status === "RUNNING";
          const isQueued = shift.status === "QUEUED";

          return (
            <div
              key={shift.id}
              className={`bg-white rounded-xl border p-5 shadow-sm transition-all duration-200 flex flex-col justify-between relative ${
                shift.isActiveShift
                  ? "border-coke-red/40 ring-1 ring-coke-red/20 shadow-md"
                  : "border-gray-100 hover:border-slate-200"
              }`}
            >
              {shift.isActiveShift && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coke-red via-red-500 to-amber-500 rounded-t-xl" />
              )}

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold font-montserrat text-slate-900 tracking-tight">
                        {shift.name}
                      </h3>
                      {shift.isActiveShift && (
                        <span className="text-[10px] uppercase tracking-wider font-bold font-montserrat px-1.5 py-0.5 rounded bg-coke-red/10 text-coke-red">
                          Active Shift
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-roboto text-slate-500 mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{shift.timeWindow}</span>
                    </p>
                  </div>

                  {/* Status Pill */}
                  <div>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold font-montserrat px-2.5 py-1 rounded-full shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        COMPLETED
                      </span>
                    )}

                    {isRunning && (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold font-montserrat px-3 py-1 rounded-full shadow-xs">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        RUNNING
                      </span>
                    )}

                    {isQueued && (
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-200/80 text-xs font-semibold font-montserrat px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        QUEUED
                      </span>
                    )}
                  </div>
                </div>

                {/* SKU Information */}
                <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-montserrat">
                    Product SKU
                  </div>
                  <div className="text-sm font-semibold text-slate-800 font-montserrat mt-0.5 truncate">
                    {shift.sku}
                  </div>
                  <div className="text-xs text-slate-500 font-roboto mt-0.5">
                    Format: {shift.packageType}
                  </div>
                </div>

                {/* Progress Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-roboto">
                    <span className="text-slate-500 font-medium">
                      Progress:{" "}
                      <span className="text-slate-900 font-semibold font-montserrat">
                        {shift.producedUnits.toLocaleString()} /{" "}
                        {shift.targetUnits.toLocaleString()}
                      </span>{" "}
                      cans
                    </span>
                    <span
                      className={`font-bold font-montserrat text-sm ${
                        isCompleted
                          ? "text-emerald-600"
                          : isRunning
                            ? "text-coke-red"
                            : "text-slate-400"
                      }`}
                    >
                      {shift.percentage}%
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                    {isCompleted && (
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ width: "100%" }}
                      />
                    )}

                    {isRunning && (
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-coke-red via-red-500 to-amber-500 relative overflow-hidden transition-all duration-500 shadow-2xs"
                        style={{ width: `${shift.percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    )}

                    {isQueued && (
                      <div
                        className="h-full rounded-full bg-slate-200 transition-all duration-500"
                        style={{ width: "0%" }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-roboto">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lead: {shift.lineLead}</span>
                </span>
                <span className="font-montserrat font-medium text-slate-600">
                  {isCompleted
                    ? "Target Met (100%)"
                    : isRunning
                      ? "Pacing: 75k cans/hr"
                      : "Staging materials"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

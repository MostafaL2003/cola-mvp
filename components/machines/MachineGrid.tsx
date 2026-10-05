"use client";

import React from "react";
import MachineCard from "@/components/machines/MachineCard";
import { MachineData } from "@/types/mes";
import { useMachinesLiveTelemetry } from "@/hooks/useMachinesLiveTelemetry";

export interface MachineGridProps {
  machines?: MachineData[];
  className?: string;
}

const FALLBACK_MACHINES: MachineData[] = [
  {
    id: 1,
    name: "Depalletizer & Infeed Table",
    subtitle: "Automatic Sweep & Infeed",
    status: "running",
    vitals: {
      speed: { value: 56000, unit: "BPM" },
      cycleTime: { value: 1.05, unit: "sec" },
      operatingTemp: { value: 21.4, unit: "°C" },
      pressure: { value: 5.6, unit: "bar" },
      telemetryStatus: "Live stream nominal (100ms)",
    },
    maintenance: {
      motorVibration: { value: 1.12, unit: "mm/s" },
      oilFluidLevel: { value: 94, unit: "%" },
      lastServiceDate: "14 Sep 2026",
      healthScore: { value: 98, unit: "%" },
      nextScheduledMaintenance: "In 72h (Shift A)",
    },
  },
  {
    id: 2,
    name: "Rotary Rinser & Filler",
    subtitle: "Tri-Block Filling & Capping",
    status: "running",
    vitals: {
      speed: { value: 54200, unit: "BPM" },
      cycleTime: { value: 1.08, unit: "sec" },
      operatingTemp: { value: 4.2, unit: "°C" },
      pressure: { value: 4.6, unit: "bar" },
      telemetryStatus: "Isobaric flow nominal",
    },
    maintenance: {
      motorVibration: { value: 1.48, unit: "mm/s" },
      oilFluidLevel: { value: 88, unit: "%" },
      lastServiceDate: "02 Oct 2026",
      healthScore: { value: 94, unit: "%" },
      nextScheduledMaintenance: "In 48h (Shift C)",
    },
  },
  {
    id: 3,
    name: "High-Speed Sleeve Labeler",
    subtitle: "Rotary Applicator & Heat Tunnel",
    status: "running",
    vitals: {
      speed: { value: 54000, unit: "BPM" },
      cycleTime: { value: 1.09, unit: "sec" },
      operatingTemp: { value: 68.4, unit: "°C" },
      pressure: { value: 3.2, unit: "bar" },
      telemetryStatus: "Optical registration locked",
    },
    maintenance: {
      motorVibration: { value: 0.95, unit: "mm/s" },
      oilFluidLevel: { value: 91, unit: "%" },
      lastServiceDate: "20 Aug 2026",
      healthScore: { value: 96, unit: "%" },
      nextScheduledMaintenance: "In 96h (Shift B)",
    },
  },
  {
    id: 4,
    name: "Case Packer & Palletizer",
    subtitle: "Continuous Packer & Stretch Wrap",
    status: "running",
    vitals: {
      speed: { value: 52500, unit: "BPM" },
      cycleTime: { value: 1.12, unit: "sec" },
      operatingTemp: { value: 24.2, unit: "°C" },
      pressure: { value: 6.2, unit: "bar" },
      telemetryStatus: "Servo axis 1-4 position nominal",
    },
    maintenance: {
      motorVibration: { value: 2.15, unit: "mm/s" },
      oilFluidLevel: { value: 82, unit: "%" },
      lastServiceDate: "28 Sep 2026",
      healthScore: { value: 89, unit: "%" },
      nextScheduledMaintenance: "In 24h (Shift B)",
    },
  },
];

export default function MachineGrid({
  machines,
  className = "",
}: MachineGridProps) {
  const displayMachines =
    machines && machines.length > 0 ? machines : FALLBACK_MACHINES;
  const liveMachines = useMachinesLiveTelemetry(displayMachines);

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 ${className}`}
    >
      {liveMachines.map((machine, index) => (
        <MachineCard
          key={machine.id || index}
          machine={machine}
          id={machine.id || index + 1}
        />
      ))}
    </div>
  );
}

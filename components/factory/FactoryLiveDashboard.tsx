"use client";

import React from "react";
import TotalProductionCard from "@/components/factory/TotalProductionCard";
import PerformanceKpiCard from "@/components/factory/PerformanceKpiCard";
import UsageKpiCard from "@/components/factory/UsageKpiCard";
import LossTreeCard from "@/components/factory/LossTreeCard";
import TimelineBar from "@/components/factory/TimelineBar";
import CycleTimePanel from "@/components/factory/CycleTimePanel";
import { FactoryData } from "@/types/mes";
import { useFactoryLiveTelemetry } from "@/hooks/useFactoryLiveTelemetry";

export interface FactoryLiveDashboardProps {
  factory: FactoryData;
}

export default function FactoryLiveDashboard({
  factory,
}: FactoryLiveDashboardProps) {
  const { telemetryFactory } = useFactoryLiveTelemetry(factory);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <TotalProductionCard
            factory={telemetryFactory}
            className="col-span-12 sm:col-span-6 xl:col-span-3 order-1"
          />
          <PerformanceKpiCard
            factory={telemetryFactory}
            className="col-span-12 xl:col-span-6 order-2 sm:order-3 xl:order-2"
          />
          <UsageKpiCard
            factory={telemetryFactory}
            className="col-span-12 sm:col-span-6 xl:col-span-3 order-3 sm:order-2 xl:order-3"
          />
        </div>

        <LossTreeCard factory={telemetryFactory} />

        <TimelineBar factory={telemetryFactory} />
      </div>

      <div className="lg:col-span-1">
        <CycleTimePanel factory={telemetryFactory} />
      </div>
    </div>
  );
}

import React from "react";
import { notFound } from "next/navigation";
import { getAllFactories, getFactoryById } from "@/lib/data";
import TopBar from "@/components/TopBar";
import TotalProductionCard from "@/components/factory/TotalProductionCard";
import PerformanceKpiCard from "@/components/factory/PerformanceKpiCard";
import UsageKpiCard from "@/components/factory/UsageKpiCard";
import LossTreeCard from "@/components/factory/LossTreeCard";
import TimelineBar from "@/components/factory/TimelineBar";
import CycleTimePanel from "@/components/factory/CycleTimePanel";

export function generateStaticParams() {
  return getAllFactories().map((factory) => ({
    factoryId: factory.id,
  }));
}

export default async function FactoryDetailPage({
  params,
}: {
  params: Promise<{ factoryId: string }>;
}) {
  const { factoryId } = await params;
  const factory = getFactoryById(factoryId);

  if (!factory) {
    notFound();
  }

  const factories = getAllFactories();

  return (
    <div className="flex-1 flex flex-col min-h-full bg-slate-50">
      <TopBar factories={factories} currentFactoryId={factory.id} />

      <main className="p-4 sm:p-6 space-y-4">
        <h1 className="text-xl font-bold font-montserrat text-metric-label">
          {factory.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <TotalProductionCard
                factory={factory}
                className="col-span-12 sm:col-span-6 xl:col-span-3 order-1"
              />
              <PerformanceKpiCard
                factory={factory}
                className="col-span-12 xl:col-span-6 order-2 sm:order-3 xl:order-2"
              />
              <UsageKpiCard
                factory={factory}
                className="col-span-12 sm:col-span-6 xl:col-span-3 order-3 sm:order-2 xl:order-3"
              />
            </div>

            <LossTreeCard />

            <TimelineBar />
          </div>

          <div className="lg:col-span-1">
            <CycleTimePanel factory={factory} />
          </div>
        </div>
      </main>
    </div>
  );
}

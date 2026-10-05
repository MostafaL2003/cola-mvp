import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllFactories, getFactoryById, getLineById } from "@/lib/data";
import TopBar from "@/components/TopBar";
import TotalProductionCard from "@/components/factory/TotalProductionCard";
import PerformanceKpiCard from "@/components/factory/PerformanceKpiCard";
import UsageKpiCard from "@/components/factory/UsageKpiCard";
import CurrentActivityCard from "@/components/factory/CurrentActivityCard";
import TimelineBar from "@/components/factory/TimelineBar";
import CycleTimePanel from "@/components/factory/CycleTimePanel";
import { FactoryData } from "@/types/mes";

export function generateStaticParams() {
  const factories = getAllFactories();
  const params: Array<{ factoryId: string; lineId: string }> = [];

  for (const factory of factories) {
    for (const line of factory.lines) {
      params.push({
        factoryId: factory.id,
        lineId: line.id,
      });
    }
  }

  return params;
}

export default async function LineDetailPage({
  params,
}: {
  params: Promise<{ factoryId: string; lineId: string }>;
}) {
  const { factoryId, lineId } = await params;
  const factory = getFactoryById(factoryId);
  const line = getLineById(factoryId, lineId);

  if (!factory || !line) {
    notFound();
  }

  const factories = getAllFactories();

  const lineAsFactory: FactoryData = {
    ...factory,
    name: line.name,
    kpi: line.kpi,
    timeline: line.timeline,
    trendData: line.trendData,
  };

  return (
    <div className="flex-1 flex flex-col min-h-full bg-slate-50">
      <TopBar
        factories={factories}
        currentFactoryId={factory.id}
        lines={factory.lines}
        currentLineId={line.id}
      />

      <main className="p-4 sm:p-6 space-y-4">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <nav className="flex items-center gap-1.5 text-xs font-montserrat text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Factories
              </Link>
              <span>/</span>
              <Link
                href={`/${factory.id}`}
                className="hover:text-slate-900 transition-colors"
              >
                {factory.name}
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">{line.name}</span>
            </nav>

            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold font-montserrat text-metric-label">
                {line.name}
              </h1>
              <span
                className={`text-[11px] font-montserrat font-semibold px-2.5 py-0.5 rounded-full ${
                  line.status === "running"
                    ? "bg-emerald-100 text-emerald-800"
                    : line.status === "downtime"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-slate-100 text-slate-700"
                }`}
              >
                {line.type} • {line.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid Layout matching Factory page */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Left Column (3/4 width) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Top Row: KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <TotalProductionCard
                factory={lineAsFactory}
                className="col-span-12 sm:col-span-6 xl:col-span-3 order-1"
              />
              <PerformanceKpiCard
                factory={lineAsFactory}
                className="col-span-12 xl:col-span-6 order-2 sm:order-3 xl:order-2"
              />
              <UsageKpiCard
                factory={lineAsFactory}
                className="col-span-12 sm:col-span-6 xl:col-span-3 order-3 sm:order-2 xl:order-3"
              />
            </div>

            {/* Middle Row: Current Activity Card (Toggleable OEE / MTBF / UPTIME Chart) */}
            <CurrentActivityCard factory={lineAsFactory} />

            {/* Bottom Row: Timeline Bar */}
            <TimelineBar
              factory={factory}
              timeline={line.timeline}
              lineName={line.name}
            />
          </div>

          {/* Right Column: Shared Trend Panel (1/4 width) */}
          <div className="lg:col-span-1">
            <CycleTimePanel factory={lineAsFactory} />
          </div>
        </div>
      </main>
    </div>
  );
}

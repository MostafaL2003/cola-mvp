import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllFactories, getFactoryById, getLineById } from "@/lib/data";
import TopBar from "@/components/TopBar";
import LineLiveDashboard from "@/components/line/LineLiveDashboard";

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

        {/* Live Telemetry Dashboard */}
        <LineLiveDashboard factory={factory} line={line} />
      </main>
    </div>
  );
}


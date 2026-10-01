import React from "react";
import { notFound } from "next/navigation";
import { getAllFactories, getFactoryById } from "@/lib/data";
import TopBar from "@/components/TopBar";
import FactoryLiveDashboard from "@/components/factory/FactoryLiveDashboard";

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
      <TopBar
        factories={factories}
        currentFactoryId={factory.id}
        lines={factory.lines}
      />

      <main className="p-4 sm:p-6 space-y-4">
        <h1 className="text-xl font-bold font-montserrat text-metric-label">
          {factory.name}
        </h1>

        <FactoryLiveDashboard factory={factory} />
      </main>
    </div>
  );
}

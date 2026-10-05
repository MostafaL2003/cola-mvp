import React from "react";
import TopBar from "@/components/TopBar";
import { getAllFactories } from "@/lib/data";
import MachineGrid from "@/components/machines/MachineGrid";

export default async function MachinesPage({
  searchParams,
}: {
  searchParams: Promise<{ factoryId?: string; lineId?: string }>;
}) {
  const { factoryId: paramFactoryId, lineId: paramLineId } = await searchParams;
  const factories = getAllFactories();

  const currentFactory =
    factories.find((f) => f.id === paramFactoryId) || factories[0];
  const availableLines = currentFactory?.lines || [];
  const currentLine = paramLineId
    ? availableLines.find((l) => l.id === paramLineId)
    : availableLines[0];

  const currentFactoryId = currentFactory?.id;
  const currentLineId = currentLine?.id;
  const factoryName = currentFactory?.name || "All Factories";
  const lineName = currentLine?.name || "All Lines";

  return (
    <div className="flex-1 flex flex-col min-h-full bg-slate-50">
      <TopBar
        factories={factories}
        currentFactoryId={currentFactoryId}
        lines={availableLines}
        currentLineId={currentLineId}
      />

      <main className="p-6 md:p-8 space-y-6 max-w-[1920px] w-full mx-auto">
        {/* Header: [Factoryname] / [Line] */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-montserrat text-slate-900 tracking-tight flex flex-wrap items-center gap-2">
            <span>{factoryName}</span>
            <span className="text-slate-400 font-normal">/</span>
            <span className="text-slate-700">{lineName}</span>
          </h1>
        </div>

        {/* 4 Interactive Two-Face Machine Cards */}
        <MachineGrid machines={currentLine?.machines} />
      </main>
    </div>
  );
}

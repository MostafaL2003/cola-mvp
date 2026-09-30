import React from "react";
import { getAllFactories } from "@/lib/data";
import FactoryCard from "@/components/FactoryCard";
import TopBar from "@/components/TopBar";
import ViewToggle from "@/components/ViewToggle";

export default function DashboardPage() {
  const factories = getAllFactories();

  return (
    <div className="flex-1 flex flex-col min-h-full bg-slate-50">
      <TopBar factories={factories} />

      <main className="p-6 md:p-8 space-y-6 max-w-[1920px] w-full mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-base sm:text-lg font-montserrat">
            <span className="font-semibold text-slate-600">Dashboard</span>
            <span className="text-slate-400 font-normal">/</span>
            <span className="font-bold text-slate-900">Production</span>
          </div>

          <ViewToggle />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
          {factories.map((factory) => (
            <FactoryCard
              key={factory.id}
              id={factory.id}
              name={factory.name}
              kpi={factory.kpi}
              href={`/${factory.id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

"use client";

import React from "react";
import FactoryCard from "@/components/factory/FactoryCard";
import { FactoryData } from "@/types/mes";
import { useAllFactoriesLiveTelemetry } from "@/hooks/useAllFactoriesLiveTelemetry";

export interface FactoryGridClientProps {
  initialFactories: FactoryData[];
}

export default function FactoryGridClient({
  initialFactories,
}: FactoryGridClientProps) {
  const factories = useAllFactoriesLiveTelemetry(initialFactories);

  return (
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
  );
}

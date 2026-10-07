"use client";

import { useState, useEffect } from "react";
import { FactoryData } from "@/types/mes";

export function useAllFactoriesLiveTelemetry(
  initialFactories: FactoryData[]
): FactoryData[] {
  const [prevInitial, setPrevInitial] = useState(initialFactories);
  const [factories, setFactories] = useState<FactoryData[]>(initialFactories);

  if (initialFactories !== prevInitial) {
    setPrevInitial(initialFactories);
    setFactories(initialFactories);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const getJitter = () => {
        const sign = Math.random() < 0.5 ? -1 : 1;
        const percent = 0.01 + Math.random() * 0.01; // +/- 1% to 2%
        return sign * percent;
      };

      setFactories((prevFactories) =>
        prevFactories.map((factory) => {
          const jitterSpeed = getJitter();
          const jitterProd = getJitter();
          const jitterCycle = getJitter();
          const jitterOee = getJitter();
          const jitterSle = getJitter();
          const jitterUsle = getJitter();

          const nextSpeed = Math.round(
            Math.max(1000, factory.kpi.actualSpeed * (1 + jitterSpeed))
          );
          const nextProduction = Math.round(
            Math.max(1000, factory.kpi.actualProduction * (1 + jitterProd))
          );
          const nextCycle =
            Math.round(
              Math.max(0.4, factory.kpi.lastHourCycleTime * (1 + jitterCycle)) *
                100
            ) / 100;

          const nextOee = Math.min(
            99.9,
            Math.max(40, Math.round(factory.kpi.oee * (1 + jitterOee) * 10) / 10)
          );
          const nextSle = Math.min(
            99.9,
            Math.max(40, Math.round(factory.kpi.sle * (1 + jitterSle) * 10) / 10)
          );
          const nextUsle = Math.min(
            99.9,
            Math.max(
              40,
              Math.round(factory.kpi.usle * (1 + jitterUsle) * 10) / 10
            )
          );

          return {
            ...factory,
            kpi: {
              ...factory.kpi,
              actualSpeed: nextSpeed,
              actualProduction: nextProduction,
              lastHourCycleTime: nextCycle,
              oee: nextOee,
              sle: nextSle,
              usle: nextUsle,
            },
          };
        })
      );
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return factories;
}

"use client";

import { useState, useEffect, useMemo } from "react";
import { FactoryData, TrendDataPoint } from "@/types/mes";
import { sampleHourlyTrend } from "@/lib/data";

export interface UseFactoryLiveTelemetryReturn {
  cycleTime: number;
  speed: number;
  actualProduction: number;
  oee: number;
  sle: number;
  usle: number;
  trendData: TrendDataPoint[];
  telemetryFactory: FactoryData;
}

export function useFactoryLiveTelemetry(
  initialFactory: FactoryData
): UseFactoryLiveTelemetryReturn {
  const [cycleTime, setCycleTime] = useState<number>(
    initialFactory.kpi.lastHourCycleTime ?? 1.95
  );
  const [speed, setSpeed] = useState<number>(
    initialFactory.kpi.actualSpeed ?? 54200
  );
  const [actualProduction, setActualProduction] = useState<number>(
    initialFactory.kpi.actualProduction ?? 418500
  );
  const [oee, setOee] = useState<number>(initialFactory.kpi.oee ?? 84.6);
  const [sle, setSle] = useState<number>(initialFactory.kpi.sle ?? 91.4);
  const [usle, setUsle] = useState<number>(initialFactory.kpi.usle ?? 88.2);
  const [performance, setPerformance] = useState<number>(
    initialFactory.performanceKpi?.performance ?? 76
  );
  const [quality, setQuality] = useState<number>(
    initialFactory.performanceKpi?.quality ?? 94
  );

  const [trendData, setTrendData] = useState<TrendDataPoint[]>(() => {
    return initialFactory.trendData || sampleHourlyTrend;
  });

  // Re-sync if initialFactory changes
  useEffect(() => {
    setCycleTime(initialFactory.kpi.lastHourCycleTime ?? 1.95);
    setSpeed(initialFactory.kpi.actualSpeed ?? 54200);
    setActualProduction(initialFactory.kpi.actualProduction ?? 418500);
    setOee(initialFactory.kpi.oee ?? 84.6);
    setSle(initialFactory.kpi.sle ?? 91.4);
    setUsle(initialFactory.kpi.usle ?? 88.2);
    setPerformance(initialFactory.performanceKpi?.performance ?? 76);
    setQuality(initialFactory.performanceKpi?.quality ?? 94);
    setTrendData(initialFactory.trendData || sampleHourlyTrend);
  }, [initialFactory]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const getJitter = () => {
        const sign = Math.random() < 0.5 ? -1 : 1;
        const percent = 0.01 + Math.random() * 0.01; // +/- 1% to 2%
        return sign * percent;
      };

      // 1. Jitter cycleTime (seconds, 2 decimal places)
      setCycleTime((prev) => {
        const jitter = getJitter();
        const next = Math.max(0.5, prev * (1 + jitter));
        return Math.round(next * 100) / 100;
      });

      // 2. Jitter speed
      setSpeed((prev) => {
        const jitter = getJitter();
        return Math.round(Math.max(1000, prev * (1 + jitter)));
      });

      // 3. Jitter production
      setActualProduction((prev) => {
        const jitter = getJitter();
        return Math.round(Math.max(1000, prev * (1 + jitter)));
      });

      // 4. Jitter KPI percentages (OEE, SLE, USLE, Performance, Quality)
      setOee((prev) => {
        const jitter = getJitter();
        return Math.min(99.9, Math.max(40, Math.round(prev * (1 + jitter) * 10) / 10));
      });

      setSle((prev) => {
        const jitter = getJitter();
        return Math.min(99.9, Math.max(40, Math.round(prev * (1 + jitter) * 10) / 10));
      });

      setUsle((prev) => {
        const jitter = getJitter();
        return Math.min(99.9, Math.max(40, Math.round(prev * (1 + jitter) * 10) / 10));
      });

      setPerformance((prev) => {
        const jitter = getJitter();
        return Math.min(99.9, Math.max(30, Math.round(prev * (1 + jitter) * 10) / 10));
      });

      setQuality((prev) => {
        const jitter = getJitter();
        return Math.min(99.9, Math.max(40, Math.round(prev * (1 + jitter) * 10) / 10));
      });

      // 5. Shift trendData: append newest point and drop oldest so length stays constant
      setTrendData((prev) => {
        if (!prev || prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const jitter = getJitter();

        const nextCycle = Math.round(Math.max(0.5, last.cycleTime * (1 + jitter)) * 100) / 100;
        const nextSpeed = Math.round(Math.max(10000, last.speed * (1 + jitter)));
        const nextUptime = Math.min(
          100,
          Math.max(50, Math.round(last.uptime * (1 + jitter) * 10) / 10)
        );

        const [hoursStr, minsStr] = (last.time || "00:00").split(":");
        let hours = parseInt(hoursStr || "0", 10);
        let mins = parseInt(minsStr || "0", 10) + 30;
        if (mins >= 60) {
          mins = 0;
          hours = (hours + 1) % 24;
        }
        const timeLabel = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

        const newTrendPoint: TrendDataPoint = {
          time: timeLabel,
          cycleTime: nextCycle,
          speed: nextSpeed,
          uptime: nextUptime,
        };

        return [...prev.slice(1), newTrendPoint];
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const telemetryFactory = useMemo<FactoryData>(() => {
    return {
      ...initialFactory,
      kpi: {
        ...initialFactory.kpi,
        lastHourCycleTime: cycleTime,
        actualSpeed: speed,
        actualProduction,
        oee,
        sle,
        usle,
      },
      performanceKpi: initialFactory.performanceKpi
        ? {
            performance,
            quality,
          }
        : undefined,
      trendData,
    };
  }, [
    initialFactory,
    cycleTime,
    speed,
    actualProduction,
    oee,
    sle,
    usle,
    performance,
    quality,
    trendData,
  ]);

  return {
    cycleTime,
    speed,
    actualProduction,
    oee,
    sle,
    usle,
    trendData,
    telemetryFactory,
  };
}

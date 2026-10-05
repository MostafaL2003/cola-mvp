"use client";

import { useState, useEffect, useMemo } from "react";
import { ActivityDataPoint, LineData, TrendDataPoint } from "@/types/mes";
import { sampleActivityData, sampleHourlyTrend } from "@/lib/data";

export interface UseLiveTelemetryReturn {
  cycleTime: number;
  bph: number;
  activityTrend: ActivityDataPoint[];
  trendData: TrendDataPoint[];
  telemetryLine: LineData;
}

/**
 * Custom hook to simulate live telemetry data for an MES production line.
 * Stores dynamic cycleTime, bph (production rate), and activityTrend points in local state.
 * Fluctuate values by +/- 1-2% every 3 seconds and shifts chart points.
 */
export function useLiveTelemetry(
  initialLine: LineData,
): UseLiveTelemetryReturn {
  const initialCycleTime = useMemo(() => {
    return initialLine.kpi.lastHourCycleTime ?? 1.08;
  }, [initialLine.kpi.lastHourCycleTime]);

  const initialBph = useMemo(() => {
    return (
      initialLine.lineProduction?.ratePerHour ??
      initialLine.kpi.actualSpeed ??
      5000
    );
  }, [initialLine.lineProduction?.ratePerHour, initialLine.kpi.actualSpeed]);

  const initialTrend = useMemo<ActivityDataPoint[]>(() => {
    return sampleActivityData;
  }, []);

  const [cycleTime, setCycleTime] = useState<number>(initialCycleTime);
  const [bph, setBph] = useState<number>(initialBph);
  const [activityTrend, setActivityTrend] =
    useState<ActivityDataPoint[]>(initialTrend);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>(() => {
    return initialLine.trendData || sampleHourlyTrend;
  });

  // Reset state if initialLine changes
  useEffect(() => {
    setCycleTime(initialLine.kpi.lastHourCycleTime ?? 1.08);
    setBph(
      initialLine.lineProduction?.ratePerHour ??
        initialLine.kpi.actualSpeed ??
        5000,
    );
    setTrendData(initialLine.trendData || sampleHourlyTrend);
  }, [initialLine]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Small realistic jitter: +/- 1% to 2%
      const getJitter = () => {
        const sign = Math.random() < 0.5 ? -1 : 1;
        const percent = 0.01 + Math.random() * 0.01; // between 0.01 (1%) and 0.02 (2%)
        return sign * percent;
      };

      // 1. Jitter cycleTime (seconds, rounded to 2 decimal places)
      setCycleTime((prev) => {
        const jitter = getJitter();
        const next = Math.max(0.5, prev * (1 + jitter));
        return Math.round(next * 100) / 100;
      });

      // 2. Jitter bph (bottles per hour, rounded to whole integer)
      setBph((prev) => {
        const jitter = getJitter();
        const next = Math.max(1000, prev * (1 + jitter));
        return Math.round(next);
      });

      // 3. Update activityTrend: append newest point and drop oldest (constant length)
      setActivityTrend((prev) => {
        if (!prev || prev.length === 0) return prev;
        const last = prev[prev.length - 1];

        const jitterOee = getJitter();
        const jitterMtbf = getJitter();
        const jitterUptime = getJitter();

        const nextOee = Math.min(
          99.9,
          Math.max(40, Math.round(last.oee * (1 + jitterOee) * 10) / 10),
        );
        const nextMtbf = Math.max(50, Math.round(last.mtbf * (1 + jitterMtbf)));
        const nextUptime = Math.min(
          100,
          Math.max(40, Math.round(last.uptime * (1 + jitterUptime) * 10) / 10),
        );

        // Advance time label
        const [hoursStr, minsStr] = (last.time || "00:00").split(":");
        let hours = parseInt(hoursStr || "0", 10);
        let mins = parseInt(minsStr || "0", 10) + 15;
        if (mins >= 60) {
          mins = 0;
          hours = (hours + 1) % 24;
        }
        const timeLabel = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

        const newPoint: ActivityDataPoint = {
          id: `live-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          date: last.date,
          time: timeLabel,
          oee: nextOee,
          mtbf: nextMtbf,
          uptime: nextUptime,
        };

        return [...prev.slice(1), newPoint];
      });

      // 4. Update trendData (cycle time, speed, uptime sparklines)
      setTrendData((prev) => {
        if (!prev || prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const jitter = getJitter();

        const nextCycle =
          Math.round(Math.max(0.5, last.cycleTime * (1 + jitter)) * 100) / 100;
        const nextSpeed = Math.round(
          Math.max(10000, last.speed * (1 + jitter)),
        );
        const nextUptime = Math.min(
          100,
          Math.max(50, Math.round(last.uptime * (1 + jitter) * 10) / 10),
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

  const telemetryLine = useMemo<LineData>(() => {
    return {
      ...initialLine,
      kpi: {
        ...initialLine.kpi,
        actualSpeed: bph,
        lastHourCycleTime: cycleTime,
      },
      lineProduction: initialLine.lineProduction
        ? {
            ...initialLine.lineProduction,
            ratePerHour: bph,
          }
        : undefined,
      trendData,
    };
  }, [initialLine, bph, cycleTime, trendData]);

  return {
    cycleTime,
    bph,
    activityTrend,
    trendData,
    telemetryLine,
  };
}

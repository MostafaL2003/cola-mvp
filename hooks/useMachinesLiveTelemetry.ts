"use client";

import { useState, useEffect, useMemo } from "react";
import { MachineData } from "@/types/mes";

/**
 * Custom hook to simulate live telemetry data for an array of machines.
 * Fluctuate values by realistic jitter (+/- 1-2% for speed/cycle, small delta for temp/pressure/vibration) every 3 seconds.
 */
export function useMachinesLiveTelemetry(
  initialMachines: MachineData[]
): MachineData[] {
  // Serialize IDs to only reset when switching to a different line or factory
  const machinesKey = useMemo(() => {
    return (initialMachines || []).map((m) => `${m.id}-${m.status}`).join("|");
  }, [initialMachines]);

  const [prevKey, setPrevKey] = useState(machinesKey);
  const [machines, setMachines] = useState<MachineData[]>(initialMachines);

  if (machinesKey !== prevKey) {
    setPrevKey(machinesKey);
    setMachines(initialMachines);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const getJitter = () => {
        const sign = Math.random() < 0.5 ? -1 : 1;
        const percent = 0.008 + Math.random() * 0.014; // ~0.8% - 2.2%
        return sign * percent;
      };

      setMachines((prevMachines) => {
        if (!prevMachines || prevMachines.length === 0) return prevMachines;

        return prevMachines.map((machine) => {
          // If machine is not running, keep status-appropriate values
          if (machine.status === "downtime") {
            return {
              ...machine,
              vitals: {
                ...machine.vitals,
                speed: { ...machine.vitals.speed, value: 0 },
                cycleTime: { ...machine.vitals.cycleTime, value: 0 },
                pressure: { ...machine.vitals.pressure, value: 0.8 },
                operatingTemp: { ...machine.vitals.operatingTemp, value: 20.0 },
              },
              maintenance: {
                ...machine.maintenance,
                motorVibration: {
                  ...machine.maintenance.motorVibration,
                  value: 0.04,
                },
              },
            };
          }

          if (machine.status === "idle") {
            return {
              ...machine,
              vitals: {
                ...machine.vitals,
                speed: { ...machine.vitals.speed, value: 0 },
                cycleTime: { ...machine.vitals.cycleTime, value: 0 },
                pressure: { ...machine.vitals.pressure, value: 1.2 },
                operatingTemp: { ...machine.vitals.operatingTemp, value: 21.0 },
              },
              maintenance: {
                ...machine.maintenance,
                motorVibration: {
                  ...machine.maintenance.motorVibration,
                  value: 0.08,
                },
              },
            };
          }

          // Machine is RUNNING - apply realistic live telemetry fluctuations
          const jitterSpeed = getJitter();
          const jitterCycle = getJitter();

          // 1. Speed jitter (units/hour or BPM)
          const baseSpeed = machine.vitals?.speed?.value || 54000;
          const nextSpeed = Math.round(
            Math.max(1000, baseSpeed * (1 + jitterSpeed))
          );

          // 2. Cycle Time jitter (seconds, rounded to 2 decimals)
          const baseCycle = machine.vitals?.cycleTime?.value || 1.08;
          const nextCycle =
            Math.round(
              Math.max(0.4, baseCycle * (1 + jitterCycle)) * 100
            ) / 100;

          // 3. Operating Temp jitter (+/- 0.1°C to 0.3°C, rounded to 1 decimal)
          const baseTemp = machine.vitals?.operatingTemp?.value || 21.4;
          const tempDelta = (Math.random() - 0.5) * 0.4;
          const nextTemp =
            Math.round(Math.max(0, baseTemp + tempDelta) * 10) / 10;

          // 4. Pressure jitter (+/- 0.05 to 0.12 bar, rounded to 1 decimal)
          const basePressure = machine.vitals?.pressure?.value || 5.2;
          const pressDelta = (Math.random() - 0.5) * 0.16;
          const nextPressure =
            Math.round(Math.max(0.5, basePressure + pressDelta) * 10) / 10;

          // 5. Motor Vibration jitter (+/- 0.02 to 0.05 mm/s, rounded to 2 decimals)
          const baseVib = machine.maintenance?.motorVibration?.value || 1.25;
          const vibDelta = (Math.random() - 0.5) * 0.06;
          const nextVib =
            Math.round(Math.max(0.1, baseVib + vibDelta) * 100) / 100;

          // 6. Dynamic ping in telemetryStatus if present
          let nextTelemetryStatus = machine.vitals?.telemetryStatus;
          if (nextTelemetryStatus && nextTelemetryStatus.includes("ms)")) {
            const nextPing = Math.floor(92 + Math.random() * 20);
            nextTelemetryStatus = nextTelemetryStatus.replace(
              /\(\d+ms\)/,
              `(${nextPing}ms)`
            );
          }

          return {
            ...machine,
            vitals: {
              ...machine.vitals,
              speed: {
                ...machine.vitals.speed,
                value: nextSpeed,
              },
              cycleTime: {
                ...machine.vitals.cycleTime,
                value: nextCycle,
              },
              operatingTemp: {
                ...machine.vitals.operatingTemp,
                value: nextTemp,
              },
              pressure: {
                ...machine.vitals.pressure,
                value: nextPressure,
              },
              telemetryStatus: nextTelemetryStatus,
            },
            maintenance: {
              ...machine.maintenance,
              motorVibration: {
                ...machine.maintenance.motorVibration,
                value: nextVib,
              },
            },
          };
        });
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return machines;
}

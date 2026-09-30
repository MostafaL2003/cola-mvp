import { MetricTrendPoint } from "@/types/mes";

export function generateTabbedMetrics(
  baseOe: number,
  baseMtbf: number,
  baseUptime: number,
): {
  oe: MetricTrendPoint[];
  mtbf: MetricTrendPoint[];
  uptime: MetricTrendPoint[];
} {
  return {
    oe: [
      { time: "Mon", value: baseOe - 2.5, target: 85 },
      { time: "Tue", value: baseOe - 1.0, target: 85 },
      { time: "Wed", value: baseOe + 1.2, target: 85 },
      { time: "Thu", value: baseOe + 0.4, target: 85 },
      { time: "Fri", value: baseOe + 2.1, target: 85 },
      { time: "Sat", value: baseOe - 0.8, target: 85 },
      { time: "Sun", value: baseOe + 1.5, target: 85 },
    ],
    mtbf: [
      { time: "Mon", value: baseMtbf - 15, target: 180 },
      { time: "Tue", value: baseMtbf - 8, target: 180 },
      { time: "Wed", value: baseMtbf + 12, target: 180 },
      { time: "Thu", value: baseMtbf + 5, target: 180 },
      { time: "Fri", value: baseMtbf + 22, target: 180 },
      { time: "Sat", value: baseMtbf - 2, target: 180 },
      { time: "Sun", value: baseMtbf + 18, target: 180 },
    ],
    uptime: [
      { time: "Mon", value: baseUptime - 1.8, target: 95 },
      { time: "Tue", value: baseUptime - 0.5, target: 95 },
      { time: "Wed", value: baseUptime + 1.0, target: 95 },
      { time: "Thu", value: baseUptime + 0.2, target: 95 },
      { time: "Fri", value: baseUptime + 1.8, target: 95 },
      { time: "Sat", value: baseUptime - 0.4, target: 95 },
      { time: "Sun", value: baseUptime + 1.1, target: 95 },
    ],
  };
}

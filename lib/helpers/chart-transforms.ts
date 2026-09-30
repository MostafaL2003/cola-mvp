export interface TrendPoint {
  v: number;
}

export interface MetricSummary {
  avg: string | number;
  min: string | number;
  max: string | number;
}

export function normalizeTrend(
  values: number[],
  targetMin = 0.35,
  targetMax = 2.0,
): TrendPoint[] {
  if (!values.length) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values.map((val) => ({
    v: targetMin + ((val - min) / range) * (targetMax - targetMin),
  }));
}

export function normalizeCycleTime(
  values: number[],
  maxReference = 4.6,
): TrendPoint[] {
  if (!values.length) return [];
  return values.map((val) => ({
    v: Math.max(0.28, Math.min(2.15, (val / maxReference) * 1.85 + 0.2)),
  }));
}

export function calculateCycleTimeMetrics(values: number[]): MetricSummary {
  if (!values.length) {
    return { avg: "1.0", min: "0.5", max: "2.0" };
  }
  const sum = values.reduce((acc, val) => acc + val, 0);
  return {
    avg: (sum / values.length).toFixed(1),
    min: Math.min(...values).toFixed(1),
    max: Math.max(...values).toFixed(1),
  };
}

export function calculateSpeedMetrics(values: number[]): MetricSummary {
  if (!values.length) {
    return { avg: "1.0", min: "0.5", max: "2.0" };
  }
  const sum = values.reduce((acc, val) => acc + val, 0);
  return {
    avg: (sum / values.length / 50000).toFixed(1),
    min: (Math.min(...values) / 50000).toFixed(1),
    max: (Math.max(...values) / 50000).toFixed(1),
  };
}

export function calculateUptimeMetrics(values: number[]): MetricSummary {
  if (!values.length) {
    return { avg: "1.0", min: "0.5", max: "2.0" };
  }
  const sum = values.reduce((acc, val) => acc + val, 0);
  return {
    avg: (sum / values.length / 95).toFixed(1),
    min: ((Math.min(...values) / 95) * 0.5).toFixed(1),
    max: ((Math.max(...values) / 95) * 2.0).toFixed(1),
  };
}

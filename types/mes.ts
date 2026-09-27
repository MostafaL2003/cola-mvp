export interface KPICardData {
  factoryName: string;
  actualSpeed: number; // e.g. units/hour or BPM
  actualProduction: number;
  lastHourCycleTime: number; // seconds
  activeLinesRatio: {
    active: number;
    total: number;
  };
  oee: number; // percentage (0 - 100)
  sle: number; // percentage (0 - 100)
  usle: number; // percentage (0 - 100)
  productionVolume: number;
  productionQuality: number; // percentage (0 - 100)
}

export type LossTreeReasonName =
  | "Breakdown"
  | "Cleansing process"
  | "Change over time"
  | "Idle"
  | "Minor stops";

export interface LossTreeReason {
  name: LossTreeReasonName;
  percentage: number;
  durationMinutes: number;
}

export interface LossTreeData {
  onPercentage: number;
  offPercentage: number;
  qualityLossPercentage: number;
  speedLossPercentage: number;
  reasons: LossTreeReason[];
}

export type TimelineStatus = "ON" | "OFF" | "IDLE";

export interface TimelineSegment {
  id: string;
  startTime: string;
  endTime: string;
  status: TimelineStatus; // ON = running (green), OFF = downtime (red), IDLE = idle (gray)
  durationMinutes: number;
  reason?: string;
}

export interface TrendDataPoint {
  time: string;
  cycleTime: number; // seconds
  speed: number; // BPM or units/hour
  uptime: number; // percentage
}

export interface MetricTrendPoint {
  time: string;
  value: number;
  target?: number;
}

export interface LineData {
  id: string;
  factoryId: string;
  name: string;
  type: string;
  status: "running" | "downtime" | "idle";
  kpi: KPICardData;
  timeline: TimelineSegment[];
  tabbedMetrics: {
    oe: MetricTrendPoint[];
    mtbf: MetricTrendPoint[];
    uptime: MetricTrendPoint[];
  };
  trendData: TrendDataPoint[];
}

export interface FactoryData {
  id: string;
  name: string;
  location: string;
  kpi: KPICardData;
  lossTree: LossTreeData;
  timeline: TimelineSegment[];
  trendData: TrendDataPoint[];
  lines: LineData[];
}

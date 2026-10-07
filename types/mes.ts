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

export interface TimelineStatistics {
  uptimePercentage: number;
  downtimePercentage: number;
  scheduledDowntimePercentage: number;
  uptimeMinutes?: number;
  downtimeMinutes?: number;
  scheduledDowntimeMinutes?: number;
}

export interface TrendDataPoint {
  time: string;
  cycleTime: number; // seconds
  speed: number; // BPM or units/hour
  uptime: number; // percentage
}

export interface ActivityDataPoint {
  id: string;
  date: string;
  time: string;
  oee: number;
  mtbf: number;
  uptime: number;
}

export interface MetricTrendPoint {
  time: string;
  value: number;
  target?: number;
}

export interface LineProductionData {
  ratePerHour: number;
  rateUnit?: string;
  actualProduction: number;
  actualUnit?: string;
  yieldPercentage: number;
  yieldLabel?: string;
}

export interface LinePerformanceData {
  oee: number;
  availability: number;
  performance: number;
  quality: number;
}

export interface PowerMetricItem {
  value: number | string;
  unit?: string;
  label: string;
}

export interface LinePowerData {
  energyUsed?: number | string;
  energyUnit?: string;
  powerFactor?: number | string;
  secondaryEnergyUsed?: number | string;
  secondaryEnergyUnit?: string;
  metrics?: PowerMetricItem[];
}

export interface MachineOperationalVitals {
  speed: {
    value: number;
    unit: string;
  };
  cycleTime: {
    value: number;
    unit: string;
  };
  operatingTemp: {
    value: number;
    unit: string;
  };
  pressure: {
    value: number;
    unit: string;
  };
  telemetryStatus: string;
}

export interface MachineDiagnosticsMaintenance {
  motorVibration: {
    value: number;
    unit: string;
  };
  oilFluidLevel: {
    value: number;
    unit: string;
  };
  lastServiceDate: string;
  healthScore: {
    value: number;
    unit: string;
  };
  nextScheduledMaintenance: string;
}

export interface MachineData {
  id: string | number;
  name: string;
  subtitle?: string;
  status: "running" | "downtime" | "idle";
  vitals: MachineOperationalVitals;
  maintenance: MachineDiagnosticsMaintenance;
}

export interface LineData {
  id: string;
  factoryId: string;
  name: string;
  type: string;
  status: "running" | "downtime" | "idle";
  kpi: KPICardData;
  lineProduction?: LineProductionData;
  linePerformance?: LinePerformanceData;
  powerKpi?: LinePowerData;
  machines?: MachineData[];
  timeline: TimelineSegment[];
  tabbedMetrics: {
    oe: MetricTrendPoint[];
    mtbf: MetricTrendPoint[];
    uptime: MetricTrendPoint[];
  };
  shifts?: Shift[];
  workOrders?: WorkOrder[];
  trendData: TrendDataPoint[];
}

export type ShiftStatus = "COMPLETED" | "RUNNING" | "QUEUED";

export interface Shift {
  id: string;
  name: string;
  timeWindow: string;
  isActiveShift?: boolean;
  sku: string;
  packageType: string;
  producedUnits: number;
  targetUnits: number;
  percentage: number;
  status: ShiftStatus;
  lineLead: string;
}

export type WorkOrderStatus =
  | "COMPLETED"
  | "IN PRODUCTION"
  | "SCHEDULED"
  | "PENDING";

export type WorkOrderStatusFilter = "ALL" | WorkOrderStatus;

export interface WorkOrder {
  id: string;
  productSku: string;
  format: string;
  plannedTarget: number;
  timeWindow: string;
  lineSequence: string[];
  status: WorkOrderStatus;
  assignedLine?: string;
}

export interface WorkOrderDraft {
  productSku: string;
  plannedTarget: number;
  timeWindow: string;
  lineSequence: string[];
  status: WorkOrderStatus;
}


export interface TotalProductionData {
  bottles: number;
  packs: number;
  pallets: number;
}

export interface UsageMetric {
  perLiter: number;
  perBottle: number;
  unit: string;
}

export interface UsageKpiData {
  energy: UsageMetric;
  water: UsageMetric;
}

export interface FactoryData {
  id: string;
  name: string;
  location: string;
  kpi: KPICardData;
  totalProduction?: TotalProductionData;
  performanceKpi?: {
    performance: number;
    quality: number;
  };
  usageKpi?: UsageKpiData;
  lossTree: LossTreeData;
  timeline: TimelineSegment[];
  timelineStats?: TimelineStatistics;
  activityData?: ActivityDataPoint[];
  trendData: TrendDataPoint[];
  lines: LineData[];
}

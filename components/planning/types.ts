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
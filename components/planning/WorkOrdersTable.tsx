"use client";

import React from "react";
import {
  CheckCircle2,
  Clock,
  Filter,
  Layers,
  Search,
  X,
} from "lucide-react";
import type {
  WorkOrder,
  WorkOrderStatusFilter,
} from "@/components/planning/types";

const statusFilters: WorkOrderStatusFilter[] = [
  "ALL",
  "IN PRODUCTION",
  "SCHEDULED",
  "COMPLETED",
  "PENDING",
];

const statusLabels: Record<WorkOrderStatusFilter, string> = {
  ALL: "All Batches",
  "IN PRODUCTION": "In Production",
  SCHEDULED: "Scheduled",
  COMPLETED: "Completed",
  PENDING: "Pending",
};

interface WorkOrdersTableProps {
  orders: WorkOrder[];
  searchQuery: string;
  statusFilter: WorkOrderStatusFilter;
  onSearchQueryChange: (query: string) => void;
  onStatusFilterChange: (status: WorkOrderStatusFilter) => void;
}

export default function WorkOrdersTable({
  orders,
  searchQuery,
  statusFilter,
  onSearchQueryChange,
  onStatusFilterChange,
}: WorkOrdersTableProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200/60 w-fit">
          {statusFilters.map((tab) => {
            const isActive = statusFilter === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => onStatusFilterChange(tab)}
                className={`px-2.5 py-1 text-xs font-montserrat transition-all rounded-md cursor-pointer ${
                  isActive
                    ? "bg-white font-bold text-slate-900 shadow-2xs border border-slate-200/50"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {statusLabels[tab]}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Search Batch ID or SKU..."
            className="w-full pl-9 pr-3 py-1.5 text-xs font-roboto bg-slate-50/70 border border-slate-200/80 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-coke-red/40 focus:border-coke-red/50 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchQueryChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200/80">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold font-montserrat uppercase tracking-wider text-slate-600">
              <th className="py-3 px-4">Batch ID</th>
              <th className="py-3 px-4">Product SKU</th>
              <th className="py-3 px-4">Planned Target</th>
              <th className="py-3 px-4">Time Window</th>
              <th className="py-3 px-4">Line Sequence</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-roboto">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Filter className="w-6 h-6 text-slate-300" />
                    <p className="text-sm font-montserrat font-medium text-slate-600">
                      No matching work orders found
                    </p>
                    <p className="text-xs text-slate-400">
                      Try clearing your search query or status filter.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isCompleted = order.status === "COMPLETED";
                const isInProduction = order.status === "IN PRODUCTION";
                const isScheduled = order.status === "SCHEDULED";
                const isPending = order.status === "PENDING";

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold font-montserrat text-slate-900 whitespace-nowrap">
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200/60 font-mono text-[11px]">
                        {order.id}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold font-montserrat text-slate-900">
                        {order.productSku}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {order.format}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold font-montserrat text-slate-800">
                        {order.plannedTarget.toLocaleString()}
                      </span>{" "}
                      <span className="text-slate-500 text-[11px]">cans</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{order.timeWindow}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-[11px] font-montserrat text-slate-700 flex-wrap">
                        {order.lineSequence.map((step, index) => (
                          <React.Fragment key={index}>
                            <span className="bg-slate-100/90 text-slate-700 px-2 py-0.5 rounded border border-slate-200/50 font-medium">
                              {step}
                            </span>
                            {index < order.lineSequence.length - 1 && (
                              <span className="text-slate-400 font-bold px-0.5">
                                →
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold font-montserrat text-[11px] px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          COMPLETED
                        </span>
                      )}
                      {isInProduction && (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white font-semibold font-montserrat text-[11px] px-3 py-1 rounded-full shadow-xs">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                          </span>
                          IN PRODUCTION
                        </span>
                      )}
                      {isScheduled && (
                        <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 border border-sky-200/80 font-semibold font-montserrat text-[11px] px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3 text-sky-600" />
                          SCHEDULED
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-200/80 font-semibold font-montserrat text-[11px] px-2.5 py-1 rounded-full">
                          PENDING
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-roboto gap-2 pt-1">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span>Line A Scheduled Capacity: 1,680,000 cans / 24h</span>
        </div>
        <div className="text-slate-400 text-[11px]">
          MES Planning Engine • Synchronized with Factory Automation
        </div>
      </div>
    </>
  );
}
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CreateOrderModal from "@/components/planning/CreateOrderModal";
import WorkOrdersTable from "@/components/planning/WorkOrdersTable";
import type {
  WorkOrder,
  WorkOrderDraft,
  WorkOrderStatusFilter,
} from "@/components/planning/types";

interface WorkOrdersCardProps {
  initialOrders: WorkOrder[];
  lineName?: string;
}

export default function WorkOrdersCard({
  initialOrders = [],
  lineName = "Active Line",
}: WorkOrdersCardProps) {
  const [orders, setOrders] = useState<WorkOrder[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<WorkOrderStatusFilter>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(normalizedQuery) ||
      order.productSku.toLowerCase().includes(normalizedQuery) ||
      order.timeWindow.toLowerCase().includes(normalizedQuery);
    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateOrder = (draft: WorkOrderDraft) => {
    const nextNumber = 9020 + orders.length + 1;
    const createdOrder: WorkOrder = {
      id: `#WO-${nextNumber}`,
      productSku: draft.productSku,
      format: draft.productSku.split(" ").slice(-2).join(" ") || "Standard Format",
      plannedTarget: draft.plannedTarget,
      timeWindow: draft.timeWindow,
      lineSequence: draft.lineSequence,
      status: draft.status,
      assignedLine: lineName,
    };

    setOrders((previousOrders) => [...previousOrders, createdOrder]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold font-montserrat text-slate-900 tracking-tight">
              Scheduled Production Batches
            </h2>
            <span className="text-xs font-montserrat font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "Batch" : "Batches"}
            </span>
          </div>
          <p className="text-xs font-roboto text-slate-500 mt-0.5">
            Real-time shop floor execution queue &amp; dispatch schedule
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 font-montserrat text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-600" />
            <span>Create Work Order</span>
          </button>
        </div>
      </div>

      <WorkOrdersTable
        orders={filteredOrders}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchQueryChange={setSearchQuery}
        onStatusFilterChange={setStatusFilter}
      />

      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateOrder={handleCreateOrder}
        lineName={lineName}
      />
    </div>
  );
}
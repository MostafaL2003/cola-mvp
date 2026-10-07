"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type {
  WorkOrderDraft,
  WorkOrderStatus,
} from "@/components/planning/types";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (order: WorkOrderDraft) => void;
  lineName?: string;
}

export default function CreateOrderModal({
  isOpen,
  onClose,
  onCreateOrder,
  lineName = "Line A",
}: CreateOrderModalProps) {
  const [newSku, setNewSku] = useState("Coca-Cola Original 330ml Can");
  const [newTarget, setNewTarget] = useState(300000);
  const [newTimeWindow, setNewTimeWindow] = useState(
    "06:00 - 14:00 (+3 Days)",
  );
  const [newStatus, setNewStatus] =
    useState<WorkOrderStatus>("SCHEDULED");
  const [newSequence, setNewSequence] = useState(
    "Infeed → Filler → Pack",
  );

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sequenceSteps = newSequence
      .split("→")
      .map((step) => step.trim())
      .filter(Boolean);

    onCreateOrder({
      productSku: newSku,
      plannedTarget: Number(newTarget) || 250000,
      timeWindow: newTimeWindow,
      lineSequence:
        sequenceSteps.length > 0
          ? sequenceSteps
          : ["Infeed", "Filler", "Pack"],
      status: newStatus,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold font-montserrat text-slate-900">
              Create Production Work Order
            </h3>
            <p className="text-xs font-roboto text-slate-500">
              Assign new production batch to {lineName} schedule
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-roboto">
          <div>
            <label className="block font-semibold font-montserrat text-slate-700 mb-1">
              Product SKU
            </label>
            <select
              value={newSku}
              onChange={(event) => setNewSku(event.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-coke-red/40 focus:outline-none"
            >
              <option value="Coca-Cola Original 330ml Can">
                Coca-Cola Original 330ml Can
              </option>
              <option value="Coca-Cola Zero Sugar 330ml Can">
                Coca-Cola Zero Sugar 330ml Can
              </option>
              <option value="Sprite Lemon-Lime 330ml Can">
                Sprite Lemon-Lime 330ml Can
              </option>
              <option value="Fanta Orange 330ml Can">
                Fanta Orange 330ml Can
              </option>
              <option value="Coca-Cola Cherry 330ml Can">
                Coca-Cola Cherry 330ml Can
              </option>
              <option value="Kinley Tonic Water 330ml Can">
                Kinley Tonic Water 330ml Can
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold font-montserrat text-slate-700 mb-1">
                Planned Target (Cans)
              </label>
              <input
                type="number"
                value={newTarget}
                onChange={(event) => setNewTarget(Number(event.target.value))}
                min={10000}
                step={10000}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-coke-red/40 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold font-montserrat text-slate-700 mb-1">
                Initial Status
              </label>
              <select
                value={newStatus}
                onChange={(event) =>
                  setNewStatus(event.target.value as WorkOrderStatus)
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-coke-red/40 focus:outline-none"
              >
                <option value="SCHEDULED">SCHEDULED (Soft Blue)</option>
                <option value="PENDING">PENDING (Gray)</option>
                <option value="IN PRODUCTION">
                  IN PRODUCTION (Green Pill)
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold font-montserrat text-slate-700 mb-1">
              Time Window
            </label>
            <input
              type="text"
              value={newTimeWindow}
              onChange={(event) => setNewTimeWindow(event.target.value)}
              placeholder="e.g. 06:00 - 14:00 (+2 Days)"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-coke-red/40 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold font-montserrat text-slate-700 mb-1">
              Line Sequence
            </label>
            <input
              type="text"
              value={newSequence}
              onChange={(event) => setNewSequence(event.target.value)}
              placeholder="Infeed → Filler → Pack"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:ring-1 focus:ring-coke-red/40 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-montserrat font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-brand-navy hover:bg-brand-navy/90 text-white px-4 py-2 text-xs font-montserrat font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Create Work Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";

export default function ViewToggle() {
  const [activeTab, setActiveTab] = useState<"SKU" | "Production">(
    "Production",
  );

  return (
    <div className="bg-white border border-slate-200/80 rounded-lg p-1 shadow-sm flex items-center gap-1">
      <button
        type="button"
        onClick={() => setActiveTab("SKU")}
        className={`px-3.5 py-1 text-xs font-montserrat transition-all rounded-md cursor-pointer ${
          activeTab === "SKU"
            ? "bg-[#F40009] text-white font-semibold shadow-xs"
            : "text-slate-500 hover:text-slate-800 font-medium"
        }`}
      >
        SKU
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("Production")}
        className={`px-3.5 py-1 text-xs font-montserrat transition-all rounded-md cursor-pointer ${
          activeTab === "Production"
            ? "bg-[#F40009] text-white font-semibold shadow-xs"
            : "text-slate-500 hover:text-slate-800 font-medium"
        }`}
      >
        Production
      </button>
    </div>
  );
}

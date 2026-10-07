# Coca-Cola MES — Manufacturing Execution System

A modern, high-performance industrial IoT & Manufacturing Execution System (MES) web application designed for Coca-Cola bottling and canning facilities worldwide. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

🌐 **Live Demo**: [https://cola-mvp.vercel.app](https://cola-mvp.vercel.app)

---

## 🌟 Overview

The **Coca-Cola MES MVP** delivers real-time visibility into shop-floor operations across multi-facility bottling and canning networks. It bridges plant-level telemetry, production planning, machine health diagnostics, and enterprise KPI tracking into a cohesive, high-density industrial dashboard.

---

## 🚀 Key Modules & Features

### 1. Global Multi-Plant Dashboard (`/`)
- **Global Overview**: Real-time performance tracking across international bottling hubs (**Atlanta**, **Berlin**, **Tokyo**, **London**, **Mexico City**, **São Paulo**, **Madrid**, and **Sydney**).
- **High-Density KPI Cards**:
  - Actual Speed (units/hr or BPM) and actual production counters.
  - Active line ratios and last-hour cycle times.
  - Circular SVG KPI dials for **OEE** (Overall Equipment Effectiveness), **SLE** (Speed Loss Efficiency), and **USLE** (Unscheduled Speed Loss Efficiency).
  - Production volume and quality compliance percentages.
- **View Modes**: Interactive toggle between responsive grid cards and a high-density summary table.

### 2. Factory Detail Analytics (`/[factoryId]`)
- **Plant KPI Summary**: Expanded cards displaying Total Production (bottles, packs, pallets), Performance vs Quality scores, and Energy & Water resource efficiency.
- **Root Cause Loss Tree**: Interactive breakdown visualizing operational losses across 5 industrial categories:
  - Breakdown
  - Cleansing process
  - Change over time
  - Idle
  - Minor stops
- **Production Timeline**: Horizontal timeline bar rendering real-time machine states:
  - 🟢 **Running** (`#22c55e`)
  - 🔴 **Downtime / Breakdown** (`#ef4444`)
  - ⚪ **Idle / Changeover** (`#6b7280`)
- **Shared 24h Trend Charts**: Recharts line charts for **Cycle Time (s)**, **Line Speed (BPM)**, and **Uptime (%)**.

### 3. Single-Line Telemetry Deep Dive (`/[factoryId]/[lineId]`)
- **Line-Level Granularity**: Focused metrics for specialized lines (e.g., *Line A — 330ml Euro Can*, *Line B — 500ml rPET*).
- **Tabbed Metric Analytics**: Interactive tabbed toggle between **OE**, **MTBF** (Mean Time Between Failures), and **Uptime** time-series data.
- **Live Telemetry Simulation**: Real-time data feed simulation with live activity indicators.

### 4. Equipment Vitals & Diagnostics (`/machines`)
- **Interactive 3D Two-Face Machine Cards**:
  - **Front Face (Operational Vitals)**: Speed gauge, Cycle Time, Operating Temperature, Line Pressure, and Telemetry health.
  - **Back Face (Preventative Maintenance)**: Motor Vibration analysis, Fluid/Oil levels, Last Service Date, Health Score, and Next Scheduled Maintenance countdown.
- **Dynamic Context**: Synchronized with the active factory and line selected in the global navigation bar.

### 5. Production Planning & Scheduling (`/planning`)
- **Daily Shift Execution (24h Window)**:
  - **Shift A (06:00 - 14:00)**: SKU tracking, 100% completion target, soft green completed badge.
  - **Shift B (14:00 - 22:00) — Active Shift**: Live pulsing beacon, brand red-to-amber progress bar, dynamic completion pacing.
  - **Shift C (22:00 - 06:00)**: Queued status, empty placeholder progress bar, material staging status.
- **Scheduled Production Batches Table**:
  - Work order queue displaying Batch ID (`#WO-9021`), Product SKU, Planned Target (cans), Scheduled Time Window, Line Sequence (`Infeed → Filler → Pack`), and Status badges.
  - Search filter by Batch ID or SKU, plus quick status filter tabs (`All`, `In Production`, `Scheduled`, `Completed`, `Pending`).
  - Interactive **[ + Create Work Order ]** modal for creating and dispatching new production runs.
- **Fully Dynamic**: Centralized in `lib/data.ts` and synchronizes with any chosen factory or line.

### 6. Branded Login Screen (`/login`)
- Clean industrial authentication portal styled with official Coca-Cola red branding, MES identity, and quick access bypass.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router & Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict typing) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@theme` directive in CSS) |
| **Data Visualization** | [Recharts](https://recharts.org/) (SSR-safe with client-mount guards) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | Google Fonts **Montserrat** (Headings) & **Roboto** (Body & Numbers) |

---

## 🏗️ Architecture & Engineering Principles

- **Server Components by Default**: Pages remain async Server Components for optimal performance and SEO. Client-side interactivity is strictly isolated into small, dedicated components marked `"use client"`.
- **No Barrel Files**: Direct imports only (e.g., `import TopBar from "@/components/TopBar"`). No `index.ts` re-export files.
- **Colocated Interfaces**: Clean, isolated TypeScript interfaces colocated with components and centralized in `types/mes.ts`.
- **SSR-Safe Recharts**: Charts include hydration guards to eliminate any React 19 SSR mismatches.
- **Single Source of Truth**: Realistic industrial mock data engine centralized in `lib/data.ts`.

---

## 📁 Project Structure

```text
cola-mvp/
├── app/
│   ├── [factoryId]/
│   │   ├── [lineId]/
│   │   │   └── page.tsx         # Single-Line detail view
│   │   └── page.tsx             # Single-Factory detail view
│   ├── machines/
│   │   └── page.tsx             # Machine diagnostics & 3D cards
│   ├── planning/
│   │   └── page.tsx             # Production Planning & Scheduling
│   ├── reports/
│   │   └── page.tsx             # Reports placeholder
│   ├── settings/
│   │   └── page.tsx             # Settings placeholder
│   ├── login/
│   │   └── page.tsx             # Branded authentication screen
│   ├── globals.css              # Tailwind v4 theme & custom utilities
│   ├── layout.tsx               # Root layout with fonts & AppLayout wrapper
│   └── page.tsx                 # Global Enterprise Dashboard
├── components/
│   ├── factory/                 # Factory-level analytics & KPI cards
│   ├── line/                    # Line-level telemetry & charts
│   ├── machines/                # Machine vitals & 3D flip card components
│   ├── planning/                # Shift execution, work order table & modals
│   ├── AppLayout.tsx            # Application shell wrapper
│   ├── Sidebar.tsx              # Coca-Cola MES navigation sidebar
│   ├── TopBar.tsx               # Global factory, line, and date filter bar
│   └── ViewToggle.tsx           # Grid vs Table view toggle
├── lib/
│   ├── data.ts                  # Centralized industrial mock data engine
│   └── helpers/                 # Metrics & factory lookup helpers
├── types/
│   └── mes.ts                   # Core MES TypeScript definitions
└── public/                      # SVG assets & icons
```

---

## 🚦 Getting Started

### Prerequisites

- **Node.js**: v18.18 or higher (v20+ recommended)
- **npm** or **yarn** / **pnpm** / **bun**

### Installation

```bash
# Clone repository
git clone https://github.com/MostafaL2003/cola-mvp.git
cd cola-mvp

# Install dependencies
npm install
```

### Development

```bash
# Start Turbopack development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Typecheck & create optimized production build
npm run build

# Start production server
npm run start
```

### Live Deployment

The latest production build is deployed and hosted on Vercel:
- **Production URL**: [https://cola-mvp.vercel.app](https://cola-mvp.vercel.app)

---

## 🎨 Design System & Colors

| Token | Hex | Usage |
|---|---|---|
| **Coca-Cola Red** | `#F40009` | Brand accents, active indicators, sidebar |
| **Brand Navy** | `#08415C` | TopBar buttons, dropdown triggers, active badges |
| **Running / Nominal** | `#22C55E` | Active line status, running shift badge |
| **Downtime / Fault** | `#EF4444` | Line downtime, fault alerts, sensor errors |
| **Idle / Scheduled** | `#6B7280` | Changeover, CIP sanitization, idle machines |
| **Canvas Background** | `#F4F6F9` | Clean industrial dashboard canvas |

---

## 📄 License

This project is created for demonstration and portfolio purposes as part of the Coca-Cola MES MVP initiative.

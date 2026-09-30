# Coca-Cola MES MVP — Implementation Plan

This plan tracks the 8 core tasks required to build the MVP based on the Figma export specifications.

---

## Task 1: Dependencies & Setup

- [x] **1.1 Install Recharts & UI packages**:
  - Run `npm install recharts lucide-react clsx tailwind-merge`
- [x] **1.2 Fonts & Theme Configuration**:
  - Load Roboto & Montserrat in `app/layout.tsx` via `next/font/google`
  - Configure Tailwind v4 `@theme` in `app/globals.css` (Coke Red `#F40009`, timeline colors, typography)

---

## Task 2: TypeScript Data Models & Mock Data (`lib/data.ts`)

- [x] **2.1 TypeScript Interfaces**:
  - `KPICardData`: factory name, actual speed, actual production, last hour cycle time, ratio of active lines, OEE/SLE/USLE percentages, production volume, production quality
  - `LossTreeData`: ON/OFF percentage, Quality Loss/Speed Loss percentage, 5 named reasons (Breakdown, Cleansing process, Change over time, Idle, Minor stops) each with a percentage
  - `TimelineSegment`: time label/timestamp, status ('ON' | 'OFF'), durationMinutes
  - `TrendData`: time series for Cycle Time, Speed, and Uptime line charts
  - `LineData`: line ID, factory ID, name, status, KPIs, OE/MTBF/Uptime tabbed metric history
- [x] **2.2 Mock Data File (`lib/data.ts`)**:
  - Populate 3–4 factories with realistic bottling and canning metrics
  - Populate lines for each factory
  - Populate Loss Tree, Timeline segments, and Trend charts data

---

## Task 3: Login Page (`/login`)

- [x] **3.1 Branded Login View**:
  - Coca-Cola branding and MES logo
  - Email and password input fields
  - Login button that navigates directly to `/` (no auth required for MVP)

---

## Task 4: Sidebar Navigation Component

- [x] **4.1 Sidebar Layout**:
  - MES logo at the top
  - Nav links: Dashboard (`/`), Machines (`/machines`), Planning (`/planning`), Reports (`/reports`), Settings (`/settings`), Logout (`/login`)
  - Coca-Cola logo at the bottom
- [x] **4.2 Placeholder Pages**:
  - Minimal placeholder screens for `/machines`, `/planning`, `/reports`, `/settings` (title + "Coming soon")

---

## Task 5: Shared Top-Bar Component

- [x] **5.1 Factory Dropdown**:
  - Always visible across all 3 dashboard levels
  - Selecting a factory navigates to `/[factoryId]` (or resets to `/` when "All Factories" is chosen)
- [x] **5.2 Date Filter Toggle**:
  - Always visible: "Today" | "Yesterday" | "Last Week" toggle
- [ ] **5.3 Line Dropdown Support**:
  - Conditionally visible when on the Line dashboard (`/[factoryId]/[lineId]`) to switch between lines

---

## Task 6: All-Factories Dashboard (`/`)

- [x] **6.1 KPICard Component**:
  - Factory name, actual speed, actual production, last hour cycle time, active lines ratio
  - 3 circular KPI rings (OEE, SLE, USLE)
  - Production volume and quality numbers
  - Clickable card navigating to `/[factoryId]`
- [x] **6.2 Factory Grid Layout**:
  - Responsive grid of factory KPICards
- [ ] **6.3 Shared Right Panel**:
  - 3 trend line-charts (Cycle Time, Speed, Uptime)

---

## Task 7: Factory Detail Page (`/[factoryId]`)

- [ ] **7.1 Large KPI Header**:
  - Expanded version of the factory's KPICard data
- [ ] **7.2 Loss Tree Component**:
  - Visual breakdown: ON/OFF %, Quality Loss/Speed Loss %, and the 5 reasons (Breakdown, Cleansing process, Change over time, Idle, Minor stops)
- [ ] **7.3 Timeline Component**:
  - Horizontal bar visualizing ON vs OFF time segments
- [x] **7.4 Right Panel**:
  - Shared 3 trend line-charts (Cycle Time, Speed, Uptime)

---

## Task 8: Line Detail Page (`/[factoryId]/[lineId]`)

- [ ] **8.1 Top-Bar Line Dropdown**:
  - Line dropdown visible in the top-bar for switching lines
- [ ] **8.2 Line KPIs & Layout**:
  - Same visual pattern as Factory page, keeping the Timeline component
- [ ] **8.3 Toggleable OE / MTBF / Uptime Chart**:
  - Tabbed toggle switching between OE, MTBF, and Uptime views (replaces the Loss Tree)
- [ ] **8.4 Right Panel**:
  - Shared 3 trend line-charts (Cycle Time, Speed, Uptime)

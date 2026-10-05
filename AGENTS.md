<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project: Coca-Cola MES MVP

### Technology and structure

- Next.js 16 with the App Router
- TypeScript
- Tailwind CSS
- Recharts
- Roboto for body text and Montserrat for headings, loaded with `next/font/google`
- Static mock data only; there is no backend. Keep mock data in `lib/data.ts`.
- Keep reusable components in `components/`.

### Component architecture rule

Keep pages as Server Components by default. If a page needs client-side interactivity (onClick, useState, dropdowns, toggles), do NOT add "use client" to the whole page file. Instead, extract just the interactive piece into its own small component in `components/`, and mark only that small component "use client". The page itself imports and renders it, staying a Server Component.

### Component & Import Architecture Rules

- **NO BARREL FILES:** Never create `index.ts` or `index.tsx` files just to re-export components.
- **DIRECT IMPORTS ONLY:** Always import components directly from their specific file paths (e.g., `@/components/machines/MachineCard`).
- **COLOCATION:** Each component must live in its own clearly named file with its types or styles colocated directly.

### Task workflow

- At the start of every task, read both `AGENTS.md` and `PLAN.md` before making changes.
- After completing a task, update `PLAN.md` by checking off the relevant completed checkbox. Do not check off unrelated or incomplete work.

### Product scope

This MVP is based on a partial Figma export. Only the following screens are in scope:

1. **Login page**
   - Coca-Cola branding
   - Email and password fields

2. **All-Factories dashboard (`/`)**
   - A grid of factory cards
   - Each factory card shows actual speed, actual production, last-hour cycle time, and the ratio of active lines
   - Each factory card includes circular KPI rings for OEE, SLE, and USLE
   - Each factory card includes production volume and quality numbers

3. **Single-Factory dashboard (`/[factoryId]`)**
   - A larger presentation of the same KPIs
   - A Loss Tree bar chart with breakdown, cleansing, changeover, idle, and minor stops
   - A horizontal Timeline bar where red means downtime, green means running, and gray means idle

4. **Single-Line dashboard (`/[factoryId]/[lineId]`)**
   - The same dashboard pattern and KPIs
   - A toggleable chart with OE, MTBF, and Uptime tabs

All three dashboard levels share three trend line charts on the right: Cycle Time, Speed, and Uptime.

The sidebar links to Machines, Planning, Reports, and Settings. There are no designs or additional requirements for these sections; implement each only as a minimal placeholder page containing its title and “Coming soon”. Do not invent additional features or screens beyond the scope listed above.

### Technical & styling guardrails

- **Brand colors**: Coca-Cola Red (`#F40009`), clean neutral surfaces
- **Timeline & status colors**: Running (`#22c55e`), Downtime / Breakdown (`#ef4444`), Idle (`#6b7280`)
- **Icons**: Lucide React (`lucide-react`)
- **Tailwind v4 theme**: Define font variables and brand colors inside `app/globals.css` using the `@theme` directive (do not create a legacy `tailwind.config.js`).
- **Recharts SSR safety**: Always render Recharts inside `"use client"` components with a client-mounted guard to prevent React 19 hydration mismatches.
- **Code comments**: Do not add unnecessary comments. Keep code clean, concise, and self-documenting without redundant comments or explanatory bloat.

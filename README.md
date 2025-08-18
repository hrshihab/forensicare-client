## ForensiCare Client

Modern Next.js 15 app for creating and managing forensic investigation reports. Uses App Router, Turbopack for dev, Tailwind CSS v4, shadcn UI, Redux Toolkit, and RTK Query.

### Highlights
- Investigation report builder (two designs) with auto-save and validation
- Persistent local storage to `data/local_reports.json` via API routes
- Upsert semantics: each form uses a stable `id` and updates in place
- Internationalization context (English/Bangla labels/texts)
- Polished dashboard sidebar with searchable menu and iconified button-like submenus

## Tech stack
- Next.js 15 (App Router) + React 19
- Tailwind CSS 4, shadcn/ui components
- Redux Toolkit + RTK Query
- TypeScript

## Getting started
### Prerequisites
- Node.js 18+ (recommended 20+)

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts Next.js with Turbopack at `http://localhost:3000`.

### Build & start
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## Project structure (key paths)
```
src/
  app/
    (withDashboardLayout)/dashboard/
      admin/
        investigation-report/
          page.tsx                # list of saved reports
          create/page.tsx         # report builder (Design 1)
          create-design2/page.tsx # report builder (Design 2)
    api/
      reports/local/route.ts      # local JSON upsert API
  components/
    ui/sidebar.tsx                # sidebar primitives (submenu button styles)
    nav-main.tsx                  # main nav (active state + submenu rendering)
  redux/api/reportApis.ts         # RTK Query endpoints
  utils/report-shape.ts           # flat <-> nested report transforms
data/local_reports.json           # persisted reports (auto-created)
```

## Local reports API
Backed by a JSON file at `data/local_reports.json`. The API normalizes to a nested shape on read/write using `toNestedReport`/`toFlatForm`.

### GET `/api/reports/local`
- Returns `{ ok: true, data: Report[] }` (nested schema)

### GET `/api/reports/local?id={id}`
- Returns a single `{ ok: true, data: Report | null }`

### POST `/api/reports/local`
- Upsert a report. If `id` exists, the record is updated; otherwise created.
- Body accepts a flat form or nested; it is normalized on save.

Example payload (flat form excerpt):
```json
{
  "id": "rpt_1712345678_x1y2z3",
  "pm_no": "234",
  "person_name": "সাকিব",
  "case_type": "CID",
  "medical_officer_opinion": "..."
}
```

## Forms and autosave
- Design 1 (`create/page.tsx`) and Design 2 (`create-design2/page.tsx`) both call the local API to persist changes.
- A stable `id` is generated on first edit for new forms so subsequent saves update the same record.

## Sidebar customization
- Menu items are defined in `src/utils/sidebar-menu.ts`.
- Rendering/active logic lives in `src/components/nav-main.tsx`.
- Button-like submenu styles are in `src/components/ui/sidebar.tsx` (`SidebarMenuSubButton`).

## Troubleshooting
- Module not found: "@/data" in `admin/page.tsx`: ensure the aliased file exists or replace the dynamic import with the correct source. The alias `@` maps to `./src`.
- Slow dev on network drives (Windows): prefer a local path for `.next` or exclude the project from antivirus.

## License
Proprietary – internal use only unless stated otherwise.



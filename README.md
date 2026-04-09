# Querai — Financial AI Platform

Querai is a financial intelligence platform built with React and TypeScript. Uses AI-powered analysis with SAP financial data to deliver interactive dashboards, conversational insights and configurable use-case workflows.

## Tech Stack

| Layer            | Technology                                          |
| ---------------- | --------------------------------------------------- |
| Framework        | React 19 + TypeScript                               |
| Build            | Vite 8                                               |
| Routing          | React Router v7                                      |
| Styling          | Tailwind CSS v4 with custom design tokens            |
| State Management | Zustand (client state) + React Query (server state)  |
| Auth             | React Context with localStorage persistence          |
| UI Libraries     | MUI (selective), Recharts, dnd-kit                   |
| Icons            | Material Symbols Outlined                            |
| Fonts            | Manrope (headings), Inter (body)                     |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app starts at `http://localhost:5173` by default.

### Build & Lint

```bash
npm run build    # Type-check + production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Environment Variables

| Variable         | Default                 | Description                      |
| ---------------- | ----------------------- | -------------------------------- |
| `VITE_API_URL`   | `http://localhost:8000` | Backend API base URL             |
| `VITE_USE_MOCKS` | `true`                  | Enable mock data for offline dev |

## Project Structure

```
src/
├── assets/            # Static assets (images, SVGs)
├── components/
│   ├── charts/        # LineChart, BarChart, DonutChart, DataTable, KPICard, CategoryBarList
│   ├── form/          # Input, Checkbox, RadioButton, Select, DatePicker, Toggle, MetadataDropdown
│   └── ui/            # Button, Card, Modal, Alert, Chip, Tabs, Accordion, Skeleton, etc.
├── contexts/          # AuthContext (user session, login/logout, role-based access)
├── hooks/             # Custom React hooks
├── layouts/           # AppLayout (Navbar + Sidebar + Content + Footer)
├── lib/               # Zustand store (session state, sidebar panel)
├── mocks/             # Mock data for dashboard, tables, metadata, sidebar, admin, use cases
├── pages/
│   ├── Home/          # Center dashboard
│   ├── Chat/          # Multi-agent conversational AI interface
│   ├── Login/         # Authentication with animated visualization
│   ├── Selection/     # Financial query parameter 
│   ├── Tables/        
│   ├── Library/       # Design system ,component showcase
│   ├── Settings/      # Profile, connections and admin user management
│   └── Usecase/       # Dynamic use-case dispatcher (currenteyl UC001: Financial Variance Analysis)
├── services/          # API client with mock fallback and auth token management
├── types/             # TypeScript definitions (auth, usecase)
└── utils/             # Utilities (CSV export)
```

## Routes

| Path            | Page       | Description                              |
| --------------- | ---------- | ---------------------------------------- |
| `/`             | Home       | Center dashboard             |
| `/chat`         | Chat       | Conversational AI with multi-agent modes |
| `/login`        | Login      | Authentication (standalone, no layout)   |
| `/selection`    | Selection  | Financial query parameter builder        |
| `/tables`       | Tables     |company code , ledger , periods                       |
| `/library`      | Library    | Component showcase                       |
| `/settings`     | Settings   | Profile - admin configuration            |
| `/usecase/:id`  | Usecase    | Dynamic use-case routing                 |

All pages except Login are wrapped in `AppLayout` (Navbar + Sidebar).

## Pages

### Home (Dashboard)

The Command Center displays KPI cards (Open Documents, Pending Approvals, Reconciliation Rate, Anomalies), revenue trends, G/L posting activity by company, recent transactions, quick actions, and AI-powered anomaly insights.

### Chat

Conversational AI interface with four agent modes:

| Mode       | Agent Type  | Purpose                           |
| ---------- | ----------- | --------------------------------- |
| Use Case   | `usecase`   | Execute predefined analyses       |
| Knowledge  | `knowledge` | Answer financial domain questions |
| Selection  | `select`    | Build OData queries interactively |
| Analysis   | `analyse`   | Run ad-hoc data analysis          |

Messages support rich types including text, structured answers, analysis results, and redirect actions that link to use cases or the query builder.

### Login

Standalone authentication page with an animated right-panel visualization featuring a central hub, curved SVG paths, staggered node entrances, and flowing data-particle effects.

**Mock credentials:** `wassim@querai.com` / `querai123`

### Selection

Parameter builder with dropdowns for Company Code, Ledger, Financial Statement, and date range. Validates inputs and navigates to the Tables page with query results.

### Tables

G/L posting ledger with sortable columns (Company Code, Document No, Doc Type, G/L Account, Fiscal Year, Period, Amount, Currency), color-coded amounts, badge-style document types, and CSV export. Supports up to 500-row pagination.

### Library

Interactive design system showcase demonstrating all reusable components: form controls, UI primitives, and chart components with mock data.

### Settings

- **Profile** — Name, email, date format, currency, threshold preferences
- **Connections** — Data source status (SAP, Oracle) with connection indicators
- **Admin** — User management table with role assignment (admin-only)

### Use Cases

Extensible use-case framework with a dynamic dispatcher. Currently implemented:

- **UC_001 — Financial Variance Analysis**: Form-driven parameter input (company code, fiscal year, periods, ledger, cost center) with execution results displayed as KPI cards, variance charts, data tables, and contextual AI insights.

## Component Library

### Charts (`components/charts/`)

| Component         | Description                         |
| ----------------- | ----------------------------------- |
| `LineChart`        | Time-series line chart (Recharts)  |
| `BarChart`         | Vertical/horizontal bar chart      |
| `DonutChart`       | Donut/pie chart                    |
| `KPICard`          | Metric card with trend indicator   |
| `DataTable`        | Sortable, filterable table with CSV export |
| `CategoryBarList`  | Horizontal category comparison bars |

### Form (`components/form/`)

| Component          | Description                                      |
| ------------------ | ------------------------------------------------ |
| `Input`            | Text input with label and validation             |
| `Select`           | Dropdown select                                  |
| `DatePicker`       | Date picker (MUI X)                              |
| `Checkbox`         | Checkbox with label                              |
| `RadioButton`      | Radio button group                               |
| `Toggle`           | Toggle switch                                    |
| `MetadataDropdown` | Async dropdown that fetches options from the API |

### UI (`components/ui/`)

| Component          | Description                          |
| ------------------ | ------------------------------------ |
| `Button`           | Primary, secondary, ghost variants   |
| `Card`             | Surface container with ambient shadow |
| `Modal`            | Dialog overlay                       |
| `Alert`            | Status banners (info, success, warning, error) |
| `Chip`             | Tag/label badges                     |
| `Tabs`             | Tab navigation                       |
| `Accordion`        | Expandable content sections          |
| `Skeleton`         | Loading placeholder                  |
| `Pagination`       | Page navigation controls             |
| `Dropdown`         | Generic dropdown menu                |
| `ChatBubble`       | Floating chat trigger button         |
| `ChatInput`        | Message input with send action       |
| `SearchInput`      | Search field with icon               |
| `ProfileCard`      | User profile dropdown                |
| `FilterChip`       | Toggleable filter tag                |
| `FilterPanel`      | Grouped filter controls              |
| `HeroBanner`       | Full-width promotional banner        |
| `Toolbar`          | Action bar                           |

## Design System

Querai follows a **"Sovereign Curator"** design language:

- **No-Line Rule** — No `1px solid` borders. Boundaries are defined by background color shifts between surface levels.
- **Ghost Border** — When a border is unavoidable, use `outline-variant` at 15% opacity.
- **Surface Hierarchy** — `surface` > `surface-container-low` > `surface-container-lowest` (cards).
- **Glassmorphism** — Floating elements use `bg-white/10 backdrop-blur-xl border-white/30`.
- **Shadows** — `shadow-ambient` (`0 10px 30px -5px rgba(25,28,29,0.05)`).
- **Border Radius** — `rounded-lg` (16px) for containers, `rounded-xl` (24px) for special elements.

### Color Palette

| Token                       | Value     | Usage                  |
| --------------------------- | --------- | ---------------------- |
| `primary`                   | `#00361a` | Deep forest green      |
| `primary-container`         | `#1a4d2e` | Active/selected states |
| `on-primary`                | `#ffffff` | Text on primary        |
| `secondary-container`       | `#cfe5d1` | Soft sage backgrounds  |
| `surface`                   | `#f8f9fa` | Page background        |
| `surface-container-lowest`  | `#ffffff` | Card backgrounds       |
| `on-surface`                | `#191c1d` | Primary text           |
| `on-surface-variant`        | `#414942` | Secondary text         |
| `outline`                   | `#717971` | Subtle borders         |
| `error`                     | `#ba1a1a` | Error states           |

### Typography

- **Headings** — `font-heading` (Manrope)
- **Body** — `font-sans` (Inter)
- **Icons** — `<span className="icon">icon_name</span>` using Material Symbols Outlined names

## API Integration

The API client (`src/services/api.ts`) provides:

- **Mock-first development** — Toggle `VITE_USE_MOCKS` to develop without a backend
- **Auth token management** — Stored in localStorage, auto-injected into requests
- **401 auto-redirect** — Expired sessions redirect to `/login`
- **500-row truncation** — Large datasets are capped for performance

### API Modules

| Module     | Endpoints                                          |
| ---------- | -------------------------------------------------- |
| `auth`     | `register`, `login`, `logout`, `me`                |
| `settings` | `get`, `update`, `connectionStatus`                |
| `metadata` | `get(source, endpoint)` — dynamic dropdown options |
| `sessions` | `create`, `list`, `delete`, `history`              |
| `chat`     | `send`, `context`, `assist`                        |
| `usecase`  | `schema(id)`, `execute(id, data)`                  |
| `query`    | `execute(...)`, `valueHelp(...)`                   |

## State Management

| Layer           | Tool          | Scope                                            |
| --------------- | ------------- | ------------------------------------------------ |
| Auth            | React Context | User session, roles, login/logout                |
| Client State    | Zustand       | Active session ID, sidebar panel toggle          |
| Server State    | React Query   | API data fetching and caching                    |
| Component State | useState      | Form inputs, UI toggles, local ephemeral state   |

## Mock Data

The `src/mocks/` directory provides complete offline data:

| File                     | Contents                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `dashboardMock.ts`       | Revenue, posting activity, transactions, AI insights         |
| `financialTableMock.ts`  | 100+ G/L posting entries with SAP field codes                |
| `metadataMock.ts`        | Dropdown options for company codes, fiscal years, periods, ledgers |
| `usecaseMock.ts`         | 3 use case definitions (UC_001 active, UC_002/UC_003 coming soon) |
| `sidebarMock.ts`         | Default user, projects, and chat history                     |
| `adminMock.ts`           | Sample users for admin management                            |




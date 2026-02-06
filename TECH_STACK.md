# Tech Stack

## Framework & Runtime

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.1.6 | React framework with App Router, SSR, and API routes |
| [React](https://react.dev/) | 19.2.4 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | Type-safe JavaScript |
| [Node.js](https://nodejs.org/) | 20.20.0 | JavaScript runtime (via nvm) |

## Styling

| Technology | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | 4.1.18 | Utility-first CSS framework (v4 — no config file, uses `@import "tailwindcss"`) |
| [PostCSS](https://postcss.org/) | 8.5.6 | CSS post-processing |

### Tailwind v4 Notes
- No `tailwind.config.js` — configuration is done in `globals.css` via `@theme` blocks
- Class-based dark mode requires `@variant dark (&:where(.dark, .dark *));` directive
- `rgba()` colors must live outside `@theme` blocks (use `@layer base` CSS variables instead)
- Glass morphism utilities (`.glass-card`, `.glow-hover`) defined in `@layer utilities`

## Icons

| Technology | Version | Purpose |
|---|---|---|
| [lucide-react](https://lucide.dev/) | 0.513.0 | Icon library for theme toggle, link cards, project cards |

### Icon Usage
- `Sun`/`Moon` — Theme toggle button
- `Briefcase`/`Users`/`BookOpen`/`Link` — Category icons for link cards
- `ExternalLink`/`Github` — Action icons for projects
- `HardHat`/`BrainCircuit`/`Building2` — Expertise highlight pills on portfolio page
- `Mail` — Contact email icon on portfolio page

## Theme System

Dual theme support with CSS variables in `globals.css`:

| Theme | Background | Accent | Cards |
|---|---|---|---|
| Light (default) | Purple/blue gradient | Purple (#9333ea) | White with shadow |
| Dark | Dark slate (#0f172a) | Teal (#14b8a6) | Glass morphism |

Key CSS utilities:
- `text-theme-primary`, `text-theme-secondary`, `text-theme-muted`, `text-theme-accent`
- `bg-theme-accent`, `border-theme-accent`
- Theme persisted via localStorage, respects system preference on first load

## Database

| Technology | Version | Purpose |
|---|---|---|
| [Prisma](https://www.prisma.io/) | 6.9.0 | ORM for database access and migrations |
| [SQLite](https://www.sqlite.org/) | — | File-based database (`prisma/dev.db`) |

### Prisma Models
- **User** — Profile with username, name, bio, avatar, title, company, email, resumeUrl, featured flag
- **Link** — Categorized links (professional/social/learning/general) with ordering and visibility
- **Project** — Portfolio projects with tech stack, URLs, ordering, and visibility

### Database Commands
```bash
npm run db:push      # Apply schema changes
npm run db:generate  # Regenerate Prisma client
npm run db:seed      # Seed with sample data (uses tsx)
npm run db:studio    # Open Prisma Studio GUI
```

## Code Quality

| Technology | Version | Purpose |
|---|---|---|
| [ESLint](https://eslint.org/) | 9.39.2 | Linting with flat config (`eslint.config.mjs`) |
| [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint) | 16.1.6 | Next.js lint rules (core-web-vitals + TypeScript) |
| [@eslint/eslintrc](https://www.npmjs.com/package/@eslint/eslintrc) | 3.3.3 | FlatCompat adapter for legacy config format |

## Dev Tools

| Technology | Version | Purpose |
|---|---|---|
| [tsx](https://github.com/privatenumber/tsx) | 4.19.0 | TypeScript executor for seed scripts |
| [@types/node](https://www.npmjs.com/package/@types/node) | 25.2.0 | Node.js type definitions |
| [@types/react](https://www.npmjs.com/package/@types/react) | 19.2.11 | React type definitions |

## TypeScript Configuration

- **Target:** ES2017
- **Module:** ESNext with bundler resolution
- **Strict mode:** Enabled
- **Path alias:** `@/*` maps to `./src/*`
- **JSX:** `react-jsx` (automatic transform)
- **Incremental:** Enabled for faster builds

## Project Structure

```
src/
├── app/
│   ├── admin/page.tsx          # Client component — admin dashboard
│   ├── api/                    # API routes (users, links, projects CRUD)
│   ├── [username]/page.tsx     # Server component — portfolio page
│   ├── globals.css             # Tailwind v4 + theme + utilities
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Server component — homepage
├── components/
│   ├── ConfirmDialog.tsx       # Confirmation modal
│   ├── LinkCard.tsx            # Link display card with category icons
│   ├── LinkForm.tsx            # Link CRUD form
│   ├── ProfileEditForm.tsx     # Profile inline editing
│   ├── ProfileHeader.tsx       # User avatar, name, title (no bio)
│   ├── ProjectCard.tsx         # Project display card
│   ├── ProjectForm.tsx         # Project CRUD form
│   ├── ResumeButton.tsx        # Resume download button (currently unused)
│   ├── ThemeProvider.tsx       # Theme context with localStorage
│   ├── ThemeToggle.tsx         # Sun/Moon theme toggle
│   └── Toast.tsx               # Notification component
└── lib/
    └── prisma.ts               # Prisma singleton (globalThis caching)
```

## Environment

- **OS:** Linux (Pop!_OS / Ubuntu-based)
- **Node management:** nvm
- **Required env:** `.env` with `DATABASE_URL="file:./dev.db"`
- **Package manager:** npm

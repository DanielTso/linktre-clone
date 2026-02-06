# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A professional showcase web app (evolved from a Linktree clone) where users have public profile pages displaying links, projects, and contact info. Features a dual theme system with light (purple/blue gradient) and dark (teal accents) modes. Built with Next.js 16 (App Router), Tailwind CSS v4, Prisma ORM with SQLite, and TypeScript.

## Documentation

- **[TECH_STACK.md](./TECH_STACK.md)** — Full technology stack with versions, configuration details, and project structure
- **[CHANGELOG.md](./CHANGELOG.md)** — History of all changes organized by commit
- **[chatlog.md](./chatlog.md)** — Claude Code session logs and design decisions

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Run production build
npm run lint         # ESLint
npm run db:push      # Push Prisma schema changes to database
npm run db:generate  # Regenerate Prisma client after schema changes
npm run db:seed      # Seed database with sample data (Daniel Tso & Demo User)
npm run db:studio    # Open Prisma Studio GUI
```

After changing `prisma/schema.prisma`, run `npm run db:push` then `npm run db:generate`.

**Environment**: Requires `.env` with `DATABASE_URL="file:./dev.db"` (already present, not gitignored). No other env vars needed.

## Architecture

### Data Model

Three models in `prisma/schema.prisma`:
- **User** — `id`, `username` (unique), `name`, `bio`, `avatarUrl`, `title`, `company`, `email`, `resumeUrl`, `featured`, has many Links and Projects
- **Link** — `id`, `title`, `url`, `order`, `visible`, `category` (general/professional/social/learning), belongs to User
- **Project** — `id`, `title`, `description`, `imageUrl`, `techStack` (comma-separated), `projectUrl`, `githubUrl`, `order`, `visible`, belongs to User

### Routing (App Router)

| Route | Type | Purpose |
|---|---|---|
| `/` | Server Component | Homepage showing featured user profile with links (Linktree-style layout) |
| `/[username]` | Server Component | Full showcase: profile header, projects grid, categorized links, contact footer |
| `/admin` | Client Component | Dashboard to create users (with title/company/email) and manage links + projects |
| `/api/users` | API Route | GET all users (with links & projects), POST create user |
| `/api/users/[id]` | API Route | PATCH update user (allowlisted fields, featured exclusivity via transaction) |
| `/api/links` | API Route | POST create link (with category) |
| `/api/links/[id]` | API Route | PATCH update link, DELETE link |
| `/api/projects` | API Route | POST create project |
| `/api/projects/[id]` | API Route | PATCH update project, DELETE project |

**No authentication**: The admin page and all API routes are unprotected. There is no login or session management.

### Theme System

Dual theme support with CSS variables:

- **Light theme** (default): Purple/blue gradient background, white cards, purple accent (#9333ea)
- **Dark theme**: Dark slate background with teal accents (#14b8a6), glass morphism cards

Theme variables defined in `globals.css`:
- `:root` contains light theme variables
- `.dark` class overrides with dark theme variables

Key CSS utilities:
- `text-theme-primary`, `text-theme-secondary`, `text-theme-muted`, `text-theme-accent`
- `bg-theme-accent`, `border-theme-accent`
- `glass-card`, `glow-hover` (theme-aware card styling)

### Key Patterns

- **Prisma singleton** (`src/lib/prisma.ts`): Prevents multiple PrismaClient instances in development via `globalThis` caching.
- **Server Components** for public pages (`/`, `/[username]`) — data fetched directly via Prisma, no API calls needed.
- **Client Component** for admin (`/admin`) — uses `fetch()` against API routes for mutations, `useCallback` for stable data refresh.
- **Dynamic route params** use the Next.js 16 async `params` pattern: `const { username } = await params;`
- **Tailwind CSS v4** with `@import "tailwindcss"` in `globals.css` (no `tailwind.config` file needed). Note: `rgba()` colors must live outside `@theme` blocks (use `@layer base` CSS variables instead). Class-based dark mode requires `@variant dark (&:where(.dark, .dark *));`.
- **Path alias**: `@/*` maps to `./src/*`.
- **Featured user**: The homepage shows the featured user's profile directly in a centered Linktree-style layout. Only one user can be featured at a time — setting `featured: true` on one user clears it from all others (via Prisma `$transaction` in `/api/users/[id]`).
- **Link categories**: Links are grouped by category (professional, social, learning, general) on the full profile page.
- **API field allowlisting**: The user PATCH endpoint uses an `ALLOWED_FIELDS` set to filter request body keys before passing to Prisma. New User fields must be added to this set in `src/app/api/users/[id]/route.ts` to be editable.

### Components (`src/components/`)

All components live in a flat directory. The split between server-compatible and client components matters:

- **Server-compatible** (no `"use client"`): `ProfileHeader`, `LinkCard`, `ProjectCard`, `ResumeButton` — used directly in server-rendered pages (`/`, `/[username]`)
- **Client components** (`"use client"`): `ThemeProvider`, `ThemeToggle`, `ProfileEditForm`, `LinkForm`, `ProjectForm`, `Toast`, `ConfirmDialog` — used in layout or admin dashboard

The admin page wraps its content in `<ToastProvider>` for notification support. `ConfirmDialog` is used for destructive actions (delete link/project).

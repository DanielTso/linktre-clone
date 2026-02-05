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
| `/api/links` | API Route | POST create link (with category) |
| `/api/links/[id]` | API Route | PATCH update link, DELETE link |
| `/api/projects` | API Route | POST create project |
| `/api/projects/[id]` | API Route | PATCH update project, DELETE project |

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
- **Featured user**: The homepage shows the featured user's profile directly in a centered Linktree-style layout.
- **Link categories**: Links are grouped by category (professional, social, learning, general) on the full profile page.

### Component Structure

- `ThemeProvider` — Client component providing theme context with localStorage persistence
- `ThemeToggle` — Client component with sun/moon icon button, fixed top-right position
- `ResumeButton` — Server-compatible, prominent download button for user resume (visible when resumeUrl set)
- `ProfileHeader` — Server-compatible, displays user avatar with gradient ring/name/bio/title/company
- `ProfileEditForm` — Client component for inline profile editing in admin dashboard
- `LinkCard` — Server-compatible, renders link with category icon (lucide-react) and arrow hover animation
- `LinkForm` — Client component with add/delete/toggle-visibility for links, includes category selector
- `ProjectCard` — Server-compatible, renders project with description, tech stack pills, and action links (with lucide-react icons)
- `ProjectForm` — Client component with add/delete/toggle-visibility for projects
- `Toast` — Client component for success/error notification messages
- `ConfirmDialog` — Client component for destructive action confirmations

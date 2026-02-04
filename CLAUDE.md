# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Linktree clone — a link-in-bio web app where users have public profile pages displaying a list of links. Built with Next.js 16 (App Router), Tailwind CSS v4, Prisma ORM with SQLite, and TypeScript.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Run production build
npm run lint         # ESLint
npm run db:push      # Push Prisma schema changes to database
npm run db:generate  # Regenerate Prisma client after schema changes
npm run db:seed      # Seed database with sample data (Alice & Bob)
npm run db:studio    # Open Prisma Studio GUI
```

After changing `prisma/schema.prisma`, run `npm run db:push` then `npm run db:generate`.

## Architecture

### Data Model

Two models in `prisma/schema.prisma`:
- **User** — `id`, `username` (unique), `name`, `bio`, `avatarUrl`, has many Links
- **Link** — `id`, `title`, `url`, `order`, `visible`, belongs to User

### Routing (App Router)

| Route | Type | Purpose |
|---|---|---|
| `/` | Server Component | Lists all user profiles |
| `/[username]` | Server Component | Public profile page showing visible links |
| `/admin` | Client Component | Dashboard to create users and manage links |
| `/api/users` | API Route | GET all users, POST create user |
| `/api/links` | API Route | POST create link |
| `/api/links/[id]` | API Route | PATCH update link, DELETE link |

### Key Patterns

- **Prisma singleton** (`src/lib/prisma.ts`): Prevents multiple PrismaClient instances in development via `globalThis` caching.
- **Server Components** for public pages (`/`, `/[username]`) — data fetched directly via Prisma, no API calls needed.
- **Client Component** for admin (`/admin`) — uses `fetch()` against API routes for mutations, `useCallback` for stable data refresh.
- **Dynamic route params** use the Next.js 16 async `params` pattern: `const { username } = await params;`
- **Tailwind CSS v4** with `@import "tailwindcss"` in `globals.css` (no `tailwind.config` file needed).
- **Path alias**: `@/*` maps to `./src/*`.

### Component Structure

- `ProfileHeader` — Server-compatible, displays user avatar/name/bio
- `LinkCard` — Server-compatible, renders a single clickable link
- `LinkForm` — Client component with add/delete/toggle-visibility for links

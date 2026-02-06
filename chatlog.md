# Chat Log

## 2026-02-06 — Homepage & Portfolio Redesign

### Plan
Redesign homepage into two sections: a compact profile card and a link portal. Move bio and detailed info to a dedicated portfolio page.

### Changes Made

#### 1. Homepage Redesign (`2593546`)
- Profile section wrapped in `glass-card` with padding
- Removed bio and `@username` from homepage
- Changed title/company separator from "@" to "|"
- Widened container from `max-w-md` to `max-w-lg`
- Added "Connect With Me" heading above link cards
- Removed `ResumeButton` import (component still exists)

#### 2. Portfolio Link Card
- Initially pointed to `resumeUrl` (resume PDF) — user corrected this
- Changed to point to `/${featured.username}` (the portfolio page)
- Uses `professional` category (briefcase icon)

#### 3. Portfolio Page Redesign (`311cae8`)
- Added "About Me" glass card with bio text and expertise highlight pills:
  - `HardHat` — Construction PM
  - `BrainCircuit` — AI Engineer
  - `Building2` — Business Owner
- Removed categorized links section (links live on homepage only)
- Removed resume button (user prefers to send manually)
- Added "Back to Home" link in footer
- ProfileHeader: removed `bio` prop, uses "|" separator

#### 4. Data Fixes
- Email corrected from `daniel@crafts2build.com` to `danieltso@crafts2buildllc.com` in seed script
- Re-seeded database

#### 5. Housekeeping
- Added `*.png` to `.gitignore` for screenshots

### Key Decisions
- User wants Portfolio link card on homepage to go to full profile page, not resume PDF
- User doesn't want resume button — will send resume manually if asked
- Categorized links (Professional, Social, Learning) stay on homepage only, not duplicated on portfolio page
- Bio belongs on portfolio page only, not homepage

### Current State
- Homepage: profile card (avatar, name, title) + "Connect With Me" link portal with Portfolio at top
- Portfolio page at `/danieltso`: About Me card with expertise pills, projects grid, contact email, back-to-home link
- No resume button anywhere — user sends manually
- Email: `danieltso@crafts2buildllc.com`
- All commits pushed to GitHub

---

## 2026-02-04 — Figma Make Design Review

### Context
Connected Figma MCP and reviewed a Figma Make file for a Linktree clone design.

**Figma Make URL:** `https://www.figma.com/make/aCW0bpODwTSLpQULD1hgUK/Linktree-clone`

### Design Analysis
The Figma Make design is a clean Linktree-style single-page layout:

- **Theme:** Light — purple-to-blue gradient background (`from-purple-50 to-blue-50`)
- **Profile Section:** Circular avatar with white ring/shadow, `@yourhandle` heading, tagline ("Full Stack Developer | Designer | Creator"), and bio text
- **Link Cards (6):** Portfolio Website, GitHub, LinkedIn, Twitter, Instagram, Email Me — each with lucide-react icons, white rounded cards, hover effects (shadow lift, purple accent, arrow slide)
- **Footer:** Simple copyright line
- **Stack used in Figma Make:** React (Vite), Tailwind CSS v4, lucide-react, shadcn/ui components, Radix UI primitives

### Comparison with Current Project
| Aspect | Figma Make Design | Current Project |
|---|---|---|
| Theme | Light (purple/blue gradient) | Dark (teal/cyan accents, glass morphism) |
| Data source | Hardcoded array | Prisma SQLite database |
| Features | Static links only | Links, projects, categories, admin dashboard |
| Framework | Vite + React SPA | Next.js 16 App Router (SSR) |
| Routing | Single page | Multi-page (`/`, `/[username]`, `/admin`, API routes) |

### Outcome
User was asked how they'd like to apply the design. Session continued with documentation tasks instead.

---

## 2026-02-05 — Theme System & Resume Button Implementation

### Plan Executed
Implemented the Figma-inspired design plan with dual theme support.

### Changes Made

#### 1. Dual Theme System (`e42cc4f`)
- **ThemeProvider** — React context managing theme state with localStorage persistence
- **ThemeToggle** — Fixed top-right button with Sun/Moon icons from lucide-react
- **CSS Variables** — `:root` (light) and `.dark` (dark) in `globals.css`
- **Tailwind v4 fix** — Added `@variant dark (&:where(.dark, .dark *));` for class-based dark mode
- Theme-aware utilities: `text-theme-primary`, `text-theme-accent`, `bg-theme-accent`, etc.

#### 2. Homepage Redesign
- Centered Linktree-style layout showing featured user profile
- Avatar with gradient ring (purple/pink light, teal dark)
- Vertical link cards with category icons and arrow hover animation

#### 3. LinkCard Updates
- Added lucide-react icons based on category:
  - `Briefcase` — professional
  - `Users` — social
  - `BookOpen` — learning
  - `Link` — general
- Arrow slides right on hover

#### 4. Resume Button Feature (`e8b062a`, `a6f8429`)
- Added `resumeUrl` field to User model in Prisma
- Created `ResumeButton` component with FileDown icon
- Displayed on homepage and profile pages when URL is set
- Added resume URL editing in ProfileEditForm
- Fixed API route to accept `resumeUrl` field

#### 5. Admin Dashboard Theme Fix (`c482aba`)
- Replaced hardcoded dark colors with theme-aware CSS variables
- Fixed in: `admin/page.tsx`, `ProfileEditForm.tsx`, `LinkForm.tsx`, `ProjectForm.tsx`
- Admin now works correctly in both light and dark modes

#### 6. Documentation Updates (`975b2e5`)
- Updated `CLAUDE.md` with resumeUrl field and ResumeButton component
- Updated `TECH_STACK.md` with lucide-react, theme system, new components
- Updated `CHANGELOG.md` with all new commits

### Key Technical Lessons
- **Tailwind v4 dark mode**: Defaults to media query, not class-based. Must add `@variant dark (&:where(.dark, .dark *));` directive
- **CSS variables in @theme blocks**: Cannot use `rgba()` — move to `@layer base` instead
- **Prisma API routes**: Must explicitly whitelist fields in ALLOWED_FIELDS Set

### Current State (after 02-05 session)
- Homepage showed featured user (Daniel Tso) with links and resume button
- Full profile page at `/danieltso` with projects, categorized links, contact info
- Admin dashboard at `/admin` for managing users, links, projects
- Theme toggle persists preference in localStorage
- All commits pushed to GitHub

---

## 2026-02-04 — Documentation Setup

### Tasks Completed
- Created `chatlog.md` (this file) to record conversation history
- Created `CHANGELOG.md` to track project changes across commits
- Created `TECH_STACK.md` to document all technologies and dependencies
- Updated `CLAUDE.md` with references to all three new files

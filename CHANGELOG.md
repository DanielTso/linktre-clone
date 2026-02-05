# Changelog

All notable changes to this project are documented here.

## [Unreleased]

*(No unreleased changes)*

---

## 2026-02-05 — Admin Theme Fix
**Commit:** `c482aba`

### Fixed
- Admin dashboard now properly supports light theme
- Replaced hardcoded dark colors with theme-aware CSS variables in admin page and form components

---

## 2026-02-05 — Resume Button Feature
**Commits:** `e8b062a`, `a6f8429`

### Added
- `resumeUrl` field to User model for resume/CV downloads
- `ResumeButton` component — Prominent download button with FileDown icon
- Resume URL editing in admin dashboard ProfileEditForm
- Resume button displayed on homepage and profile pages when URL is set

### Fixed
- API route now accepts `resumeUrl` field for user updates

---

## 2026-02-05 — Dual Theme System
**Commit:** `e42cc4f`

### Added
- Light/dark theme toggle with localStorage persistence
- `ThemeProvider` — React context for theme state management
- `ThemeToggle` — Fixed position sun/moon toggle button (top-right corner)
- System preference detection on first load (`prefers-color-scheme`)
- Theme-aware CSS variables in `globals.css` (`:root` for light, `.dark` for dark)
- lucide-react icons for link cards (category-based) and project actions

### Changed
- Homepage redesigned to centered Linktree-style layout showing featured user
- LinkCard updated with category icons (Briefcase, Users, BookOpen, Link) and arrow hover animation
- ProfileHeader updated with gradient avatar ring
- All components now use theme-aware utility classes (`text-theme-primary`, etc.)

### Technical
- Added `@variant dark (&:where(.dark, .dark *));` directive for Tailwind v4 class-based dark mode

---

## 2026-02-04 — Documentation
**Commits:** `2fddd3a`, `e050a95`

### Added
- `chatlog.md` — Conversation log for Claude Code sessions
- `CHANGELOG.md` — This file
- `TECH_STACK.md` — Full technology stack documentation
- Updated `CLAUDE.md` with missing components and Tailwind v4 caveats

---

## 2026-02-04 — Admin Dashboard Overhaul
**Commit:** `9fbc998`

### Added
- Profile editing directly from admin dashboard
- Inline editing for links and projects
- Toast notifications for user feedback
- Confirmation dialogs before destructive actions (deletes)

### Components
- `ProfileEditForm` — Edit user profile fields inline
- `ConfirmDialog` — Reusable confirmation modal
- `Toast` — Notification component

---

## 2026-02-03 — Gitignore Update
**Commit:** `37ccd83`

### Changed
- Added `.playwright-mcp/` to `.gitignore`

---

## 2026-02-03 — Dark Theme Fix
**Commit:** `0c9f2c5`

### Fixed
- Moved `rgba()` color values out of `@theme` block in `globals.css` to fix Tailwind v4 compilation — `@theme` only supports raw values, not CSS functions

---

## 2026-02-02 — README
**Commit:** `c8d3aea`

### Added
- `README.md` with project overview, setup instructions, and directory structure

---

## 2026-02-02 — Dark Theme Revamp
**Commit:** `2c2a44d`

### Changed
- Transformed from generic Linktree clone into Daniel Tso professional showcase
- Implemented dark theme with teal/cyan accent palette
- Added glass morphism card styling and glow-hover utilities
- Profile pages now display projects grid, categorized links, and contact footer
- Homepage features hero section for featured user

### Added
- `ProfileHeader` component — Avatar, name, bio, title, company
- `ProjectCard` component — Project display with tech stack pills
- `ProjectForm` component — Admin form for managing projects
- Link categories (professional, social, learning, general)
- Featured user system for homepage hero

### Data Model Changes
- Added `title`, `company`, `email`, `featured` fields to User
- Added `category` field to Link
- Added Project model (title, description, imageUrl, techStack, projectUrl, githubUrl)

---

## 2026-02-01 — Initial Commit
**Commit:** `ba53800`

### Added
- Next.js 16 project with App Router
- Prisma ORM with SQLite database
- Tailwind CSS v4 styling
- User, Link models
- Public profile pages (`/[username]`)
- Admin dashboard (`/admin`)
- API routes for CRUD operations
- Seed script with sample data

# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Added
- `chatlog.md` — Conversation log for Claude Code sessions
- `CHANGELOG.md` — This file
- `TECH_STACK.md` — Full technology stack documentation
- Updated `CLAUDE.md` with references to new documentation files

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

# Daniel Tso | Professional Showcase

A professional showcase web app — a link-in-bio portal with a portfolio page featuring projects, an About Me section, and multi-user support. Dual theme system with light (purple/blue gradient) and dark (teal accents) modes. Built with Next.js 16, Tailwind CSS v4, Prisma, and SQLite.

## Features

- **Profile Card Homepage** — Clean profile card with avatar, name, and title linking to a "Connect With Me" link portal
- **Portfolio Page** — About Me card with expertise highlight pills, featured projects grid, and contact email
- **Project Portfolio** — Showcase projects with descriptions, tech stack pills, and live/GitHub links
- **Categorized Links** — Links grouped by category (Professional, Social, Learning, General) on the homepage
- **Dual Theme System** — Light (purple) and dark (teal) themes with localStorage persistence
- **Admin Dashboard** — Create profiles and manage links + projects through a web UI
- **Multi-User Support** — Multiple profiles with independent links and projects
- **Password Auth** — HMAC-SHA256 session cookies for admin access

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [lucide-react](https://lucide.dev/)
- **Database:** SQLite via [Prisma ORM](https://www.prisma.io/)
- **Runtime:** Node.js 20+

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/DanielTso/linktre-clone.git
cd linktre-clone
npm install
```

### Database Setup

```bash
npm run db:push      # Create database tables
npm run db:generate  # Generate Prisma client
npm run db:seed      # Seed with sample data
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage — profile card + link portal
│   ├── [username]/page.tsx   # Portfolio — About Me, projects, contact
│   ├── admin/page.tsx        # Admin dashboard
│   ├── login/page.tsx        # Login page
│   ├── api/
│   │   ├── auth/             # Login/logout routes
│   │   ├── users/            # User CRUD
│   │   ├── links/            # Link CRUD
│   │   └── projects/         # Project CRUD
│   ├── globals.css           # Tailwind v4 theme & utilities
│   └── layout.tsx            # Root layout with ThemeProvider
├── components/
│   ├── ProfileHeader.tsx     # User avatar, name, title
│   ├── ProjectCard.tsx       # Project card with tech stack pills
│   ├── LinkCard.tsx          # Clickable link with category icon
│   ├── ThemeProvider.tsx     # Theme context with localStorage
│   ├── ThemeToggle.tsx       # Sun/Moon theme toggle
│   ├── ProfileEditForm.tsx   # Admin profile editing
│   ├── LinkForm.tsx          # Admin link management
│   ├── ProjectForm.tsx       # Admin project management
│   ├── Toast.tsx             # Notification component
│   └── ConfirmDialog.tsx     # Confirmation modal
├── lib/
│   ├── prisma.ts             # Prisma singleton
│   └── auth.ts               # HMAC-SHA256 session auth
└── prisma/
    ├── schema.prisma         # Database schema
    └── seed.ts               # Seed data
```

## Data Model

- **User** — username, name, bio, avatar, title, company, email, featured flag
- **Link** — title, url, category, order, visibility, belongs to User
- **Project** — title, description, tech stack, project/GitHub URLs, order, visibility, belongs to User

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema changes to database |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio GUI |

## License

MIT

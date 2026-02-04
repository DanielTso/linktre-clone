# Daniel Tso | Professional Showcase

A dark-themed professional showcase web app — a link-in-bio tool with project portfolios, categorized links, and multi-user support. Built with Next.js 16, Tailwind CSS v4, Prisma, and SQLite.

## Features

- **Featured Profile Hero** — Highlighted user displayed prominently on the homepage
- **Project Portfolio** — Showcase projects with descriptions, tech stack pills, and live/GitHub links
- **Categorized Links** — Links grouped by category (Professional, Social, Learning, General)
- **Contact Footer** — Email contact link on profile pages
- **Admin Dashboard** — Create profiles and manage links + projects through a web UI
- **Multi-User Support** — Multiple profiles with independent links and projects
- **Dark Theme** — Dark slate backgrounds with teal/cyan accents, glass-morphism cards, and glow hover effects

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
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
│   ├── page.tsx              # Homepage with featured hero
│   ├── [username]/page.tsx   # Profile showcase page
│   ├── admin/page.tsx        # Admin dashboard
│   ├── api/
│   │   ├── users/route.ts    # User CRUD
│   │   ├── links/route.ts    # Link creation
│   │   ├── links/[id]/       # Link update/delete
│   │   ├── projects/route.ts # Project creation
│   │   └── projects/[id]/    # Project update/delete
│   ├── globals.css           # Tailwind v4 theme & utilities
│   └── layout.tsx            # Root layout with dark theme
├── components/
│   ├── ProfileHeader.tsx     # User avatar, name, title, bio
│   ├── ProjectCard.tsx       # Project card with tech stack pills
│   ├── ProjectForm.tsx       # Admin project management form
│   ├── LinkCard.tsx          # Clickable link with glass styling
│   └── LinkForm.tsx          # Admin link management form
├── lib/
│   └── prisma.ts             # Prisma client singleton
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

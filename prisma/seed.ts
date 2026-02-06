import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.project.deleteMany();
  await prisma.link.deleteMany();
  await prisma.user.deleteMany();

  const daniel = await prisma.user.create({
    data: {
      username: "danieltso",
      name: "Daniel Tso",
      bio: "Construction Project Manager and business owner at Crafts2Build LLC. AI enthusiast building Construction AI Tools — from estimating and model fine-tuning to agentic AI. On the path to becoming a full AI Engineer.",
      title: "Construction Project Manager | AI Engineer",
      company: "Crafts2Build LLC",
      email: "danieltso@crafts2buildllc.com",
      featured: true,
      links: {
        create: [
          { title: "LinkedIn", url: "https://linkedin.com/in/danieltso", order: 0, category: "professional" },
          { title: "Crafts2Build LLC", url: "https://www.crafts2buildllc.com", order: 1, category: "professional" },
          { title: "GitHub", url: "https://github.com/danieltso", order: 2, category: "social" },
          { title: "X / Twitter", url: "https://x.com/danieltso", order: 3, category: "social" },
          { title: "Udemy Learning Profile", url: "https://udemy.com/user/danieltso", order: 4, category: "learning" },
          { title: "AI Engineering Roadmap", url: "https://roadmap.sh/ai-engineer", order: 5, category: "learning" },
        ],
      },
      projects: {
        create: [
          {
            title: "AI-Powered Project Estimator",
            description: "A machine learning tool that analyzes historical construction data to generate accurate project cost and timeline estimates.",
            techStack: "Python,scikit-learn,FastAPI,React,PostgreSQL",
            projectUrl: "https://estimator.crafts2build.com",
            githubUrl: "https://github.com/danieltso/project-estimator",
            order: 0,
          },
          {
            title: "Crafts2Build Portfolio Site",
            description: "Company website showcasing completed construction projects with before/after galleries and client testimonials.",
            techStack: "Next.js,Tailwind CSS,Prisma,SQLite",
            projectUrl: "https://crafts2build.com",
            githubUrl: "https://github.com/danieltso/crafts2build-site",
            order: 1,
          },
          {
            title: "Linux Home Server Setup",
            description: "Documented setup of a self-hosted home server running Docker containers for media, backups, and dev environments on Pop!_OS.",
            techStack: "Linux,Docker,Nginx,Bash,Cloudflare Tunnels",
            githubUrl: "https://github.com/danieltso/homelab",
            order: 2,
          },
        ],
      },
    },
  });

  const demo = await prisma.user.create({
    data: {
      username: "demo",
      name: "Demo User",
      bio: "This is a demo profile to show multi-user support.",
      featured: false,
      links: {
        create: [
          { title: "Example Site", url: "https://example.com", order: 0, category: "general" },
          { title: "Documentation", url: "https://docs.example.com", order: 1, category: "learning" },
        ],
      },
    },
  });

  console.log(`Seeded: ${daniel.name}, ${demo.name}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

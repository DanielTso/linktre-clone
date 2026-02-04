import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.link.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      username: "alice",
      name: "Alice Johnson",
      bio: "Full-stack developer & open source enthusiast",
      links: {
        create: [
          { title: "GitHub", url: "https://github.com", order: 0 },
          { title: "Portfolio", url: "https://example.com", order: 1 },
          { title: "Twitter / X", url: "https://x.com", order: 2 },
          { title: "Blog", url: "https://blog.example.com", order: 3 },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: "bob",
      name: "Bob Smith",
      bio: "Designer & photographer",
      links: {
        create: [
          { title: "Dribbble", url: "https://dribbble.com", order: 0 },
          { title: "Instagram", url: "https://instagram.com", order: 1 },
          { title: "Behance", url: "https://behance.net", order: 2 },
        ],
      },
    },
  });

  console.log(`Seeded: ${alice.name}, ${bob.name}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

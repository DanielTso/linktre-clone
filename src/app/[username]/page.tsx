import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import ProjectCard from "@/components/ProjectCard";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      links: {
        where: { visible: true },
        orderBy: { order: "asc" },
      },
      projects: {
        where: { visible: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  // Group links by category
  const linksByCategory: Record<string, typeof user.links> = {};
  for (const link of user.links) {
    const cat = link.category || "general";
    if (!linksByCategory[cat]) linksByCategory[cat] = [];
    linksByCategory[cat].push(link);
  }

  const categoryLabels: Record<string, string> = {
    professional: "Professional",
    social: "Social",
    learning: "Learning",
    general: "General",
  };

  const categoryOrder = ["professional", "social", "learning", "general"];

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center gap-10 px-4 py-16">
      {/* Hero */}
      <ProfileHeader
        name={user.name}
        username={user.username}
        bio={user.bio}
        avatarUrl={user.avatarUrl}
        title={user.title}
        company={user.company}
      />

      {/* Featured Projects */}
      {user.projects.length > 0 && (
        <section className="w-full">
          <h2 className="mb-4 text-lg font-semibold text-gray-400">
            Featured Projects
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {user.projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                projectUrl={project.projectUrl}
                githubUrl={project.githubUrl}
              />
            ))}
          </div>
        </section>
      )}

      {/* Links grouped by category */}
      {user.links.length > 0 && (
        <section className="w-full">
          {categoryOrder
            .filter((cat) => linksByCategory[cat]?.length)
            .map((cat) => (
              <div key={cat} className="mb-6">
                <h2 className="mb-3 text-lg font-semibold text-gray-400">
                  {categoryLabels[cat] || cat}
                </h2>
                <div className="flex flex-col gap-3">
                  {linksByCategory[cat].map((link) => (
                    <LinkCard
                      key={link.id}
                      title={link.title}
                      url={link.url}
                      category={link.category}
                    />
                  ))}
                </div>
              </div>
            ))}
        </section>
      )}

      {user.links.length === 0 && user.projects.length === 0 && (
        <p className="text-gray-500">No content yet.</p>
      )}

      {/* Contact Footer */}
      {user.email && (
        <footer className="w-full border-t border-dark-700 pt-6 text-center">
          <a
            href={`mailto:${user.email}`}
            className="text-sm font-medium text-accent transition hover:text-accent-light"
          >
            {user.email}
          </a>
        </footer>
      )}
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileHeader from "@/components/ProfileHeader";
import ProjectCard from "@/components/ProjectCard";
import { Mail, HardHat, BrainCircuit, Building2 } from "lucide-react";

interface Props {
  params: Promise<{ username: string }>;
}

const highlights = [
  { icon: HardHat, label: "Construction PM" },
  { icon: BrainCircuit, label: "AI Engineer" },
  { icon: Building2, label: "Business Owner" },
];

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      projects: {
        where: { visible: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center gap-10 px-4 py-16">
      {/* Hero */}
      <ProfileHeader
        name={user.name}
        username={user.username}
        avatarUrl={user.avatarUrl}
        title={user.title}
        company={user.company}
      />

      {/* About Me */}
      {user.bio && (
        <section className="glass-card w-full p-6">
          <h2 className="mb-3 text-lg font-semibold text-theme-primary">
            About Me
          </h2>
          <p className="mb-5 leading-relaxed text-theme-secondary">
            {user.bio}
          </p>
          <div className="flex flex-wrap gap-3">
            {highlights.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-theme-accent/10 px-4 py-2 text-sm font-medium text-theme-accent"
              >
                <Icon className="h-4 w-4" />
                {label}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {user.projects.length > 0 && (
        <section className="w-full">
          <h2 className="mb-4 text-lg font-semibold text-theme-muted">
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

      {user.projects.length === 0 && (
        <p className="text-theme-muted">No content yet.</p>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-theme-muted/20 pt-6 text-center">
        {user.email && (
          <a
            href={`mailto:${user.email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-theme-accent transition hover:opacity-80"
          >
            <Mail className="h-4 w-4" />
            {user.email}
          </a>
        )}
        <div className="mt-4">
          <Link
            href="/"
            className="text-sm font-medium text-theme-accent transition hover:opacity-80"
          >
            &larr; Back to Home
          </Link>
        </div>
      </footer>
    </main>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LinkCard from "@/components/LinkCard";
import ResumeButton from "@/components/ResumeButton";

export default async function HomePage() {
  const featured = await prisma.user.findFirst({
    where: { featured: true },
    include: {
      links: {
        where: { visible: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!featured) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-16">
        <div className="glass-card p-8 text-center">
          <p className="mb-4 text-lg text-theme-secondary">No profile set up yet.</p>
          <Link
            href="/admin"
            className="rounded-full bg-theme-accent px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Create one in Admin
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-16">
      {/* Profile Section */}
      <section className="mb-8 flex w-full flex-col items-center text-center">
        {/* Avatar with ring */}
        <div className="mb-4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1 dark:from-teal-400 dark:via-cyan-500 dark:to-blue-500">
          {featured.avatarUrl ? (
            <img
              src={featured.avatarUrl}
              alt={featured.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover dark:border-dark-900"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white text-4xl font-bold text-theme-accent dark:border-dark-900 dark:bg-dark-800">
              {featured.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Username */}
        <p className="mb-1 text-sm font-medium text-theme-muted">
          @{featured.username}
        </p>

        {/* Name */}
        <h1 className="mb-1 text-2xl font-bold text-theme-primary">
          {featured.name}
        </h1>

        {/* Title & Company */}
        {(featured.title || featured.company) && (
          <p className="mb-2 text-sm font-medium text-theme-accent">
            {featured.title}
            {featured.title && featured.company && " @ "}
            {featured.company}
          </p>
        )}

        {/* Bio */}
        {featured.bio && (
          <p className="max-w-sm text-sm leading-relaxed text-theme-secondary">
            {featured.bio}
          </p>
        )}
      </section>

      {/* Resume Button */}
      {featured.resumeUrl && (
        <section className="mb-4 w-full">
          <ResumeButton url={featured.resumeUrl} />
        </section>
      )}

      {/* Links Section */}
      {featured.links.length > 0 && (
        <section className="flex w-full flex-col gap-3">
          {featured.links.map((link) => (
            <LinkCard
              key={link.id}
              title={link.title}
              url={link.url}
              category={link.category}
            />
          ))}
        </section>
      )}

      {/* Footer Links */}
      <footer className="mt-10 flex flex-col items-center gap-4">
        <Link
          href={`/${featured.username}`}
          className="text-sm font-medium text-theme-accent transition hover:opacity-80"
        >
          View Full Profile
        </Link>
        <Link
          href="/admin"
          className="text-xs text-theme-muted transition hover:text-theme-accent"
        >
          Admin Dashboard
        </Link>
        <p className="text-xs text-theme-muted">
          © {new Date().getFullYear()} {featured.name}
        </p>
      </footer>
    </main>
  );
}

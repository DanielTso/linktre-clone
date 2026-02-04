import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const featured = await prisma.user.findFirst({
    where: { featured: true },
  });

  const otherUsers = await prisma.user.findMany({
    where: { featured: false },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-4 py-16">
      {/* Featured Hero */}
      {featured && (
        <section className="mb-16 flex w-full flex-col items-center text-center">
          <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-accent/30 bg-dark-700 text-4xl font-bold text-accent">
            {featured.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-100">
            {featured.name}
          </h1>
          {featured.title && featured.company && (
            <p className="mb-3 text-lg font-medium text-accent">
              {featured.title} @ {featured.company}
            </p>
          )}
          {featured.bio && (
            <p className="mb-6 max-w-md leading-relaxed text-gray-400">
              {featured.bio}
            </p>
          )}
          <Link
            href={`/${featured.username}`}
            className="rounded-full bg-accent px-8 py-3 font-semibold text-dark-900 transition hover:bg-accent-light"
          >
            View Profile
          </Link>
        </section>
      )}

      {/* Other Profiles */}
      {otherUsers.length > 0 && (
        <section className="w-full">
          <h2 className="mb-4 text-lg font-semibold text-gray-400">
            Other Profiles
          </h2>
          <div className="flex w-full flex-col gap-3">
            {otherUsers.map((user) => (
              <Link
                key={user.id}
                href={`/${user.username}`}
                className="glass-card glow-hover flex items-center gap-4 p-4 transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dark-700 text-xl font-bold text-accent">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-100">{user.name}</p>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {!featured && otherUsers.length === 0 && (
        <div className="glass-card p-8 text-center">
          <p className="mb-4 text-lg text-gray-300">No profiles yet.</p>
          <Link
            href="/admin"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-dark-900 transition hover:bg-accent-light"
          >
            Create one in Admin
          </Link>
        </div>
      )}

      <Link
        href="/admin"
        className="mt-10 rounded-full border border-dark-600 px-6 py-3 font-semibold text-gray-400 transition hover:border-accent hover:text-accent"
      >
        Admin Dashboard
      </Link>
    </main>
  );
}

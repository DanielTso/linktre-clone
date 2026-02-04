import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center px-4 py-16">
      <h1 className="mb-2 text-4xl font-bold text-white">Linktre Clone</h1>
      <p className="mb-10 text-lg text-white/80">
        A simple link-in-bio tool. Choose a profile:
      </p>

      {users.length === 0 ? (
        <div className="rounded-2xl bg-white/20 p-8 text-center text-white backdrop-blur-sm">
          <p className="mb-4 text-lg">No profiles yet.</p>
          <Link
            href="/admin"
            className="rounded-full bg-white px-6 py-3 font-semibold text-purple-600 transition hover:bg-white/90"
          >
            Create one in Admin
          </Link>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-3">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/${user.username}`}
              className="flex items-center gap-4 rounded-2xl bg-white/20 p-4 backdrop-blur-sm transition hover:bg-white/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 text-xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-white/70">@{user.username}</p>
              </div>
            </Link>
          ))}
          <Link
            href="/admin"
            className="mt-4 self-center rounded-full bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </main>
  );
}

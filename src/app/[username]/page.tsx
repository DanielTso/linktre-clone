import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";

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
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center gap-6 px-4 py-16">
      <ProfileHeader
        name={user.name}
        username={user.username}
        bio={user.bio}
        avatarUrl={user.avatarUrl}
      />

      <div className="flex w-full flex-col gap-3">
        {user.links.map((link) => (
          <LinkCard key={link.id} title={link.title} url={link.url} />
        ))}
      </div>

      {user.links.length === 0 && (
        <p className="text-white/60">No links yet.</p>
      )}
    </main>
  );
}

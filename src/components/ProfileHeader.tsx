interface ProfileHeaderProps {
  name: string;
  username: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

export default function ProfileHeader({
  name,
  username,
  bio,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="h-24 w-24 rounded-full border-4 border-white/30 object-cover"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-3xl font-bold text-white">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <h1 className="text-2xl font-bold text-white">{name}</h1>
      <p className="text-sm text-white/70">@{username}</p>
      {bio && <p className="text-center text-white/80">{bio}</p>}
    </div>
  );
}

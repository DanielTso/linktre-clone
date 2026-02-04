interface ProfileHeaderProps {
  name: string;
  username: string;
  bio?: string | null;
  avatarUrl?: string | null;
  title?: string | null;
  company?: string | null;
}

export default function ProfileHeader({
  name,
  username,
  bio,
  avatarUrl,
  title,
  company,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="h-24 w-24 rounded-full border-4 border-accent/30 object-cover"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-accent/30 bg-dark-700 text-3xl font-bold text-accent">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <h1 className="text-2xl font-bold text-gray-100">{name}</h1>
      {title && company ? (
        <p className="text-sm font-medium text-accent">
          {title} @ {company}
        </p>
      ) : title ? (
        <p className="text-sm font-medium text-accent">{title}</p>
      ) : company ? (
        <p className="text-sm font-medium text-accent">{company}</p>
      ) : null}
      <p className="text-sm text-gray-400">@{username}</p>
      {bio && (
        <p className="max-w-md text-center leading-relaxed text-gray-300">
          {bio}
        </p>
      )}
    </div>
  );
}

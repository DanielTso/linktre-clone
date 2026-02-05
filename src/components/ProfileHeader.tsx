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
      {/* Avatar with gradient ring */}
      <div className="rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1 dark:from-teal-400 dark:via-cyan-500 dark:to-blue-500">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-24 w-24 rounded-full border-4 border-white object-cover dark:border-dark-900"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white text-3xl font-bold text-theme-accent dark:border-dark-900 dark:bg-dark-800">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold text-theme-primary">{name}</h1>
      {title && company ? (
        <p className="text-sm font-medium text-theme-accent">
          {title} @ {company}
        </p>
      ) : title ? (
        <p className="text-sm font-medium text-theme-accent">{title}</p>
      ) : company ? (
        <p className="text-sm font-medium text-theme-accent">{company}</p>
      ) : null}
      <p className="text-sm text-theme-muted">@{username}</p>
      {bio && (
        <p className="max-w-md text-center leading-relaxed text-theme-secondary">
          {bio}
        </p>
      )}
    </div>
  );
}

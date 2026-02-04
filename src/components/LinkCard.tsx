interface LinkCardProps {
  title: string;
  url: string;
  category?: string;
}

export default function LinkCard({ title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card glow-hover block w-full px-6 py-4 text-center font-semibold text-gray-100 transition hover:scale-[1.02]"
    >
      {title}
    </a>
  );
}

interface LinkCardProps {
  title: string;
  url: string;
}

export default function LinkCard({ title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl bg-white/20 px-6 py-4 text-center font-semibold text-white backdrop-blur-sm transition hover:bg-white/30 hover:scale-[1.02]"
    >
      {title}
    </a>
  );
}

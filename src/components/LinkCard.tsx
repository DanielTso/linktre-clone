import {
  Briefcase,
  Users,
  BookOpen,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react";

interface LinkCardProps {
  title: string;
  url: string;
  category?: string | null;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  professional: Briefcase,
  social: Users,
  learning: BookOpen,
  general: LinkIcon,
};

export default function LinkCard({ title, url, category }: LinkCardProps) {
  const Icon = categoryIcons[category || "general"] || LinkIcon;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card glow-hover group flex w-full items-center gap-4 px-5 py-4 transition hover:scale-[1.02]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-theme-accent/10">
        <Icon className="h-5 w-5 text-theme-accent" />
      </div>
      <span className="flex-1 font-semibold text-theme-primary">{title}</span>
      <ArrowRight className="h-5 w-5 text-theme-muted transition-transform group-hover:translate-x-1 group-hover:text-theme-accent" />
    </a>
  );
}

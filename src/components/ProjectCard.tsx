import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string;
  projectUrl?: string | null;
  githubUrl?: string | null;
}

export default function ProjectCard({
  title,
  description,
  techStack,
  projectUrl,
  githubUrl,
}: ProjectCardProps) {
  const techs = techStack.split(",").map((t) => t.trim());

  return (
    <div className="glass-card glow-hover p-6">
      <h3 className="mb-2 text-lg font-bold text-theme-primary">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-theme-secondary">
        {description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {techs.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-theme-accent/10 px-3 py-1 text-xs font-medium text-theme-accent"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-theme-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            Live Site
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-theme-muted px-4 py-2 text-sm font-semibold text-theme-secondary transition hover:border-theme-accent hover:text-theme-accent"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

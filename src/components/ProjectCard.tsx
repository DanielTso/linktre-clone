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
      <h3 className="mb-2 text-lg font-bold text-gray-100">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-400">
        {description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {techs.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light"
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
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-dark-900 transition hover:bg-accent-light"
          >
            Live Site
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  projectUrl: string | null;
  githubUrl: string | null;
  order: number;
  visible: boolean;
}

interface ProjectFormProps {
  userId: string;
  projects: Project[];
  onUpdate: () => void;
}

export default function ProjectForm({
  userId,
  projects,
  onUpdate,
}: ProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !techStack.trim()) return;

    setSaving(true);
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        techStack,
        userId,
        projectUrl: projectUrl || null,
        githubUrl: githubUrl || null,
      }),
    });
    setTitle("");
    setDescription("");
    setTechStack("");
    setProjectUrl("");
    setGithubUrl("");
    setSaving(false);
    onUpdate();
  }

  async function handleDelete(projectId: string) {
    await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    onUpdate();
  }

  async function handleToggleVisibility(project: Project) {
    await fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !project.visible }),
    });
    onUpdate();
  }

  return (
    <div className="w-full">
      <form onSubmit={handleAdd} className="mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          required
        />
        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          rows={2}
          required
        />
        <input
          type="text"
          placeholder="Tech stack (comma-separated, e.g. React,Node.js,PostgreSQL)"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          required
        />
        <input
          type="url"
          placeholder="Live site URL (optional)"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        <input
          type="url"
          placeholder="GitHub URL (optional)"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-accent px-6 py-3 font-semibold text-dark-900 transition hover:bg-accent-light disabled:opacity-50"
        >
          {saving ? "Adding..." : "Add Project"}
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`flex items-center justify-between rounded-xl border border-dark-600 bg-dark-800 p-4 ${
              project.visible ? "" : "opacity-50"
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-100">
                {project.title}
              </p>
              <p className="truncate text-sm text-gray-400">
                {project.techStack}
              </p>
            </div>
            <div className="ml-3 flex gap-2">
              <button
                onClick={() => handleToggleVisibility(project)}
                className="rounded-lg px-3 py-1.5 text-sm text-gray-400 transition hover:bg-dark-700 hover:text-gray-200"
                title={project.visible ? "Hide project" : "Show project"}
              >
                {project.visible ? "Hide" : "Show"}
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="rounded-lg px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

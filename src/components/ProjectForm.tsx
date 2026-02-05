"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import ConfirmDialog from "@/components/ConfirmDialog";

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
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [saving, setSaving] = useState(false);

  // Inline editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTechStack, setEditTechStack] = useState("");
  const [editProjectUrl, setEditProjectUrl] = useState("");
  const [editGithubUrl, setEditGithubUrl] = useState("");

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const inputClass =
    "rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !techStack.trim()) return;

    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
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
      if (!res.ok) throw new Error("Failed to add project");
      setTitle("");
      setDescription("");
      setTechStack("");
      setProjectUrl("");
      setGithubUrl("");
      showToast("Project added", "success");
      onUpdate();
    } catch {
      showToast("Failed to add project", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(projectId: string) {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      showToast("Project deleted", "success");
      onUpdate();
    } catch {
      showToast("Failed to delete project", "error");
    } finally {
      setDeleteTarget(null);
    }
  }

  async function handleToggleVisibility(project: Project) {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !project.visible }),
      });
      if (!res.ok) throw new Error("Failed to update project");
      showToast(
        project.visible ? "Project hidden" : "Project visible",
        "success"
      );
      onUpdate();
    } catch {
      showToast("Failed to update visibility", "error");
    }
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditTechStack(project.techStack);
    setEditProjectUrl(project.projectUrl ?? "");
    setEditGithubUrl(project.githubUrl ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function handleSaveEdit(projectId: string) {
    if (!editTitle.trim() || !editDescription.trim() || !editTechStack.trim())
      return;

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          techStack: editTechStack,
          projectUrl: editProjectUrl || null,
          githubUrl: editGithubUrl || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to update project");
      showToast("Project updated", "success");
      setEditingId(null);
      onUpdate();
    } catch {
      showToast("Failed to update project", "error");
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleAdd} className="mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          required
        />
        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          rows={2}
          required
        />
        <input
          type="text"
          placeholder="Tech stack (comma-separated, e.g. React,Node.js,PostgreSQL)"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className={inputClass}
          required
        />
        <input
          type="url"
          placeholder="Live site URL (optional)"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          className={inputClass}
        />
        <input
          type="url"
          placeholder="GitHub URL (optional)"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className={inputClass}
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
            className={`rounded-xl border border-dark-600 bg-dark-800 p-4 ${
              project.visible ? "" : "opacity-50"
            }`}
          >
            {editingId === project.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={inputClass}
                  placeholder="Project title"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className={inputClass}
                  placeholder="Project description"
                  rows={2}
                />
                <input
                  type="text"
                  value={editTechStack}
                  onChange={(e) => setEditTechStack(e.target.value)}
                  className={inputClass}
                  placeholder="Tech stack (comma-separated)"
                />
                <input
                  type="url"
                  value={editProjectUrl}
                  onChange={(e) => setEditProjectUrl(e.target.value)}
                  className={inputClass}
                  placeholder="Live site URL (optional)"
                />
                <input
                  type="url"
                  value={editGithubUrl}
                  onChange={(e) => setEditGithubUrl(e.target.value)}
                  className={inputClass}
                  placeholder="GitHub URL (optional)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(project.id)}
                    className="rounded-lg bg-accent px-4 py-1.5 text-sm font-medium text-dark-900 transition hover:bg-accent-light"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="rounded-lg px-3 py-1.5 text-sm text-gray-400 transition hover:bg-dark-700 hover:text-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
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
                    onClick={() => startEdit(project)}
                    className="rounded-lg px-3 py-1.5 text-sm text-accent transition hover:bg-accent/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(project)}
                    className="rounded-lg px-3 py-1.5 text-sm text-gray-400 transition hover:bg-dark-700 hover:text-gray-200"
                    title={project.visible ? "Hide project" : "Show project"}
                  >
                    {project.visible ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(project.id)}
                    className="rounded-lg px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

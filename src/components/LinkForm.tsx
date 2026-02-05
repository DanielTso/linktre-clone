"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import ConfirmDialog from "@/components/ConfirmDialog";

interface Link {
  id: string;
  title: string;
  url: string;
  order: number;
  visible: boolean;
  category: string;
}

interface LinkFormProps {
  userId: string;
  links: Link[];
  onUpdate: () => void;
}

export default function LinkForm({ userId, links, onUpdate }: LinkFormProps) {
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("general");
  const [saving, setSaving] = useState(false);

  // Inline editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editCategory, setEditCategory] = useState("general");

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const inputClass =
    "rounded-xl border border-theme-muted/30 bg-white/50 dark:bg-dark-800 px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:border-theme-accent focus:outline-none focus:ring-2 focus:ring-theme-accent/20";

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    setSaving(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url, userId, category }),
      });
      if (!res.ok) throw new Error("Failed to add link");
      setTitle("");
      setUrl("");
      setCategory("general");
      showToast("Link added", "success");
      onUpdate();
    } catch {
      showToast("Failed to add link", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(linkId: string) {
    try {
      const res = await fetch(`/api/links/${linkId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete link");
      showToast("Link deleted", "success");
      onUpdate();
    } catch {
      showToast("Failed to delete link", "error");
    } finally {
      setDeleteTarget(null);
    }
  }

  async function handleToggleVisibility(link: Link) {
    try {
      const res = await fetch(`/api/links/${link.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !link.visible }),
      });
      if (!res.ok) throw new Error("Failed to update link");
      showToast(link.visible ? "Link hidden" : "Link visible", "success");
      onUpdate();
    } catch {
      showToast("Failed to update visibility", "error");
    }
  }

  function startEdit(link: Link) {
    setEditingId(link.id);
    setEditTitle(link.title);
    setEditUrl(link.url);
    setEditCategory(link.category);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function handleSaveEdit(linkId: string) {
    if (!editTitle.trim() || !editUrl.trim()) return;

    try {
      const res = await fetch(`/api/links/${linkId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          url: editUrl,
          category: editCategory,
        }),
      });
      if (!res.ok) throw new Error("Failed to update link");
      showToast("Link updated", "success");
      setEditingId(null);
      onUpdate();
    } catch {
      showToast("Failed to update link", "error");
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleAdd} className="mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Link title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          required
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={inputClass}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          <option value="general">General</option>
          <option value="professional">Professional</option>
          <option value="social">Social</option>
          <option value="learning">Learning</option>
        </select>
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-theme-accent px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Adding..." : "Add Link"}
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <div
            key={link.id}
            className={`rounded-xl border border-theme-muted/30 bg-white/50 dark:bg-dark-800 p-4 ${
              link.visible ? "" : "opacity-50"
            }`}
          >
            {editingId === link.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={inputClass}
                  placeholder="Link title"
                />
                <input
                  type="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className={inputClass}
                  placeholder="https://example.com"
                />
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className={inputClass}
                >
                  <option value="general">General</option>
                  <option value="professional">Professional</option>
                  <option value="social">Social</option>
                  <option value="learning">Learning</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(link.id)}
                    className="rounded-lg bg-theme-accent px-4 py-1.5 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="rounded-lg px-3 py-1.5 text-sm text-theme-muted transition hover:bg-theme-accent/10 hover:text-theme-primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-theme-primary">
                    {link.title}
                  </p>
                  <p className="truncate text-sm text-theme-secondary">
                    {link.url}
                    <span className="ml-2 text-xs text-theme-accent/60">
                      [{link.category}]
                    </span>
                  </p>
                </div>
                <div className="ml-3 flex gap-2">
                  <button
                    onClick={() => startEdit(link)}
                    className="rounded-lg px-3 py-1.5 text-sm text-theme-accent transition hover:bg-theme-accent/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(link)}
                    className="rounded-lg px-3 py-1.5 text-sm text-theme-muted transition hover:bg-theme-accent/10 hover:text-theme-primary"
                    title={link.visible ? "Hide link" : "Show link"}
                  >
                    {link.visible ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(link.id)}
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
        title="Delete Link"
        message="Are you sure you want to delete this link? This action cannot be undone."
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

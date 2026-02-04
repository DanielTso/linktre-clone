"use client";

import { useState } from "react";

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
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("general");
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    setSaving(true);
    await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, userId, category }),
    });
    setTitle("");
    setUrl("");
    setCategory("general");
    setSaving(false);
    onUpdate();
  }

  async function handleDelete(linkId: string) {
    await fetch(`/api/links/${linkId}`, { method: "DELETE" });
    onUpdate();
  }

  async function handleToggleVisibility(link: Link) {
    await fetch(`/api/links/${link.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !link.visible }),
    });
    onUpdate();
  }

  return (
    <div className="w-full">
      <form onSubmit={handleAdd} className="mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Link title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          required
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <option value="general">General</option>
          <option value="professional">Professional</option>
          <option value="social">Social</option>
          <option value="learning">Learning</option>
        </select>
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-accent px-6 py-3 font-semibold text-dark-900 transition hover:bg-accent-light disabled:opacity-50"
        >
          {saving ? "Adding..." : "Add Link"}
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <div
            key={link.id}
            className={`flex items-center justify-between rounded-xl border border-dark-600 bg-dark-800 p-4 ${
              link.visible ? "" : "opacity-50"
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-100">{link.title}</p>
              <p className="truncate text-sm text-gray-400">
                {link.url}
                <span className="ml-2 text-xs text-accent/60">
                  [{link.category}]
                </span>
              </p>
            </div>
            <div className="ml-3 flex gap-2">
              <button
                onClick={() => handleToggleVisibility(link)}
                className="rounded-lg px-3 py-1.5 text-sm text-gray-400 transition hover:bg-dark-700 hover:text-gray-200"
                title={link.visible ? "Hide link" : "Show link"}
              >
                {link.visible ? "Hide" : "Show"}
              </button>
              <button
                onClick={() => handleDelete(link.id)}
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

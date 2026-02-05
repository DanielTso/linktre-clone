"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/Toast";

interface User {
  id: string;
  username: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  title: string | null;
  company: string | null;
  email: string | null;
  resumeUrl: string | null;
  featured: boolean;
}

interface ProfileEditFormProps {
  user: User;
  onUpdate: () => void;
}

export default function ProfileEditForm({
  user,
  onUpdate,
}: ProfileEditFormProps) {
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? "");
  const [title, setTitle] = useState(user.title ?? "");
  const [company, setCompany] = useState(user.company ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? "");
  const [resumeUrl, setResumeUrl] = useState(user.resumeUrl ?? "");
  const [featured, setFeatured] = useState(user.featured);

  useEffect(() => {
    setEditing(false);
    setName(user.name);
    setBio(user.bio ?? "");
    setTitle(user.title ?? "");
    setCompany(user.company ?? "");
    setEmail(user.email ?? "");
    setAvatarUrl(user.avatarUrl ?? "");
    setResumeUrl(user.resumeUrl ?? "");
    setFeatured(user.featured);
  }, [user.id, user.name, user.bio, user.title, user.company, user.email, user.avatarUrl, user.resumeUrl, user.featured]);

  function handleCancel() {
    setName(user.name);
    setBio(user.bio ?? "");
    setTitle(user.title ?? "");
    setCompany(user.company ?? "");
    setEmail(user.email ?? "");
    setAvatarUrl(user.avatarUrl ?? "");
    setResumeUrl(user.resumeUrl ?? "");
    setFeatured(user.featured);
    setEditing(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const data: Record<string, unknown> = {};
      if (name !== user.name) data.name = name;
      if ((bio || null) !== user.bio) data.bio = bio || null;
      if ((title || null) !== user.title) data.title = title || null;
      if ((company || null) !== user.company) data.company = company || null;
      if ((email || null) !== user.email) data.email = email || null;
      if ((avatarUrl || null) !== user.avatarUrl)
        data.avatarUrl = avatarUrl || null;
      if ((resumeUrl || null) !== user.resumeUrl)
        data.resumeUrl = resumeUrl || null;
      if (featured !== user.featured) data.featured = featured;

      if (Object.keys(data).length === 0) {
        setEditing(false);
        return;
      }

      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update profile");
      }

      showToast("Profile updated", "success");
      setEditing(false);
      onUpdate();
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to update profile",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  if (!editing) {
    return (
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-gray-100">{user.name}</p>
          {user.title && (
            <p className="text-sm text-gray-400">
              {user.title}
              {user.company && ` at ${user.company}`}
            </p>
          )}
          {user.bio && (
            <p className="mt-1 text-sm text-gray-400">{user.bio}</p>
          )}
          {user.email && (
            <p className="mt-1 text-sm text-gray-500">{user.email}</p>
          )}
          {user.resumeUrl && (
            <p className="mt-1 text-sm text-accent">Resume uploaded</p>
          )}
          {user.featured && (
            <span className="mt-2 inline-block rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent">
              Featured
            </span>
          )}
        </div>
        <button
          onClick={() => setEditing(true)}
          className="ml-3 rounded-lg px-3 py-1.5 text-sm text-accent transition hover:bg-accent/10"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
        required
      />
      <input
        type="text"
        placeholder="Title (e.g. Software Engineer)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={inputClass}
      />
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <input
        type="url"
        placeholder="Avatar URL"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        className={inputClass}
      />
      <input
        type="url"
        placeholder="Resume URL (PDF link or file path)"
        value={resumeUrl}
        onChange={(e) => setResumeUrl(e.target.value)}
        className={inputClass}
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className={inputClass}
        rows={2}
      />
      <label className="flex items-center gap-2 text-sm text-gray-300">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="rounded border-dark-600 bg-dark-800 text-accent focus:ring-accent/20"
        />
        Featured profile (shown as hero on homepage)
      </label>
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="rounded-xl bg-accent px-6 py-3 font-semibold text-dark-900 transition hover:bg-accent-light disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={handleCancel}
          className="rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-dark-700 hover:text-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

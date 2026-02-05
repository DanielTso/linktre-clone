"use client";

import { useState, useEffect, useCallback } from "react";
import LinkForm from "@/components/LinkForm";
import ProjectForm from "@/components/ProjectForm";
import ProfileEditForm from "@/components/ProfileEditForm";
import { ToastProvider, useToast } from "@/components/Toast";

interface Link {
  id: string;
  title: string;
  url: string;
  order: number;
  visible: boolean;
  category: string;
}

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
  links: Link[];
  projects: Project[];
}

export default function AdminPage() {
  return (
    <ToastProvider>
      <AdminContent />
    </ToastProvider>
  );
}

function AdminContent() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch {
      showToast("Failed to load users", "error");
    }
  }, [showToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newUsername.trim() || !newName.trim()) return;

    setCreating(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          name: newName,
          bio: newBio || null,
          title: newTitle || null,
          company: newCompany || null,
          email: newEmail || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create user");
      }

      setNewUsername("");
      setNewName("");
      setNewBio("");
      setNewTitle("");
      setNewCompany("");
      setNewEmail("");
      showToast("Profile created", "success");
      await fetchUsers();
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to create profile",
        "error"
      );
    } finally {
      setCreating(false);
    }
  }

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const inputClass =
    "rounded-xl border border-theme-muted/30 bg-white/50 dark:bg-dark-800 px-4 py-3 text-theme-primary placeholder:text-theme-muted focus:border-theme-accent focus:outline-none focus:ring-2 focus:ring-theme-accent/20";

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-theme-primary">
        Admin Dashboard
      </h1>

      {/* Create User Form */}
      <section className="glass-card mb-10 p-6">
        <h2 className="mb-4 text-xl font-semibold text-theme-primary">
          Create Profile
        </h2>
        <form onSubmit={handleCreateUser} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username (e.g. johndoe)"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            pattern="^[a-zA-Z0-9_-]+$"
            className={inputClass}
            required
          />
          <input
            type="text"
            placeholder="Display name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={inputClass}
            required
          />
          <input
            type="text"
            placeholder="Title (e.g. Software Engineer)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Company (e.g. Acme Inc.)"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className={inputClass}
          />
          <textarea
            placeholder="Bio (optional)"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className={inputClass}
            rows={2}
          />
          <button
            type="submit"
            disabled={creating}
            className="rounded-xl bg-theme-accent px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </section>

      {/* User Selector */}
      {users.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-semibold text-theme-primary">
            Manage Content
          </h2>
          <div className="flex flex-wrap gap-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`rounded-full px-4 py-2 font-medium transition ${
                  selectedUserId === user.id
                    ? "bg-theme-accent text-white"
                    : "border border-theme-muted/30 text-theme-secondary hover:border-theme-accent hover:text-theme-accent"
                }`}
              >
                {user.featured && (
                  <span className="mr-1" title="Featured profile">
                    ★
                  </span>
                )}
                @{user.username}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Profile Edit + Content Management */}
      {selectedUser && (
        <>
          <section className="glass-card mb-6 p-6">
            <h3 className="mb-4 text-lg font-semibold text-theme-primary">
              Profile
            </h3>
            <ProfileEditForm
              key={selectedUser.id}
              user={selectedUser}
              onUpdate={fetchUsers}
            />
          </section>

          <section className="glass-card mb-6 p-6">
            <h3 className="mb-4 text-lg font-semibold text-theme-primary">
              Links for @{selectedUser.username}
            </h3>
            <LinkForm
              userId={selectedUser.id}
              links={selectedUser.links}
              onUpdate={fetchUsers}
            />
          </section>

          <section className="glass-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-theme-primary">
              Projects for @{selectedUser.username}
            </h3>
            <ProjectForm
              userId={selectedUser.id}
              projects={selectedUser.projects}
              onUpdate={fetchUsers}
            />
          </section>
        </>
      )}
    </main>
  );
}

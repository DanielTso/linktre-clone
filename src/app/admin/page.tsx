"use client";

import { useState, useEffect, useCallback } from "react";
import LinkForm from "@/components/LinkForm";
import ProjectForm from "@/components/ProjectForm";

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
  title: string | null;
  company: string | null;
  email: string | null;
  links: Link[];
  projects: Project[];
}

export default function AdminPage() {
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
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newUsername.trim() || !newName.trim()) return;

    setCreating(true);
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

    if (res.ok) {
      setNewUsername("");
      setNewName("");
      setNewBio("");
      setNewTitle("");
      setNewCompany("");
      setNewEmail("");
      await fetchUsers();
    }
    setCreating(false);
  }

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-100">
        Admin Dashboard
      </h1>

      {/* Create User Form */}
      <section className="glass-card mb-10 p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-100">
          Create Profile
        </h2>
        <form onSubmit={handleCreateUser} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username (e.g. johndoe)"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            pattern="^[a-zA-Z0-9_-]+$"
            className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            required
          />
          <input
            type="text"
            placeholder="Display name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            required
          />
          <input
            type="text"
            placeholder="Title (e.g. Software Engineer)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <input
            type="text"
            placeholder="Company (e.g. Acme Inc.)"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <textarea
            placeholder="Bio (optional)"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            rows={2}
          />
          <button
            type="submit"
            disabled={creating}
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-dark-900 transition hover:bg-accent-light disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </section>

      {/* User Selector */}
      {users.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-semibold text-gray-100">
            Manage Content
          </h2>
          <div className="flex flex-wrap gap-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`rounded-full px-4 py-2 font-medium transition ${
                  selectedUserId === user.id
                    ? "bg-accent text-dark-900"
                    : "border border-dark-600 text-gray-400 hover:border-accent hover:text-accent"
                }`}
              >
                @{user.username}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Link Management */}
      {selectedUser && (
        <>
          <section className="glass-card mb-6 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-100">
              Links for @{selectedUser.username}
            </h3>
            <LinkForm
              userId={selectedUser.id}
              links={selectedUser.links}
              onUpdate={fetchUsers}
            />
          </section>

          <section className="glass-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-100">
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

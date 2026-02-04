"use client";

import { useState, useEffect, useCallback } from "react";
import LinkForm from "@/components/LinkForm";

interface Link {
  id: string;
  title: string;
  url: string;
  order: number;
  visible: boolean;
}

interface User {
  id: string;
  username: string;
  name: string;
  bio: string | null;
  links: Link[];
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
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
      }),
    });

    if (res.ok) {
      setNewUsername("");
      setNewName("");
      setNewBio("");
      await fetchUsers();
    }
    setCreating(false);
  }

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-white">Admin Dashboard</h1>

      {/* Create User Form */}
      <section className="mb-10 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Create Profile
        </h2>
        <form onSubmit={handleCreateUser} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username (e.g. johndoe)"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            pattern="^[a-zA-Z0-9_-]+$"
            className="rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            required
          />
          <input
            type="text"
            placeholder="Display name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            required
          />
          <textarea
            placeholder="Bio (optional)"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            rows={2}
          />
          <button
            type="submit"
            disabled={creating}
            className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </section>

      {/* User Selector */}
      {users.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-semibold text-white">
            Manage Links
          </h2>
          <div className="flex flex-wrap gap-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`rounded-full px-4 py-2 font-medium transition ${
                  selectedUserId === user.id
                    ? "bg-white text-purple-600"
                    : "bg-white/20 text-white hover:bg-white/30"
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
        <section className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Links for @{selectedUser.username}
          </h3>
          <LinkForm
            userId={selectedUser.id}
            links={selectedUser.links}
            onUpdate={fetchUsers}
          />
        </section>
      )}
    </main>
  );
}

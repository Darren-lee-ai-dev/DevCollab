
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, MessageSquare, Plus, Users } from "lucide-react";

import { getCurrentUser, logoutUser } from "@/lib/auth";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Workspace {
  id: string;
  name: string;
  description: string | null;
  role: string;
  _count?: {
    members: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const profile = await getCurrentUser();

        setUser(profile.user);

        const response = await fetch(
          `${API_URL}/api/workspaces`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load workspaces");
        }

        const result = await response.json();

        setWorkspaces(result.workspaces);
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    try {
      await logoutUser();
      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to log out. Please try again.");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading your workspace...
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50">

      <header className="flex items-center justify-between border-b bg-white px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <MessageSquare size={22} />
          </div>

          <h1 className="text-xl font-bold">DevCollab</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border p-2 hover:bg-slate-100"
            aria-label="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-12">

        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Welcome back, {user.name}!
          </h2>

          <p className="mt-2 text-slate-500">
            Select a workspace to continue collaborating with your team.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold">Your workspaces</h3>

          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            <Plus size={17} />
            Create workspace
          </button>
        </div>

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {workspaces.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-12 text-center">
            <Users className="mx-auto mb-4 text-slate-400" size={36} />

            <h4 className="font-semibold">No workspaces yet</h4>

            <p className="mt-2 text-sm text-slate-500">
              Create your first workspace to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                  <MessageSquare size={22} />
                </div>

                <h4 className="font-bold">{workspace.name}</h4>

                <p className="mt-2 text-sm text-slate-500">
                  {workspace.description || "Team workspace"}
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <span>{workspace.role}</span>
                  <span>
                    {workspace._count?.members ?? 0} members
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

import { useState } from "react";
import { CalendarDays, FolderKanban, ListChecks, Mail, Trophy } from "lucide-react";
import { initials } from "../theme";
import type { Project, Task } from "../types";
import { TaskCard } from "./TaskCard";

export function ProfilePage({
  name, role, email, projects, tasks, onSave, onOpenTask, onToast,
}: {
  name: string; role: string; email: string;
  projects: Project[]; tasks: Task[];
  onSave: (name: string, role: string) => void;
  onOpenTask: (id: string) => void;
  onToast: (m: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [n, setN] = useState(name);
  const [r, setR] = useState(role);
  const mine = tasks.filter((t) => t.assignee === "u1");
  const done = mine.filter((t) => t.status === "done").length;
  const active = mine.filter((t) => t.status !== "done").length;

  return (
    <section>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="h-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 sm:h-24" />
        <div className="px-4 pb-4 sm:px-6 sm:pb-5">
          <div className="-mt-8 flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-end gap-3.5">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-slate-900 text-lg font-extrabold text-white shadow">{initials(name)}</span>
              <div className="pb-0.5">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">{name}</h1>
                <p className="text-[13px] text-slate-500">{role}</p>
              </div>
            </div>
            <button onClick={() => { setN(name); setR(role); setEditing((v) => !v); }} className="rounded-lg border border-slate-200 px-3.5 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
              {editing ? "Cancel" : "Edit profile"}
            </button>
          </div>

          {editing ? (
            <form onSubmit={(e) => { e.preventDefault(); if (n.trim().length < 2) return; onSave(n.trim(), r.trim() || role); setEditing(false); }} className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
              <label className="block text-[13px] font-medium text-slate-700">Full name<input value={n} onChange={(e) => setN(e.target.value)} minLength={2} required className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400" /></label>
              <label className="block text-[13px] font-medium text-slate-700">Role<input value={r} onChange={(e) => setR(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400" /></label>
              <div className="sm:col-span-2"><button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-slate-700">Save profile</button></div>
            </form>
          ) : (
            <p className="mt-3 inline-flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> {email}</span>
              <span className="inline-flex items-center gap-1.5"><FolderKanban size={14} className="text-slate-400" /> {projects.length} projects</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-slate-400" /> Member since Aug 2026</span>
            </p>
          )}

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-slate-50 py-3"><p className="flex items-center justify-center gap-1.5 text-lg font-bold text-slate-900"><ListChecks size={16} className="text-slate-400" />{mine.length}</p><p className="text-[11px] text-slate-500">Assigned</p></div>
            <div className="rounded-xl bg-slate-50 py-3"><p className="flex items-center justify-center gap-1.5 text-lg font-bold text-slate-900"><Trophy size={16} className="text-slate-400" />{done}</p><p className="text-[11px] text-slate-500">Completed</p></div>
            <div className="rounded-xl bg-slate-50 py-3"><p className="flex items-center justify-center gap-1.5 text-lg font-bold text-slate-900"><FolderKanban size={16} className="text-slate-400" />{active}</p><p className="text-[11px] text-slate-500">Active</p></div>
          </div>
        </div>
      </div>

      <h2 className="mb-2.5 mt-5 text-sm font-bold text-slate-900">My recent work</h2>
      {mine.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-[13px] text-slate-500">No tasks assigned yet.</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {mine.slice(0, 6).map((t) => <TaskCard key={t.id} task={t} onOpen={() => onOpenTask(t.id)} />)}
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => onToast("Preferences open from the top bar on every page.")} className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50">Preferences</button>
        <button onClick={() => onToast("Demo workspace — sign-in stays on for this preview.")} className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50">Sign out</button>
      </div>
    </section>
  );
}

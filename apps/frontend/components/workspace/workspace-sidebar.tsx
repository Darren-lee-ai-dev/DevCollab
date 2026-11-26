
"use client";

import {
  Hash,
  MessageSquare,
  Users,
  Files,
  Settings,
  Plus,
  ChevronDown,
  Search,
} from "lucide-react";

interface WorkspaceSidebarProps {
  selectedChannel: string;
  onSelectChannel: (channel: string) => void;
}

const channels = [
  "general",
  "announcements",
  "development",
  "design",
  "random",
];

export default function WorkspaceSidebar({
  selectedChannel,
  onSelectChannel,
}: WorkspaceSidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white">

      {/* Workspace */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
            DC
          </div>

          <div>
            <h1 className="text-sm font-bold text-slate-900">
              DevCollab
            </h1>
            <p className="text-xs text-slate-500">
              Team Workspace
            </p>
          </div>
        </div>

        <ChevronDown size={18} className="text-slate-500" />
      </div>

      {/* Navigation */}
      <div className="space-y-1 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
          <MessageSquare size={17} />
          Threads
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
          <Users size={17} />
          Members
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
          <Files size={17} />
          Files
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-4">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
          <Search size={15} className="text-slate-400" />
          <span className="text-xs text-slate-400">
            Search workspace
          </span>
        </div>
      </div>

      {/* Channels */}
      <div className="px-3">
        <div className="mb-2 flex items-center justify-between px-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Channels
          </span>

          <button className="rounded p-1 hover:bg-slate-100">
            <Plus size={16} />
          </button>
        </div>

        <div className="space-y-1">
          {channels.map((channel) => (
            <button
              key={channel}
              onClick={() => onSelectChannel(channel)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                selectedChannel === channel
                  ? "bg-indigo-50 font-semibold text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Hash size={16} />
              {channel}
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mt-auto border-t border-slate-200 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
          <Settings size={17} />
          Settings
        </button>
      </div>

    </aside>
  );
}

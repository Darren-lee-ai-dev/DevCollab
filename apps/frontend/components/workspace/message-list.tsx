
import type { ChatMessage } from "@/types/chat";

interface MessageListProps {
  messages: ChatMessage[];
}

export default function MessageList({
  messages,
}: MessageListProps) {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-6">

      <div className="text-center">
        <span className="rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-500">
          Today
        </span>
      </div>

      {messages.map((message) => (
        <div key={message.id} className="flex gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            {message.initials}
          </div>

          <div className="min-w-0 flex-1">

            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900">
                {message.sender}
              </span>

              <span className="text-xs text-slate-400">
                {message.time}
              </span>
            </div>

            <p className="text-sm leading-6 text-slate-700">
              {message.content}
            </p>

          </div>
        </div>
      ))}
    </div>
  );
}

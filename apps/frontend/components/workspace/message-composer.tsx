
"use client";

import { useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";

interface MessageComposerProps {
  onSendMessage: (content: string) => void;
}

export default function MessageComposer({
  onSendMessage,
}: MessageComposerProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const content = message.trim();

    if (!content) return;

    onSendMessage(content);
    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-slate-200 bg-white p-5"
    >
      <div className="rounded-xl border border-slate-300 p-3 focus-within:border-indigo-500">

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message #general"
          rows={2}
          className="w-full resize-none bg-transparent text-sm outline-none"
        />

        <div className="mt-3 flex items-center justify-between">

          <div className="flex gap-3 text-slate-400">
            <button type="button" title="Attach file">
              <Paperclip size={19} />
            </button>

            <button type="button" title="Emoji">
              <Smile size={19} />
            </button>
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={17} />
          </button>

        </div>
      </div>
    </form>
  );
}

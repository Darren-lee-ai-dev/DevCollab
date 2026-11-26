
import { Hash, Users, Search, Phone, Video } from "lucide-react";

interface ChatHeaderProps {
  channelName: string;
  description: string;
}

export default function ChatHeader({
  channelName,
  description,
}: ChatHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">

      <div>
        <h2 className="flex items-center gap-2 font-bold text-slate-900">
          <Hash size={18} className="text-slate-500" />
          {channelName}
        </h2>

        <p className="text-xs text-slate-500">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-4 text-slate-500">
        <button title="Search">
          <Search size={19} />
        </button>

        <button title="Members">
          <Users size={19} />
        </button>

        <button title="Audio call">
          <Phone size={19} />
        </button>

        <button title="Video call">
          <Video size={19} />
        </button>
      </div>
    </header>
  );
}

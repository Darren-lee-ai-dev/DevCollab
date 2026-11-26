
export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  status: "online" | "offline" | "away";
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  initials: string;
  content: string;
  time: string;
  isOwnMessage: boolean;
}

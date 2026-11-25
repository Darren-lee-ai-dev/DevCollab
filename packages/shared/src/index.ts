
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "online" | "offline" | "away";
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  channelId: string;
  createdAt: string;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
}

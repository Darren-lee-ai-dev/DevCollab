
"use client";

import { useState } from "react";

import WorkspaceSidebar from "@/components/workspace/workspace-sidebar";
import ChatHeader from "@/components/workspace/chat-header";
import MessageList from "@/components/workspace/message-list";
import MessageComposer from "@/components/workspace/message-composer";

import type { ChatMessage } from "@/types/chat";

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "Alex Morgan",
    initials: "AM",
    content: "Good morning, everyone! Welcome to our new team workspace.",
    time: "9:12 AM",
    isOwnMessage: false,
  },
  {
    id: "2",
    sender: "Sarah Johnson",
    initials: "SJ",
    content: "This looks great! We can use this channel for our daily updates.",
    time: "9:15 AM",
    isOwnMessage: false,
  },
  {
    id: "3",
    sender: "Michael Chen",
    initials: "MC",
    content: "I'll share the development progress here. Looking forward to working together!",
    time: "9:18 AM",
    isOwnMessage: false,
  },
];

export default function Home() {
  const [selectedChannel, setSelectedChannel] = useState("general");

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  function handleSendMessage(content: string) {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "Darren Lee",
      initials: "DL",
      content,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      isOwnMessage: true,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);
  }

  const descriptions: Record<string, string> = {
    general: "General team discussions",
    announcements: "Important team announcements",
    development: "Development and engineering discussions",
    design: "UI/UX and design discussions",
    random: "Anything and everything",
  };

  return (
    <main className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">

      {/* Workspace Sidebar */}
      <div className="hidden md:block">
        <WorkspaceSidebar
          selectedChannel={selectedChannel}
          onSelectChannel={setSelectedChannel}
        />
      </div>

      {/* Main Chat Area */}
      <section className="flex min-w-0 flex-1 flex-col">

        <ChatHeader
          channelName={selectedChannel}
          description={
            descriptions[selectedChannel] ??
            "Team conversation"
          }
        />

        <MessageList messages={messages} />

        <MessageComposer onSendMessage={handleSendMessage} />

      </section>
    </main>
  );
}

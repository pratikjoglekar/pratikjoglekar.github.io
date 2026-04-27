"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPlaceholder() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! My name is Pratik Joglekar.",
    },
    {
      role: "assistant",
      content:
        "I approach design systemically, act with intention to create lasting impact, and ground every decision in rigorous reasoning. Ask me about my work or how I navigate complex product challenges.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setInput("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Thinking…" },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: data.reply,
        };
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "I'm having trouble responding right now. Please try again later.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full min-h-[360px] flex-col rounded-xl border border-borderSubtle p-4 sm:p-5 md:p-6">
      
      {/* CHAT ICON (2x SIZE) */}
      <div className="mb-4 flex items-start">
        <Image
          src="/images/profile.png"
          alt="Chatbot"
          width={48}   // ⬅️ doubled
          height={48}  // ⬅️ doubled
          className="rounded-full object-cover"
          priority
        />
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 text-sm sm:text-[15px]"
      >
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="inline-block w-fit max-w-[85%] rounded-2xl border border-[#FF007F] bg-white px-4 py-2 text-foreground shadow-sm break-words">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="inline-block w-fit max-w-[85%] rounded-lg bgColor px-4 py-2 break-words">
                {msg.content}
              </div>
            </div>
          )
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center rounded-md border border-borderSubtle px-3 py-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my work, decisions, or design approach…"
          className="flex-1 bg-transparent text-sm sm:text-[15px] outline-none placeholder:text-textPrimary/50"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="ml-2 shrink-0 text-sm text-textPrimary disabled:opacity-50"
          aria-label="Send message"
          disabled={isLoading}
        >
          →
        </button>
      </form>
    </div>
  );
}
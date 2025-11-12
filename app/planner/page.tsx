"use client";
import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function PlannerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [hasAutoSent, setHasAutoSent] = useState(false);

  const handleSend = async (customInput?: string) => {
    const value = typeof customInput === "string" ? customInput : input;
    if (!value.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: value },
    ];
    setMessages(newMessages);
    setInput("");

    try {
      // Kirim ke API route (Gemini handler)
      const res = await axios.post("/api/aimodel", {
        messages: newMessages.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
      });

      // Ambil respons dari AI
      const data = res.data;
      const aiReply: Message = {
        sender: "ai",
        text: data.resp ?? "Maaf, saya tidak dapat memproses permintaanmu.",
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error("❌ Error saat koneksi ke AI:", error);
      const aiReply: Message = {
        sender: "ai",
        text: "Terjadi kesalahan saat menghubungkan ke AI.",
      };
      setMessages((prev) => [...prev, aiReply]);
    }
  };

  // Otomatis kirim jika ada query di URL
  useEffect(() => {
    if (query && !hasAutoSent) {
      setInput(query);
      handleSend(query);
      setHasAutoSent(true);
    }
  }, [query, hasAutoSent]);

  const trips = [
    { title: "Trip ke Tokyo 2025" },
    { title: "Trip ke Tokyo 2024" },
    { title: "Liburan Bali 2024" },
    { title: "Eksplorasi Italia" },
  ];

  return (
    <div className="flex h-[90.5vh] bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
        <p className="text-xl mb-3 text-white p-3 font-bold">
          Riwayat Perjalanan
        </p>
        <div className="space-y-3">
          {trips.map((trip, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-800 cursor-pointer text-gray-200"
            >
              <span className="text-sm">{trip.title}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Chat content */}
        <div className="flex-1 p-6 space-y-4 ">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-lg max-w-md whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-gray-800"
                    : "bg-white border shadow-sm text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input box aktif */}
        <div className="p-6 border-t bg-white flex items-center gap-2">
          <Textarea
            placeholder="Tulis rencana perjalananmu..."
            className="flex-1 resize-none h-18"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={() => handleSend()} disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { sendToAI } from "@/lib/aiClient";
import IkonInteraksi from "@/components/ui/IkonInteraksi";
import Anggaran, { BudgetItem } from "@/components/ui/Anggaran";
import DaysCounter from "@/components/ui/JumlahHari";
import InterestSelector, {
  SelectInterestOptions,
} from "@/components/ui/TemaPerjalanan";

interface Message {
  sender: "user" | "ai";
  text?: string;
  options?: Array<{
    id: string;
    label: string;
    icon: string;
  }>;
  type?:
    | "text"
    | "options"
    | "complete"
    | "select-group"
    | "select-budget"
    | "select-durasi"
    | "select-tema";
}

export default function PlannerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [hasAutoSent, setHasAutoSent] = useState(false);

  const handleSend = async (customInput?: string) => {
    const value = typeof customInput === "string" ? customInput : input;
    if (!value.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: value, type: "text" } as Message,
    ];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const result = await sendToAI(newMessages);

    const aiReply: Message = {
      sender: "ai",
      type: result.type || "options",
      text: result.text,
      options: result.options || [],
    };

    setMessages((prev) => [...prev, aiReply]);
    setIsLoading(false);
  };

  const handleOptionClick = async (optionId: string, optionLabel: string) => {
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: optionLabel, type: "text" } as Message,
    ];

    setMessages(newMessages);
    setIsLoading(true);

    const result = await sendToAI(newMessages);

    const aiReply: Message = {
      sender: "ai",
      type: result.type || "options",
      text: result.text,
      options: result.options || [],
    };

    setMessages((prev) => [...prev, aiReply]);
    setIsLoading(false);
  };

  const handleIkonInteraksiSelect = async (item: {
    id: number;
    title: string;
    icon: string;
    people: string;
  }) => {
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: item.title, type: "text" } as Message,
    ];

    setMessages(newMessages);
    setIsLoading(true);

    const result = await sendToAI(newMessages);

    const aiReply: Message = {
      sender: "ai",
      type: result.type || "options",
      text: result.text,
      options: result.options || [],
    };

    setMessages((prev) => [...prev, aiReply]);
    setIsLoading(false);
  };

  const handleBudgetSelect = async (item: BudgetItem) => {
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: item.title, type: "text" } as Message,
    ];

    setMessages(newMessages);
    setIsLoading(true);

    const result = await sendToAI(newMessages);

    const aiReply: Message = {
      sender: "ai",
      type: result.type || "options",
      text: result.text,
      options: result.options || [],
    };

    setMessages((prev) => [...prev, aiReply]);
    setIsLoading(false);
  };

  const handleDurationSelect = async (days: number) => {
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: `${days} hari`, type: "text" } as Message,
    ];

    setMessages(newMessages);
    setIsLoading(true);

    const result = await sendToAI(newMessages);

    const aiReply: Message = {
      sender: "ai",
      type: result.type || "options",
      text: result.text,
      options: result.options || [],
    };

    setMessages((prev) => [...prev, aiReply]);
    setIsLoading(false);
  };

  const handleTemaSelect = async (item: (typeof SelectInterestOptions)[0]) => {
    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: item.title, type: "text" } as Message,
    ];

    setMessages(newMessages);
    setIsLoading(true);

    const result = await sendToAI(newMessages);

    const aiReply: Message = {
      sender: "ai",
      type: result.type || "options",
      text: result.text,
      options: result.options || [],
    };

    setMessages((prev) => [...prev, aiReply]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (query && !hasAutoSent) {
      setInput(query);
      handleSend(query);
      setHasAutoSent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "user" ? (
                <div className="px-5 py-3 rounded-lg max-w-md bg-blue-100 text-gray-800 whitespace-pre-wrap">
                  {msg.text}
                </div>
              ) : msg.type === "select-group" ? (
                /* 🔥 Bagian select-group */
                <div className="flex flex-col gap-3 w-full max-w-2xl">
                  {msg.text && (
                    <p className="text-sm text-gray-600">{msg.text}</p>
                  )}
                  <IkonInteraksi onSelect={handleIkonInteraksiSelect} />
                </div>
              ) : msg.type === "select-budget" ? (
                /* 💰 Bagian select-budget */
                <div className="flex flex-col gap-3 w-full max-w-2xl">
                  {msg.text && (
                    <p className="text-sm text-gray-600">{msg.text}</p>
                  )}
                  <Anggaran onSelect={handleBudgetSelect} />
                </div>
              ) : msg.type === "select-durasi" ? (
                /* ⏳ Bagian select-durasi */
                <div className="flex flex-col gap-3 w-full max-w-2xl">
                  {msg.text && (
                    <p className="text-sm text-gray-600">{msg.text}</p>
                  )}
                  <DaysCounter onConfirm={handleDurationSelect} />
                </div>
              ) : msg.type === "select-tema" ? (
                /* ✨ Bagian select-tema */
                <div className="flex flex-col gap-3 w-full max-w-2xl">
                  {msg.text && (
                    <p className="text-sm text-gray-600">{msg.text}</p>
                  )}
                  <InterestSelector onSelect={handleTemaSelect} />
                </div>
              ) : msg.type === "options" &&
                msg.options &&
                msg.options.length > 0 ? (
                <div className="flex flex-col gap-2 w-full max-w-2xl">
                  {msg.text && (
                    <p className="text-sm text-gray-600 mb-2">{msg.text}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {msg.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() =>
                          handleOptionClick(option.id, option.label)
                        }
                        className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                      >
                        <span className="text-3xl mb-2">{option.icon}</span>
                        <span className="text-xs text-center font-medium text-gray-700">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="px-5 py-3 rounded-lg max-w-md bg-white border shadow-sm text-gray-700 whitespace-pre-wrap">
                  {msg.text}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="px-5 py-3 rounded-lg bg-white border shadow-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input box tetap ada */}
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

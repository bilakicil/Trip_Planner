"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { sendToAI } from "@/lib/aiClient";
import IkonInteraksi from "@/components/ui/IkonInteraksi";
import Anggaran, { BudgetItem } from "@/components/ui/Anggaran";
import DaysCounter from "@/components/ui/JumlahHari";
import InterestSelector, {
  SelectInterestOptions,
} from "@/components/ui/TemaPerjalanan";
import FinalUi from "@/components/ui/FinalUi";
import { FinalResponse } from "@/lib/types/FinalResponse";
import { saveTrip, getUserTrips, TripData } from "@/lib/tripService";

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

  data?: FinalResponse;
}

function PlannerContent() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trips, setTrips] = useState<TripData[]>([]);
  const [currentDestination, setCurrentDestination] = useState<string>("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [hasAutoSent, setHasAutoSent] = useState(false);

  // function utk mulai perjalanan baru
  const startNewTrip = () => {
    if (messages.length > 0) {
      setShowConfirmPopup(true);
      return;
    }

    resetTrip();
  };

  // Function utk reset trip
  const resetTrip = () => {
    setMessages([]);
    setInput("");
    setCurrentDestination("");
    setIsLoading(false);
    setIsMobileSidebarOpen(false);
    setShowConfirmPopup(false);
  };

  const handleConfirm = () => {
    resetTrip();
  };

  // Function utk handle cancel popup
  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  // function utk toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // dapatkan userId dari session
  const userId = session?.user?.id || "guest";

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

    let aiReply: Message;

    if (result.type === "complete" && result.data) {
      aiReply = {
        sender: "ai",
        type: "complete",
        text: result.text || "Rencana perjalanan selesai!",
        data: result.data,
      };

      // simpan trip ke db
      try {
        let destination = currentDestination;
        if (!destination && result.data) {
          if (result.data.itinerary && result.data.itinerary.length > 0) {
            const firstActivity = result.data.itinerary[0]?.activities?.[0];
            if (firstActivity && typeof firstActivity === "string") {
              const destMatch = firstActivity.match(
                /(?:ke|menuju|di)\s+([A-Za-z\s]+?)(?:\s|,|\.|$)/i
              );
              destination = destMatch
                ? destMatch[1].trim()
                : "Unknown Destination";
            }
          }

          if (!destination && result.data.resp) {
            const destMatch = result.data.resp.match(
              /(?:ke|di|untuk)\s+([A-Za-z\s]+?)(?:\s+untuk|\s+dengan|,|\.|!|\?|$)/i
            );
            destination = destMatch
              ? destMatch[1].trim()
              : "Unknown Destination";
          }
        }

        const savedTrip = await saveTrip(
          result.data,
          userId,
          destination || "Unknown Destination"
        );

        // update trips di histori
        setTrips((prev) => [savedTrip, ...prev]);
      } catch (error) {
        // pesan error kalo gagal
        alert(
          "Gagal menyimpan trip. Silakan coba lagi. Error: " +
            (error instanceof Error ? error.message : String(error))
        );
      }
    } else {
      aiReply = {
        sender: "ai",
        type: result.type || "options",
        text: result.text,
        options: result.options || [],
      };
    }

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

  // load trips saat komponen mount
  useEffect(() => {
    const loadTrips = async () => {
      if (!session?.user?.id) return;

      try {
        const userTrips = await getUserTrips(userId);
        setTrips(userTrips);
      } catch (error) {
        console.error("Failed to load trips:", error);
      }
    };

    loadTrips();
  }, [userId, session]);

  // auto send query kalo ada
  useEffect(() => {
    if (query && !hasAutoSent) {
      setInput(query);
      handleSend(query);
      setHasAutoSent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, hasAutoSent]);

  useEffect(() => {
    const destinationMessage = messages
      .filter((msg) => msg.sender === "user" && msg.text)
      .find(
        (msg) =>
          msg.text?.toLowerCase().includes("ke ") ||
          msg.text?.toLowerCase().includes("tujuan") ||
          msg.text?.toLowerCase().includes("pergi")
      );

    if (destinationMessage?.text && !currentDestination) {
      const match = destinationMessage.text.match(/ke\s+([^,.!?]+)/i);
      if (match) {
        setCurrentDestination(match[1].trim());
      }
    }
  }, [messages, currentDestination]);

  return (
    <>
      {/* Popup Konfirmasi */}
      {showConfirmPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Konfirmasi Perjalanan Baru
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Pastikan keputusan Anda
                  </p>
                </div>
              </div>
            </div>

            {/* Popup */}
            <div className="px-6 pb-6">
              <p className="text-gray-700 leading-relaxed">
                Anda akan memulai perjalanan baru dan meninggalkan riwayat chat
                saat ini.
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Apakah Anda yakin ingin melanjutkan?
              </p>
            </div>

            {/* Aksinya */}
            <div className="border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors duration-200 shadow-sm"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex h-[90.5vh] bg-gray-50 relative">
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* sidebar */}
        <aside
          className={`
        fixed lg:relative lg:translate-x-0 z-50
        w-64 bg-blue-900 text-white flex flex-col p-4 
        transition-transform duration-300 ease-in-out
        ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        h-full lg:h-auto
      `}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xl text-white p-3 font-bold">
              Riwayat Perjalanan
            </p>
            <button
              className="lg:hidden text-white p-2 hover:bg-blue-800 rounded"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* tombol perjalanan baru */}
          <div className="mb-4">
            <button
              onClick={startNewTrip}
              className="w-full hover:bg-blue-800 text-white font-medium py-2 px-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Perjalanan Baru
            </button>
          </div>

          {/* pemisah setelah tombol */}
          <div className="border-t border-gray-400 mb-4"></div>

          <div className="space-y-0">
            {trips.length > 0 ? (
              trips.map((trip) => (
                <div
                  key={trip.tripId}
                  className="p-3 hover:bg-blue-800 cursor-pointer text-white"
                  onClick={() => {
                    if (trip.fullTripData && trip.fullTripData.resp) {
                      const responseMessage: Message = {
                        sender: "ai",
                        text: trip.fullTripData.resp,
                        type: "complete",
                        data: trip.fullTripData,
                      };
                      setMessages([responseMessage]);
                      setInput("");
                      setIsMobileSidebarOpen(false);
                    }
                  }}
                >
                  <span className="text-sm font-medium">{trip.title}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-300 text-sm p-3">
                Belum ada riwayat perjalanan
              </div>
            )}
          </div>
        </aside>

        {/* chat section */}
        <main className="flex-1 flex flex-col overflow-y-auto lg:ml-0">
          <div className="lg:hidden bg-white border-b p-4 flex items-center justify-between">
            <button
              onClick={toggleMobileSidebar}
              className="text-black p-2 hover:bg-gray-100 rounded"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              ZenTrip Planner
            </h1>
            <div className="w-10"></div>
          </div>
          {/* chat content */}
          <div className="flex-1 p-3 sm:p-6 space-y-4 overflow-y-auto">
            {messages.map((msg, i) => {
              return (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <div className="px-3 sm:px-5 py-3 rounded-lg max-w-xs sm:max-w-md bg-blue-100 text-gray-800 whitespace-pre-wrap text-sm sm:text-base">
                      {msg.text}
                    </div>
                  ) : msg.type === "complete" && msg.data ? (
                    <div className="w-full flex justify-start">
                      <FinalUi data={msg.data} />
                    </div>
                  ) : msg.type === "select-group" ? (
                    /* jumlah orang */
                    <div className="flex flex-col gap-3 w-full max-w-2xl">
                      {msg.text && (
                        <p className="text-sm text-gray-600">{msg.text}</p>
                      )}
                      <IkonInteraksi onSelect={handleIkonInteraksiSelect} />
                    </div>
                  ) : msg.type === "select-budget" ? (
                    /* anggaran */
                    <div className="flex flex-col gap-3 w-full max-w-2xl">
                      {msg.text && (
                        <p className="text-sm text-gray-600">{msg.text}</p>
                      )}
                      <Anggaran onSelect={handleBudgetSelect} />
                    </div>
                  ) : msg.type === "select-durasi" ? (
                    /* durasi */
                    <div className="flex flex-col gap-3 w-full max-w-2xl">
                      {msg.text && (
                        <p className="text-sm text-gray-600">{msg.text}</p>
                      )}
                      <DaysCounter onConfirm={handleDurationSelect} />
                    </div>
                  ) : msg.type === "select-tema" ? (
                    /* tema */
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                        {msg.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() =>
                              handleOptionClick(option.id, option.label)
                            }
                            className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                          >
                            <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                              {option.icon}
                            </span>
                            <span className="text-xs text-center font-medium text-gray-700">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="px-3 sm:px-5 py-3 rounded-lg max-w-xs sm:max-w-md bg-white border shadow-sm text-gray-700 whitespace-pre-wrap text-sm sm:text-base">
                      {msg.text}
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="px-3 sm:px-5 py-3 rounded-lg bg-white border shadow-sm flex items-center gap-2">
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

          {/* input box */}
          <div className="p-3 sm:p-6 border-t bg-white flex items-center gap-2">
            <Textarea
              placeholder="Tulis rencana perjalananmu..."
              className="flex-1 resize-none h-12 sm:h-18 text-sm sm:text-base"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              size="sm"
              className="sm:size-default"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlannerContent />
    </Suspense>
  );
}

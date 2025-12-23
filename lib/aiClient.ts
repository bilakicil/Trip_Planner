import axios from "axios";
import { FinalResponse } from "./types/FinalResponse";

export interface ChatMessage {
  sender: "user" | "ai";
  text?: string;
  type?:
    | "text"
    | "options"
    | "complete"
    | "select-group"
    | "select-budget"
    | "select-durasi"
    | "select-tema";
}

export interface AIResponse {
  type:
    | "text"
    | "options"
    | "select-group"
    | "select-budget"
    | "select-durasi"
    | "select-tema"
    | "complete";

  text?: string;
  options?: { id: string; label: string; icon: string }[];

  data?: FinalResponse; // FINAL JSON
}

export async function sendToAI(messages: ChatMessage[]): Promise<AIResponse> {
  try {
    const res = await axios.post("/api/aimodel", {
      messages: messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
    });

    const data = res.data;

    return {
      type: data.type || "text",
      text: data.text,
      options: data.options || [],
      data: data.data || undefined,
    };
  } catch (error) {
    console.error("Error connecting AI:", error);

    return {
      type: "text",
      text: "Terjadi kesalahan saat menghubungkan ke AI.",
      options: [],
    };
  }
}

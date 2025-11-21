import axios from "axios";

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
    | "complete"
    | "select-group"
    | "select-budget"
    | "select-durasi"
    | "select-tema";
  text: string;
  options?: Array<{
    id: string;
    label: string;
    icon: string;
  }>;
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
      text:
        data.text ||
        data.resp ||
        "Maaf, saya tidak dapat memproses permintaanmu.",
      options: data.options || [],
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

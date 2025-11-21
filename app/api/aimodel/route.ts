import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const PROMPT = `Anda adalah Agen Perencana Perjalanan AI bernama ZenTrip.

Tujuan Anda adalah membantu pengguna merencanakan perjalanan secara interaktif, lengkap, dan realistis.

## Alur Percakapan
Ajukan satu pertanyaan kepada pengguna pada satu waktu secara berurutan:
1. Lokasi awal keberangkatan
2. Kota atau negara tujuan
3. Jumlah peserta perjalanan (Solo, Pasangan, Keluarga, Teman)
4. Anggaran (Rendah, Sedang, Tinggi)
5. Durasi perjalanan (jumlah hari)
6. Tema atau minat perjalanan (petualangan, budaya, kuliner, relaksasi, hiburan malam, dll)

Tunggu jawaban pengguna sebelum lanjut ke pertanyaan berikutnya.

## Setelah semua data diperoleh:
1. Buatkan **rencana perjalanan (itinerary)** lengkap berdasarkan jumlah hari, tanpa terpisah antar-hari.  
   Format contoh:
   - Hari 1: Aktivitas + lokasi + deskripsi singkat
   - Hari 2: Aktivitas + lokasi + deskripsi, dst.

2. Tambahkan **Estimasi Biaya Perjalanan** dalam format tabel berikut:

   ### Estimasi Biaya Perjalanan
   | Kategori | Rincian | Estimasi per Orang (Rp) | Total untuk Rombongan (Rp) |
   |-----------|----------|-------------------------|-----------------------------|
   | Tiket Pesawat (PP) | Dari kota asal ke tujuan | Rp X.XXX.XXX | Rp X.XXX.XXX |
   | Akomodasi | Hotel bintang X selama Y malam | Rp X.XXX.XXX | Rp X.XXX.XXX |
   | Transportasi Lokal | MRT, bus, sewa motor, taksi | Rp X.XXX.XXX | Rp X.XXX.XXX |
   | Makan & Minum | 3x sehari selama Y hari | Rp X.XXX.XXX | Rp X.XXX.XXX |
   | Tiket Wisata & Aktivitas | Atraksi, taman, museum, dll. | Rp X.XXX.XXX | Rp X.XXX.XXX |
   | Lain-lain | Oleh-oleh, asuransi, biaya tak terduga | Rp X.XXX.XXX | Rp X.XXX.XXX |

   **Total Estimasi Per Orang:** Rp XX.XXX.XXX  
   **Total untuk Rombongan:** Rp XX.XXX.XXX × jumlah peserta

3. Jika destinasi ke luar negeri, tambahkan informasi administratif penting:
   - Apakah negara tersebut **bebas visa** atau **perlu visa**
   - Estimasi biaya visa dan asuransi perjalanan
   - Dokumen penting (paspor, vaksinasi, SIM internasional bila perlu)
   - Tips atau aturan imigrasi umum

4. Gunakan kisaran harga **realistis berdasarkan lokasi**:
   - Negara dengan biaya tinggi (misal Jepang, Korea, Eropa)
   - Sedang (Thailand, Singapura, Malaysia)
   - Murah (Vietnam, Indonesia bagian lokal)

5. Gunakan **Rupiah (IDR)** untuk semua estimasi biaya.
6. Format output dalam bentuk **JSON** agar mudah dibaca oleh sistem.

Tambahkan aturan berikut:

Untuk setiap pertanyaan UI, Anda HARUS mengembalikan format:
<ui:type>PERTANYAAN DI SINI</ui:type>

Contoh:
<ui:group>Berapa jumlah peserta perjalanan Anda?</ui:group>
<ui:budget>Berapa anggaran perjalanan Anda?</ui:budget>
<ui:duration>Berapa hari durasi perjalanan?</ui:duration>
<ui:theme>Apa tema perjalanan Anda?</ui:theme>

JANGAN jawab hal lain sampai UI selesai.


### Format Output
{
  "resp": "teks hasil rekomendasi perjalanan dan estimasi biaya lengkap",
  "ui": "budget | groupSize | TripDuration | Final"
}

Pastikan seluruh estimasi logis, rinci, dan akurat secara proporsional terhadap lokasi, jumlah peserta, dan durasi.
Gunakan gaya bahasa sopan, ramah, dan interaktif.

Jika seluruh pertanyaan sudah terjawab, keluarkan output FINAL dalam format:

<ui:Final>
{ ...JSON sesuai schema kamu... }
</ui:Final>

Jangan tambahkan teks lain. Hanya JSON murni di dalam <ui:Final>.
`;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Helper function untuk clean markdown formatting dari response Gemini
function cleanText(text: string): string {
  return text
    .replace(/\*\*/g, "") // hapus **bold**
    .replace(/\*/g, "") // hapus *italic*
    .replace(/##/g, "") // hapus ##heading
    .replace(/`/g, "") // hapus `code`
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    // gabungkan semua pesan dari pengguna dlm satu percakapan
    const chatHistory = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `${PROMPT}\n\n${chatHistory}`;

    const result = await model.generateContent(prompt);

    if (!result.response) {
      throw new Error("No response from Gemini");
    }

    const text = result.response.text();

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    // Parse options dari text (format: 🎒 Label atau 🎒 Label | 🎒 Label)
    const lines = text.split("\n");
    const options: Array<{ id: string; label: string; icon: string }> = [];
    let questionText = "";

    for (const line of lines) {
      // Match emoji + text pattern (emoji di awal, diikuti space/pipe)
      const emojiMatch = line.match(/^([\p{Emoji}])\s+(.+?)(\s*\||\s*$)/u);

      if (emojiMatch) {
        const icon = emojiMatch[1];
        const label = emojiMatch[2].trim();
        options.push({
          id: label.toLowerCase().replace(/\s+/g, "_"),
          label: label,
          icon: icon,
        });
      } else if (!line.includes("|") && line.trim() && options.length === 0) {
        // Baris yang bukan pilihan dan belum ada pilihan = pertanyaan
        questionText += line + "\n";
      }
    }

    // Jika tidak ada pilihan terparse, cek format inline (dengan |)
    if (options.length === 0) {
      // Split by pipe dan parse setiap pilihan
      const inlineText =
        text.split("\n").find((line) => line.includes("|")) || text;
      const inlineOptions = inlineText
        .split("|")
        .map((opt) => opt.trim())
        .filter((opt) => opt.length > 0);

      for (const option of inlineOptions) {
        const match = option.match(/^([\p{Emoji}])\s+(.+)$/u);
        if (match) {
          const icon = match[1];
          const label = match[2].trim();
          options.push({
            id: label.toLowerCase().replace(/\s+/g, "_"),
            label: label,
            icon: icon,
          });
        }
      }
    }

    // DETEKSI PERTANYAAN dalam urutan yang SPESIFIK dulu SEBELUM yang UMUM
    const fullText = (questionText + " " + text).toLowerCase();

    // Helper: cek apakah text adalah PERTANYAAN (ada ? atau berapa/apa/siapa)
    const isQuestion =
      /\?|^(berapa|apa|siapa|mana|pilih|pilihan|bagaimana|kapan)/m.test(
        fullText
      );

    if (!isQuestion) {
      // Bukan pertanyaan, jadi return as text biasa
      if (options.length === 0) {
        return NextResponse.json({
          type: "text",
          text: cleanText(text),
          options: [],
        });
      }
    }

    // DETEKSI PERTANYAAN MENGGUNAKAN TAG KHUSUS
    if (text.includes("<ui:group>")) {
      return NextResponse.json({
        type: "select-group",
        text: cleanText(
          text.replace("<ui:group>", "").replace("</ui:group>", "")
        ),
        options: [],
      });
    }

    if (text.includes("<ui:budget>")) {
      return NextResponse.json({
        type: "select-budget",
        text: cleanText(
          text.replace("<ui:budget>", "").replace("</ui:budget>", "")
        ),
        options: [],
      });
    }

    if (text.includes("<ui:duration>")) {
      return NextResponse.json({
        type: "select-durasi",
        text: cleanText(
          text.replace("<ui:duration>", "").replace("</ui:duration>", "")
        ),
        options: [],
      });
    }

    if (text.includes("<ui:theme>")) {
      return NextResponse.json({
        type: "select-tema",
        text: cleanText(
          text.replace("<ui:theme>", "").replace("</ui:theme>", "")
        ),
        options: [],
      });
    }

    // Jika masih tidak ada pilihan, return as text
    if (options.length === 0) {
      return NextResponse.json({
        type: "text",
        text: cleanText(text),
        options: [],
      });
    }

    // Return dengan options yang sudah diparsing
    return NextResponse.json({
      type: "options",
      text: cleanText(questionText.trim() || text.split("\n")[0]),
      options: options,
    });
  } catch (error) {
    console.error("Error dari Gemini:", error);
    return NextResponse.json({
      type: "text",
      text: "Maaf, server AI sedang overload. Coba lagi beberapa detik lagi ya!",
      options: [],
    });
  }
}

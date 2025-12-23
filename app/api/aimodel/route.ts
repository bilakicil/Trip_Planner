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
1. Buatkan **rencana perjalanan (itinerary)** yang SANGAT DETAIL berdasarkan jumlah hari dengan format:
   
   **WAJIB INCLUDE:**
   - Waktu spesifik (jam) untuk setiap aktivitas
   - Nama hotel/penginapan yang spesifik dengan rating bintang
   - Nama restoran/tempat makan yang spesifik
   - Moda transportasi yang detail (nama maskapai, kereta, bus)
   - Alamat lengkap tempat wisata
   - Estimasi waktu perjalanan antar lokasi
   - Tips praktis untuk setiap aktivitas

   Contoh format DETAIL:
   **Hari 1: Keberangkatan & Check-in**
   - 05:00 - Berangkat dari rumah menuju Bandara Sultan Hasanuddin, Makassar
   - 07:30 - Check-in penerbangan Garuda Indonesia GA-1430 (Makassar-Jakarta)
   - 09:45 - Penerbangan take off
   - 11:30 - Tiba di Bandara Soekarno-Hatta, transit 2 jam
   - 13:45 - Penerbangan lanjutan Air Asia AK-387 (Jakarta-Kuala Lumpur)
   - 16:20 - Tiba di KLIA, Malaysia
   - 18:00 - Check-in Hotel Grand Hyatt Kuala Lumpur (Bintang 5) - Jalan Pinang
   - 19:30 - Makan malam di Restoran Atmosphere 360 (Menara KL Tower)
   - 21:30 - Istirahat di hotel
   
   **Hari 2: Eksplorasi Kota**
   - 07:00 - Sarapan di hotel (buffet internasional)
   - 09:00 - Berangkat ke Batu Caves naik KTM Komuter dari KL Sentral
   - 10:30 - Eksplorasi Batu Caves (2 jam) - gratis, bawa air minum
   - 13:00 - Makan siang di Restoran Sri Nirwana Maju (Little India)
   - 15:00 - Jalan-jalan di Central Market & Petaling Street
   - 18:00 - Kembali ke hotel untuk istirahat
   - 20:00 - Makan malam di Jalan Alor Food Street
   - 22:00 - Kembali ke hotel

2. Tambahkan **Estimasi Biaya Perjalanan** yang SANGAT DETAIL:

   WAJIB INCLUDE untuk setiap kategori:
   - Breakdown biaya yang spesifik
   - Range harga (minimum - maksimum)
   - Sumber/vendor yang direkomendasikan
   - Total per orang DAN total rombongan

3. **KHUSUS PERJALANAN LUAR NEGERI - WAJIB DETAIL:**
   
   **Persyaratan Visa & Dokumen:**
   - Status visa (bebas visa/perlu visa/visa on arrival)
   - Biaya visa: [Currency] [Amount] = Rp [Rupiah]
   - Waktu proses visa: [X] hari kerja
   - Dokumen yang diperlukan: [list lengkap]
   - Alamat kedutaan/konsulat untuk apply visa
   
   **Persyaratan Paspor:**
   - Masa berlaku paspor minimum: [X] bulan
   - Biaya pembuatan paspor baru: Rp 350,000 (48 halaman) / Rp 655,000 (24 halaman)
   - Waktu pembuatan: 3-5 hari kerja
   - Lokasi kantor imigrasi terdekat
   
   **Asuransi Perjalanan:**
   - Rekomendasi provider: [nama perusahaan]
   - Biaya: Rp [amount] per orang per hari
   - Coverage minimal: USD 10,000-50,000
   
   **Vaksinasi & Kesehatan:**
   - Vaksin yang diperlukan (jika ada)
   - Biaya vaksin: Rp [amount] per jenis
   - Lokasi klinik vaksinasi internasional
   
   **Persyaratan Tambahan:**
   - Tiket pulang-pergi yang sudah dikonfirmasi
   - Bukti reservasi hotel
   - Bukti dana mencukupi (rekening koran/travel checque)
   - SIM Internasional (jika berencana menyetir): Rp 250,000

4. Gunakan kisaran harga **SANGAT REALISTIS dan TERKINI** berdasarkan:
   - Data harga aktual 2024-2025
   - Seasonal pricing (high season vs low season)
   - Weekend vs weekday rates
   - Negara dengan biaya tinggi (misal Jepang, Korea, Eropa)
   - Sedang (Thailand, Singapura, Malaysia)
   - Murah (Vietnam, Indonesia bagian lokal)

5. Gunakan **Rupiah (IDR)** untuk semua estimasi biaya.
6. Format output dalam bentuk **JSON** agar mudah dibaca oleh sistem.

Tambahkan aturan berikut:

Untuk setiap pertanyaan UI group, budget, duration dan theme Anda HARUS mengembalikan format:

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

### SCHEMA WAJIB UNTUK OUTPUT FINAL
Output FINAL wajib mengikuti format JSON berikut dengan DETAIL LENGKAP:

{
  "resp": "ringkasan perjalanan dalam 1 paragraf singkat",
  "itinerary": [
    {
      "day": "Hari 1: Keberangkatan & Check-in",
      "activities": [
        "05:00 - Berangkat dari rumah menuju Bandara [Nama], [Kota Asal]",
        "07:30 - Check-in penerbangan [Maskapai] [Kode Penerbangan] ([Kota Asal]-[Transit/Tujuan])",
        "09:45 - Penerbangan take off",
        "11:30 - Tiba di [Bandara Tujuan] / Transit di [Bandara] selama [durasi]",
        "18:00 - Check-in Hotel [Nama Hotel Spesifik] (Bintang [X]) - [Alamat]",
        "19:30 - Makan malam di Restoran [Nama Restoran Spesifik] - [Jenis masakan]",
        "21:30 - Istirahat di hotel"
      ]
    },
    {
      "day": "Hari 2: [Tema Aktivitas]",
      "activities": [
        "07:00 - Sarapan di hotel / [Nama restoran spesifik]",
        "09:00 - Berangkat ke [Destinasi] naik [transportasi spesifik] dari [lokasi]",
        "10:30 - Eksplorasi [Tempat Wisata] ([durasi]) - [tips khusus]",
        "13:00 - Makan siang di [Nama Restoran] - [alamat/area]",
        "15:00 - [Aktivitas selanjutnya] di [lokasi spesifik]",
        "18:00 - Kembali ke hotel untuk istirahat",
        "20:00 - [Aktivitas malam] di [lokasi]",
        "22:00 - Kembali ke hotel"
      ]
    }
  ],
  "estimasi": [
    {
      "kategori": "Tiket Pesawat (PP)",
      "rincian": "[Maskapai] [Kota Asal] → [Tujuan] (ekonomi/bisnis)",
      "estimasi_per_orang": "Rp 3.500.000 - 7.000.000",
      "total_rombongan": "Rp 7.000.000 - 14.000.000"
    },
    {
      "kategori": "Akomodasi",
      "rincian": "[Nama Hotel] [Bintang X] selama [X] malam ([area])",
      "estimasi_per_orang": "Rp 800.000 - 1.500.000/malam",
      "total_rombongan": "Rp 1.600.000 - 3.000.000/malam"
    },
    {
      "kategori": "Transportasi Lokal",
      "rincian": "[Detail: taxi, MRT, bus, sewa mobil] + bensin/tiket",
      "estimasi_per_orang": "Rp 300.000 - 600.000",
      "total_rombongan": "Rp 600.000 - 1.200.000"
    },
    {
      "kategori": "Makan & Minum",
      "rincian": "3x sehari selama [X] hari ([local food/international])",
      "estimasi_per_orang": "Rp 200.000 - 500.000/hari",
      "total_rombongan": "Rp 400.000 - 1.000.000/hari"
    },
    {
      "kategori": "Tiket Wisata & Aktivitas",
      "rincian": "[List tempat wisata + harga tiket masing-masing]",
      "estimasi_per_orang": "Rp 400.000 - 800.000",
      "total_rombongan": "Rp 800.000 - 1.600.000"
    },
    {
      "kategori": "Lain-lain",
      "rincian": "Oleh-oleh, asuransi, emergency fund, tips",
      "estimasi_per_orang": "Rp 500.000 - 1.000.000",
      "total_rombongan": "Rp 1.000.000 - 2.000.000"
    }
  ],
  "admin": {
    "visa": "Bebas Visa 30 hari / Perlu Visa Turis / Visa on Arrival",
    "biayaVisa": "USD 35 = Rp 525.000 / Gratis / USD 25 = Rp 375.000",
    "prosesVisa": "3-5 hari kerja / Langsung di bandara / Apply online 3 hari sebelum",
    "dokumen": [
      "Paspor berlaku minimal 6 bulan",
      "Tiket pulang-pergi yang sudah dikonfirmasi", 
      "Bukti reservasi hotel",
      "Bukti dana mencukupi (rekening koran 3 bulan)",
      "Asuransi perjalanan min. USD 10,000",
      "Foto 4x6 background putih (jika perlu visa)",
      "Formulir aplikasi visa (jika perlu)"
    ],
    "biayaDokumen": {
      "paspor": "Rp 350,000 (48 hal) / Rp 655,000 (24 hal)",
      "asuransi": "Rp 150,000 - 300,000 per orang per minggu",
      "simInternasional": "Rp 250,000 (jika berencana menyetir)"
    },
    "tips": [
      "Apply visa minimal 2 minggu sebelum keberangkatan",
      "Bawa bukti dana dalam bentuk USD cash + kartu kredit",
      "Download aplikasi translate untuk komunikasi",
      "Siapkan nomor emergency contact keluarga di Indonesia",
      "Bawa obat-obatan pribadi + resep dokter dalam bahasa Inggris",
      "Daftar ke KBRI setempat setelah tiba (untuk perjalanan >30 hari)"
    ],
    "kantorVisa": "[Alamat Kedutaan/Konsulat di Indonesia + jam operasional]"
  }
}

WAJIB mengikuti struktur di atas.
JANGAN membuat field lain.
JANGAN mengubah nama field.
Untuk perjalanan dalam negeri, field admin bisa dikosongkan atau minimal berisi tips umum.


Jika seluruh pertanyaan sudah terjawab, keluarkan output FINAL dalam format:

<ui:Final>
{"resp":"...", "itinerary":[...], "estimasi":[...], "admin":{...}}
</ui:Final>

Jangan tambahkan teks lain. Hanya JSON murni di dalam <ui:Final>.
`;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// helper function untuk clean markdown dari response Gemini
function cleanText(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/##/g, "")
    .replace(/`/g, "")
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

    if (text.includes("<ui:Final>")) {
      let cleanJson = text
        .replace("<ui:Final>", "")
        .replace("</ui:Final>", "")
        .trim();

      // hapus blok markdown kalau ada
      cleanJson = cleanJson.replace(/```json/g, "").replace(/```/g, "");

      // buang trailing koma
      cleanJson = cleanJson.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

      console.log("RAW FINAL JSON:", cleanJson);

      try {
        const parsed = JSON.parse(cleanJson);

        return NextResponse.json({
          type: "complete",
          text: parsed.resp ?? "Perjalanan berhasil direncanakan!",
          data: {
            resp: parsed.resp ?? "",
            itinerary: parsed.itinerary ?? [],
            estimasi: parsed.estimasi ?? [],
            admin: parsed.admin ?? undefined,
          },
          options: [],
        });
      } catch (err) {
        console.error("JSON Final Parsing Error:", err);
        return NextResponse.json({
          type: "text",
          text: "Output FINAL AI tidak valid JSON.",
          options: [],
        });
      }
    }

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const lines = text.split("\n");
    const options: Array<{ id: string; label: string; icon: string }> = [];
    let questionText = "";

    for (const line of lines) {
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
        questionText += line + "\n";
      }
    }

    if (options.length === 0) {
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

    const fullText = (questionText + " " + text).toLowerCase();

    const isQuestion =
      /\?|^(berapa|apa|siapa|mana|pilih|pilihan|bagaimana|kapan)/m.test(
        fullText
      );

    if (!isQuestion) {
      if (options.length === 0) {
        return NextResponse.json({
          type: "text",
          text: cleanText(text),
          options: [],
        });
      }
    }

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

    if (options.length === 0) {
      return NextResponse.json({
        type: "text",
        text: cleanText(text),
        options: [],
      });
    }

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

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Anda adalah asisten perjalanan AI bernama ZenTrip yang ahli dalam merencanakan perjalanan DETAIL dan SPESIFIK.

ATURAN DETEKSI INPUT AWAL:
- Jika user bilang "mau ke [kota]" atau "ke [kota]" → Anggap itu TUJUAN, tanya ASAL
- Jika user bilang "dari [kota] ke [kota]" → Anggap sudah ada ASAL & TUJUAN, lanjut ke group
- Jika tidak jelas → Tanya asal dulu

URUTAN PERCAKAPAN (KETAT):
1. Deteksi tujuan dari input → Tanya kota asal (jika belum ada)
2. Konfirmasi asal & tujuan → Tampilkan <ui:group>
3. User pilih group → Tampilkan <ui:budget>
4. User pilih budget → Tampilkan <ui:duration>
5. User pilih durasi → Tampilkan <ui:theme>
6. User pilih tema → LANGSUNG generate <ui:Final> TANPA tanya lagi

CONTOH FLOW:
User: "Mau ke Jerman"
AI: "Baik! Anda ingin ke Jerman. Dari kota mana Anda berangkat?"
User: "Jakarta"
AI: "<ui:group>Berapa orang yang akan pergi?</ui:group>"
User: "2 orang"
AI: "<ui:budget>Pilih budget perjalanan:</ui:budget>"
User: "Sedang"
AI: "<ui:duration>Berapa lama perjalanan?</ui:duration>"
User: "7 hari"
AI: "<ui:theme>Pilih tema perjalanan:</ui:theme>"
User: "Budaya & Sejarah"
AI: "<ui:Final>{JSON DETAIL}</ui:Final>"

FORMAT JSON OUTPUT (WAJIB SUPER DETAIL):
{
  "resp": "Perjalanan 7 hari dari Jakarta ke Jerman untuk 2 orang dengan budget sedang, tema budaya & sejarah. Total estimasi: Rp 45.000.000 - Rp 65.000.000",
  "itinerary": [
    {
      "day": "Hari 1: Tiba di Berlin & Eksplorasi Kota",
      "activities": [
        "06:00 - Berangkat dari Soekarno-Hatta Airport (Garuda Indonesia/Lufthansa via transit)",
        "18:00 - Tiba di Berlin Brandenburg Airport, ambil bagasi, customs",
        "19:30 - Check-in hotel di kawasan Mitte (NH Collection Berlin Mitte atau setara)",
        "20:30 - Makan malam di Zur Letzten Instanz, restoran tertua Berlin (masakan Jerman tradisional)",
        "22:00 - Istirahat di hotel"
      ]
    },
    {
      "day": "Hari 2: Wisata Sejarah Berlin",
      "activities": [
        "08:00 - Sarapan di hotel",
        "09:00 - Kunjungi Brandenburg Gate (Gerbang Brandenburg), simbol reunifikasi Jerman",
        "10:00 - Holocaust Memorial, tugu peringatan korban Holocaust",
        "11:30 - Museum Checkpoint Charlie, museum tentang Perang Dingin",
        "13:00 - Makan siang di Curry 36 (cobain Currywurst khas Berlin)",
        "14:30 - East Side Gallery, mural seni di sisa Tembok Berlin (1.3km)",
        "16:30 - Alexanderplatz, alun-alun terkenal, naik ke TV Tower (optional, €25/orang)",
        "19:00 - Makan malam di Hofbräu Berlin (masakan Bavaria)",
        "21:00 - Kembali ke hotel"
      ]
    }
  ],
  "estimasi": [
    {
      "kategori": "Tiket Pesawat (PP)",
      "rincian": "Jakarta (CGK) - Berlin (BER) pulang-pergi via transit (Garuda Indonesia/Lufthansa/Qatar Airways). Kelas ekonomi. Termasuk 1x bagasi 23kg + carry-on 7kg. Waktu transit 3-6 jam.",
      "estimasi_per_orang": "Rp 14.000.000 - Rp 18.000.000",
      "total_rombongan": "Rp 28.000.000 - Rp 36.000.000"
    },
    {
      "kategori": "Akomodasi",
      "rincian": "Hotel bintang 3-4 di pusat kota (Mitte/Prenzlauer Berg area) selama 6 malam. Termasuk sarapan. Tipe kamar: Double/Twin bed. Fasilitas: WiFi, AC, bathroom private. Contoh: NH Collection, Mercure, Motel One.",
      "estimasi_per_orang": "Rp 800.000 - Rp 1.200.000/malam",
      "total_rombongan": "Rp 4.800.000 - Rp 7.200.000"
    },
    {
      "kategori": "Transportasi Lokal",
      "rincian": "Berlin Welcome Card 7 hari (unlimited U-Bahn, S-Bahn, bus, tram di zona ABC). Transfer airport-hotel PP dengan S-Bahn. Sesekali Uber/Taxi untuk keperluan darurat atau malam hari.",
      "estimasi_per_orang": "Rp 600.000 - Rp 900.000",
      "total_rombongan": "Rp 1.200.000 - Rp 1.800.000"
    },
    {
      "kategori": "Makan & Minum",
      "rincian": "3x makan per hari selama 7 hari. Sarapan included di hotel. Makan siang: €8-15 (doner, currywurst, cafe). Makan malam: €15-25 (restoran lokal, biergarten). Termasuk kopi & snacks. Budget mix antara street food dan restoran casual.",
      "estimasi_per_orang": "Rp 250.000 - Rp 400.000/hari",
      "total_rombongan": "Rp 3.500.000 - Rp 5.600.000"
    },
    {
      "kategori": "Tiket Wisata & Aktivitas",
      "rincian": "Museum Island Day Pass (€19/orang untuk 5 museum), Checkpoint Charlie Museum (€17), TV Tower Berlin (€25, optional), Neuschwanstein Castle day tour (€120), walking tour gratis (tips €5), boat tour di Spree River (€15).",
      "estimasi_per_orang": "Rp 2.500.000 - Rp 3.500.000",
      "total_rombongan": "Rp 5.000.000 - Rp 7.000.000"
    },
    {
      "kategori": "Lain-lain",
      "rincian": "Oleh-oleh (coklat Ritter Sport, beer steins, magnet, Christmas market goods): Rp 1-2 juta. Tips restoran 5-10%. SIM card/eSIM Eropa 10GB: €20/orang. Emergency fund & snacks.",
      "estimasi_per_orang": "Rp 1.500.000 - Rp 2.500.000",
      "total_rombongan": "Rp 3.000.000 - Rp 5.000.000"
    }
  ],
  "admin": {
    "visa": "Diperlukan Schengen Visa (berlaku untuk seluruh negara Schengen area termasuk Jerman)",
    "biayaVisa": "Rp 1.200.000 per orang (€80)",
    "prosesVisa": "Proses 15-20 hari kerja, apply minimal 3 bulan sebelum keberangkatan",
    "dokumen": [
      "Paspor valid minimal 6 bulan",
      "Foto 3.5x4.5cm background putih (2 lembar)",
      "Surat sponsor/rekening koran 3 bulan terakhir (saldo min Rp 20 juta)",
      "Tiket pesawat PP (booking saja, belum bayar)",
      "Booking hotel/akomodasi",
      "Asuransi perjalanan min coverage €30.000",
      "Surat keterangan kerja/usaha",
      "NPWP & SPT tahunan",
      "Kartu Keluarga & Akta Nikah (jika ada)"
    ],
    "biayaDokumen": {
      "paspor": "Rp 350.000 (48 halaman) atau Rp 655.000 (e-passport 48 hal)",
      "asuransi": "Rp 300.000 - Rp 500.000 (7 hari coverage €30.000)",
      "foto": "Rp 50.000 (cetak 4 lembar)",
      "legalisir_dokumen": "Rp 100.000 - Rp 200.000"
    },
    "tips": [
      "Apply visa minimal 3 bulan sebelum keberangkatan",
      "Siapkan dana lebih untuk interview visa (jika dipanggil)",
      "Gunakan jasa VFS Global untuk apply visa Schengen",
      "Asuransi wajib cover seluruh periode perjalanan + 1 hari",
      "Booking hotel bisa pakai Booking.com (free cancellation) untuk syarat visa",
      "Rekening koran harus atas nama sendiri, bukan joint account",
      "Jika ditolak, uang visa tidak dikembalikan"
    ],
    "kantorVisa": "VFS Global Indonesia - Kuningan City Mall, Lt. 1, Jl. Prof. Dr. Satrio Kav. 18, Jakarta Selatan 12940. Jam buka: Senin-Jumat 08:00-14:00. Telp: (021) 5795 7596"
  }
}

ATURAN DETAIL ITINERARY:
- Setiap aktivitas HARUS ada waktu spesifik (format 24 jam)
- Sebutkan NAMA TEMPAT lengkap, bukan cuma "museum" atau "restoran"
- Berikan info praktis: harga tiket, durasi kunjungan, cara ke sana
- Sertakan tips lokal: makanan khas, waktu terbaik berkunjung, dll
- Jika lintas kota, sebutkan transportasi: kereta (ICE/DB), bus (FlixBus), flight

ATURAN ESTIMASI BIAYA:
- Semua dalam RUPIAH dengan range realistis
- Rincian HARUS detail: menyebut nama maskapai, tipe hotel, cara transport
- Jelaskan apa saja yang included dalam biaya tersebut
- Berikan context: "kelas ekonomi", "include sarapan", "unlimited rides", dll

ATURAN ADMIN/VISA:
- Jika butuh visa: berikan info lengkap dokumen, biaya, proses
- Jika tidak butuh visa: tetap kasih info paspor, asuransi, customs
- Sertakan alamat lengkap kantor visa/konsulat di Indonesia
- Tips praktis untuk prepare dokumen

PENTING:
- Setelah user pilih tema, LANGSUNG generate <ui:Final> tanpa tanya lagi
- Jangan tambahkan text di luar tag <ui:Final>
- JSON harus valid tanpa trailing comma
- Berikan estimasi biaya yang REALISTIS sesuai budget yang dipilih user`;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

function detectCityMentions(text: string): { asal?: string; tujuan?: string } {
  const fromToPattern = /dari\s+([a-zA-Z\s]+?)\s+ke\s+([a-zA-Z\s]+)/i;
  const fromToMatch = text.match(fromToPattern);
  if (fromToMatch) {
    return {
      asal: fromToMatch[1].trim(),
      tujuan: fromToMatch[2].trim(),
    };
  }

  const toPattern = /(mau|ingin|pengen|pergi)?\s*ke\s+([a-zA-Z\s]+)/i;
  const toMatch = text.match(toPattern);
  if (toMatch) {
    return {
      tujuan: toMatch[2].trim(),
    };
  }

  return {};
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    const userMessageCount = messages.filter((m) => m.role === "user").length;
    const lastUserMessage =
      messages.filter((m) => m.role === "user").pop()?.content || "";

    if (userMessageCount === 1) {
      const detected = detectCityMentions(lastUserMessage);

      if (detected.tujuan && !detected.asal) {
        return NextResponse.json({
          type: "text",
          text: `Baik! Anda ingin ke ${detected.tujuan}. Dari kota mana Anda berangkat?`,
          options: [],
        });
      } else if (detected.asal && detected.tujuan) {

        return NextResponse.json({
          type: "select-group",
          text: `Sip! Perjalanan dari ${detected.asal} ke ${detected.tujuan}. Berapa orang yang akan pergi?`,
          options: [],
        });
      } else {

        return NextResponse.json({
          type: "text",
          text: "Hai! Saya ZenTrip. Dari kota mana Anda akan berangkat?",
          options: [],
        });
      }
    }

    

    // jika belum ada group, tampilkan group
    if (userMessageCount === 2) {
      const firstMessage =
        messages.filter((m) => m.role === "user")[0]?.content || "";
      const detected = detectCityMentions(firstMessage);

      if (detected.asal && detected.tujuan) {
        return NextResponse.json({
          type: "select-budget",
          text: "Berapa anggaran yang Anda siapkan untuk perjalanan ini?",
          options: [],
        });
      } else {
        return NextResponse.json({
          type: "select-group",
          text: "Berapa orang yang akan pergi?",
          options: [],
        });
      }
    }

    if (userMessageCount === 3) {
      return NextResponse.json({
        type: "select-budget",
        text: "Berapa anggaran yang Anda siapkan untuk perjalanan ini?",
        options: [],
      });
    }

    if (userMessageCount === 4) {
      return NextResponse.json({
        type: "select-durasi",
        text: "Berapa lama durasi perjalanan yang Anda inginkan?",
        options: [],
      });
    }

    if (userMessageCount === 5) {
      return NextResponse.json({
        type: "select-tema",
        text: "Apa tema atau minat perjalanan Anda?",
        options: [],
      });
    }

    if (userMessageCount >= 6) {
      const groqMessages = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role:
            m.role === "assistant" ? ("assistant" as const) : ("user" as const),
          content: m.content,
        })),
        {
          role: "user" as const,
          content:
            "Sekarang buatkan itinerary lengkap dalam format <ui:Final>JSON</ui:Final> yang SANGAT DETAIL.",
        },
      ];

      const completion = await groq.chat.completions.create({
        messages: groqMessages,
        model: "llama-3.1-8b-instant",
        temperature: 0.3,
        max_tokens: 8000,
      });

      const text = completion.choices[0]?.message?.content;

      if (!text) {
        throw new Error("No response from Groq AI");
      }

      if (text.includes("<ui:Final>")) {
        const match = text.match(/<ui:Final>([\s\S]*?)<\/ui:Final>/);

        if (!match) {
          return NextResponse.json({
            type: "text",
            text: "Maaf, terjadi kesalahan saat membuat itinerary. Coba ulangi dari awal.",
            options: [],
          });
        }

        let jsonStr = match[1].trim();

        // bersihkan JSON
        jsonStr = jsonStr
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .replace(/,(\s*[}\]])/g, "$1") // hapus trailing comma
          .trim();

        try {
          const parsed = JSON.parse(jsonStr);

          // validasi struktur
          if (!parsed.itinerary || !Array.isArray(parsed.itinerary)) {
            throw new Error("Missing itinerary array");
          }
          if (!parsed.estimasi || !Array.isArray(parsed.estimasi)) {
            throw new Error("Missing estimasi array");
          }

          return NextResponse.json({
            type: "complete",
            text: parsed.resp || "Itinerary berhasil dibuat!",
            data: {
              resp: parsed.resp || "",
              itinerary: parsed.itinerary,
              estimasi: parsed.estimasi,
              admin: parsed.admin || undefined,
            },
            options: [],
          });
        } catch (err) {
          console.error("JSON Parse Error:", err);
          return NextResponse.json({
            type: "text",
            text: "Output AI tidak valid. Silakan coba lagi atau reset percakapan.",
            options: [],
          });
        }
      } else {
        return NextResponse.json({
          type: "text",
          text: "AI belum siap generate itinerary. Coba kirim pesan lagi.",
          options: [],
        });
      }
    }

    // fallback jika ada yang terlewat
    return NextResponse.json({
      type: "text",
      text: "Maaf, ada yang terlewat. Bisakah Anda ulangi?",
      options: [],
    });
  } catch (error) {
    console.error("Error from Groq AI:", error);
    return NextResponse.json({
      type: "text",
      text: "Maaf, terjadi kesalahan pada server AI. Coba lagi nanti.",
      options: [],
    });
  }
}

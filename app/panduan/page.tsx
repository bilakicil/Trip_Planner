import { Lightbulb, Brain, Plane } from "lucide-react";
import Footer from "@/components/Footer";

export default function PanduanPage() {
  return (
    <>
      <section className="max-w-5xl mx-auto py-12 px-6 mt-16">

        <h2 className="text-sm font-semibold text-purple-600 tracking-wide uppercase mb-2">
          Cara Kerja Kami
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
          ZenTrip AI Bekerja. Biar Anda Bersantai
        </h1>
        <p className="text-gray-600 mb-10">
          Bagaimana perencanaan bebas stres menjadi mungkin? Ikuti langkah
          berikut:
        </p>

        <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 mb-6">
          <div className="p-3 rounded-full bg-purple-100">
            <Lightbulb className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">
              Langkah 1: Input Cerdas
            </h3>
            <p className="text-gray-600 mb-2">
              Beritahu kami impian perjalananmu. Ketik destinasi, tanggal, dan
              preferensimu. ZenTrip AI akan menyiapkan rekomendasi terbaik
              untukmu.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 mb-6">
          <div className="p-3 rounded-full bg-blue-100">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">
              Langkah 2: Proses Optimalisasi
            </h3>
            <p className="text-gray-600 mb-2">
              AI kami menganalisis ribuan opsi penerbangan, hotel, dan aktivitas
              untuk memberikan rute perjalanan yang optimal.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 mb-6">
          <div className="p-3 rounded-full bg-teal-100">
            <Plane className="h-8 w-8 text-teal-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">
              Langkah 3: Nikmati Perjalananmu
            </h3>
            <p className="text-gray-600 mb-2">
              Dapatkan itinerary yang siap pakai, lengkap dengan rincian biaya,
              syarat administrasi, dan rekomendasi aktivitas.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

import { Lightbulb, Brain, Plane } from "lucide-react";
import Footer from "@/components/Footer";

export default function PanduanPage() {
  return (
    <>
      <section className="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 mt-8 sm:mt-16 ">
        <h2 className="text-xs sm:text-sm font-semibold text-purple-600 tracking-wide uppercase mb-2">
          Cara Kerja Kami
        </h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
          ZenTrip AI Bekerja. Biar Anda Bersantai
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-10">
          Bagaimana perencanaan bebas stres menjadi mungkin? Ikuti langkah
          berikut:
        </p>

        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
          <div className="p-2 sm:p-3 rounded-full bg-purple-100 flex-shrink-0">
            <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base sm:text-lg mb-1">
              Langkah 1: Input Cerdas
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              Beritahu kami impian perjalananmu. Ketik destinasi, tanggal, dan
              preferensimu. ZenTrip AI akan menyiapkan rekomendasi terbaik
              untukmu.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
          <div className="p-2 sm:p-3 rounded-full bg-blue-100 flex-shrink-0">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base sm:text-lg mb-1">
              Langkah 2: Proses Optimalisasi
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              AI kami menganalisis ribuan opsi penerbangan, hotel, dan aktivitas
              untuk memberikan rute perjalanan yang optimal.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
          <div className="p-2 sm:p-3 rounded-full bg-teal-100 flex-shrink-0">
            <Plane className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base sm:text-lg mb-1">
              Langkah 3: Nikmati Perjalananmu
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2">
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

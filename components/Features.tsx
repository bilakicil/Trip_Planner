import { Brain, Clock, FileText } from "lucide-react";

export default function Features() {
  const fitur = [
    {
      icon: <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />,
      title: "Rekomendasi AI Cerdas",
      desc: "Dapatkan rekomendasi kota terbaik sesuai preferensi Anda dengan teknologi AI canggih kami.",
    },
    {
      icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />,
      title: "Riwayat Tersimpan",
      desc: "Lihat kembali riwayat pencarian dan rekomendasi Anda sebelumnya untuk pengalaman yang lebih baik.",
    },
    {
      icon: <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />,
      title: "Informasi Administrasi",
      desc: "Dapatkan informasi terkini mengenai administrasi dan kebijakan perjalanan Anda.",
    },
  ];

  return (
    <section className="pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6">
      <h2 className="max-w-7xl pl-4 sm:pl-8 md:pl-25 mx-auto text-lg sm:text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans text-center sm:text-left">
        Fitur Unggulan
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 items-center sm:items-start justify-center flex-wrap mt-8 sm:mt-10 md:mt-14">
        {fitur.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center space-y-1 sm:space-y-2 w-full sm:w-auto"
          >
            <div className="p-3 sm:p-4 border border-blue-300 flex flex-col h-48 sm:h-52 md:h-56 items-center justify-center w-full sm:w-56 md:w-64 rounded-lg hover:shadow-lg transition-shadow duration-300">
              {f.icon}
              <h1 className="text-lg sm:text-xl font-bold text-primary mt-2 sm:mt-3">
                {f.title}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-gray-700 mt-2 sm:mt-3 px-2 sm:px-0">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

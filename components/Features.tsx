import { Brain, Clock, FileText } from "lucide-react";

export default function Features() {
  const fitur = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "Rekomendasi AI Cerdas",
      desc: "Dapatkan rekomendasi kota terbaik sesuai preferensi Anda dengan teknologi AI canggih kami.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Riwayat Tersimpan",
      desc: "Lihat kembali riwayat pencarian dan rekomendasi Anda sebelumnya untuk pengalaman yang lebih baik.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Informasi Administrasi",
      desc: "Dapatkan informasi terkini mengenai administrasi dan kebijakan perjalanan Anda.",
    },
  ];

  return (
    <section className="pt-14 pb-12">
      <h2 className="max-w-7xl pl-25 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Fitur Unggulan
      </h2>
      <div className="flex gap-10 items-start justify-center flex-wrap mt-14">
        {fitur.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center space-y-2"
          >
            <div className="p-4 border border-blue-300 flex flex-col h-56 items-center justify-center w-64 rounded-lg hover:shadow-lg transition-shadow duration-300">
              {f.icon}
              <h1 className="text-xl font-bold text-primary mt-3">{f.title}</h1>
              <p className="text-sm font-medium text-gray-700 mt-3">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Brain, Clock, FileText } from "lucide-react";
import { title } from "node:process";

export default function Features() {
  const fitur = [
    {
      icon: <Brain className="h-7 w-7 text-blue-500" />,
      title: "Rekomendasi AI Cerdas",
    },
    {
      icon: <Clock className="h-7 w-7 text-blue-500" />,
      title: "Riwayat Tersimpan",
    },
    {
      icon: <FileText className="h-7 w-7 text-blue-500" />,
      title: "Informasi Administrasi Lengkap",
    },
  ];

  return (
    <section className="pt-6 pb-12">
      <h2 className="max-w-7xl pl-25 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Fitur Unggulan
      </h2>
      <div className="flex gap-10 items-start justify-center flex-wrap">
        {fitur.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center space-y-2 w-40"
          >
            <div className="p-2 border border-blue-300 rounded-full flex items-center justify-center">
              {f.icon}
            </div>
            <p className="text-sm font-medium text-gray-700">{f.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


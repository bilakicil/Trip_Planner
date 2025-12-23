"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Globe2, Landmark, Plane, Send } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const suggestions = [
  {
    title: "Buat Perjalanan Baru",
    icon: <Globe2 className="text-blue-400 h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    title: "Inspirasi Kemana Saya Harus Pergi",
    icon: <Plane className="text-green-500 h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    title: "Temukan Destinasi Tersembunyi",
    icon: <Landmark className="text-orange-500 h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    title: "Destinasi Perjalanan",
    icon: <Globe2 className="text-yellow-600 h-4 w-4 sm:h-5 sm:w-5" />,
  },
];

function Hero() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSend = () => {
    if (!input.trim()) return;
    router.push(`/planner?query=${encodeURIComponent(input)}`);
  };

  return (
    <div className="mt-20 sm:mt-24 md:mt-32 lg:mt-36 items-center flex justify-center px-4 sm:px-6 md:px-8">
      {/* {Content} */}
      <div className="max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">
          Halo, Saya
          <span className="text-primary"> ZenTrip AI</span>{" "}
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            Perencana Perjalanan Pribadimu
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-5 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-0">
          Cukup beritahu impian perjalananmu dan ZenTrip AI akan urus sisanya
        </p>
        {/* {Input Box} */}
        <div>
          <div className="border-none rounded-2xl p-3 sm:p-4 md:p-5 relative">
            <Textarea
              placeholder="Saya ingin melakukan perjalan ke Jepang....."
              className="w-full h-20 sm:h-24 md:h-32 lg:h-28 bg-transparent border resize-none text-sm sm:text-base md:text-lg"
              value={input} // isi TextArea diambil dari state input
              onChange={(e) => setInput(e.target.value)} // update state saat user mengetik
            ></Textarea>
            <Button
              size="icon"
              className="absolute bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-6 right-4 sm:right-5 md:right-6 lg:right-6 h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-10 lg:w-10"
              onClick={handleSend} // panggil fungsi handleSend saat diklik
            >
              <Send className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
        {/* {Suggestion} */}
        <div className="flex flex-col sm:flex-row md:grid md:grid-cols-2 lg:flex lg:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-center justify-center mt-4 sm:mt-5 md:mt-8">
          {suggestions.map((suggestions, index) => (
            <div
              key={index}
              onClick={() => {
                // Saat user klik suggestion, langsung pindah ke planner
                router.push(
                  `/planner?query=${encodeURIComponent(suggestions.title)}`
                );
              }}
              className="flex items-center gap-1 sm:gap-2 md:gap-3 border rounded-full p-1.5 sm:p-2 md:p-3 cursor-pointer hover:bg-primary hover:text-white transition w-full sm:w-auto md:w-full lg:w-auto justify-center sm:justify-start md:justify-center lg:justify-start"
            >
              <div className="flex-shrink-0">{suggestions.icon}</div>
              <h2 className="text-xs sm:text-sm md:text-base lg:text-sm truncate">
                {suggestions.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
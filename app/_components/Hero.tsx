import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";
import { Content } from "next/font/google";
import { title } from "node:process";
import React from "react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

const suggestions = [
  {
    title: "Buat Perjalanan Baru",
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
  {
    title: "Inspirasi Kemana Saya Harus Pergi",
    icon: <Plane className="text-green-500 h-5 w-5" />,
  },
  {
    title: "Temukan Destinasi Tersembunyi",
    icon: <Landmark className="text-orange-500 h-5 w-5" />,
  },
  {
    title: "Destinasi Perjalanan",
    icon: <Globe2 className="text-yellow-600 h-5 w-5" />,
  },
];

function Hero() {
  return (
    <div className="mt-36 items-center flex justify-center">
      {/* {Content} */}
      <div className="max-w-3xl text-center">
        <h1 className="text-xl md:text-2xl font-bold mb-2">
          Halo, Saya
          <span className="text-primary"> ZenTrip AI</span>{" "}
          <span className="text-xl md:text-2xl font-bold">
            Perencana Perjalanan Pribadimu
          </span>
        </h1>
        <p className="text-md text-gray-600 mb-7">
          Cukup beritahu impian perjalananmu dan ZenTrip AI akan urus sisanya
        </p>
        {/* {Input Box} */}
        <div>
          <div className="border-none rounded-2xl p-4 relative">
            <Textarea
              placeholder="Saya ingin melakukan perjalan ke Jepang....."
              className="w-full h-28 bg-transparent border resize-none"
            ></Textarea>
            <Button size={"icon"} className="absolute bottom-6 right-6">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* {Suggestion} */}
        <div className="flex gap-5">
          {suggestions.map((suggestions, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white"
            >
              {suggestions.icon}
              <h2 className="text-sm">{suggestions.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;

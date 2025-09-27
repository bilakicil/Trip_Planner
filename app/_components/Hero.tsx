import { Textarea } from "@/components/ui/textarea";
import { Content } from "next/font/google";
import React from "react";

function Hero() {
  return (
    <div className="mt-24 flex items-center flex justify-center">
      {/* {Content} */}
      <div className="max-w-3xl max-w-full text-center space-y-6">
        <h1>
          <span className="text-primary text-xl md:text-2xl font-bold">
            Halo, Saya ZenTrip AI
          </span>{" "}
          <span className="text-xl md:text-2xl font-bold">
            Perencana Perjalanan Pribadimu
          </span>
        </h1>
        <p className="text-lg">
          Cukup beritahu impian perjalananmu dan ZenTrip AI akan urus sisanya,
          mulai dari Tiket, Hotel, Itinerary - semua dalam hitungan detik
        </p>
        {/* {Input Box} */}
        <div>
          <div>
            <Textarea
              placeholder="Saya ingin melakukan perjalan ke Jepang"
              className="w-full h-28 bg-transparent border-none"
            ></Textarea>
          </div>
        </div>
        {/* {Suggestion} */}

        {/* {Vidio Section} */}
      </div>
    </div>
  );
}

export default Hero;

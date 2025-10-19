"use client";

import React from "react";
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  // Mapping data jadi Card dengan content khusus destinasi
  const cards = data.map((card, index) => (
    <Card
      key={card.src}
      card={{
        ...card,
        content: (
          <DestinationContent src={card.src} description={card.description} />
        ),
      }}
      index={index}
    />
  ));

  return (
    <div className="w-full h-full pt-20 px-6 md:px-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Destinasi Populer
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

// ✅ Komponen konten destinasi untuk popup
const DestinationContent = ({
  src,
  description,
}: {
  src: string;
  description: string;
}) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-14 rounded-3xl">
      <Image
        src={src}
        alt="Destination"
        width={800}
        height={500}
        className="rounded-2xl mx-auto object-cover"
      />
      <p className="text-neutral-700 dark:text-neutral-200 text-base md:text-lg mt-6 text-center font-sans">
        {description}
      </p>
    </div>
  );
};

// Data destinasi populer
const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights – Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    description:
      "Nikmati suasana romantis Paris dengan mengunjungi Menara Eiffel, Louvre Museum, dan berjalan santai di Champs-Élysées.",
  },
  {
    category: "New York, USA",
    title: "Experience NYC – Times Square, Central Park, Broadway",
    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Rasakan kehidupan kota New York dengan suasana Times Square, jalan-jalan di Central Park, dan menonton pertunjukan Broadway.",
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Jelajahi Tokyo dengan keramaian Shibuya, keindahan bunga sakura, dan kunjungi kuil tradisional Jepang.",
  },
  {
    category: "Rome, Italy",
    title: "Walk through History – Colosseum, Vatican, Roman Forum",
    src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Jalan-jalan di Roma, nikmati keindahan Colosseum, kunjungi Vatikan, dan rasakan sejarah di Roman Forum.",
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and Innovation – Burj Khalifa, Desert Safari",
    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Nikmati kemewahan Dubai dengan Burj Khalifa, pengalaman Safari Gurun, dan pusat perbelanjaan kelas dunia.",
  },
  {
    category: "Sydney, Australia",
    title: "Harbour Views – Opera House, Bondi Beach & Wildlife",
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Kunjungi Sydney Opera House, bersantai di Bondi Beach, dan temui satwa unik khas Australia.",
  },
];

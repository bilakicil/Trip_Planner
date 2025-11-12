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
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6  rounded-3xl">
      <Image
        src={src}
        alt="Destination"
        width={800}
        height={800}
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
    category: "Bali, Indonesia",
    title: "Bali – Pulau Dewata yang Menawan",
    src: "/Indonesia.webp",
    description:
      "Bali dikenal sebagai Pulau Dewata dengan pantai berpasir putih, pura yang megah, dan budaya Hindu yang khas. Tempat sempurna untuk menikmati keindahan alam dan ketenangan spiritual.",
  },
  {
    category: "Tokyo, Japan",
    title: "Tokyo – Jantung Modern Jepang",
    src: "/jepang.webp",
    description:
      "Tokyo adalah kota metropolitan yang memadukan teknologi modern dan budaya tradisional. Dari gedung pencakar langit hingga kuil bersejarah, Tokyo selalu penuh energi dan pesona unik.",
  },
  {
    category: "Cappadocia, Turkey",
    title: "Cappadocia – Negeri Balon Udara dan Batu Ajaib",
    src: "/turki.jpg",
    description:
      "Cappadocia terkenal dengan pemandangan balon udara berwarna-warni yang menghiasi langit pagi. Wilayah ini memiliki formasi batu unik dan lembah menakjubkan yang menjadikannya destinasi impian bagi para turis.",
  },
  {
    category: "Colosseum, Italy",
    title: "Colosseum – Ikon Kejayaan Romawi Kuno",
    src: "/italy.jpg",
    description:
      "Colosseum di Roma adalah amfiteater terbesar yang pernah dibangun Kekaisaran Romawi. Bangunan megah ini menjadi saksi sejarah pertunjukan gladiator dan kemegahan masa lalu Roma.",
  },
  {
    category: "Menara Eiffel, Paris",
    title: "Menara Eiffel – Simbol Keabadian Kota Paris",
    src: "/paris.webp",
    description:
      "Menara Eiffel adalah simbol ikonik Prancis dengan struktur besi megah setinggi 324 meter. Dari puncaknya, pengunjung dapat menikmati panorama indah Kota Paris yang mempesona.",
  },
  {
    category: "Merlion, Singapore",
    title: "Merlion – Ikon Kebanggaan Singapura",
    src: "/singapur.jpg",
    description:
      "Patung Merlion, berbentuk singa dengan tubuh ikan, melambangkan asal-usul dan kekuatan Singapura. Terletak di Marina Bay, tempat ini menjadi spot foto wajib bagi wisatawan.",
  },
  {
    category: "Taj Mahal, India",
    title: "Taj Mahal – Monumen Cinta Abadi",
    src: "/India.webp",
    description:
      "Taj Mahal adalah makam megah yang dibangun oleh Kaisar Shah Jahan untuk mengenang istrinya, Mumtaz Mahal. Keindahan arsitektur marmer putihnya menjadikannya salah satu keajaiban dunia.",
  },
];

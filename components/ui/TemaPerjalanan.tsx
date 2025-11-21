"use client";

import React from "react";

export const SelectInterestOptions = [
  {
    id: 1,
    title: "Budaya",
    desc: "Jelajahi tradisi, sejarah, dan kekayaan budaya lokal.",
    icon: "🏛️",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Kuliner",
    desc: "Nikmati berbagai cita rasa khas di setiap destinasi.",
    icon: "🍜",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    title: "Hiburan Malam",
    desc: "Rasakan keseruan malam dengan musik, lampu kota, dan pesta.",
    icon: "🌃",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "Alam",
    desc: "Eksplor keindahan pegunungan, pantai, dan pemandangan natural.",
    icon: "🏞️",
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: 5,
    title: "Belanja",
    desc: "Berburu barang unik, fashion, atau oleh-oleh khas daerah.",
    icon: "🛍️",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: 6,
    title: "Semua Tema",
    desc: "Campuran lengkap dari berbagai pengalaman perjalanan.",
    icon: "✨",
    color: "bg-gray-100 text-gray-600",
  },
];

interface InterestSelectorProps {
  onSelect: (item: (typeof SelectInterestOptions)[0]) => void;
}

export default function InterestSelector({ onSelect }: InterestSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {SelectInterestOptions.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="p-4 border-2 border-gray-200 rounded-2xl bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 flex items-center justify-center text-3xl rounded-full ${item.color}`}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

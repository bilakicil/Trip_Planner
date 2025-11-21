import React from "react";

export const SelectTravelesList = [
  {
    id: 1,
    title: "Solo",
    desc: "Seseorang melakukan perjalanan dalam eksplorasi",
    icon: "🧳",
    people: "1 Orang",
  },
  {
    id: 2,
    title: "Berpasangan",
    desc: "Dua orang bepergian bersama",
    icon: "🥂",
    people: "2 Orang",
  },
  {
    id: 3,
    title: "Keluarga",
    desc: "Sekelompok orang yang suka liburan",
    icon: "🏡",
    people: "3-5 Orang",
  },
  {
    id: 4,
    title: "Teman",
    desc: "Sekelompok orang yang suka bermain",
    icon: "⛵",
    people: "5-10 Orang",
  },
];

export type TravelGroupItem = (typeof SelectTravelesList)[0];


function IkonInteraksi({
  onSelect,
}: {
  onSelect: (item: (typeof SelectTravelesList)[0]) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {SelectTravelesList.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelect(item)}
          className="p-4 border-2 border-gray-300 rounded-2xl bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
        >
          <h2 className="text-3xl mb-2">{item.icon}</h2>
          <h2 className="text-sm font-medium text-gray-700">{item.title}</h2>
          <p className="text-xs text-gray-500">{item.people}</p>
        </div>
      ))}
    </div>
  );
}

export default IkonInteraksi;

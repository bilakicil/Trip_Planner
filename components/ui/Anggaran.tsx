import React from "react";

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Rendah",
    desc: "Pilihan hemat untuk perjalanan yang tetap seru.",
    icon: "💵",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Sedang",
    desc: "Seimbang antara kenyamanan dan pengeluaran.",
    icon: "💰",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    title: "Tinggi",
    desc: "Nikmati perjalanan tanpa batasan biaya.",
    icon: "💎",
    color: "bg-purple-100 text-purple-600",
  },
];

// ✅ Tentukan tipe item anggaran
export interface BudgetItem {
  id: number;
  title: string;
  desc: string;
  icon: string;
  color: string;
}

// ✅ Tentukan tipe props
interface AnggaranProps {
  onSelect: (item: BudgetItem) => void;
}

// ✅ Fix komponen
function Anggaran({ onSelect }: AnggaranProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {SelectBudgetOptions.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="p-4 border-2 border-gray-300 rounded-2xl bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
        >
          <h2 className="text-3xl mb-2">{item.icon}</h2>
          <h2 className="text-sm font-medium text-gray-700">{item.title}</h2>
          <p className="text-xs text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Anggaran;

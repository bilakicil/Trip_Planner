"use client";
import React, { useState } from "react";

interface DaysCounterProps {
  onConfirm: (days: number) => void;
}

export default function DaysCounter({ onConfirm }: DaysCounterProps) {
  const [days, setDays] = useState(3);

  const decrease = () => {
    if (days > 1) setDays(days - 1);
  };

  const increase = () => {
    setDays(days + 1);
  };

  return (
    <div className="w-full max-w-md p-5 bg-white rounded-2xl shadow-md mx-auto text-center">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Berapa Hari Anda Akan Melakukan Perjalanan
      </h2>

      <div className="flex items-center justify-center gap-6">
        {/* Minus Button */}
        <button
          onClick={decrease}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <span className="text-2xl font-bold text-gray-700">−</span>
        </button>

        {/* Days */}
        <span className="text-2xl font-bold text-gray-900">{days} Hari</span>

        {/* Plus Button */}
        <button
          onClick={increase}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <span className="text-2xl font-bold text-gray-700">+</span>
        </button>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => onConfirm(days)}
        className="mt-5 w-full py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition font-medium"
      >
        Kirim
      </button>
    </div>
  );
}

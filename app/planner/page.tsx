"use client";
import React from "react";
import { Send } from "lucide-react";

export default function PlannerPage() {
  const trips = [
    { title: "Trip ke Tokyo 2025", img: "/tokyo.jpg" },
    { title: "Trip ke Tokyo 2024", img: "/tokyo2.jpg" },
    { title: "Liburan Bali 2024", img: "/bali.jpg" },
    { title: "Eksplorasi Italia", img: "/italia.jpg" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">ZenTrip AI</h2>
        <p className="text-sm mb-3 text-gray-300">Riwayat Perjalanan</p>
        <div className="space-y-3">
          {trips.map((trip, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-800 cursor-pointer"
            >
              <img
                src={trip.img}
                alt={trip.title}
                className="w-10 h-10 rounded-md object-cover"
              />
              <span className="text-sm">{trip.title}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-white shadow-sm">
          <h1 className="text-2xl font-bold">Trip ke Paris selama 7 hari</h1>
        </div>

        {/* Chat content */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {/* User message */}
          <div className="flex justify-start">
            <div className="bg-blue-100 px-4 py-2 rounded-lg max-w-md">
              Saya mau ke Paris selama 7 hari
            </div>
          </div>

          {/* AI reply */}
          <div className="flex justify-start">
            <div className="bg-white shadow-md border rounded-lg p-4 max-w-lg space-y-3">
              <h3 className="font-semibold">Itinerary Harian</h3>
              <p>Hari 1: Museum Louvre & Katedral Notre Dame</p>

              <h3 className="font-semibold mt-4">Persyaratan Administrasi</h3>
              <ul className="list-disc pl-5 text-sm">
                <li>WNI butuh Visa Schengen (jika 90 hari)</li>
                <li>Paspor minimal berlaku</li>
              </ul>

              <h3 className="font-semibold mt-4">Rincian Perkiraan Harga</h3>
              <ul className="list-disc pl-5 text-sm">
                <li>Penerbangan (IDR 10-15jt)</li>
                <li>Akomodasi</li>
                <li>Konsumsi (IDR 3-4jt)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Input box */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2 border rounded-lg p-2">
            <input
              type="text"
              placeholder="Ketik pesanmu atau perbarui rencana..."
              className="flex-1 outline-none px-2 text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

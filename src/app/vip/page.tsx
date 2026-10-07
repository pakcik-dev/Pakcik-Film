"use client";

import { useState } from "react";
import { ArrowLeft, Ban, Lock, Shirt } from "lucide-react";
import Link from "next/link";

export default function VipPage() {
  const [selectedPlan, setSelectedPlan] = useState("week");

  const plans = [
    { id: "week", duration: "per minggu", price: "Rp 10.000", originalPrice: "Rp 12.000", badge: "20% off" },
    { id: "month", duration: "per bulan", price: "Rp 30.000", originalPrice: "Rp 34.000", badge: "20% off" },
    { id: "3months", duration: "per 3 bulan", price: "Rp 85.000", originalPrice: "Rp 100.000", badge: "15% off" },
    { id: "year", duration: "per tahun", price: "Rp 230.000", originalPrice: "Rp 280.000", badge: "20% off" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans pb-20">
      {/* Tombol Kembali */}
      <Link href="/me" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6">
        <ArrowLeft size={24} />
      </Link>

      {/* Judul Banner VIP */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold leading-tight">
          Nikmati nonton<br />Tanpa Iklan<br />dengan VIP PAKCIK FILM
        </h1>
      </div>

      <p className="text-sm font-semibold text-gray-400 mb-3">Pilih paketmu</p>

      {/* Pilihan Paket Langganan */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`min-w-[130px] p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              selectedPlan === plan.id
                ? "border-purple-500 bg-purple-950/40 text-purple-200"
                : "border-gray-800 bg-gray-900 text-gray-400"
            }`}
          >
            <div>
              <p className="text-xs text-gray-400 mb-2">{plan.duration}</p>
              <p className="text-base font-bold text-white mb-1">{plan.price}</p>
              <p className="text-[10px] text-gray-500 line-through">{plan.originalPrice}</p>
            </div>
            <span className="mt-3 inline-block text-[10px] font-semibold text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded-md w-fit">
              {plan.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Keuntungan Premium */}
      <div className="mt-8">
        <h2 className="text-base font-bold text-gray-200 mb-4">Keuntungan Premium</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-purple-400">
              <Ban size={24} />
            </div>
            <span className="text-xs text-gray-300">Bebas Iklan</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-purple-400">
              <Lock size={24} />
            </div>
            <span className="text-xs text-gray-300">Buka Semua</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-purple-400">
              <Shirt size={24} />
            </div>
            <span className="text-xs text-gray-300">Fitur Ubah Gaya</span>
          </div>
        </div>
      </div>

      {/* Tombol Beli */}
      <button className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full transition shadow-lg shadow-purple-900/40">
        Coba Sekarang
      </button>

      <p className="text-[10px] text-gray-500 text-center mt-4">
        Dengan melanjutkan, Anda menyetujui Ketentuan Penggunaan, Ketentuan Langganan, dan Kebijakan Privasi PAKCIK FILM.
      </p>
    </div>
  );
}
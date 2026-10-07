"use client";

import { Settings, UserCircle2, Crown, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans pb-24">
      {/* HEADER: Foto Profil, Nama Akun, dan Icon Setting */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <UserCircle2 size={50} className="text-blue-500" />
          <h1 className="text-xl font-bold">user19138048750</h1>
        </div>
        {/* Tombol ke Halaman Pengaturan */}
        <Link href="/settings">
          <Settings size={24} className="text-gray-300 hover:text-white" />
        </Link>
      </div>

      {/* BANNER VIP */}
      <Link href="/vip">
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 flex items-center justify-between cursor-pointer transform transition hover:scale-[1.02]">
          <div>
            <div className="flex items-center gap-2">
              <Crown size={20} className="text-yellow-300" />
              <h2 className="text-lg font-bold text-white">Jadi VIP</h2>
            </div>
            <p className="text-sm text-purple-200 mt-1">Nikmati nontonmu Tanpa Iklan dengan PAKCIK FILM</p>
          </div>
          <ChevronRight size={24} className="text-white opacity-70" />
        </div>
      </Link>

      {/* HISTORI TONTONAN */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-yellow-500 mb-4">Histori</h3>
        <div className="flex gap-4 border-b border-gray-800 pb-2">
          <button className="text-yellow-500 font-semibold border-b-2 border-yellow-500 px-2 pb-1">SEMUA</button>
          <button className="text-gray-400 font-semibold px-2 pb-1">Sedang Diproses</button>
          <button className="text-gray-400 font-semibold px-2 pb-1">Selesai</button>
        </div>

        {/* List Histori */}
        <div className="mt-4 flex gap-4">
          <div className="w-24 h-32 bg-gray-800 rounded-md flex-shrink-0 animate-pulse"></div>
          <div>
            <h4 className="font-bold text-md">Pembunuh Jadi Gadis Desa 1</h4>
            <p className="text-xs text-gray-400 mt-1">Pemeran Utama Wanita Kuat...</p>
            <p className="text-xs text-gray-500 mt-2">Ep.3 / Ep.152</p>
          </div>
        </div>
      </div>
    </div>
  );
}
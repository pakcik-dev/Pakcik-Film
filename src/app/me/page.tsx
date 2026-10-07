"use client";

import { useState } from "react";
import { Settings, UserCircle2, Crown, ChevronRight, LogIn, Clock } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // Simulasi status login (Nanti kita ganti dengan database asli)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans pb-32">
      {/* HEADER: Tampilan Berubah Tergantung Status Login */}
      <div className="flex items-center justify-between mt-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <UserCircle2 size={50} className="text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">Bayu Kumara</h1>
              <p className="text-xs text-gray-400">User ID: 19138048750</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
              <UserCircle2 size={30} className="text-gray-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Belum Login</h1>
              <p className="text-xs text-gray-400">Login untuk menyimpan data</p>
            </div>
          </div>
        )}

        <Link href="/settings">
          <Settings size={24} className="text-gray-300 hover:text-white" />
        </Link>
      </div>

      {/* TOMBOL LOGIN (Muncul jika belum login) */}
      {!isLoggedIn && (
        <button 
          onClick={() => setIsLoggedIn(true)}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition"
        >
          <LogIn size={20} />
          Masuk dengan Google
        </button>
      )}

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

      {/* HISTORI: Terakhir Dikunjungi */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={20} className="text-yellow-500" />
          <h3 className="text-lg font-bold text-yellow-500">Terakhir Dikunjungi</h3>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">
          {/* Item Dummy Histori */}
          {["Anichin", "1Shows", "Mynimeku"].map((site) => (
            <div key={site} className="min-w-[100px] bg-gray-900 border border-gray-800 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-xs text-gray-400">Logo</div>
              <span className="text-xs font-semibold text-gray-300">{site}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
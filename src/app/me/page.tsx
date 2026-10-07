"use client";

import { useState, useEffect } from "react";
import { Settings, UserCircle2, Crown, ChevronRight, LogIn, Clock, X } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [tempName, setTempName] = useState("");

  // Cek apakah user sudah login sebelumnya
  useEffect(() => {
    const savedName = localStorage.getItem("pakcik_user");
    if (savedName) {
      setUserName(savedName);
      setIsLoggedIn(true);
    }
  }, []);

  // Fungsi simpan nama
  const handleSaveName = () => {
    if (tempName.trim() === "") return;
    localStorage.setItem("pakcik_user", tempName);
    setUserName(tempName);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans pb-32 relative">
      {/* HEADER */}
      <div className="flex items-center justify-between mt-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <UserCircle2 size={50} className="text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">{userName}</h1>
              <p className="text-xs text-gray-400">User ID: {Math.floor(Math.random() * 1000000000)}</p>
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

      {/* TOMBOL LOGIN */}
      {!isLoggedIn && (
        <button 
          onClick={() => setShowLoginModal(true)}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition"
        >
          <LogIn size={20} />
          Masuk dengan Google
        </button>
      )}

      {/* BANNER VIP */}
      <Link href="/vip">
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 flex items-center justify-between cursor-pointer">
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

      {/* HISTORI KOSONG */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={20} className="text-yellow-500" />
          <h3 className="text-lg font-bold text-yellow-500">Baru Saja Dilihat</h3>
        </div>
        <div className="w-full p-8 border border-gray-800 rounded-xl flex flex-col items-center justify-center text-gray-500">
          <Clock size={30} className="mb-2 opacity-50" />
          <p className="text-sm">Belum ada histori tontonan</p>
        </div>
      </div>

      {/* POP-UP BUAT NAMA (Simulasi Login) */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-sm rounded-2xl p-6 border border-gray-800 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Buat Nama Pengguna</h2>
              <button onClick={() => setShowLoginModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <p className="text-xs text-gray-400 mb-4">Akun Google berhasil ditautkan. Silakan buat nama tampilan Anda.</p>
            <input 
              type="text" 
              placeholder="Masukkan nama..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-4 outline-none focus:border-blue-500"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
            <button 
              onClick={handleSaveName}
              className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-lg transition"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, Check, Plus, UserCircle2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("pakcik_user");
    if (savedName) setUserName(savedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("pakcik_user"); // Hapus data login
    router.push("/me"); // Kembali ke profil
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans relative">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/settings" className="text-gray-300 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Akun Saya</h1>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">Metode Masuk</p>
          <p className="text-sm text-gray-300">{userName ? "Menggunakan Google" : "Belum Login"}</p>
        </div>
        <hr className="border-gray-800" />

        <div onClick={() => setShowSwitchModal(true)} className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-900/50 rounded-lg">
          <span className="text-sm font-medium">Ganti Akun</span>
          <ChevronRight size={18} className="text-gray-500" />
        </div>

        {userName && (
          <div onClick={handleLogout} className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-900/50 rounded-lg text-red-400">
            <span className="text-sm font-medium">Keluar</span>
            <ChevronRight size={18} className="text-gray-500" />
          </div>
        )}
      </div>

      {showSwitchModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="w-full max-w-md bg-gray-900 rounded-t-2xl p-5 border-t border-gray-800 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setShowSwitchModal(false)}><X size={20} className="text-gray-400" /></button>
              <h2 className="text-base font-bold text-center flex-1 pr-5">Ganti Akun</h2>
            </div>

            <div className="space-y-3 mb-6">
              {/* Jika sudah login, tampilkan namanya */}
              {userName ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800 cursor-pointer border border-gray-700">
                  <div className="flex items-center gap-3">
                    <UserCircle2 size={36} className="text-blue-400" />
                    <span className="text-sm font-semibold text-white">{userName}</span>
                  </div>
                  <Check size={20} className="text-yellow-400" />
                </div>
              ) : (
                <p className="text-center text-sm text-gray-500 py-2">Belum ada akun yang login</p>
              )}

              {/* Tombol Tambah Akun */}
              <div onClick={() => { setShowSwitchModal(false); router.push("/me"); }} className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/60 cursor-pointer text-gray-300 mt-4">
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                  <Plus size={20} />
                </div>
                <span className="text-sm font-semibold">Tambah Akun Baru</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
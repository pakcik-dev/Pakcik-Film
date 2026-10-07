"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight, Check, Plus, UserCircle2, X } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [activeUser, setActiveUser] = useState("user19138048750");

  const accounts = [
    { id: "user19138048750", name: "user19138048750", isVip: false },
    { id: "user97761182341", name: "user97761182341", isVip: true },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans relative">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/settings" className="text-gray-300 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Akun Saya</h1>
      </div>

      {/* Menu Akun */}
      <div className="space-y-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">Metode Masuk</p>
          <p className="text-sm text-gray-300">Menggunakan Google</p>
        </div>

        <hr className="border-gray-800" />

        <div
          onClick={() => setShowSwitchModal(true)}
          className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-900/50 px-2 rounded-lg transition"
        >
          <span className="text-sm font-medium">Ganti Akun</span>
          <ChevronRight size={18} className="text-gray-500" />
        </div>

        <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-900/50 px-2 rounded-lg transition text-red-400">
          <span className="text-sm font-medium">Keluar</span>
          <ChevronRight size={18} className="text-gray-500" />
        </div>
      </div>

      {/* Tombol Hapus Akun di Bawah */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <button className="text-xs text-gray-500 hover:text-red-400 transition">
          ⊖ Hapus akun
        </button>
      </div>

      {/* POP-UP / BOTTOM SHEET: Ganti Akun (Sesuai Foto 6) */}
      {showSwitchModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="w-full max-w-md bg-gray-900 rounded-t-2xl p-5 border-t border-gray-800 animate-in slide-in-from-bottom duration-200">
            {/* Header Pop-up */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setShowSwitchModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              <h2 className="text-base font-bold text-center flex-1 pr-5">Ganti Akun</h2>
            </div>

            {/* List Akun yang Tersedia */}
            <div className="space-y-3 mb-6">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => {
                    setActiveUser(acc.id);
                    setShowSwitchModal(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-800/60 hover:bg-gray-800 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <UserCircle2 size={36} className="text-blue-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{acc.name}</span>
                        {acc.isVip && (
                          <span className="text-[10px] font-bold text-yellow-300 bg-purple-900/80 px-1.5 py-0.5 rounded border border-purple-500/40">
                            VIP
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {activeUser === acc.id && <Check size={20} className="text-yellow-400" />}
                </div>
              ))}

              {/* Tombol Tambah Akun */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/60 cursor-pointer transition text-gray-300">
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                  <Plus size={20} />
                </div>
                <span className="text-sm font-semibold">Tambah Akun</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
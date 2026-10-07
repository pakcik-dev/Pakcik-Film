"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [notification, setNotification] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      {/* Header Pengaturan */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/me" className="text-gray-300 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Akun & Pengaturan</h1>
      </div>

      {/* Bagian Akun */}
      <div className="space-y-6">
        <div>
          <p className="text-xs text-gray-500 mb-3 font-semibold">Akun</p>
          <div className="space-y-4">
            <Link href="/settings/account" className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-sm">Akun Saya</span>
              <ChevronRight size={18} className="text-gray-500" />
            </Link>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Usia</span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                25 - 29 <ChevronRight size={18} className="text-gray-500" />
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Jenis kelamin</span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                Laki-laki <ChevronRight size={18} className="text-gray-500" />
              </span>
            </div>
          </div>
        </div>

        <hr className="border-gray-800" />

        {/* Bagian Pengaturan General */}
        <div>
          <p className="text-xs text-gray-500 mb-3 font-semibold">Pengaturan</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Notifikasi</span>
              <button
                onClick={() => setNotification(!notification)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notification ? "bg-emerald-500 justify-end" : "bg-gray-700 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Versi Aplikasi</span>
              <span className="text-sm text-gray-500">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
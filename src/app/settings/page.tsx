"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, X, Check } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [notification, setNotification] = useState(true);
  const [age, setAge] = useState("25 - 29");
  const [gender, setGender] = useState("Laki-laki");
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  useEffect(() => {
    const savedAge = localStorage.getItem("user_age");
    const savedGender = localStorage.getItem("user_gender");
    if (savedAge) setAge(savedAge);
    if (savedGender) setGender(savedGender);
  }, []);

  const handleSelectAge = (val: string) => {
    setAge(val);
    localStorage.setItem("user_age", val);
    setShowAgeModal(false);
  };

  const handleSelectGender = (val: string) => {
    setGender(val);
    localStorage.setItem("user_gender", val);
    setShowGenderModal(false);
  };

  const ageOptions = ["< 18", "18 - 24", "25 - 29", "30 - 39", "40+"];
  const genderOptions = ["Laki-laki", "Perempuan", "Rahasia"];

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/me" className="text-gray-300 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Akun & Pengaturan</h1>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs text-gray-500 mb-3 font-semibold">Akun</p>
          <div className="space-y-4">
            <Link href="/settings/account" className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-sm">Akun Saya</span>
              <ChevronRight size={18} className="text-gray-500" />
            </Link>

            <div 
              onClick={() => setShowAgeModal(true)}
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-900/50 px-1 rounded-lg transition"
            >
              <span className="text-sm">Usia</span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                {age} <ChevronRight size={18} className="text-gray-500" />
              </span>
            </div>

            <div 
              onClick={() => setShowGenderModal(true)}
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-900/50 px-1 rounded-lg transition"
            >
              <span className="text-sm">Jenis kelamin</span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                {gender} <ChevronRight size={18} className="text-gray-500" />
              </span>
            </div>
          </div>
        </div>

        <hr className="border-gray-800" />

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

      {/* MODAL PILIH USIA */}
      {showAgeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="w-full max-w-md bg-gray-900 rounded-t-2xl p-5 border-t border-gray-800 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold">Pilih Usia</h2>
              <button onClick={() => setShowAgeModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-2">
              {ageOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => handleSelectAge(opt)}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-800/60 hover:bg-gray-800 cursor-pointer text-sm"
                >
                  <span>{opt}</span>
                  {age === opt && <Check size={18} className="text-yellow-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL PILIH GENDER */}
      {showGenderModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="w-full max-w-md bg-gray-900 rounded-t-2xl p-5 border-t border-gray-800 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold">Pilih Jenis Kelamin</h2>
              <button onClick={() => setShowGenderModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-2">
              {genderOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => handleSelectGender(opt)}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-800/60 hover:bg-gray-800 cursor-pointer text-sm"
                >
                  <span>{opt}</span>
                  {gender === opt && <Check size={18} className="text-yellow-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
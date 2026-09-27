"use client";

import { useEffect, useState } from "react";

const KEY = "pakcik-social-toast-light-v2";

export function SafetyToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // BAGIAN YANG DIUBAH: Menggunakan sessionStorage agar muncul lagi saat aplikasi dibuka ulang
    if (!sessionStorage.getItem(KEY)) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    // BAGIAN YANG DIUBAH: Menggunakan sessionStorage
    sessionStorage.setItem(KEY, "1");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[min(500px,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-gray-800 bg-gray-950/95 p-4 shadow-xl backdrop-blur-md text-white">
      <button 
        onClick={dismiss} 
        aria-label="Tutup"
        className="absolute right-3 top-3 text-gray-400 hover:text-white"
      >
        ✕
      </button>
      
      <div className="text-sm pr-4">
        <div className="font-bold text-base mb-1">Dukung & Follow Pakcik! 💖</div>
        <p className="mt-1 text-gray-300 mb-3">
          Yuk support biar servernya jalan terus dan aplikasinya makin keren!
        </p>
        
        <div className="flex flex-wrap gap-2">
          {/* LINK TIKTOK */}
          <a
            href="https://www.tiktok.com/@pakcikkumar868?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noreferrer"
            className="rounded bg-black border border-gray-700 px-3 py-1.5 font-medium hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            🎵 TikTok
          </a>

          {/* LINK YOUTUBE */}
          <a
            href="https://youtube.com/@pakcik_kumar868?si=jwcEiVgWowjaBy86"
            target="_blank"
            rel="noreferrer"
            className="rounded bg-red-600 px-3 py-1.5 font-medium hover:bg-red-500 transition-colors flex items-center gap-1.5"
          >
            ▶️ YouTube
          </a>
          
          {/* LINK SOCIABUZZ */}
          <a
            href="https://sociabuzz.com/pakcikkumar"
            target="_blank"
            rel="noreferrer"
            className="rounded bg-yellow-600 px-3 py-1.5 font-medium hover:bg-yellow-500 transition-colors flex items-center gap-1.5 text-white"
          >
            ☕ Sociabuzz
          </a>
        </div>
      </div>
    </div>
  );
}
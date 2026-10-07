"use client";

import { useState, useEffect } from "react";
import { Settings, UserCircle2, Crown, ChevronRight, LogIn, Clock, X, LogOut } from "lucide-react";
import Link from "next/link";
import { auth, googleProvider, db } from "@/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userName, setUserName] = useState("");
  const [isVip, setIsVip] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserName(data.displayName || user.displayName || "User Pakcik");
          setIsVip(data.isVip || false);
        } else {
          // Jika pengguna baru pertama kali login Google, minta set nama
          setTempName(user.displayName || "");
          setShowNameModal(true);
        }
      } else {
        setCurrentUser(null);
        setUserName("");
        setIsVip(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Trigger Pop-Up Google Login Asli
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Gagal login Google:", error);
      alert("Gagal terhubung ke Google. Pastikan domain sudah diizinkan di Firebase.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveName = async () => {
    if (!currentUser || tempName.trim() === "") return;

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: tempName,
        isVip: false,
        createdAt: new Date().toISOString()
      }, { merge: true });

      setUserName(tempName);
      setShowNameModal(false);
    } catch (error) {
      console.error("Gagal menyimpan nama:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans pb-32 relative">
      {/* HEADER */}
      <div className="flex items-center justify-between mt-4">
        {currentUser ? (
          <div className="flex items-center gap-4">
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-blue-500" />
            ) : (
              <UserCircle2 size={50} className="text-blue-500" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{userName}</h1>
                {isVip && (
                  <span className="text-[10px] font-bold text-yellow-300 bg-purple-900/80 px-1.5 py-0.5 rounded border border-purple-500/40">
                    VIP
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">{currentUser.email}</p>
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

      {/* TOMBOL LOGIN GOOGLE */}
      {!currentUser ? (
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
        >
          <LogIn size={20} />
          {loading ? "Menghubungkan..." : "Masuk dengan Google"}
        </button>
      ) : (
        <button 
          onClick={handleLogout}
          className="mt-4 flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium"
        >
          <LogOut size={14} /> Keluar
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

      {/* HISTORI */}
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

      {/* POP-UP SET NAMA SETELAH GOOGLE LOGIN SUKSES */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Buat Nama Tampilan</h2>
              <button onClick={() => setShowNameModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <p className="text-xs text-gray-400 mb-4">Login Google berhasil! Silakan tentukan nama profil Anda.</p>
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
              Simpan & Lanjutkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
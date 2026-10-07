"use client";

import { useState } from "react";
import { ArrowLeft, Ban, Lock, Shirt, CheckCircle2, QrCode, Wallet, CreditCard } from "lucide-react";
import Link from "next/link";

export default function VipPage() {
  const [selectedPlan, setSelectedPlan] = useState("week");
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const plans = [
    { id: "week", duration: "per minggu", price: "Rp 10.000", originalPrice: "Rp 12.000", badge: "20% off" },
    { id: "month", duration: "per bulan", price: "Rp 30.000", originalPrice: "Rp 34.000", badge: "20% off" },
    { id: "3months", duration: "per 3 bulan", price: "Rp 85.000", originalPrice: "Rp 100.000", badge: "15% off" },
    { id: "year", duration: "per tahun", price: "Rp 230.000", originalPrice: "Rp 280.000", badge: "20% off" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans pb-32">
      <Link href="/me" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6">
        <ArrowLeft size={24} />
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold leading-tight">Nikmati nonton<br />Tanpa Iklan<br />dengan VIP PAKCIK FILM</h1>
      </div>

      <p className="text-sm font-semibold text-gray-400 mb-3">1. Pilih paketmu</p>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            onClick={() => setSelectedPlan(plan.id)} 
            className={`min-w-[130px] p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              selectedPlan === plan.id ? "border-purple-500 bg-purple-950/40 text-purple-200" : "border-gray-800 bg-gray-900 text-gray-400"
            }`}
          >
            <div>
              <p className="text-xs text-gray-400 mb-2">{plan.duration}</p>
              <p className="text-base font-bold text-white mb-1">{plan.price}</p>
              <p className="text-[10px] text-gray-500 line-through">{plan.originalPrice}</p>
            </div>
            <span className="mt-3 inline-block text-[10px] font-semibold text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded-md w-fit">{plan.badge}</span>
          </div>
        ))}
      </div>

      {/* METODE PEMBAYARAN */}
      <p className="text-sm font-semibold text-gray-400 mt-6 mb-3">2. Pilih Metode Pembayaran</p>
      <div className="space-y-3">
        <div 
          onClick={() => setPaymentMethod("qris")}
          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
            paymentMethod === "qris" ? "border-purple-500 bg-purple-950/30" : "border-gray-800 bg-gray-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <QrCode size={22} className="text-purple-400" />
            <div>
              <p className="text-sm font-bold">QRIS (All E-Wallet & Bank)</p>
              <p className="text-[10px] text-gray-400">GoPay, OVO, DANA, ShopeePay, BCA, dll</p>
            </div>
          </div>
          {paymentMethod === "qris" && <CheckCircle2 size={18} className="text-purple-400" />}
        </div>

        <div 
          onClick={() => setPaymentMethod("gopay")}
          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
            paymentMethod === "gopay" ? "border-purple-500 bg-purple-950/30" : "border-gray-800 bg-gray-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <Wallet size={22} className="text-blue-400" />
            <div>
              <p className="text-sm font-bold">Transfer Virtual Account</p>
              <p className="text-[10px] text-gray-400">BCA, Mandiri, BRI, BNI</p>
            </div>
          </div>
          {paymentMethod === "gopay" && <CheckCircle2 size={18} className="text-purple-400" />}
        </div>
      </div>

      <button 
        onClick={() => setShowPaymentModal(true)}
        className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full transition shadow-lg shadow-purple-900/40"
      >
        Bayar Sekarang
      </button>

      {/* POP-UP INSTRUKSI / INSTRUMEN BAYAR (Siap disambung ke Midtrans API) */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-sm rounded-2xl p-6 border border-gray-800 flex flex-col items-center text-center">
            <h2 className="text-lg font-bold text-white mb-2">Instruksi Pembayaran</h2>
            <p className="text-xs text-gray-400 mb-4">
              {paymentMethod === "qris" ? "Scan Kode QRIS di bawah menggunakan E-Wallet Anda:" : "Transfer ke Virtual Account berikut:"}
            </p>

            {paymentMethod === "qris" ? (
              <div className="bg-white p-4 rounded-xl mb-4">
                <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center text-black font-bold text-xs text-center p-2 border-2 border-dashed border-gray-400">
                  [ Kode QRIS Midtrans/Xendit Akan Muncul Di Sini ]
                </div>
              </div>
            ) : (
              <div className="w-full bg-gray-800 p-3 rounded-xl mb-4 text-left">
                <p className="text-[10px] text-gray-400">Nomor Virtual Account BCA:</p>
                <p className="text-lg font-mono font-bold text-yellow-400">880123918239182</p>
              </div>
            )}

            <p className="text-[10px] text-gray-500 mb-6">Sistem akan memverifikasi pembayaran secara otomatis setelah Anda mentransfer.</p>

            <button 
              onClick={() => setShowPaymentModal(false)}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 rounded-full text-xs"
            >
              Tutup / Batalkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { ArrowLeft, Ban, Lock, Shirt, CheckCircle2, QrCode, Wallet, ExternalLink, X } from "lucide-react";
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

  const appLinks = [
    { name: "ShopeePay", url: "shopeepay://", color: "bg-orange-600" },
    { name: "GoPay", url: "gopay://", color: "bg-blue-600" },
    { name: "DANA", url: "dana://", color: "bg-sky-500" },
    { name: "OVO", url: "ovo://", color: "bg-purple-600" },
    { name: "BCA Mobile", url: "bca://", color: "bg-blue-800" },
    { name: "Brimo (BRI)", url: "brimo://", color: "bg-blue-700" },
  ];

  const openApp = (url: string) => {
    window.location.href = url;
  };

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
              <p className="text-sm font-bold">QRIS Official PAKCIK MEDIA</p>
              <p className="text-[10px] text-gray-400">Scan QRIS All E-Wallet & Bank</p>
            </div>
          </div>
          {paymentMethod === "qris" && <CheckCircle2 size={18} className="text-purple-400" />}
        </div>

        <div 
          onClick={() => setPaymentMethod("apps")}
          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
            paymentMethod === "apps" ? "border-purple-500 bg-purple-950/30" : "border-gray-800 bg-gray-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <Wallet size={22} className="text-blue-400" />
            <div>
              <p className="text-sm font-bold">Buka Langsung Aplikasi Pembayaran</p>
              <p className="text-[10px] text-gray-400">ShopeePay, GoPay, DANA, OVO, BCA, BRI</p>
            </div>
          </div>
          {paymentMethod === "apps" && <CheckCircle2 size={18} className="text-purple-400" />}
        </div>
      </div>

      <button 
        onClick={() => setShowPaymentModal(true)}
        className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full transition shadow-lg shadow-purple-900/40"
      >
        Bayar Sekarang
      </button>

      {/* POP-UP PEMBAYARAN & DEEP LINK */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-sm rounded-2xl p-5 border border-gray-800 flex flex-col items-center text-center max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold text-white mb-2">Instruksi Pembayaran</h2>

            {paymentMethod === "qris" ? (
              <>
                <p className="text-xs text-gray-400 mb-3">Scan atau screenshot QRIS berikut di aplikasi pilihanmu:</p>
                <div className="bg-white p-2 rounded-xl mb-4 max-w-[240px]">
                  <img src="/qris.jpg" alt="QRIS Pakcik Media" className="w-full h-auto rounded-lg" />
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-gray-400 mb-4">Pilih aplikasi pembayaran untuk langsung beralih transaksi:</p>
                <div className="grid grid-cols-2 gap-2 w-full mb-4">
                  {appLinks.map((app) => (
                    <button
                      key={app.name}
                      onClick={() => openApp(app.url)}
                      className={`${app.color} text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-between hover:opacity-90 transition`}
                    >
                      <span>{app.name}</span>
                      <ExternalLink size={14} />
                    </button>
                  ))}
                </div>
              </>
            )}

            <button 
              onClick={() => setShowPaymentModal(false)}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 rounded-full text-xs mt-2"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
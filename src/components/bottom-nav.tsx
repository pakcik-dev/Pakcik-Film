"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Gift, Bookmark, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Cuplikan", href: "/", icon: Home },
    { label: "Temukan", href: "/#categories", icon: Compass },
    { label: "Hadiah", href: "/vip", icon: Gift, badge: "Tarik" },
    { label: "Daftar Saya", href: "/#favorites", icon: Bookmark },
    { label: "Saya", href: "/me", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-gray-800/80 backdrop-blur-md px-2 py-1.5 md:hidden">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href === "/me" && pathname.startsWith("/me"));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-3 transition-colors ${
                isActive ? "text-yellow-400 font-semibold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {item.badge && (
                <span className="absolute -top-1 right-2 text-[9px] font-bold bg-yellow-400 text-black px-1.5 py-0.2 rounded-full leading-tight shadow">
                  {item.badge}
                </span>
              )}
              <Icon size={20} className="mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
// @ts-ignore
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SiteShaderBackground } from "@/components/shader-background";
import { GoFundMeBanner } from "@/components/gofundme-banner";
import { SafetyToast } from "@/components/safety-toast";
import { CommandPaletteProvider } from "@/components/command-palette";
import { RegionContextProvider } from "@/components/region-context";
import { getRegions, buildSearchIndex, DEFAULT_REGION_CODE } from "@/lib/data";
import { BottomNav } from "@/components/bottom-nav"; // <--- 1. TAMBAHKAN IMPORT INI

const geistSans = Inter({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pakcikfilm.com"),
  title: {
    default: "Pakcik FILM — Nonton Gratis",
    template: "%s · Pakcik FILM",
  },
  description:
    "A curated, regional list of free streaming sites — movies, TV shows, anime, manga, live TV, sports and more. Fast fuzzy search, multi-region, no ads on us.",
  applicationName: "Pakcik FILM",
  keywords: [
    "streaming sites",
    "free movies",
    "free tv shows",
    "anime streaming",
    "live tv",
    "dongha streaming",
    "sports streams",
    "fmhy alternative",
    "best streaming list",
    "Jangan Lupa dukung Pakcik ya, biar pakcik bisa terus updete film-film terbaru dan terbaik untuk kalian semua.Terima kasih.",
  ],
  authors: [{ name:  "Pakcik FILM", url: "https://pakcikfilm.com" }],
  creator:  "Pakcik FILM",
  publisher: "Pakcik",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Pakcik FILM",
    title: "Pakcik FILM — Nonton Gratis",
    description:
      "A curated, regional list of free streaming sites — movies, anime, manga, live TV and more.",
    url: "https://pakcikfilm.com",
    locale: "en_US",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Pakcik FILM — Nonton Gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakcik FILM — Nonton Gratis",
    description:
      "Curated streaming sites for movies, anime, live TV and more — fast fuzzy search, multi-region.",
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "entertainment",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const regions = await getRegions();
  const searchIndex = await buildSearchIndex(DEFAULT_REGION_CODE);

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <SiteShaderBackground />
          <RegionContextProvider regions={regions} current={DEFAULT_REGION_CODE}>
            <CommandPaletteProvider initialIndex={searchIndex} regions={regions}>
              <div className="relative z-10 pb-28 md:pb-0">
                <GoFundMeBanner />
                <Navbar />
                {children}
                <Footer />
                <SafetyToast />
                <BottomNav /> {/* <--- 2. SISIPKAN DI SINI */}
              </div>
            </CommandPaletteProvider>
          </RegionContextProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
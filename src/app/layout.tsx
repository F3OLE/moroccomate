import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import SiteNav, { NavSpacer } from "@/components/SiteNav";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-arabic",
});

export const metadata: Metadata = {
  title: "MoroccoMate - Your Journey Through Morocco",
  description:
    "Discover restaurants, nightlife, shops and experiences across Morocco. Plan trips, join early access, or list your business.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} antialiased`}
      >
        <Providers>
          <SiteNav />
          <NavSpacer />
          {children}
        </Providers>
      </body>
    </html>
  );
}

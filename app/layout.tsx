import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "貓貓 Live Show — 小禮 Li Studio",
  description: "暹羅貓插畫作品集與選物商店",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full">
      <body className="min-h-full flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
    </html>
  );
}

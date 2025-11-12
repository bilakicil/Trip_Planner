import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const font = Outfit({
  variable: "--font-Outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ZenTrip AI - Beranda",
  description: "Aplikasi Perencana Perjalanan Wisata Berbasis AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}

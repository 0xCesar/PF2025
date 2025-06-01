import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "./components/menu/menu";
import { Poppins } from 'next/font/google'
import Cursor from "./components/cursor/cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Choisis les poids que tu veux
  variable: '--font-poppins',   // Optionnel, pour l'utiliser en variable CSS
})


export const metadata: Metadata = {
  title: "CESAR STLO - PORTFOLIO",
  description: "Cesar's Portfolio, made by hand with a touch of motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Menu />
        {children}
        <Cursor />
      </body>
    </html>
  );
}

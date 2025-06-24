import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "./components/menu/menu";
import { Poppins } from 'next/font/google'
import Cursor from "./components/cursor/cursor";
import ResponsiveLayout from "./components/ResponsiveLayout";

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
  weight: ['400', '600', '700'], 
  variable: '--font-poppins',  
})


export const metadata: Metadata = {
  title: "César St-lo - Portfolio",
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
        <ResponsiveLayout>{children}</ResponsiveLayout>
      </body>
    </html>
  );
}
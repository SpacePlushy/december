import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Cashflow Tracker | Spark Delivery Schedule",
  description: "30-day work schedule and financial tracker for Spark delivery driving",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-slate-950 text-slate-50`}>
        {children}
      </body>
    </html>
  );
}

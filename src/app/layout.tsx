import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubikSansSerif = Rubik({
  variable: "--font-rubik-sans-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IUC INTERN PORTAL",
  description: "All-in-one portal for IUC interns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubikSansSerif.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

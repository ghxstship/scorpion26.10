import type { Metadata } from "next";
import { Anton, Bebas_Neue, Share_Tech, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/compliance/CookieConsent";
import { SkipNav } from "@/components/ui/skip-nav";

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-anton",
});

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bebas",
});

const shareTech = Share_Tech({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-share-tech",
});

const shareTechMono = Share_Tech_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
});

export const metadata: Metadata = {
  title: "Personal Brand Platform - Transform Your Potential",
  description: "Discover proven strategies and insights to achieve peak performance in every aspect of your life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anton.variable} ${bebasNeue.variable} ${shareTech.variable} ${shareTechMono.variable} font-sans antialiased bg-[var(--color-surface-primary)] text-[var(--color-text-primary)]`}>
        <SkipNav />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}

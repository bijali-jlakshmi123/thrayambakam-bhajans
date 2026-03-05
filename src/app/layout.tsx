import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import AppContent from "@/components/AppContent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thrayambakam Bhajans | Divine Spiritual Vibrations",
  description:
    "Experience the soul-stirring bhajans from Thrayambakam Ramapuram. Listen to divine music, read lyrics, and stay updated with our upcoming events.",
  keywords:
    "Thrayambakam, Bhajans, Ramapuram, Shiva Bhajans, Krishna Bhajans, Spiritual Music, Kerala Bhajans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <AppContent>{children}</AppContent>
      </body>
    </html>
  );
}

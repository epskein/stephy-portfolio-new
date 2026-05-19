import type { Metadata } from "next";
import { Lexend_Tera } from "next/font/google";
import "./globals.css";

const lexendTera = Lexend_Tera({
  subsets: ["latin"],
  variable: "--font-lexend-tera",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Stephy Longueira | DJ & Artist",
  description:
    "Official portfolio of Stephy Longueira - DJ, Producer, and Artist. Book for events, view upcoming shows, and explore the gallery.",
  keywords: ["DJ", "Stephy Longueira", "Artist", "Music", "Events", "Booking"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Stephy Longueira | DJ & Artist",
    description:
      "Official portfolio of Stephy Longueira - DJ, Producer, and Artist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lexendTera.variable} antialiased`}>{children}</body>
    </html>
  );
}

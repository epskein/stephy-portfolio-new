import type { Metadata } from "next";
import { Lexend_Tera } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const lexendTera = Lexend_Tera({
  subsets: ["latin"],
  variable: "--font-lexend-tera",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Stephy Longueira | DJ & Artist",
  description: "Official portfolio of Stephy Longueira - DJ, Producer, and Artist. Book for events, view upcoming shows, and explore the gallery.",
  keywords: ["DJ", "Stephy Longueira", "Artist", "Music", "Events", "Booking"],
  openGraph: {
    title: "Stephy Longueira | DJ & Artist",
    description: "Official portfolio of Stephy Longueira - DJ, Producer, and Artist.",
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
      <body className={`${lexendTera.variable} antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

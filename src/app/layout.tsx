import type { Metadata } from "next";
import { Outfit, Playfair_Display, Cormorant_Garamond, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinoth M — Premium Digital Architect & Developer",
  description: "Award-winning personal portfolio of Vinoth M, crafting premium digital experiences and luxury product designs with Next.js, Tailwind, GSAP, and Framer Motion.",
  keywords: ["Vinoth M", "Full Stack Developer", "Digital Product Builder", "Portfolio", "Luxury Web Design", "Next.js Developer", "GSAP Portfolio"],
  authors: [{ name: "Vinoth M" }],
  openGraph: {
    title: "Vinoth M — Premium Digital Architect & Developer",
    description: "Personal portfolio of Vinoth M, showcasing state-of-the-art web products and exceptional design systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinoth M — Premium Digital Architect & Developer",
    description: "Personal portfolio of Vinoth M, showcasing state-of-the-art web products and exceptional design systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} ${cormorant.variable} ${bodoni.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-white text-[#111111] font-sans overflow-x-hidden selection:bg-[#00E65C] selection:text-[#111111]">
        {children}
      </body>
    </html>
  );
}

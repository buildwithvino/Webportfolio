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
  metadataBase: new URL("https://vinothdeveloper.vercel.app"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "OeNGxdZiXYmAMstiNF_kApgctYubaf6PX4rl0YcDsvw",
  },
  title: "Vinoth M Web developer",
  description: "Award-winning personal portfolio of Vinoth M, crafting premium digital experiences and luxury product designs with Next.js, Tailwind, GSAP, and Framer Motion.",
  keywords: ["Vinoth M", "Full Stack Developer", "Digital Product Builder", "Portfolio", "Luxury Web Design", "Next.js Developer", "GSAP Portfolio"],
  authors: [{ name: "Vinoth M" }],
  openGraph: {
    title: "Vinoth M — AI Software Developer",
    description: "Personal portfolio of Vinoth M, showcasing state-of-the-art web products and exceptional design systems.",
    type: "website",
    url: "https://vinothdeveloper.vercel.app",
    siteName: "Vinoth M Portfolio",
    images: [
      {
        url: "/images/webdev_3d.png",
        width: 1200,
        height: 630,
        alt: "Vinoth M — Premium Digital Architect & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinoth M — Premium Digital Architect & Developer",
    description: "Personal portfolio of Vinoth M, showcasing state-of-the-art web products and exceptional design systems.",
    images: ["/images/webdev_3d.png"],
  },
};

const schemaJson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://vinothdeveloper.vercel.app/#person",
      "name": "Vinoth M",
      "jobTitle": "Digital Product Architect & Full Stack Developer",
      "description": "Premium Digital Architect & Developer crafting premium digital experiences and luxury product designs with Next.js, Tailwind, GSAP, and Framer Motion.",
      "url": "https://vinothdeveloper.vercel.app",
      "sameAs": [
        "https://github.com",
        "https://linkedin.com"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://vinothdeveloper.vercel.app/#website",
      "url": "https://vinothdeveloper.vercel.app",
      "name": "Vinoth M",
      "publisher": {
        "@id": "https://vinothdeveloper.vercel.app/#person"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://vinothdeveloper.vercel.app/#webpage",
      "url": "https://vinothdeveloper.vercel.app",
      "name": "Vinoth M — Premium Digital Architect & Developer",
      "isPartOf": {
        "@id": "https://vinothdeveloper.vercel.app/#website"
      },
      "about": {
        "@id": "https://vinothdeveloper.vercel.app/#person"
      },
      "description": "Award-winning personal portfolio of Vinoth M, crafting premium digital experiences and luxury product designs with Next.js, Tailwind, GSAP, and Framer Motion."
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://vinothdeveloper.vercel.app/#service",
      "name": "Vinoth M Digital Architect",
      "image": "https://vinothdeveloper.vercel.app/images/webdev_3d.png",
      "priceRange": "$$$$",
      "telephone": "",
      "url": "https://vinothdeveloper.vercel.app",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9716,
        "longitude": 77.5946
      }
    }
  ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
        {children}
      </body>
    </html>
  );
}

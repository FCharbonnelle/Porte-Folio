import type { Metadata } from "next";
import "./globals.css";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import MouseEffectProvider from "@/components/MouseEffectProvider";

// Configuration des métadonnées du site
export const metadata: Metadata = {
  title: "Portfolio | Développeur Web",
  description: "Portfolio professionnel mettant en avant mes projets et compétences en développement web frontend avec React, Next.js, Tailwind CSS et animations fluides.",
  keywords: ["portfolio", "développeur web", "designer", "react", "next.js", "tailwind css", "framer motion"],
  authors: [{ name: "Développeur Portfolio" }],
  creator: "Développeur Portfolio",
  openGraph: {
    title: "Portfolio | Développeur Web",
    description: "Portfolio professionnel mettant en avant mes projets et compétences en développement web frontend.",
    url: "https://portfolio-website.com",
    siteName: "Portfolio Développeur Web",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Développeur Web & Designer",
    description: "Portfolio professionnel mettant en avant mes projets et compétences en développement web frontend.",
    creator: "@developpeur",
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Layout principal de l'application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">
        <MouseEffectProvider>
          <ScrollProgressBar />
          {children}
        </MouseEffectProvider>
      </body>
    </html>
  );
}

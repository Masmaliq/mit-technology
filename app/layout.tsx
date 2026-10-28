import type { ReactNode } from "react";
import { GlobalWhatsAppCta } from "@/components/layout/GlobalWhatsAppCta";
import { FrontendMotion } from "@/components/motion/FrontendMotion";
import { createCmsMetadata } from "@/lib/sanity/metadata";
import "./globals.css";

export function generateMetadata() {
  return createCmsMetadata({ path: "/" });
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <FrontendMotion />
        {children}
        <GlobalWhatsAppCta />
      </body>
    </html>
  );
}

import type { ReactNode } from "react";
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
      <body>{children}</body>
    </html>
  );
}

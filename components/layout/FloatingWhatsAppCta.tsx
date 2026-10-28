"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type FloatingWhatsAppCtaProps = {
  href: string;
};

export function FloatingWhatsAppCta({ href }: FloatingWhatsAppCtaProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const isInternalRoute = pathname.startsWith("/admin") || pathname.startsWith("/studio");

  useEffect(() => {
    if (isInternalRoute) {
      setIsVisible(false);
      return;
    }

    const hero = document.getElementById("hero");

    if (!hero) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isInternalRoute, pathname]);

  if (!href || isInternalRoute) return null;

  return (
    <a
      aria-hidden={!isVisible}
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[70] inline-flex h-11 items-center gap-2.5 rounded-full border border-white/10 bg-[#0A1330] px-4 text-[13px] font-semibold text-white shadow-[0_12px_32px_rgba(10,19,48,0.24)] transition-[opacity,transform,background-color,border-color] duration-300 ease-out hover:border-[#4D7FFF]/50 hover:bg-[#173270] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D7FFF] focus-visible:ring-offset-2 sm:bottom-8 sm:right-8 sm:h-12 sm:gap-3 sm:px-5 sm:text-sm ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
      href={href}
      rel="noopener noreferrer"
      tabIndex={isVisible ? 0 : -1}
      target="_blank"
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.8} />
      <span>Konsultasi via WhatsApp</span>
      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
    </a>
  );
}

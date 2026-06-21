"use client";

import Image from "next/image";
import { useState } from "react";

type TestimonialAvatarProps = {
  imageUrl?: string | null;
  name?: string;
  isLogo?: boolean;
};

function getInitial(name?: string) {
  return name?.trim().charAt(0).toUpperCase() || "M";
}

export function TestimonialAvatar({ imageUrl, name, isLogo = false }: TestimonialAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const validImageUrl = typeof imageUrl === "string" && imageUrl.startsWith("http") ? imageUrl : "";

  if (!validImageUrl || hasError) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
        {getInitial(name)}
      </div>
    );
  }

  return (
    <Image
      alt={name || "Testimonial avatar"}
      className={`h-14 w-14 shrink-0 rounded-full bg-white ${isLogo ? "object-contain p-2" : "object-cover"}`}
      height={56}
      onError={() => setHasError(true)}
      src={validImageUrl}
      unoptimized
      width={56}
    />
  );
}

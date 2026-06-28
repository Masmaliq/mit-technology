"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type BrandLogoProps = {
  imageUrl?: string;
  alt?: string;
  brandName?: string;
  compact?: boolean;
  textOnly?: boolean;
};

export function BrandLogo({
  imageUrl,
  alt,
  brandName = "",
  compact = false,
  textOnly = false,
}: BrandLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSize = compact ? "h-9 w-9 md:h-11 md:w-11" : "h-10 w-10 md:h-12 md:w-12";
  const brandTextSize = compact ? "text-base md:text-xl" : "text-lg md:text-xl";
  const descriptorTextSize = compact ? "text-[0.58rem] md:text-[0.72rem]" : "text-[0.66rem] md:text-[0.72rem]";
  const safeBrandName = brandName.trim();
  const [primaryName = "", ...descriptorParts] = safeBrandName.split(/\s+/).filter(Boolean);
  const descriptor = descriptorParts.join(" ");
  const shouldRenderImage = Boolean(!textOnly && imageUrl && !imageFailed);
  const safeImageUrl: string = shouldRenderImage && imageUrl ? imageUrl : "";

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  if (!shouldRenderImage && !safeBrandName) {
    return null;
  }

  return (
    <span className="inline-flex min-w-0 items-center gap-3 whitespace-nowrap">
      {shouldRenderImage ? (
        <span className={`relative block shrink-0 overflow-hidden ${imageSize}`}>
          <Image
            src={safeImageUrl}
            alt={alt || safeBrandName}
            fill
            priority={compact}
            sizes={compact ? "(min-width: 768px) 44px, 36px" : "(min-width: 768px) 48px, 40px"}
            className="object-contain object-center"
            onError={() => setImageFailed(true)}
          />
        </span>
      ) : (
        <span className="flex min-w-0 flex-col leading-none">
          <span className={`${brandTextSize} font-semibold tracking-tight text-current`}>{primaryName}</span>
          {descriptor ? (
            <span className={`mt-1 ${descriptorTextSize} font-semibold uppercase tracking-[0.2em] text-current opacity-70`}>
              {descriptor}
            </span>
          ) : null}
        </span>
      )}
    </span>
  );
}

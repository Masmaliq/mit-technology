"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SanityImageValue } from "@/lib/sanity/queries";
import styles from "./WorkDetail.module.css";

type ViewerItem = { image: SanityImageValue; caption?: string };

function imageUrl(image?: SanityImageValue) {
  return image?.url || image?.asset?.url || "";
}

export function WorkMediaViewer({ items, index, alt }: { items: ViewerItem[]; index: number; alt: string }) {
  const [active, setActive] = useState<number | null>(null);
  const item = items[index];
  const src = imageUrl(item?.image);

  useEffect(() => {
    if (active === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + items.length) % items.length);
      if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % items.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [active, items.length]);

  if (!src) return null;
  const activeItem = active === null ? null : items[active];
  const activeSrc = imageUrl(activeItem?.image);

  return (
    <>
      <button className={styles.mediaButton} onClick={() => setActive(index)} type="button">
        <Image alt={item.image.alt || alt} className={styles.articleImage} fill sizes="(max-width: 760px) 100vw, 88vw" src={src} unoptimized />
        <span className={styles.expandLabel}>View fullscreen</span>
      </button>
      {activeItem && activeSrc ? (
        <div aria-label="Project image viewer" aria-modal="true" className={styles.lightbox} role="dialog">
          <button aria-label="Close viewer" className={styles.close} onClick={() => setActive(null)} type="button">×</button>
          {items.length > 1 ? <button aria-label="Previous image" className={`${styles.viewerNav} ${styles.previous}`} onClick={() => setActive((current) => ((current ?? 0) - 1 + items.length) % items.length)} type="button">←</button> : null}
          <div className={styles.viewerImage}>
            <Image alt={activeItem.image.alt || alt} fill sizes="100vw" src={activeSrc} unoptimized />
          </div>
          {items.length > 1 ? <button aria-label="Next image" className={`${styles.viewerNav} ${styles.next}`} onClick={() => setActive((current) => ((current ?? 0) + 1) % items.length)} type="button">→</button> : null}
          {activeItem.caption ? <p className={styles.viewerCaption}>{activeItem.caption}</p> : null}
        </div>
      ) : null}
    </>
  );
}

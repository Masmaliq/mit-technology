import type { VisualCmsImage, VisualSettings } from "@/lib/sanity/queries";

export function hasVisualCmsImage(image?: VisualCmsImage) {
  return Boolean(image?.desktopImage?.url || image?.mobileImage?.url);
}

export function getHeroVisualImage(settings?: VisualSettings) {
  return settings?.pageSettings?.heroBackgroundImage;
}

export function hasHeroVisualImage(settings?: VisualSettings) {
  return hasVisualCmsImage(getHeroVisualImage(settings));
}

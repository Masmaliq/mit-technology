import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-06-06" });

function isBlank(value) {
  return value === undefined || value === null || value === "";
}

function clone(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(value));
}

function withAlt(image, altText) {
  if (!image || !altText) {
    return image;
  }

  return {
    ...image,
    alt: image.alt || altText,
  };
}

const source = await client.fetch(`*[_type == "homepage" && _id != "homepage" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]{
  ...,
  "legacySourceId": _id
}`);

const target = await client.fetch(`*[_type == "homepage" && _id == "homepage"][0]{
  ...,
  _id,
  heroEyebrow,
  heroSubtitle,
  heroTitle,
  heroDescription,
  heroPrimaryCtaLabel,
  heroPrimaryCtaUrl,
  heroPrimaryCtaHref,
  heroSecondaryCtaLabel,
  heroSecondaryCtaUrl,
  heroSecondaryCtaHref,
  heroMainImage,
  heroImage,
  heroMediaAltText,
  heroPosterImage,
  heroVideoPosterImage,
  heroBackgroundImage,
  heroBackgroundAltText,
  heroBackgroundVideoMp4,
  backgroundVideoMp4,
  heroBackgroundOverlayOpacity,
  heroSliderImages,
  heroMotionGif,
  heroMotionVideoMp4,
  heroMotionPosterImage,
  heroMotionOpacity,
  openGraphImage,
  seoImage,
  visualSettings
}`);

const homepage = target || source;

if (!homepage?._id) {
  console.log("No homepage document found. Nothing to migrate.");
  process.exit(0);
}

if (!target && source) {
  const singleton = clone(source);
  delete singleton._createdAt;
  delete singleton._updatedAt;
  delete singleton._rev;
  delete singleton.legacySourceId;
  singleton._id = "homepage";
  singleton._type = "homepage";

  await client.createOrReplace(singleton);
  homepage._id = "homepage";
  console.log(`Created Homepage Settings singleton from ${source.legacySourceId}.`);
}

const legacyPage = homepage.visualSettings?.pageSettings;
const patch = {};

if (isBlank(homepage.heroEyebrow)) {
  patch.heroEyebrow = homepage.heroSubtitle || legacyPage?.heroEyebrowText;
}

if (isBlank(homepage.heroTitle) && legacyPage?.heroTitle) {
  patch.heroTitle = legacyPage.heroTitle;
}

if (isBlank(homepage.heroDescription) && legacyPage?.heroDescription) {
  patch.heroDescription = legacyPage.heroDescription;
}

if (isBlank(homepage.heroPrimaryCtaUrl)) {
  patch.heroPrimaryCtaUrl = homepage.heroPrimaryCtaHref;
}

if (isBlank(homepage.heroSecondaryCtaUrl)) {
  patch.heroSecondaryCtaUrl = homepage.heroSecondaryCtaHref;
}

if (!homepage.heroMainImage) {
  patch.heroMainImage = withAlt(clone(homepage.heroImage), homepage.heroMediaAltText);
}

if (!homepage.heroPosterImage) {
  patch.heroPosterImage = clone(homepage.heroVideoPosterImage);
}

if (!homepage.heroBackgroundImage) {
  patch.heroBackgroundImage = withAlt(
    clone(legacyPage?.heroBackgroundImage?.desktopImage),
    homepage.heroBackgroundAltText || legacyPage?.heroBackgroundImage?.alt
  );
} else if (homepage.heroBackgroundAltText && !homepage.heroBackgroundImage.alt) {
  patch.heroBackgroundImage = withAlt(clone(homepage.heroBackgroundImage), homepage.heroBackgroundAltText);
}

if (!homepage.heroBackgroundVideoMp4) {
  patch.heroBackgroundVideoMp4 = clone(homepage.backgroundVideoMp4);
}

if (isBlank(homepage.heroBackgroundOverlayOpacity)) {
  patch.heroBackgroundOverlayOpacity = legacyPage?.heroOverlayOpacity ?? 35;
}

if (!homepage.openGraphImage) {
  patch.openGraphImage = clone(homepage.seoImage);
}

if (homepage.heroSliderImages?.length) {
  patch.heroSliderImages = homepage.heroSliderImages.map((slide) => {
    if (slide?.image) {
      return slide;
    }

    return {
      _type: "object",
      image: clone(slide),
      altText: slide?.alt,
      caption: slide?.caption,
    };
  });
}

const cleanPatch = Object.fromEntries(
  Object.entries(patch).filter(([, value]) => value !== undefined && value !== null && value !== "")
);

if (Object.keys(cleanPatch).length === 0) {
  console.log("Homepage Settings migration: no missing new fields found.");
  process.exit(0);
}

await client.patch(homepage._id).set(cleanPatch).commit();

console.log("Homepage Settings migration completed.");
console.log(Object.keys(cleanPatch).sort().join("\n"));

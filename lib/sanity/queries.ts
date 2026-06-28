export type SanityImageValue = {
  _type?: string;
  asset?: {
    _id?: string;
    _ref?: string;
    _type?: string;
    extension?: string;
    mimeType?: string;
    originalFilename?: string;
    url?: string;
  };
  crop?: unknown;
  hotspot?: unknown;
  url?: string;
  alt?: string;
  caption?: string;
};

export type SanityFileValue = {
  _type?: string;
  asset?: {
    _id?: string;
    _ref?: string;
    _type?: string;
    extension?: string;
    mimeType?: string;
    originalFilename?: string;
    url?: string;
  };
  url?: string;
};

export type VisualCmsImage = {
  desktopImage?: SanityImageValue;
  mobileImage?: SanityImageValue;
  alt?: string;
};

export type VisualSettings = {
  pageSettings?: {
    heroBackgroundImage?: VisualCmsImage;
    heroOverlayOpacity?: number;
    heroEyebrowText?: string;
    heroTitle?: string;
    heroDescription?: string;
  };
  visualAssets?: {
    featuredBackgroundImage?: VisualCmsImage;
    sectionBackgroundImage?: VisualCmsImage;
    ctaBackgroundImage?: VisualCmsImage;
  };
  styleSettings?: {
    enableDarkModeSection?: boolean;
    enableGradientOverlay?: boolean;
    enableGlassEffect?: boolean;
    enableParallaxEffect?: boolean;
  };
};

export type SeoFields = {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageValue;
  seoKeywords?: string[];
  visualSettings?: VisualSettings;
};

export type PageSeo = {
  page?: string;
  title?: string;
  description?: string;
  ogImage?: SanityImageValue;
  keywords?: string[];
};

export type SiteSettings = {
  companyName?: string;
  tagline?: string;
  description?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  facebook?: string;
  logo?: SanityImageValue;
  favicon?: SanityImageValue;
  primaryColor?: string;
  secondaryColor?: string;
  siteTitle?: string;
  siteDescription?: string;
  ogImage?: SanityImageValue;
  keywords?: string[];
  siteUrl?: string;
  pageSeo?: PageSeo[];
};

export type Homepage = SeoFields & {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroMainImage?: SanityImageValue;
  heroImage?: SanityImageValue;
  heroBackgroundImage?: SanityImageValue;
  backgroundType?: "image" | "slider" | "video";
  heroSliderImages?: SanityImageValue[];
  heroBackgroundVideoMp4?: SanityFileValue;
  backgroundVideoMp4?: SanityFileValue;
  backgroundPosterImage?: SanityImageValue;
  heroBackgroundOverlayOpacity?: number;
  heroMediaType?: "image" | "gif" | "video";
  heroGif?: SanityFileValue;
  heroVideoMp4?: SanityFileValue;
  heroPosterImage?: SanityImageValue;
  heroVideoPosterImage?: SanityImageValue;
  heroMediaAltText?: string;
  heroMotionType?: "none" | "gif" | "video";
  heroMotionGif?: SanityFileValue;
  heroMotionVideoMp4?: SanityFileValue;
  heroMotionPosterImage?: SanityImageValue;
  heroMotionPosition?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  heroMotionSize?: "small" | "medium" | "large";
  heroMotionOpacity?: number;
  heroMotionSpeed?: number;
  enableMotionOnMobile?: boolean;
  enableCinematicFlow?: boolean;
  cinematicVideoMp4?: SanityFileValue;
  cinematicVideoWebm?: SanityFileValue;
  cinematicPosterImage?: SanityImageValue;
  cinematicPosterAlt?: string;
  cinematicOverlayOpacity?: number;
  cinematicStartSection?: string;
  cinematicEndSection?: string;
  cinematicBackgroundPosition?: "center" | "top" | "bottom" | "left" | "right";
  cinematicMobileFallbackImage?: SanityImageValue;
  cinematicMobileFallbackAlt?: string;
  cinematicMobileMode?: "video" | "poster" | "disabled";
  solutionsPreviewImage?: SanityImageValue;
  solutionsPreviewEyebrow?: string;
  solutionsPreviewTitle?: string;
  solutionsPreviewDescription?: string;
  solutionsPreviewVisualEyebrow?: string;
  solutionsPreviewVisualTitle?: string;
  solutionsPreviewRows?: Array<{
    title?: string;
    href?: string;
    icon?: string;
  }>;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaUrl?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaUrl?: string;
  heroSecondaryCtaHref?: string;
  clientLogosEyebrow?: string;
  clientLogosTitle?: string;
  clientLogosDescription?: string;
  trustEyebrow?: string;
  trustTitle?: string;
  trustDescription?: string;
  trustCards?: Array<{
    title?: string;
    description?: string;
    order?: number;
  }>;
  caseStudiesPreviewEyebrow?: string;
  caseStudiesPreviewTitle?: string;
  caseStudiesPreviewDescription?: string;
  caseStudiesPreviewCtaLabel?: string;
  caseStudiesPreviewCtaUrl?: string;
  featuredBannerBackgroundImage?: SanityImageValue;
  featuredBannerOverlayOpacity?: number;
  featuredBannerBackgroundPosition?: "center" | "top" | "bottom" | "left" | "right";
  enableFeaturedBannerWorldMap?: boolean;
  enableFeaturedBannerGridPattern?: boolean;
  enableFeaturedBannerOrbitLines?: boolean;
  enableFeaturedBannerGlow?: boolean;
  packagesPreviewEyebrow?: string;
  packagesPreviewTitle?: string;
  packagesPreviewDescription?: string;
  packagesPreviewCtaLabel?: string;
  packagesPreviewCtaUrl?: string;
  packagesPreviewSupportItems?: Array<{
    title?: string;
    description?: string;
  }>;
  processEyebrow?: string;
  processTitle?: string;
  processDescription?: string;
  impactMetricsEyebrow?: string;
  impactMetricsTitle?: string;
  impactMetricsDescription?: string;
  impactMetricsItems?: Array<{
    value?: string;
    label?: string;
    description?: string;
  }>;
  testimonialsEyebrow?: string;
  testimonialsTitle?: string;
  testimonialsDescription?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  openGraphImage?: SanityImageValue;
};

export type About = SeoFields & {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  storyEyebrow?: string;
  storyTitle?: string;
  storyDescription?: string;
  vision?: string;
  mission?: string[];
  coreValuesEyebrow?: string;
  coreValuesTitle?: string;
  coreValues?: string[];
  missionEyebrow?: string;
  visionEyebrow?: string;
  whyEyebrow?: string;
  whyTitle?: string;
  statistics?: Array<{
    value?: string;
    label?: string;
  }>;
  image?: SanityImageValue;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonUrl?: string;
};

export type SolutionsPage = SeoFields & {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBackgroundImage?: SanityImageValue;
  heroSliderImages?: SanityImageValue[];
  heroMotionVideoMp4?: SanityFileValue;
  heroPosterImage?: SanityImageValue;
  heroOverlayOpacity?: number;
  heroPrimaryButtonLabel?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonLabel?: string;
  heroSecondaryButtonLink?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  introEyebrow?: string;
  introTitle?: string;
  introDescription?: string;
  solutionCards?: Array<{
    title?: string;
    description?: string;
    icon?: string;
    image?: SanityImageValue;
    linkLabel?: string;
    linkUrl?: string;
    link?: string;
    order?: number;
    items?: string[];
  }>;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonUrl?: string;
};

export type InnerPage = SeoFields & {
  pageName?: string;
  slug?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBackgroundImage?: SanityImageValue;
  heroMotionVideoMp4?: SanityFileValue;
  heroPosterImage?: SanityImageValue;
  heroOverlayOpacity?: number;
  heroPrimaryButtonLabel?: string;
  heroPrimaryButtonLink?: string;
  heroSecondaryButtonLabel?: string;
  heroSecondaryButtonLink?: string;
  heroSliderImages?: SanityImageValue[];
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  sectionMediaImage?: SanityImageValue;
  sectionMediaVideo?: SanityFileValue;
  mediaLayout?: "left" | "right" | "full";
  sectionBuilder?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    items?: Array<{
      icon?: string;
      image?: SanityImageValue;
      title?: string;
      description?: string;
      ctaLabel?: string;
      ctaUrl?: string;
      order?: number;
    }>;
  };
  cardBuilder?: Array<{
    icon?: string;
    image?: SanityImageValue;
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    order?: number;
  }>;
  contentBlocks?: Array<{
    blockTitle?: string;
    blockDescription?: string;
    items?: Array<{
      itemTitle?: string;
      itemDescription?: string;
      itemImage?: SanityImageValue;
      itemLink?: string;
    }>;
  }>;
  listingEyebrow?: string;
  listingTitle?: string;
  listingDescription?: string;
  listingCtaLabel?: string;
  listingCtaUrl?: string;
  emptyStateText?: string;
  cardLabel?: string;
  featuredCardLabel?: string;
  featuredBadgeLabel?: string;
  priceLabel?: string;
  scopeLabel?: string;
  packageCtaLabel?: string;
  packageCtaUrl?: string;
  listingSupportItems?: Array<{
    title?: string;
    description?: string;
  }>;
  listingBlocks?: Array<{
    title?: string;
    category?: string;
    description?: string;
    image?: SanityImageValue;
    link?: string;
    items?: string[];
    highlighted?: boolean;
  }>;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;
};

export type PackagesPageSettings = SeoFields & {
  pageEyebrow?: string;
  pageTitle?: string;
  pageDescription?: string;
  packagesSectionEyebrow?: string;
  packagesSectionTitle?: string;
  packagesSectionDescription?: string;
  packagesSectionCtaLabel?: string;
  packagesSectionCtaUrl?: string;
  heroBackgroundImage?: SanityImageValue;
  heroBackgroundVideo?: SanityFileValue;
  heroOverlayOpacity?: number;
};

export type CaseStudiesPageSettings = SeoFields & {
  pageEyebrow?: string;
  pageTitle?: string;
  pageDescription?: string;
  heroBackgroundImage?: SanityImageValue;
  heroBackgroundVideo?: SanityFileValue;
  heroOverlayOpacity?: number;
};

export type PackageItem = SeoFields & {
  title?: string;
  slug?: string;
  description?: string;
  startingPrice?: string;
  features?: string[];
  featured?: boolean;
  order?: number;
};

export type PortfolioItem = SeoFields & {
  title?: string;
  slug?: string;
  caseStudySlug?: string;
  client?: string;
  category?: string;
  description?: string;
  thumbnail?: SanityImageValue;
  gallery?: SanityImageValue[];
  projectUrl?: string;
  featured?: boolean;
  order?: number;
};

export type CaseStudyItem = SeoFields & {
  title?: string;
  slug?: string;
  client?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  testimonial?: string;
  gallery?: SanityImageValue[];
  featuredImage?: SanityImageValue;
  featured?: boolean;
  order?: number;
};

export type ClientLogoItem = {
  name?: string;
  logo?: SanityImageValue;
  industry?: string;
  websiteUrl?: string;
  featured?: boolean;
  order?: number;
};

export type ProcessItem = {
  title?: string;
  slug?: string;
  shortDescription?: string;
  icon?: string;
  order?: number;
  featured?: boolean;
};

export type TestimonialItem = {
  name?: string;
  position?: string;
  company?: string;
  quote?: string;
  avatar?: SanityImageValue;
  image?: SanityImageValue;
  logo?: SanityImageValue;
  photo?: SanityImageValue;
  clientLogo?: SanityImageValue;
  rating?: number;
  featured?: boolean;
  order?: number;
};

export type ImpactMetricItem = {
  value?: string;
  label?: string;
  description?: string;
  icon?: string;
  featured?: boolean;
  order?: number;
};

export type SolutionItem = SeoFields & {
  title?: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  icon?: string;
  features?: string[];
  benefits?: string[];
  process?: Array<{
    title?: string;
    description?: string;
  }>;
  thumbnail?: SanityImageValue;
  featured?: boolean;
  order?: number;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type Contact = SeoFields & {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroBackgroundImage?: SanityImageValue;
  heroBackgroundVideo?: SanityFileValue;
  heroOverlayOpacity?: number;
  title?: string;
  description?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  googleMapsEmbed?: string;
  formTitle?: string;
  formDescription?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  phonePlaceholder?: string;
  companyPlaceholder?: string;
  messagePlaceholder?: string;
  submitButtonLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  errorPrefix?: string;
  ctaTitle?: string;
  ctaDescription?: string;
};

export type Navbar = {
  logo?: SanityImageValue;
  brandMode?: "textOnly" | "image";
  menuItems?: Array<{
    label?: string;
    href?: string;
  }>;
  ctaLabel?: string;
  ctaHref?: string;
};

export type Footer = {
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  socialLinks?: Array<{
    platform?: string;
    url?: string;
  }>;
  copyright?: string;
  enableFooterBackground?: boolean;
  footerBackgroundImage?: SanityImageValue;
  footerOverlayOpacity?: number;
  footerBackgroundPosition?: "center" | "top" | "bottom" | "left" | "right";
  footerBackgroundSize?: "cover" | "contain" | "auto";
};

export const imageProjection = `{
  "url": asset->url,
  "alt": coalesce(alt, asset->altText)
}`;

export const fileProjection = `{
  "asset": {
    "_ref": asset._ref,
    "_type": asset._type,
    "_id": asset->_id,
    "url": asset->url,
    "mimeType": asset->mimeType,
    "extension": asset->extension,
    "originalFilename": asset->originalFilename
  },
  "url": asset->url
}`;

export const visualImageProjection = `{
  "desktopImage": desktopImage${imageProjection},
  "mobileImage": mobileImage${imageProjection},
  alt
}`;

export const visualSettingsProjection = `
  "visualSettings": visualSettings{
    "pageSettings": pageSettings{
      "heroBackgroundImage": heroBackgroundImage${visualImageProjection},
      heroOverlayOpacity,
      heroEyebrowText,
      heroTitle,
      heroDescription
    },
    "visualAssets": visualAssets{
      "featuredBackgroundImage": featuredBackgroundImage${visualImageProjection},
      "sectionBackgroundImage": sectionBackgroundImage${visualImageProjection},
      "ctaBackgroundImage": ctaBackgroundImage${visualImageProjection}
    },
    styleSettings{
      enableDarkModeSection,
      enableGradientOverlay,
      enableGlassEffect,
      enableParallaxEffect
    }
  }
`;

export const homepageVisualSettingsProjection = `
  "visualSettings": visualSettings{
    "pageSettings": pageSettings{
      heroOverlayOpacity
    },
    styleSettings{
      enableDarkModeSection,
      enableGradientOverlay,
      enableGlassEffect
    }
  }
`;

export const seoProjection = `
  seoTitle,
  seoDescription,
  "seoImage": seoImage${imageProjection},
  seoKeywords
`;

export const homepageQuery = `*[_type == "homepage" && !(_id in path("drafts.**"))] | order(select(_id == "homepage" => 0, 1), _updatedAt desc)[0]{
  "heroEyebrow": coalesce(heroEyebrow, heroSubtitle, visualSettings.pageSettings.heroEyebrowText),
  "heroSubtitle": coalesce(heroEyebrow, heroSubtitle, visualSettings.pageSettings.heroEyebrowText),
  "heroTitle": coalesce(heroTitle, visualSettings.pageSettings.heroTitle),
  "heroDescription": coalesce(heroDescription, visualSettings.pageSettings.heroDescription),
  "heroMainImage": coalesce(heroMainImage, heroImage){
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(heroMediaAltText, alt, asset->altText)
  },
  "heroImage": coalesce(heroMainImage, heroImage){
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(heroMediaAltText, alt, asset->altText)
  },
  "heroBackgroundImage": coalesce(heroBackgroundImage, visualSettings.pageSettings.heroBackgroundImage.desktopImage){
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  "backgroundType": coalesce(backgroundType, "image"),
  "heroSliderImages": heroSliderImages[]{
    "url": image.asset->url,
    "asset": {
      "_ref": image.asset._ref,
      "_type": image.asset._type,
      "_id": image.asset->_id,
      "url": image.asset->url
    },
    "alt": coalesce(altText, image.asset->altText),
    caption
  },
  "heroBackgroundVideoMp4": coalesce(heroBackgroundVideoMp4, backgroundVideoMp4)${fileProjection},
  "backgroundVideoMp4": coalesce(heroBackgroundVideoMp4, backgroundVideoMp4)${fileProjection},
  "backgroundPosterImage": backgroundPosterImage${imageProjection},
  "heroBackgroundOverlayOpacity": coalesce(heroBackgroundOverlayOpacity, visualSettings.pageSettings.heroOverlayOpacity, 35),
  "heroMediaType": coalesce(heroMediaType, "image"),
  "heroGif": heroGif${fileProjection},
  "heroVideoMp4": heroVideoMp4${fileProjection},
  "heroPosterImage": coalesce(heroPosterImage, heroVideoPosterImage)${imageProjection},
  "heroVideoPosterImage": coalesce(heroPosterImage, heroVideoPosterImage)${imageProjection},
  heroMediaAltText,
  "heroMotionType": coalesce(heroMotionType, "none"),
  "heroMotionGif": heroMotionGif${fileProjection},
  "heroMotionVideoMp4": heroMotionVideoMp4${fileProjection},
  "heroMotionPosterImage": heroMotionPosterImage${imageProjection},
  heroMotionAltText,
  "heroMotionPosition": null,
  "heroMotionSize": null,
  "heroMotionOpacity": coalesce(heroMotionOpacity, 80),
  "heroMotionSpeed": null,
  "enableMotionOnMobile": null,
  "enableCinematicFlow": coalesce(enableCinematicFlow, false),
  "cinematicVideoMp4": cinematicVideoMp4${fileProjection},
  "cinematicVideoWebm": cinematicVideoWebm${fileProjection},
  "cinematicPosterImage": cinematicPosterImage${imageProjection},
  cinematicPosterAlt,
  "cinematicOverlayOpacity": coalesce(cinematicOverlayOpacity, 45),
  "cinematicStartSection": coalesce(cinematicStartSection, "hero"),
  "cinematicEndSection": coalesce(cinematicEndSection, "caseStudiesPreview"),
  "cinematicBackgroundPosition": coalesce(cinematicBackgroundPosition, "center"),
  "cinematicMobileFallbackImage": cinematicMobileFallbackImage${imageProjection},
  cinematicMobileFallbackAlt,
  "cinematicMobileMode": coalesce(cinematicMobileMode, "poster"),
  "solutionsPreviewImage": solutionsPreviewImage{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  solutionsPreviewEyebrow,
  solutionsPreviewTitle,
  solutionsPreviewDescription,
  solutionsPreviewVisualEyebrow,
  solutionsPreviewVisualTitle,
  solutionsPreviewRows[]{title, href, icon},
  heroPrimaryCtaLabel,
  "heroPrimaryCtaUrl": coalesce(heroPrimaryCtaUrl, heroPrimaryCtaHref),
  "heroPrimaryCtaHref": coalesce(heroPrimaryCtaUrl, heroPrimaryCtaHref),
  heroSecondaryCtaLabel,
  "heroSecondaryCtaUrl": coalesce(heroSecondaryCtaUrl, heroSecondaryCtaHref),
  "heroSecondaryCtaHref": coalesce(heroSecondaryCtaUrl, heroSecondaryCtaHref),
  clientLogosEyebrow,
  clientLogosTitle,
  clientLogosDescription,
  trustEyebrow,
  trustTitle,
  trustDescription,
  "trustCards": trustCards[] | order(coalesce(order, 999) asc){
    title,
    description,
    order
  },
  caseStudiesPreviewEyebrow,
  caseStudiesPreviewTitle,
  caseStudiesPreviewDescription,
  caseStudiesPreviewCtaLabel,
  caseStudiesPreviewCtaUrl,
  "featuredBannerBackgroundImage": featuredBannerBackgroundImage{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  "featuredBannerOverlayOpacity": coalesce(featuredBannerOverlayOpacity, 58),
  "featuredBannerBackgroundPosition": coalesce(featuredBannerBackgroundPosition, "center"),
  "enableFeaturedBannerWorldMap": coalesce(enableFeaturedBannerWorldMap, true),
  "enableFeaturedBannerGridPattern": coalesce(enableFeaturedBannerGridPattern, true),
  "enableFeaturedBannerOrbitLines": coalesce(enableFeaturedBannerOrbitLines, true),
  "enableFeaturedBannerGlow": coalesce(enableFeaturedBannerGlow, true),
  packagesPreviewEyebrow,
  packagesPreviewTitle,
  packagesPreviewDescription,
  packagesPreviewCtaLabel,
  packagesPreviewCtaUrl,
  packagesPreviewSupportItems[]{title, description},
  processEyebrow,
  processTitle,
  processDescription,
  impactMetricsEyebrow,
  impactMetricsTitle,
  impactMetricsDescription,
  impactMetricsItems[]{value, label, description},
  testimonialsEyebrow,
  testimonialsTitle,
  testimonialsDescription,
  ctaEyebrow,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonHref,
  "visualSettings": {
    "pageSettings": {
      "heroOverlayOpacity": coalesce(heroBackgroundOverlayOpacity, visualSettings.pageSettings.heroOverlayOpacity, 35)
    }
  },
  seoTitle,
  seoDescription,
  "openGraphImage": coalesce(openGraphImage, seoImage)${imageProjection},
  "seoImage": coalesce(openGraphImage, seoImage)${imageProjection},
  seoKeywords
}`;

export const aboutQuery = `*[_type == "about" && _id == "about"][0]{
  heroEyebrow,
  heroTitle,
  heroDescription,
  storyEyebrow,
  storyTitle,
  storyDescription,
  vision,
  mission,
  coreValuesEyebrow,
  coreValuesTitle,
  coreValues,
  missionEyebrow,
  visionEyebrow,
  whyEyebrow,
  whyTitle,
  statistics[]{value, label},
  "image": image${imageProjection},
  ctaEyebrow,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonUrl,
  ${visualSettingsProjection},
  ${seoProjection}
}`;

export const solutionsPageQuery = `*[_type == "solutionsPage" && _id == "solutionsPage"][0]{
  "heroEyebrow": coalesce(heroContent.eyebrow, heroEyebrow),
  "heroTitle": coalesce(heroContent.title, heroTitle),
  "heroDescription": coalesce(heroContent.description, heroDescription),
  "heroBackgroundImage": heroMedia.image${imageProjection},
  "heroSliderImages": heroMedia.sliderImages[]{
    "url": image.asset->url,
    "asset": {
      "_ref": image.asset._ref,
      "_type": image.asset._type,
      "_id": image.asset->_id,
      "url": image.asset->url
    },
    "alt": coalesce(altText, image.alt, image.asset->altText),
    caption
  },
  "heroMotionVideoMp4": heroMedia.videoMp4${fileProjection},
  "heroPosterImage": heroMedia.posterImage${imageProjection},
  "heroOverlayOpacity": coalesce(heroMedia.overlayOpacity, 45),
  "heroPrimaryButtonLabel": heroContent.primaryCtaLabel,
  "heroPrimaryButtonLink": heroContent.primaryCtaUrl,
  "heroSecondaryButtonLabel": heroContent.secondaryCtaLabel,
  "heroSecondaryButtonLink": heroContent.secondaryCtaUrl,
  "sectionEyebrow": sectionBuilder.eyebrow,
  "sectionTitle": sectionBuilder.title,
  "sectionDescription": sectionBuilder.description,
  "introEyebrow": sectionBuilder.eyebrow,
  "introTitle": sectionBuilder.title,
  "introDescription": sectionBuilder.description,
  "solutionCards": sectionBuilder.items[] | order(coalesce(order, 999) asc){
    title,
    description,
    icon,
    "image": image${imageProjection},
    "linkLabel": coalesce(ctaLabel, linkLabel),
    "linkUrl": coalesce(ctaUrl, linkUrl, link),
    link,
    order,
    items
  },
  ctaEyebrow,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonUrl,
  "seoTitle": coalesce(seoBuilder.seoTitle, seoTitle),
  "seoDescription": coalesce(seoBuilder.seoDescription, seoDescription),
  "seoImage": coalesce(seoBuilder.openGraphImage, seoImage)${imageProjection},
  "seoKeywords": coalesce(seoBuilder.keywords, seoKeywords)
}`;

export const innerPageBySlugQuery = `*[_type == "innerPage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  pageName,
  "slug": slug.current,
  "heroEyebrow": coalesce(heroContent.eyebrow, heroEyebrow),
  "heroTitle": coalesce(heroContent.title, heroTitle),
  "heroDescription": coalesce(heroContent.description, heroDescription),
  "heroBackgroundImage": coalesce(heroMedia.image, heroBackgroundImage)${imageProjection},
  "heroSliderImages": heroMedia.sliderImages[]{
    "url": image.asset->url,
    "asset": {
      "_ref": image.asset._ref,
      "_type": image.asset._type,
      "_id": image.asset->_id,
      "url": image.asset->url
    },
    "alt": coalesce(altText, image.alt, image.asset->altText),
    caption
  },
  "heroMotionVideoMp4": coalesce(heroMedia.videoMp4, heroMotionVideoMp4)${fileProjection},
  "heroPosterImage": coalesce(heroMedia.posterImage, heroPosterImage)${imageProjection},
  "heroOverlayOpacity": coalesce(heroMedia.overlayOpacity, heroOverlayOpacity, 45),
  "heroPrimaryButtonLabel": coalesce(heroContent.primaryCtaLabel, heroPrimaryButtonLabel),
  "heroPrimaryButtonLink": coalesce(heroContent.primaryCtaUrl, heroPrimaryButtonLink),
  "heroSecondaryButtonLabel": heroContent.secondaryCtaLabel,
  "heroSecondaryButtonLink": heroContent.secondaryCtaUrl,
  "sectionEyebrow": coalesce(sectionBuilder.eyebrow, sectionEyebrow),
  "sectionTitle": coalesce(sectionBuilder.title, sectionTitle),
  "sectionDescription": coalesce(sectionBuilder.description, sectionDescription),
  "sectionMediaImage": coalesce(mediaBuilder.image, sectionMediaImage)${imageProjection},
  "sectionMediaVideo": coalesce(mediaBuilder.videoMp4, sectionMediaVideo)${fileProjection},
  mediaLayout,
  "sectionBuilder": sectionBuilder{
    eyebrow,
    title,
    description,
    ctaLabel,
    ctaUrl,
    "items": items[] | order(coalesce(order, 999) asc){
      icon,
      "image": image${imageProjection},
      title,
      description,
      ctaLabel,
      ctaUrl,
      order
    }
  },
  "cardBuilder": cardBuilder[] | order(coalesce(order, 999) asc){
    icon,
    "image": image${imageProjection},
    title,
    description,
    ctaLabel,
    ctaUrl,
    order
  },
  contentBlocks[]{
    blockTitle,
    blockDescription,
    items[]{
      itemTitle,
      itemDescription,
      "itemImage": itemImage${imageProjection},
      itemLink
    }
  },
  listingEyebrow,
  listingTitle,
  listingDescription,
  listingCtaLabel,
  listingCtaUrl,
  emptyStateText,
  cardLabel,
  featuredCardLabel,
  featuredBadgeLabel,
  priceLabel,
  scopeLabel,
  packageCtaLabel,
  packageCtaUrl,
  listingSupportItems[]{title, description},
  listingBlocks[]{
    title,
    category,
    description,
    "image": image${imageProjection},
    link,
    items,
    highlighted
  },
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonLink,
  "seoTitle": coalesce(seoBuilder.seoTitle, seoTitle),
  "seoDescription": coalesce(seoBuilder.seoDescription, seoDescription),
  "seoImage": coalesce(seoBuilder.openGraphImage, seoImage)${imageProjection},
  "seoKeywords": coalesce(seoBuilder.keywords, seoKeywords)
}`;

export const packagesPageSettingsQuery = `*[_type == "packagesPageSettings" && _id == "packagesPageSettings"][0]{
  pageEyebrow,
  pageTitle,
  pageDescription,
  packagesSectionEyebrow,
  packagesSectionTitle,
  packagesSectionDescription,
  packagesSectionCtaLabel,
  packagesSectionCtaUrl,
  "heroBackgroundImage": heroBackgroundImage${imageProjection},
  "heroBackgroundVideo": heroBackgroundVideo${fileProjection},
  heroOverlayOpacity,
  seoTitle,
  seoDescription,
  "seoImage": seoImage${imageProjection}
}`;

export const caseStudiesPageSettingsQuery = `*[_type == "caseStudiesPageSettings" && _id == "caseStudiesPageSettings"][0]{
  pageEyebrow,
  pageTitle,
  pageDescription,
  "heroBackgroundImage": heroBackgroundImage${imageProjection},
  "heroBackgroundVideo": heroBackgroundVideo${fileProjection},
  heroOverlayOpacity,
  seoTitle,
  seoDescription,
  "seoImage": seoImage${imageProjection}
}`;

export const packagesQuery = `*[_type == "package" && !(_id in path("drafts.**"))] | order(coalesce(order, 999), _createdAt asc){
  title,
  "slug": slug.current,
  description,
  startingPrice,
  features,
  featured,
  order,
  ${visualSettingsProjection},
  ${seoProjection}
}`;

export const portfolioQuery = `*[_type == "portfolio" && !(_id in path("drafts.**"))] | order(coalesce(order, 999), _createdAt asc){
  title,
  "slug": slug.current,
  "caseStudySlug": *[_type == "caseStudy" && slug.current == ^.slug.current && !(_id in path("drafts.**"))][0].slug.current,
  client,
  category,
  description,
  "thumbnail": thumbnail{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  "gallery": gallery[]${imageProjection},
  projectUrl,
  featured,
  order,
  ${visualSettingsProjection},
  ${seoProjection}
}`;

export const caseStudiesQuery = `*[_type == "caseStudy" && !(_id in path("drafts.**"))] | order(coalesce(order, 999), _createdAt asc){
  title,
  "slug": slug.current,
  client,
  industry,
  challenge,
  solution,
  result,
  testimonial,
  "gallery": gallery[]${imageProjection},
  "featuredImage": coalesce(
    featuredImage,
    gallery[0],
    *[_type == "portfolio" && !(_id in path("drafts.**")) && defined(thumbnail.asset._ref) && (
      slug.current == ^.slug.current ||
      title == ^.title ||
      category == ^.industry
    )][0].thumbnail
  ){
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  featured,
  order,
  ${visualSettingsProjection},
  ${seoProjection}
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  "slug": slug.current,
  client,
  industry,
  challenge,
  solution,
  result,
  testimonial,
  "gallery": gallery[]{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText),
    "caption": caption
  },
  "featuredImage": coalesce(
    featuredImage,
    gallery[0],
    *[_type == "portfolio" && !(_id in path("drafts.**")) && defined(thumbnail.asset._ref) && (
      slug.current == ^.slug.current ||
      title == ^.title ||
      category == ^.industry
    )][0].thumbnail
  ){
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  featured,
  order,
  ${visualSettingsProjection},
  ${seoProjection}
}`;

export const clientLogosQuery = `*[_type == "clientLogo" && !(_id in path("drafts.**"))] | order(featured desc, coalesce(order, 999), _createdAt asc){
  name,
  "logo": logo{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "extension": asset->extension,
      "mimeType": asset->mimeType,
      "originalFilename": asset->originalFilename,
      "url": asset->url
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  industry,
  websiteUrl,
  featured,
  order
}`;

export const processQuery = `*[_type == "process" && !(_id in path("drafts.**"))] | order(coalesce(order, 999), _createdAt asc){
  title,
  "slug": slug.current,
  shortDescription,
  icon,
  order,
  featured
}`;

export const impactMetricsQuery = `*[_type == "impactMetric" && !(_id in path("drafts.**"))] | order(featured desc, coalesce(order, 999), _createdAt asc){
  value,
  label,
  description,
  icon,
  featured,
  order
}`;

export const testimonialsQuery = `*[_type == "testimonial" && !(_id in path("drafts.**"))] | order(featured desc, coalesce(order, 999), _createdAt asc){
  name,
  position,
  company,
  quote,
  "avatar": avatar{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url,
      "extension": asset->extension,
      "mimeType": asset->mimeType,
      "originalFilename": asset->originalFilename
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  "image": image{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url,
      "extension": asset->extension,
      "mimeType": asset->mimeType,
      "originalFilename": asset->originalFilename
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  "logo": logo{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url,
      "extension": asset->extension,
      "mimeType": asset->mimeType,
      "originalFilename": asset->originalFilename
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  "photo": photo{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url,
      "extension": asset->extension,
      "mimeType": asset->mimeType,
      "originalFilename": asset->originalFilename
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  "clientLogo": clientLogo{
    ...,
    "asset": {
      "_ref": asset._ref,
      "_type": asset._type,
      "_id": asset->_id,
      "url": asset->url,
      "extension": asset->extension,
      "mimeType": asset->mimeType,
      "originalFilename": asset->originalFilename
    },
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
  rating,
  featured,
  order
}`;

export const solutionsQuery = `*[_type == "solution" && !(_id in path("drafts.**"))] | order(coalesce(order, 999), _createdAt asc){
  title,
  "slug": slug.current,
  shortDescription,
  fullDescription,
  icon,
  features,
  benefits,
  process[]{title, description},
  "thumbnail": thumbnail${imageProjection},
  featured,
  order,
  ctaTitle,
  ctaDescription,
  ctaLabel,
  ctaHref,
  ${visualSettingsProjection},
  ${seoProjection}
}`;

export const solutionBySlugQuery = `*[_type == "solution" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  "slug": slug.current,
  shortDescription,
  fullDescription,
  icon,
  features,
  benefits,
  process[]{title, description},
  "thumbnail": thumbnail${imageProjection},
  featured,
  order,
  ctaTitle,
  ctaDescription,
  ctaLabel,
  ctaHref,
  ${visualSettingsProjection},
  ${seoProjection}
}`;

export const contactQuery = `*[_type == "contact" && _id == "contact"][0]{
  heroEyebrow,
  "heroTitle": coalesce(heroTitle, title),
  "heroDescription": coalesce(heroDescription, description),
  "heroBackgroundImage": heroBackgroundImage${imageProjection},
  "heroBackgroundVideo": heroBackgroundVideo${fileProjection},
  heroOverlayOpacity,
  title,
  description,
  phone,
  whatsapp,
  email,
  address,
  googleMapsEmbed,
  formTitle,
  formDescription,
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  companyPlaceholder,
  messagePlaceholder,
  submitButtonLabel,
  submittingLabel,
  successMessage,
  errorPrefix,
  ctaTitle,
  ctaDescription,
  ${visualSettingsProjection},
  ${seoProjection}
}`;

export const navbarQuery = `*[_type == "navbar" && _id == "navbar"][0]{
  "logo": logo${imageProjection},
  brandMode,
  menuItems[]{label, href},
  ctaLabel,
  ctaHref
}`;

export const footerQuery = `*[_type == "footer" && _id == "footer"][0]{
  description,
  address,
  email,
  phone,
  whatsapp,
  socialLinks[]{platform, url},
  copyright,
  enableFooterBackground,
  "footerBackgroundImage": footerBackgroundImage${imageProjection},
  "footerOverlayOpacity": coalesce(footerOverlayOpacity, 86),
  "footerBackgroundPosition": coalesce(footerBackgroundPosition, "center"),
  "footerBackgroundSize": coalesce(footerBackgroundSize, "cover")
}`;

export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  companyName,
  tagline,
  description,
  phone,
  whatsapp,
  email,
  address,
  instagram,
  linkedin,
  youtube,
  facebook,
  "logo": logo${imageProjection},
  "favicon": favicon${imageProjection},
  primaryColor,
  secondaryColor,
  siteTitle,
  siteDescription,
  "ogImage": ogImage${imageProjection},
  keywords,
  siteUrl,
  pageSeo[]{
    page,
    title,
    description,
    "ogImage": ogImage${imageProjection},
    keywords
  }
}`;

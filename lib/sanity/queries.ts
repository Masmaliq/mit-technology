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
  technologyLabels?: string[];
  servicesSection?: SectionIntro;
  selectedServices?: HomepageServiceSelection[];
  selectedWorkSection?: SectionIntro;
  selectedWorkCta?: CtaLink;
  featuredWorkEyebrow?: string;
  featuredWorkCtaLabel?: string;
  selectedProjects?: HomepageProjectSelection[];
  pricingSection?: SectionIntro;
  pricingCta?: CtaLink;
  premiumPricingSection?: SectionIntro;
  premiumPricingCtaLabel?: string;
  premiumPricingFeaturedCtaLabel?: string;
  premiumPricingStartingFromLabel?: string;
  premiumPricingBespokeLabel?: string;
  selectedPricing?: HomepagePackage[];
  pricingBenefits?: string[];
  pricingNote?: string;
  wordpressEyebrow?: string;
  wordpressPriceLabel?: string;
  wordpressCta?: CtaLink;
  processSection?: SectionIntro;
  selectedProcess?: HomepageProcessSelection[];
  insightsSection?: SectionIntro;
  selectedInsights?: HomepageInsight[];
  insightsCtaLabel?: string;
  finalCta?: HomepageFinalCta;
  globalCta?: HomepageFinalCta["globalCta"];
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

export type SectionIntro = {
  eyebrow?: string;
  heading?: string;
  description?: string;
};

export type CtaLink = {
  label?: string;
  link?: string;
  isExternal?: boolean;
  openInNewTab?: boolean;
};

export type HomepageServiceSelection = {
  displayTitle?: string;
  displayDescription?: string;
  service?: SolutionItem;
};

export type HomepageProject = {
  title?: string;
  slug?: string;
  client?: string;
  category?: string;
  year?: number;
  shortDescription?: string;
  fullDescription?: string;
  technologies?: string[];
  coverMedia?: ProjectMedia;
  coverAlt?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroIntroduction?: string;
  heroMedia?: ProjectMedia;
  heroAlt?: string;
  caseStudyContent?: ProjectCaseStudySection[];
  coverImage?: SanityImageValue;
  desktopVisual?: SanityImageValue;
  mobileVisual?: SanityImageValue;
  gallery?: SanityImageValue[];
  projectUrl?: string;
  featured?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageValue;
};

export type ProjectMedia = {
  mediaType?: "image" | "video";
  image?: SanityImageValue;
  video?: SanityFileValue;
  posterImage?: SanityImageValue;
  mobileImage?: SanityImageValue;
  mobileVideo?: SanityFileValue;
  accessibleLabel?: string;
};

export type ProjectCaseStudySection = {
  _key?: string;
  eyebrow?: string;
  heading?: string;
  body?: Array<{
    _key?: string;
    _type?: string;
    style?: string;
    listItem?: string;
    level?: number;
    children?: Array<{ _key?: string; _type?: string; text?: string; marks?: string[] }>;
  }>;
  media?: ProjectMedia;
  caption?: string;
  layout?: "wide" | "full";
};

export type HomepageProjectSelection = {
  showInFeaturedWork?: boolean;
  displayOrder?: number;
  displayCategory?: string;
  displayDescription?: string;
  featuredHeroImage?: SanityImageValue;
  cursorSupportingImages?: SanityImageValue[];
  mainMedia?: SanityImageValue;
  mobileMedia?: SanityImageValue;
  productMedia?: SanityImageValue;
  detailMedia?: SanityImageValue;
  presentationStyle?: "editorial" | "spatial" | "mosaic" | "cinematic";
  presentationMedia?: {
    mediaType?: "image" | "video";
    image?: SanityImageValue;
    video?: SanityFileValue;
    posterImage?: SanityImageValue;
    mobileImage?: SanityImageValue;
    alt?: string;
  };
  featured?: boolean;
  project?: HomepageProject;
};

export type HomepagePackage = PackageItem & {
  packageType?: "standard" | "premium" | "wordpress";
  price?: number;
  priceDisplay?: string;
  priceQualifier?: "fixed" | "startingFrom" | "bespoke";
  priceNote?: string;
  pageCount?: number;
  maximumSections?: number;
  suitableFor?: string;
  active?: boolean;
};

export type HomepageProcessSelection = {
  displayDescription?: string;
  process?: ProcessItem;
};

export type HomepageInsight = {
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImageValue;
  body?: Array<{ _key?: string; _type?: string; style?: string; children?: Array<{ _key?: string; _type?: string; text?: string }> }>;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageValue;
};

export type HomepageFinalCta = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: CtaLink;
  globalCta?: {
    eyebrow?: string;
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
    primaryButton?: CtaLink;
  };
};

export type About = SeoFields & {
  aboutHeroMediaType?: "image" | "video";
  aboutHeroImage?: SanityImageValue;
  aboutHeroVideo?: SanityFileValue;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  whoWeAreIntro?: SectionIntro;
  whoWeAreBody?: Array<{
    _key?: string;
    _type?: string;
    children?: Array<{ _key?: string; _type?: string; text?: string }>;
  }>;
  capabilityCards?: Array<{
    label?: string;
    title?: string;
    description?: string;
    image?: SanityImageValue;
  }>;
  expertiseIntro?: SectionIntro;
  expertiseServices?: Array<{
    displayTitle?: string;
    displayDescription?: string;
    service?: SolutionItem;
  }>;
  valuesIntro?: SectionIntro;
  values?: Array<{
    label?: string;
    title?: string;
    description?: string;
    image?: SanityImageValue;
  }>;
  clientsIntro?: SectionIntro;
  selectedClients?: Array<{
    displayRole?: string;
    client?: {
      name?: string;
      industry?: string;
    };
    relatedProject?: HomepageProject;
  }>;
  selectedProjects?: HomepageProject[];
  finalCta?: HomepageFinalCta;
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
  serviceHeroMediaType?: "image" | "video";
  serviceHeroImage?: SanityImageValue;
  serviceHeroVideo?: SanityFileValue;
  heroCount?: string;
  whatWeDo?: SectionIntro;
  coreServicesIntro?: SectionIntro;
  selectedServices?: HomepageServiceSelection[];
  creativeProductionIntro?: SectionIntro;
  creativeShowreels?: Array<{
    title?: string;
    category?: string;
    caption?: string;
    video?: SanityFileValue;
    image?: SanityImageValue;
  }>;
  creativeProductionMedia?: {
    mediaType?: "image" | "video";
    image?: SanityImageValue;
    video?: SanityFileValue;
    posterImage?: SanityImageValue;
    accessibleLabel?: string;
  };
  creativeProductionSupportingContent?: Array<{
    label?: string;
    title?: string;
    description?: string;
    image?: SanityImageValue;
  }>;
  capabilityGroups?: Array<{
    title?: string;
    items?: string[];
  }>;
  capabilitiesIntro?: SectionIntro;
  processIntro?: SectionIntro;
  selectedProcess?: HomepageProcessSelection[];
  finalCta?: HomepageFinalCta;
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
  pricingHeroMediaType?: "image" | "video";
  pricingHeroImage?: SanityImageValue;
  pricingHeroVideo?: SanityFileValue;
  startingPriceLabel?: string;
  startingPriceDisplay?: string;
  pricingHeroMedia?: {
    mediaType?: "image" | "video";
    image?: SanityImageValue;
    video?: SanityFileValue;
    posterImage?: SanityImageValue;
    alt?: string;
  };
  websitePricingIntro?: SectionIntro;
  websitePricing?: PricingSelection[];
  websitePricingBenefits?: string[];
  websitePricingNote?: string;
  premiumPricingIntro?: SectionIntro;
  premiumPricing?: PricingSelection[];
  wordpressIntro?: SectionIntro;
  wordpressPricing?: PricingSelection[];
  wordpressCta?: CtaLink;
  projectFoundationIntro?: SectionIntro;
  projectFoundationItems?: PagePresentationItem[];
  beforeWeBuildIntro?: SectionIntro;
  beforeWeBuildItems?: PagePresentationItem[];
  ownershipIntro?: SectionIntro;
  ownershipItems?: PagePresentationItem[];
  processIntro?: SectionIntro;
  selectedProcess?: HomepageProcessSelection[];
  faqIntro?: SectionIntro;
  faqs?: Array<{ question?: string; answer?: string; order?: number }>;
  finalCta?: HomepageFinalCta;
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

export type PagePresentationItem = {
  label?: string;
  title?: string;
  description?: string;
  image?: SanityImageValue;
};

export type PricingSelection = {
  displayTitle?: string;
  displayDescription?: string;
  pricing?: PackageItem;
};

export type CaseStudiesPageSettings = SeoFields & {
  workHeroMediaType?: "image" | "video";
  workHeroImage?: SanityImageValue;
  workHeroVideo?: SanityFileValue;
  workHeroMedia?: {
    mediaType?: "image" | "video";
    image?: SanityImageValue;
    video?: SanityFileValue;
    posterImage?: SanityImageValue;
    alt?: string;
  };
  projectsIntro?: SectionIntro;
  selectedProjects?: HomepageProjectSelection[];
  moreWorkIntro?: SectionIntro;
  moreWorkItems?: Array<{
    showInAllWork?: boolean;
    displayOrder?: number;
    displayTitle?: string;
    displayDescription?: string;
    project?: HomepageProject;
  }>;
  projectCards?: Array<{
    showInAllWork?: boolean;
    allWorkImage?: SanityImageValue;
    project?: HomepageProject;
  }>;
  processEyebrow?: string;
  processHeading?: string;
  finalCta?: HomepageFinalCta;
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
  packageType?: "standard" | "premium" | "wordpress";
  price?: number;
  priceDisplay?: string;
  priceQualifier?: "fixed" | "startingFrom" | "bespoke";
  priceNote?: string;
  startingPrice?: string;
  pageCount?: number;
  maximumSections?: number;
  suitableFor?: string;
  active?: boolean;
  features?: string[];
  capabilities?: string[];
  exploreLabel?: string;
  exploreLink?: string;
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
  _id?: string;
  title?: string;
  slug?: string;
  projectType?: "newWebsite" | "redesign";
  client?: string;
  industry?: string;
  year?: number;
  deliverables?: string[];
  websiteUrl?: string;
  statement?: string;
  overviewLabel?: string;
  overviewHeading?: string;
  overviewDescription?: string;
  redesignContext?: string;
  previousWebsiteImage?: SanityImageValue;
  redesignedWebsiteImage?: SanityImageValue;
  keyImprovements?: Array<{ title?: string; description?: string }>;
  challengeLabel?: string;
  challengeHeading?: string;
  challenge?: string;
  challengeItems?: Array<{ title?: string; description?: string }>;
  supportingImage?: SanityImageValue;
  approachLabel?: string;
  approachHeading?: string;
  approachSteps?: Array<{ title?: string; description?: string }>;
  experienceLabel?: string;
  experienceHeading?: string;
  experienceDescription?: string;
  solution?: string;
  resultLabel?: string;
  resultHeading?: string;
  result?: string;
  finalImage?: SanityImageValue;
  testimonial?: string;
  gallery?: SanityImageValue[];
  supportingImages?: SanityImageValue[];
  cursorSupportingImages?: SanityImageValue[];
  nextProject?: { title?: string; slug?: string };
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
  capabilities?: string[];
  exploreLabel?: string;
  exploreLink?: string;
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
  consultationEyebrow?: string;
  consultationButtonLabel?: string;
  topicsEyebrow?: string;
  consultationTopics?: string[];
  emailEyebrow?: string;
  emailPrompt?: string;
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
  ctaEnabled?: boolean;
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

export type HomepageFooterGlobals = {
  footer?: Footer & {
    footerNote?: string;
    navigationLinks?: Array<{ label?: string; link?: string }>;
    showAddress?: boolean;
    showEmail?: boolean;
    showPhone?: boolean;
    showSocialMedia?: boolean;
    privacyPolicyLink?: string;
    termsLink?: string;
  };
  contact?: {
    companyName?: string;
    displayName?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
    primaryEmail?: string;
    secondaryEmail?: string;
    phone?: string;
    whatsappNumber?: string;
    whatsappDefaultMessage?: string;
  };
  social?: {
    instagramUrl?: string;
    instagramLabel?: string;
    tiktokUrl?: string;
    tiktokLabel?: string;
    linkedinUrl?: string;
    linkedinLabel?: string;
    youtubeUrl?: string;
    youtubeLabel?: string;
    facebookUrl?: string;
    facebookLabel?: string;
    twitterUrl?: string;
    twitterLabel?: string;
    additionalLinks?: Array<{ platform?: string; label?: string; url?: string }>;
  };
  identity?: {
    siteName?: string;
    shortName?: string;
    tagline?: string;
    shortDescription?: string;
    primaryLogo?: SanityImageValue;
    favicon?: SanityImageValue;
  };
  navigation?: Navbar;
  seoDefaults?: {
    defaultTitle?: string;
    defaultDescription?: string;
    defaultOpenGraphImage?: SanityImageValue;
    siteName?: string;
    twitterCardType?: "summary" | "summary_large_image";
  };
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
  technologyLabels,
  servicesSection{eyebrow, heading, description},
  selectedServices[]{
    "service": @->{
      title,
      "slug": slug.current,
      shortDescription,
      fullDescription,
      icon,
      "thumbnail": thumbnail${imageProjection},
      featured,
      order,
      ctaLabel,
      ctaHref
    }
  },
  selectedWorkSection{eyebrow, heading, description},
  selectedWorkCta{label, link, isExternal, openInNewTab},
  featuredWorkEyebrow,
  featuredWorkCtaLabel,
  selectedProjects[]{
    displayCategory,
    displayDescription,
    featured,
    presentationMedia{
      mediaType,
      "image": image${imageProjection},
      "video": video${fileProjection},
      "posterImage": posterImage${imageProjection},
      alt
    },
    "project": project->{
      title,
      "slug": slug.current,
      client,
      category,
      year,
      shortDescription,
      "coverImage": coverImage${imageProjection},
      "desktopVisual": desktopVisual${imageProjection},
      "mobileVisual": mobileVisual${imageProjection},
      projectUrl,
      featured,
      order
    }
  },
  pricingSection{eyebrow, heading, description},
  pricingCta{label, link, isExternal, openInNewTab},
  premiumPricingSection{eyebrow, heading, description},
  premiumPricingCtaLabel,
  premiumPricingFeaturedCtaLabel,
  premiumPricingStartingFromLabel,
  premiumPricingBespokeLabel,
  "selectedPricing": selectedPricing[]->{
    title,
    "slug": slug.current,
    packageType,
    price,
    priceDisplay,
    priceQualifier,
    priceNote,
    startingPrice,
    pageCount,
    maximumSections,
    description,
    suitableFor,
    features,
    featured,
    active,
    order
  },
  pricingBenefits,
  pricingNote,
  wordpressEyebrow,
  wordpressPriceLabel,
  wordpressCta{label, link, isExternal, openInNewTab},
  processSection{eyebrow, heading, description},
  selectedProcess[]{
    displayDescription,
    "process": process->{title, "slug": slug.current, shortDescription, icon, order, featured}
  },
  insightsSection{eyebrow, heading, description},
  insightsCtaLabel,
  "selectedInsights": selectedInsights[]->{
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    "coverImage": coverImage${imageProjection}
  },
  finalCta{
    eyebrow,
    title,
    description,
    primaryAction{label, link, isExternal, openInNewTab},
    "globalCta": coalesce(globalCta->{
      eyebrow,
      titleLine1,
      titleLine2,
      description,
      primaryButton{label, link, isExternal, openInNewTab}
    }, *[_type == "globalCta" && _id == "globalCta"][0]{eyebrow, titleLine1, titleLine2, description, primaryButton{label, link, isExternal, openInNewTab}})
  },
  "globalCta": *[_type == "globalCta" && _id == "globalCta"][0]{
    eyebrow,
    titleLine1,
    titleLine2,
    description,
    primaryButton{label, link, isExternal, openInNewTab}
  },
  "heroEyebrow": coalesce(heroEyebrow, heroSubtitle, visualSettings.pageSettings.heroEyebrowText),
  "heroSubtitle": coalesce(heroEyebrow, heroSubtitle, visualSettings.pageSettings.heroEyebrowText),
  "heroTitle": coalesce(heroTitle, visualSettings.pageSettings.heroTitle),
  "heroDescription": coalesce(heroDescription, visualSettings.pageSettings.heroDescription),
  "heroMainImage": coalesce(heroMainImage, heroBackgroundImage, heroImage){
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
  "heroVideoMp4": coalesce(heroVideoMp4, heroBackgroundVideoMp4, backgroundVideoMp4)${fileProjection},
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
  aboutHeroMediaType,
  "aboutHeroImage": aboutHeroImage${imageProjection},
  "aboutHeroVideo": aboutHeroVideo${fileProjection},
  heroEyebrow,
  heroTitle,
  heroDescription,
  whoWeAreIntro{eyebrow, heading, description},
  whoWeAreBody[]{..., children[]{_key, _type, text}},
  capabilityCards[]{label, title, description, "image": image${imageProjection}},
  expertiseIntro{eyebrow, heading, description},
  expertiseServices[]{
    displayTitle,
    displayDescription,
    "service": service->{
      title,
      "slug": slug.current,
      shortDescription,
      fullDescription,
      icon,
      features,
      capabilities,
      exploreLabel,
      exploreLink,
      benefits,
      featured,
      order
    }
  },
  valuesIntro{eyebrow, heading, description},
  values[]{label, title, description, "image": image${imageProjection}},
  clientsIntro{eyebrow, heading, description},
  selectedClients[]{
    displayRole,
    "client": client->{name, industry},
    "relatedProject": relatedProject->{title, "slug": slug.current, client, category, year, shortDescription, projectUrl, featured, order}
  },
  "selectedProjects": selectedProjects[]->{title, "slug": slug.current, client, category, year, shortDescription, projectUrl, featured, order},
  finalCta{
    eyebrow,
    title,
    description,
    primaryAction{label, link, isExternal, openInNewTab},
    "globalCta": coalesce(globalCta->{
      eyebrow,
      titleLine1,
      titleLine2,
      description,
      primaryButton{label, link, isExternal, openInNewTab}
    }, *[_type == "globalCta" && _id == "globalCta"][0]{eyebrow, titleLine1, titleLine2, description, primaryButton{label, link, isExternal, openInNewTab}})
  },
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
  "seoTitle": coalesce(seo.title, seoTitle),
  "seoDescription": coalesce(seo.description, seoDescription),
  "seoImage": coalesce(seo.openGraphImage, seoImage)${imageProjection},
  "openGraphImage": coalesce(seo.openGraphImage, openGraphImage, seoImage)${imageProjection},
  seoKeywords
}`;

export const solutionsPageQuery = `*[_type == "solutionsPage" && _id == "solutionsPage"][0]{
  "serviceHeroMediaType": coalesce(serviceHeroMediaType, heroMedia.mediaType, "image"),
  "serviceHeroImage": coalesce(serviceHeroImage, heroMedia.image)${imageProjection},
  "serviceHeroVideo": coalesce(serviceHeroVideo, heroMedia.videoMp4)${fileProjection},
  heroCount,
  whatWeDo{eyebrow, heading, description},
  coreServicesIntro{eyebrow, heading, description},
  selectedServices[]{
    "service": @->{
      title,
      "slug": slug.current,
      shortDescription,
      fullDescription,
      icon,
      features,
      capabilities,
      exploreLabel,
      exploreLink,
      benefits,
      ctaLabel,
      ctaHref,
      featured,
      order
    }
  },
  creativeProductionIntro{eyebrow, heading, description},
  creativeShowreels[]{title, category, caption, "video": video${fileProjection}, "image": image${imageProjection}},
  creativeProductionMedia{
    mediaType,
    "image": image${imageProjection},
    "video": video${fileProjection},
    "posterImage": posterImage${imageProjection},
    accessibleLabel
  },
  creativeProductionSupportingContent[]{
    label,
    title,
    description,
    "image": image${imageProjection}
  },
  capabilityGroups[]{title, items},
  capabilitiesIntro{eyebrow, heading, description},
  processIntro{eyebrow, heading, description},
  selectedProcess[]{
    displayDescription,
    "process": process->{title, "slug": slug.current, shortDescription, icon, order, featured}
  },
  finalCta{
    eyebrow,
    title,
    description,
    primaryAction{label, link, isExternal, openInNewTab},
    "globalCta": coalesce(globalCta->{
      eyebrow,
      titleLine1,
      titleLine2,
      description,
      primaryButton{label, link, isExternal, openInNewTab}
    }, *[_type == "globalCta" && _id == "globalCta"][0]{eyebrow, titleLine1, titleLine2, description, primaryButton{label, link, isExternal, openInNewTab}})
  },
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
  "sectionEyebrow": coalesce(sectionBuilder.eyebrow, sectionEyebrow, introEyebrow),
  "sectionTitle": coalesce(sectionBuilder.title, sectionTitle, introTitle),
  "sectionDescription": coalesce(sectionBuilder.description, sectionDescription, introDescription),
  "introEyebrow": coalesce(sectionBuilder.eyebrow, sectionEyebrow, introEyebrow),
  "introTitle": coalesce(sectionBuilder.title, sectionTitle, introTitle),
  "introDescription": coalesce(sectionBuilder.description, sectionDescription, introDescription),
  "solutionCards": select(count(sectionBuilder.items[]) > 0 => sectionBuilder.items, solutionCards)[] | order(coalesce(order, 999) asc){
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
  pricingHeroMediaType,
  "pricingHeroImage": pricingHeroImage${imageProjection},
  "pricingHeroVideo": pricingHeroVideo${fileProjection},
  startingPriceLabel,
  startingPriceDisplay,
  pricingHeroMedia{
    mediaType,
    "image": image${imageProjection},
    "video": video${fileProjection},
    "posterImage": posterImage${imageProjection},
    alt
  },
  websitePricingIntro{eyebrow, heading, description},
  websitePricing[]{
    displayTitle,
    displayDescription,
    pricing->{title, "slug": slug.current, packageType, price, priceDisplay, priceQualifier, priceNote, startingPrice, pageCount, maximumSections, suitableFor, description, features, active, featured, order}
  },
  websitePricingBenefits,
  websitePricingNote,
  premiumPricingIntro{eyebrow, heading, description},
  premiumPricing[]{
    displayTitle,
    displayDescription,
    pricing->{title, "slug": slug.current, packageType, price, priceDisplay, priceQualifier, priceNote, startingPrice, pageCount, maximumSections, suitableFor, description, features, active, featured, order}
  },
  wordpressIntro{eyebrow, heading, description},
  wordpressPricing[]{
    displayTitle,
    displayDescription,
    pricing->{title, "slug": slug.current, packageType, price, priceDisplay, priceQualifier, priceNote, startingPrice, pageCount, maximumSections, suitableFor, description, features, active, featured, order}
  },
  wordpressCta{label, link, isExternal, openInNewTab},
  projectFoundationIntro{eyebrow, heading, description},
  projectFoundationItems[]{label, title, description, "image": image${imageProjection}},
  beforeWeBuildIntro{eyebrow, heading, description},
  beforeWeBuildItems[]{label, title, description, "image": image${imageProjection}},
  ownershipIntro{eyebrow, heading, description},
  ownershipItems[]{label, title, description, "image": image${imageProjection}},
  processIntro{eyebrow, heading, description},
  selectedProcess[]{displayDescription, "process": process->{title, "slug": slug.current, shortDescription, icon, order, featured}},
  faqIntro{eyebrow, heading, description},
  faqs[]{question, answer, order},
  finalCta{
    eyebrow,
    title,
    description,
    primaryAction{label, link, isExternal, openInNewTab},
    "globalCta": coalesce(globalCta->{eyebrow, titleLine1, titleLine2, description, primaryButton{label, link, isExternal, openInNewTab}}, *[_type == "globalCta" && _id == "globalCta"][0]{eyebrow, titleLine1, titleLine2, description, primaryButton{label, link, isExternal, openInNewTab}})
  },
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
  "seoTitle": coalesce(seo.seoTitle, seoTitle),
  "seoDescription": coalesce(seo.seoDescription, seoDescription),
  "seoImage": coalesce(seo.openGraphImage, seoImage)${imageProjection},
  "seoKeywords": seo.keywords
}`;

export const caseStudiesPageSettingsQuery = `*[_type == "caseStudiesPageSettings" && _id == "caseStudiesPageSettings"][0]{
  "workHeroMediaType": coalesce(workHeroMediaType, workHeroMedia.mediaType, select(defined(heroBackgroundVideo) => "video", "image")),
  "workHeroImage": coalesce(workHeroImage, workHeroMedia.image, heroBackgroundImage)${imageProjection},
  "workHeroVideo": coalesce(workHeroVideo, workHeroMedia.video, heroBackgroundVideo)${fileProjection},
  workHeroMedia{
    mediaType,
    "image": image${imageProjection},
    "video": video${fileProjection},
    "posterImage": posterImage${imageProjection},
    alt
  },
  projectsIntro{eyebrow, heading, description},
  selectedProjects[]{
    showInFeaturedWork,
    displayOrder,
    displayCategory,
    displayDescription,
    "featuredHeroImage": featuredHeroImage${imageProjection},
    "cursorSupportingImages": cursorSupportingImages[]${imageProjection},
    "mainMedia": mainMedia${imageProjection},
    "mobileMedia": mobileMedia${imageProjection},
    "productMedia": productMedia${imageProjection},
    "detailMedia": detailMedia${imageProjection},
    presentationStyle,
    presentationMedia{
      mediaType,
      "image": image${imageProjection},
      "video": video${fileProjection},
      "posterImage": posterImage${imageProjection},
      "mobileImage": mobileImage${imageProjection},
      alt
    },
    featured,
    project->{
      title,
      "slug": slug.current,
      client,
      category,
      year,
      shortDescription,
      coverAlt,
      coverMedia{
        mediaType,
        "image": image${imageProjection},
        "video": video${fileProjection},
        "posterImage": posterImage${imageProjection},
        "mobileImage": mobileImage${imageProjection},
        "mobileVideo": mobileVideo${fileProjection},
        accessibleLabel
      },
      "coverImage": coverImage${imageProjection},
      "desktopVisual": desktopVisual${imageProjection},
      "mobileVisual": mobileVisual${imageProjection},
      "gallery": gallery[]${imageProjection},
      projectUrl,
      featured,
      order
    }
  },
  moreWorkIntro{eyebrow, heading, description},
  moreWorkItems[]{
    showInAllWork,
    displayOrder,
    displayTitle,
    displayDescription,
    project->{title, "slug": slug.current, client, category, year, shortDescription, projectUrl, featured, order, "coverImage": coverImage${imageProjection}, coverMedia{mediaType, "image": image${imageProjection}}}
  },
  projectCards[]{
    showInAllWork,
    "allWorkImage": allWorkImage${imageProjection},
    project->{title, "slug": slug.current}
  },
  processEyebrow,
  processHeading,
  finalCta{
    eyebrow,
    title,
    description,
    primaryAction{label, link, isExternal, openInNewTab},
    "globalCta": coalesce(globalCta->{
      eyebrow,
      titleLine1,
      titleLine2,
      description,
      primaryButton{label, link, isExternal, openInNewTab}
    }, *[_type == "globalCta" && _id == "globalCta"][0]{eyebrow, titleLine1, titleLine2, description, primaryButton{label, link, isExternal, openInNewTab}})
  },
  pageEyebrow,
  pageTitle,
  pageDescription,
  "heroBackgroundImage": heroBackgroundImage${imageProjection},
  "heroBackgroundVideo": heroBackgroundVideo${fileProjection},
  heroOverlayOpacity,
  "seoTitle": coalesce(seo.seoTitle, seoTitle),
  "seoDescription": coalesce(seo.seoDescription, seoDescription),
  "seoImage": coalesce(seo.openGraphImage, seoImage)${imageProjection},
  "seoKeywords": seo.keywords
}`;

export const packagesQuery = `*[_type == "package" && !(_id in path("drafts.**"))] | order(coalesce(order, 999), _createdAt asc){
  title,
  "slug": slug.current,
  description,
  packageType,
  price,
  priceDisplay,
  priceQualifier,
  priceNote,
  startingPrice,
  pageCount,
  maximumSections,
  suitableFor,
  features,
  active,
  featured,
  order,
  ${visualSettingsProjection},
  ${seoProjection}
}`;

export const projectsQuery = `*[_type == "project" && !(_id in path("drafts.**")) && coalesce(active, true)] | order(featured desc, coalesce(order, 999), _createdAt asc){
  title,
  "slug": slug.current,
  client,
  category,
  year,
  shortDescription,
  technologies,
  coverMedia{
    mediaType,
    "image": image${imageProjection},
    "video": video${fileProjection},
    "posterImage": posterImage${imageProjection},
    "mobileImage": mobileImage${imageProjection},
    "mobileVideo": mobileVideo${fileProjection},
    accessibleLabel
  },
  coverAlt,
  "coverImage": coverImage${imageProjection},
  "desktopVisual": desktopVisual${imageProjection},
  "mobileVisual": mobileVisual${imageProjection},
  "gallery": gallery[]${imageProjection},
  projectUrl,
  featured,
  order
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug && !(_id in path("drafts.**")) && coalesce(active, true)][0]{
  title,
  "slug": slug.current,
  client,
  category,
  year,
  shortDescription,
  fullDescription,
  technologies,
  projectUrl,
  coverAlt,
  coverMedia{
    mediaType,
    "image": image${imageProjection},
    "video": video${fileProjection},
    "posterImage": posterImage${imageProjection},
    "mobileImage": mobileImage${imageProjection},
    "mobileVideo": mobileVideo${fileProjection},
    accessibleLabel
  },
  heroEyebrow,
  heroTitle,
  heroIntroduction,
  heroAlt,
  heroMedia{
    mediaType,
    "image": image${imageProjection},
    "video": video${fileProjection},
    "posterImage": posterImage${imageProjection},
    "mobileImage": mobileImage${imageProjection},
    "mobileVideo": mobileVideo${fileProjection},
    accessibleLabel
  },
  caseStudyContent[]{
    _key,
    eyebrow,
    heading,
    body[]{..., children[]{...}},
    media{
      mediaType,
      "image": image${imageProjection},
      "video": video${fileProjection},
      "posterImage": posterImage${imageProjection},
      "mobileImage": mobileImage${imageProjection},
      "mobileVideo": mobileVideo${fileProjection},
      accessibleLabel
    },
    caption,
    layout
  },
  "coverImage": coverImage${imageProjection},
  "desktopVisual": desktopVisual${imageProjection},
  "mobileVisual": mobileVisual${imageProjection},
  "gallery": gallery[]${imageProjection},
  featured,
  order,
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage${imageProjection}
}`;

export const insightsQuery = `*[_type == "insight" && !(_id in path("drafts.**")) && coalesce(active, true)] | order(featured desc, publishedAt desc){
  title,
  "slug": slug.current,
  category,
  excerpt,
  publishedAt,
  author,
  body[]{..., children[]{...}},
  "coverImage": coverImage${imageProjection},
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage${imageProjection}
}`;

export const insightBySlugQuery = `*[_type == "insight" && slug.current == $slug && !(_id in path("drafts.**")) && coalesce(active, true)][0]{
  title,
  "slug": slug.current,
  category,
  excerpt,
  publishedAt,
  author,
  body[]{..., children[]{...}},
  "coverImage": coverImage${imageProjection},
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage${imageProjection}
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

export const caseStudiesQuery = `*[_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(order, 999), _createdAt asc){
  title,
  "slug": slug.current,
  projectType,
  client,
  industry,
  year,
  deliverables,
  websiteUrl,
  statement,
  overviewLabel,
  overviewHeading,
  "overviewDescription": coalesce(overviewDescription, solution),
  redesignContext,
  "previousWebsiteImage": previousWebsiteImage${imageProjection},
  "redesignedWebsiteImage": redesignedWebsiteImage${imageProjection},
  keyImprovements[]{title, description},
  challengeLabel,
  challengeHeading,
  challenge,
  challengeItems[]{title, description},
  "supportingImage": supportingImage${imageProjection},
  approachLabel,
  approachHeading,
  approachSteps[]{title, description},
  experienceLabel,
  experienceHeading,
  experienceDescription,
  solution,
  resultLabel,
  resultHeading,
  result,
  "finalImage": finalImage${imageProjection},
  testimonial,
  "gallery": gallery[]${imageProjection},
  "supportingImages": gallery[]${imageProjection},
  "cursorSupportingImages": cursorSupportingImages[]${imageProjection},
  "nextProject": nextProject->{title, "slug": slug.current},
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

export const caseStudyIdentitiesQuery = `*[_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))]{
  _id,
  title,
  "slug": slug.current,
  client
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug && !(_id in path("drafts.**"))]
  | order(select(_id == "caseStudy-" + $slug => 0, 1) asc, _updatedAt desc)[0]{
  _id,
  title,
  "slug": slug.current,
  projectType,
  client,
  industry,
  year,
  deliverables,
  websiteUrl,
  statement,
  overviewLabel,
  overviewHeading,
  "overviewDescription": coalesce(overviewDescription, solution),
  redesignContext,
  "previousWebsiteImage": previousWebsiteImage${imageProjection},
  "redesignedWebsiteImage": redesignedWebsiteImage${imageProjection},
  keyImprovements[]{title, description},
  challengeLabel,
  challengeHeading,
  challenge,
  challengeItems[]{title, description},
  "supportingImage": supportingImage${imageProjection},
  approachLabel,
  approachHeading,
  approachSteps[]{title, description},
  experienceLabel,
  experienceHeading,
  experienceDescription,
  solution,
  resultLabel,
  resultHeading,
  result,
  "finalImage": finalImage${imageProjection},
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
  "supportingImages": gallery[]{
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
  "cursorSupportingImages": cursorSupportingImages[]${imageProjection},
  "nextProject": nextProject->{title, "slug": slug.current},
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
  consultationEyebrow,
  consultationButtonLabel,
  topicsEyebrow,
  consultationTopics,
  emailEyebrow,
  emailPrompt,
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
  ctaHref,
  "ctaEnabled": coalesce(ctaEnabled, true)
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

export const homepageFooterGlobalsQuery = `{
  "footer": *[_type == "footer" && _id == "footer"][0]{
    description,
    copyright,
    footerNote,
    navigationLinks[]{label, link},
    showAddress,
    showEmail,
    showPhone,
    showSocialMedia,
    privacyPolicyLink,
    termsLink,
    address,
    email,
    phone,
    whatsapp,
    socialLinks[]{platform, url},
    enableFooterBackground,
    "footerBackgroundImage": footerBackgroundImage${imageProjection},
    "footerOverlayOpacity": coalesce(footerOverlayOpacity, 86),
    "footerBackgroundPosition": coalesce(footerBackgroundPosition, "center"),
    "footerBackgroundSize": coalesce(footerBackgroundSize, "cover")
  },
  "contact": *[_type == "contactInformation" && _id == "contactInformation"][0]{
    companyName,
    displayName,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode,
    country,
    primaryEmail,
    secondaryEmail,
    phone,
    whatsappNumber,
    whatsappDefaultMessage
  },
  "social": *[_type == "socialMedia" && _id == "socialMedia"][0]{
    instagramUrl,
    instagramLabel,
    tiktokUrl,
    tiktokLabel,
    linkedinUrl,
    linkedinLabel,
    youtubeUrl,
    youtubeLabel,
    facebookUrl,
    facebookLabel,
    twitterUrl,
    twitterLabel,
    additionalLinks[]{platform, label, url}
  },
  "identity": *[_type == "siteIdentity" && _id == "siteIdentity"][0]{
    siteName,
    shortName,
    tagline,
    shortDescription,
    "primaryLogo": primaryLogo${imageProjection},
    "favicon": favicon${imageProjection}
  },
  "navigation": *[_type == "navbar" && _id == "navbar"][0]{
    "logo": logo${imageProjection},
    brandMode,
    menuItems[]{label, href},
    ctaLabel,
    ctaHref,
    "ctaEnabled": coalesce(ctaEnabled, true)
  },
  "seoDefaults": *[_type == "seoDefaults" && _id == "seoDefaults"][0]{
    defaultTitle,
    defaultDescription,
    "defaultOpenGraphImage": defaultOpenGraphImage${imageProjection},
    siteName,
    twitterCardType
  }
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

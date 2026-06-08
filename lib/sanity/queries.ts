export type SanityImageValue = {
  _type?: string;
  asset?: {
    _id?: string;
    _ref?: string;
    _type?: string;
    url?: string;
  };
  crop?: unknown;
  hotspot?: unknown;
  url?: string;
  alt?: string;
};

export type SeoFields = {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageValue;
  seoKeywords?: string[];
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
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  consoleTitle?: string;
  consoleHeading?: string;
  metricOneValue?: string;
  metricOneLabel?: string;
  metricTwoValue?: string;
  metricTwoLabel?: string;
  recommendedStack?: string[];
  trustEyebrow?: string;
  trustTitle?: string;
  trustDescription?: string;
  trustItems?: Array<{
    value?: string;
    label?: string;
    description?: string;
  }>;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
};

export type About = SeoFields & {
  heroTitle?: string;
  heroDescription?: string;
  storyTitle?: string;
  storyDescription?: string;
  vision?: string;
  mission?: string[];
  coreValues?: string[];
  statistics?: Array<{
    value?: string;
    label?: string;
  }>;
  image?: SanityImageValue;
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
  title?: string;
  description?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  googleMapsEmbed?: string;
  formTitle?: string;
  formDescription?: string;
  ctaTitle?: string;
  ctaDescription?: string;
};

export type Navbar = {
  logo?: SanityImageValue;
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
  socialLinks?: Array<{
    platform?: string;
    url?: string;
  }>;
  copyright?: string;
};

export const imageProjection = `{
  "url": asset->url,
  "alt": coalesce(alt, asset->altText)
}`;

export const seoProjection = `
  seoTitle,
  seoDescription,
  "seoImage": seoImage${imageProjection},
  seoKeywords
`;

export const homepageQuery = `*[_type == "homepage" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]{
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroPrimaryCtaLabel,
  heroPrimaryCtaHref,
  heroSecondaryCtaLabel,
  heroSecondaryCtaHref,
  consoleTitle,
  consoleHeading,
  metricOneValue,
  metricOneLabel,
  metricTwoValue,
  metricTwoLabel,
  recommendedStack,
  trustEyebrow,
  trustTitle,
  trustDescription,
  trustItems[]{value, label, description},
  ctaEyebrow,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
  ctaButtonHref,
  ${seoProjection}
}`;

export const aboutQuery = `*[_type == "about" && _id == "about"][0]{
  heroTitle,
  heroDescription,
  storyTitle,
  storyDescription,
  vision,
  mission,
  coreValues,
  statistics[]{value, label},
  "image": image${imageProjection},
  ${seoProjection}
}`;

export const packagesQuery = `*[_type == "package" && !(_id in path("drafts.**"))] | order(coalesce(order, 999), _createdAt asc){
  title,
  "slug": slug.current,
  description,
  startingPrice,
  features,
  featured,
  order,
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
  "featuredImage": featuredImage${imageProjection},
  featured,
  order,
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
  "gallery": gallery[]${imageProjection},
  "featuredImage": featuredImage${imageProjection},
  featured,
  order,
  ${seoProjection}
}`;

export const clientLogosQuery = `*[_type == "clientLogo" && !(_id in path("drafts.**"))] | order(featured desc, coalesce(order, 999), _createdAt asc){
  name,
  "logo": logo{
    ...,
    "url": asset->url,
    "alt": coalesce(alt, asset->altText)
  },
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
  "avatar": avatar${imageProjection},
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
  ${seoProjection}
}`;

export const contactQuery = `*[_type == "contact" && _id == "contact"][0]{
  title,
  description,
  phone,
  whatsapp,
  email,
  address,
  googleMapsEmbed,
  formTitle,
  formDescription,
  ctaTitle,
  ctaDescription,
  ${seoProjection}
}`;

export const navbarQuery = `*[_type == "navbar" && _id == "navbar"][0]{
  "logo": logo${imageProjection},
  menuItems[]{label, href},
  ctaLabel,
  ctaHref
}`;

export const footerQuery = `*[_type == "footer" && _id == "footer"][0]{
  description,
  address,
  email,
  phone,
  socialLinks[]{platform, url},
  copyright
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

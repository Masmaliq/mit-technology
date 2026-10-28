import { aboutType } from "./aboutType";
import { caseStudiesPageSettingsType } from "./caseStudiesPageSettingsType";
import { caseStudyType } from "./caseStudyType";
import { clientLogoType } from "./clientLogoType";
import { contactType } from "./contactType";
import { contactInformationType } from "./contactInformationType";
import { footerType } from "./footerType";
import { globalCtaType } from "./globalCtaType";
import { homepageType } from "./homepageType";
import { impactMetricType } from "./impactMetricType";
import { insightType } from "./insightType";
import { innerPageType } from "./innerPageType";
import { navbarType } from "./navbarType";
import { packagesPageSettingsType } from "./packagesPageSettingsType";
import { packageType } from "./packageType";
import { portfolioType } from "./portfolioType";
import { processType } from "./processType";
import { projectType } from "./projectType";
import { siteSettingsType } from "./siteSettingsType";
import { siteIdentityType } from "./siteIdentityType";
import { socialMediaType } from "./socialMediaType";
import { seoDefaultsType } from "./seoDefaultsType";
import { solutionsPageType } from "./solutionsPageType";
import { solutionType } from "./solutionType";
import { testimonialType } from "./testimonialType";
import {
  pageCardBuilderType,
  pageHeroContentType,
  pageHeroMediaType,
  pageMediaBuilderType,
  pageSectionBuilderType,
  pageSeoBuilderType,
} from "./objects/pageBuilders";
import { sharedCtaType, sharedHeroMediaType, sharedSeoType } from "./objects/sharedFields";
import {
  pageCapabilityGroupType,
  pageCtaSectionType,
  pageFaqType,
  pagePresentationItemType,
  pageSectionIntroType,
} from "./objects/pageArchitecture";
import { homepageProjectSelectionType } from "./objects/homepageProjectSelectionType";

export const schema = {
  types: [
    siteSettingsType,
    siteIdentityType,
    contactInformationType,
    socialMediaType,
    globalCtaType,
    seoDefaultsType,
    homepageType,
    aboutType,
    clientLogoType,
    processType,
    projectType,
    insightType,
    impactMetricType,
    innerPageType,
    solutionsPageType,
    solutionType,
    packagesPageSettingsType,
    packageType,
    portfolioType,
    caseStudiesPageSettingsType,
    caseStudyType,
    testimonialType,
    contactType,
    navbarType,
    footerType,
    pageHeroContentType,
    pageHeroMediaType,
    pageSectionBuilderType,
    pageCardBuilderType,
    pageMediaBuilderType,
    pageSeoBuilderType,
    sharedHeroMediaType,
    sharedCtaType,
    sharedSeoType,
    pageSectionIntroType,
    pagePresentationItemType,
    pageCapabilityGroupType,
    pageFaqType,
    pageCtaSectionType,
    homepageProjectSelectionType,
  ],
};

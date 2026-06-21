import { aboutType } from "./aboutType";
import { caseStudiesPageSettingsType } from "./caseStudiesPageSettingsType";
import { caseStudyType } from "./caseStudyType";
import { clientLogoType } from "./clientLogoType";
import { contactType } from "./contactType";
import { footerType } from "./footerType";
import { homepageType } from "./homepageType";
import { impactMetricType } from "./impactMetricType";
import { innerPageType } from "./innerPageType";
import { navbarType } from "./navbarType";
import { packagesPageSettingsType } from "./packagesPageSettingsType";
import { packageType } from "./packageType";
import { portfolioType } from "./portfolioType";
import { processType } from "./processType";
import { siteSettingsType } from "./siteSettingsType";
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

export const schema = {
  types: [
    siteSettingsType,
    homepageType,
    aboutType,
    clientLogoType,
    processType,
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
  ],
};

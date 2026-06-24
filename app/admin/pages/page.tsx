import AdminShell from "@/components/admin/AdminShell";
import PagesControlPanel from "@/components/admin/PagesControlPanel";
import {
  getAbout,
  getCaseStudies,
  getCaseStudiesPageSettings,
  getContact,
  getFooter,
  getHomepage,
  getPackages,
  getPackagesPageSettings,
  getPortfolio,
  getSiteSettings,
  getSolutions,
  getSolutionsPage,
} from "@/lib/sanity/fetch";

export default async function AdminPagesPage() {
  const [
    homepage,
    about,
    solutionsPage,
    solutions,
    packagesPageSettings,
    packages,
    caseStudiesPageSettings,
    caseStudies,
    portfolio,
    contact,
    footer,
    siteSettings,
  ] = await Promise.all([
    getHomepage(),
    getAbout(),
    getSolutionsPage(),
    getSolutions(),
    getPackagesPageSettings(),
    getPackages(),
    getCaseStudiesPageSettings(),
    getCaseStudies(),
    getPortfolio(),
    getContact(),
    getFooter(),
    getSiteSettings(),
  ]);

  return (
    <AdminShell>
      <PagesControlPanel
        pagesData={{
          homepage,
          about,
          solutionsPage,
          solutions,
          packagesPageSettings,
          packages,
          caseStudiesPageSettings,
          caseStudies,
          portfolio,
          contact,
          footer,
          siteSettings,
        }}
      />
    </AdminShell>
  );
}

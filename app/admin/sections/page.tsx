import AdminShell from "@/components/admin/AdminShell";
import SectionsControlPanel from "@/components/admin/SectionsControlPanel";
import {
  getCaseStudies,
  getClientLogos,
  getFooter,
  getHomepage,
  getPackages,
  getProcesses,
  getSiteSettings,
  getSolutions,
  getTestimonials,
} from "@/lib/sanity/fetch";

export default async function AdminSectionsPage() {
  const [homepage, clientLogos, solutions, packages, caseStudies, testimonials, footer, siteSettings, processes] = await Promise.all([
    getHomepage(),
    getClientLogos(),
    getSolutions(),
    getPackages(),
    getCaseStudies(),
    getTestimonials(),
    getFooter(),
    getSiteSettings(),
    getProcesses(),
  ]);

  return (
    <AdminShell>
      <SectionsControlPanel
        sectionsData={{
          homepage,
          clientLogos,
          solutions,
          packages,
          caseStudies,
          testimonials,
          footer,
          siteSettings,
          processes,
        }}
      />
    </AdminShell>
  );
}

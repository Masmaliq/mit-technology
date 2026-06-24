import AdminShell from "@/components/admin/AdminShell";
import CaseStudiesControlPanel from "@/components/admin/CaseStudiesControlPanel";
import { getCaseStudies } from "@/lib/sanity/fetch";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <AdminShell>
      <CaseStudiesControlPanel caseStudies={caseStudies} />
    </AdminShell>
  );
}

import AdminShell from "@/components/admin/AdminShell";
import FooterControlPanel from "@/components/admin/FooterControlPanel";
import { getFooter, getSiteSettings } from "@/lib/sanity/fetch";

export default async function AdminFooterPage() {
  const [footer, siteSettings] = await Promise.all([getFooter(), getSiteSettings()]);

  return (
    <AdminShell>
      <FooterControlPanel footer={footer} siteSettings={siteSettings} />
    </AdminShell>
  );
}

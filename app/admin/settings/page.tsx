import AdminShell from "@/components/admin/AdminShell";
import SettingsControlPanel from "@/components/admin/SettingsControlPanel";
import { getContact, getFooter, getNavbar, getSiteSettings } from "@/lib/sanity/fetch";

export default async function AdminSettingsPage() {
  const [siteSettings, navbar, contact, footer] = await Promise.all([
    getSiteSettings(),
    getNavbar(),
    getContact(),
    getFooter(),
  ]);

  return (
    <AdminShell>
      <SettingsControlPanel contact={contact} footer={footer} navbar={navbar} siteSettings={siteSettings} />
    </AdminShell>
  );
}

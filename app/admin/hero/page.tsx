import AdminShell from "@/components/admin/AdminShell";
import HeroControlPanel from "@/components/admin/HeroControlPanel";
import { getHomepage } from "@/lib/sanity/fetch";

export default async function AdminHeroPage() {
  const homepage = await getHomepage();

  return (
    <AdminShell>
      <HeroControlPanel homepage={homepage} />
    </AdminShell>
  );
}

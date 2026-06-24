import AdminShell from "@/components/admin/AdminShell";
import PackagesControlPanel from "@/components/admin/PackagesControlPanel";
import { getPackages } from "@/lib/sanity/fetch";

export default async function AdminPackagesPage() {
  const packages = await getPackages();

  return (
    <AdminShell>
      <PackagesControlPanel packages={packages} />
    </AdminShell>
  );
}

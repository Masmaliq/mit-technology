import AdminShell from "@/components/admin/AdminShell";
import PackagesControlPanel from "@/components/admin/PackagesControlPanel";

export default function AdminPackagesPage() {
  return (
    <AdminShell>
      <PackagesControlPanel />
    </AdminShell>
  );
}

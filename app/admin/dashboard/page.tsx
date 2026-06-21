import DashboardShell from "@/components/admin/dashboard/DashboardShell";
import DashboardHome from "@/components/admin/dashboard/DashboardHome";

export default function AdminDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHome />
    </DashboardShell>
  );
}

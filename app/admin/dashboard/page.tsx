import AdminShell from "@/components/admin/AdminShell";
import DashboardHero from "@/components/admin/DashboardHero";
import PackagePlanControl from "@/components/admin/PackagePlanControl";
import PackageSummary from "@/components/admin/PackageSummary";
import PreviewAccess from "@/components/admin/PreviewAccess";
import ProductParallaxStatus from "@/components/admin/ProductParallaxStatus";
import QuickActions from "@/components/admin/QuickActions";
import StatCards from "@/components/admin/StatCards";
import VisualStatus from "@/components/admin/VisualStatus";
import WebsiteHealth from "@/components/admin/WebsiteHealth";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <DashboardHero />
        <StatCards />

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          <VisualStatus />
          <PackageSummary />
        </div>

        <PackagePlanControl />
        <ProductParallaxStatus />

        <div className="grid gap-6 lg:grid-cols-3">
          <QuickActions />
          <WebsiteHealth />
          <PreviewAccess />
        </div>
      </div>
    </AdminShell>
  );
}

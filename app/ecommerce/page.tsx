import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { PackageDetail } from "@/components/sections/PackageDetail";
import { getPackageCategoryByHref } from "@/data/packages";

export default function EcommercePage() {
  return (
    <>
      <SiteHeader />
      <PackageDetail category={getPackageCategoryByHref("/ecommerce")} />
      <Footer />
    </>
  );
}

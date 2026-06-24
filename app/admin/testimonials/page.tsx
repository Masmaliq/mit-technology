import AdminShell from "@/components/admin/AdminShell";
import TestimonialsControlPanel from "@/components/admin/TestimonialsControlPanel";
import { getTestimonials } from "@/lib/sanity/fetch";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <AdminShell>
      <TestimonialsControlPanel testimonials={testimonials} />
    </AdminShell>
  );
}

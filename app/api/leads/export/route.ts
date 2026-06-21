import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("mit_admin");

  if (adminCookie?.value !== "true") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: leads } = await supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = [
    ["Nama", "Email", "WhatsApp", "Perusahaan", "Status", "Nilai Project", "Pesan", "Catatan Internal", "Tanggal"],
    ...(leads || []).map((lead) => [
      lead.name || "",
      lead.email || "",
      lead.phone || "",
      lead.company || "",
      lead.status || "",
      lead.project_value || "",
      lead.message || "",
      lead.internal_notes || "",
      lead.created_at || "",
    ]),
  ];

  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=mit-contact-leads.csv",
    },
  });
}

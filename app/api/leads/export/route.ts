import { supabase } from "@/lib/supabase";

export async function GET() {
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
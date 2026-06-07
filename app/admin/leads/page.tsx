import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function updateLead(formData: FormData) {
  "use server";

  const id = formData.get("id");
  const status = formData.get("status");
  const projectValue = Number(formData.get("project_value") || 0);
  const internalNotes = formData.get("internal_notes");

  await supabase
    .from("contact_leads")
    .update({
      status,
      project_value: projectValue,
      internal_notes: internalNotes,
    })
    .eq("id", id);

  revalidatePath("/admin/leads");
}

async function logout() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("mit_admin");

  redirect("/admin/login");
}

function formatDate(date?: string) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRupiah(value?: number | null) {
  if (!value) return "Rp0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function whatsappLink(phone?: string | null) {
  if (!phone) return "#";

  const cleaned = phone.replace(/\D/g, "");
  const normalized = cleaned.startsWith("0")
    ? `62${cleaned.slice(1)}`
    : cleaned;

  return `https://wa.me/${normalized}`;
}

export default async function AdminLeadsPage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("mit_admin");

  if (!adminCookie) {
    redirect("/admin/login");
  }

  const { data: leads, error } = await supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false });

  const safeLeads = leads || [];

  const totalLeads = safeLeads.length;
  const contacted = safeLeads.filter(
    (lead) => lead.status === "CONTACTED"
  ).length;
  const proposal = safeLeads.filter((lead) => lead.status === "PROPOSAL").length;
  const deal = safeLeads.filter((lead) => lead.status === "DEAL").length;
  const lost = safeLeads.filter((lead) => lead.status === "LOST").length;

  const pipelineValue = safeLeads.reduce(
    (total, lead) => total + Number(lead.project_value || 0),
    0
  );

  const revenueTotal = safeLeads
    .filter((lead) => lead.status === "DEAL")
    .reduce((total, lead) => total + Number(lead.project_value || 0), 0);

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">
          Gagal mengambil data leads: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              MIT Admin
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              Contact Leads
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Mini CRM untuk status lead, nilai project, catatan internal,
              revenue pipeline, dan revenue deal.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/api/leads/export"
              className="w-fit rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Export Excel
            </a>

            <form action={logout}>
              <button
                type="submit"
                className="w-fit rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {[
            ["Total Leads", totalLeads],
            ["Contacted", contacted],
            ["Proposal", proposal],
            ["Deal", deal],
            ["Lost", lost],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-4xl font-semibold">{value}</p>
            </div>
          ))}

          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-sm text-slate-300">Pipeline Value</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatRupiah(pipelineValue)}
            </p>
          </div>

          <div className="rounded-3xl border border-green-200 bg-green-600 p-6 text-white shadow-sm">
            <p className="text-sm text-green-100">Revenue Total</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatRupiah(revenueTotal)}
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          {safeLeads.length > 0 ? (
            safeLeads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {lead.name || "Tanpa Nama"}
                      </h2>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {lead.status || "NEW"}
                      </span>
                    </div>

                    <p className="mt-2 text-slate-500">
                      {lead.company || "Tanpa Perusahaan"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={whatsappLink(lead.phone)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white"
                    >
                      WhatsApp
                    </a>

                    <a
                      href={`mailto:${lead.email || ""}`}
                      className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
                    >
                      Email
                    </a>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <Info label="Email" value={lead.email || "-"} />
                  <Info label="WhatsApp" value={lead.phone || "-"} />
                  <Info label="Masuk" value={formatDate(lead.created_at)} />
                  <Info
                    label="Nilai Project"
                    value={formatRupiah(lead.project_value)}
                  />
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="h-fit rounded-2xl bg-slate-950 p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Pesan Klien
                    </p>

                    <p className="mt-3 leading-8 text-slate-100">
                      {lead.message || "-"}
                    </p>
                  </div>

                  <form
                    action={updateLead}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <input type="hidden" name="id" value={lead.id} />

                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Status Lead
                    </label>

                    <select
                      name="status"
                      defaultValue={lead.status || "NEW"}
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="PROPOSAL">PROPOSAL</option>
                      <option value="DEAL">DEAL</option>
                      <option value="LOST">LOST</option>
                    </select>

                    <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Nilai Project
                    </label>

                    <input
                      name="project_value"
                      type="number"
                      defaultValue={lead.project_value || 0}
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                    />

                    <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Catatan Internal
                    </label>

                    <textarea
                      name="internal_notes"
                      rows={4}
                      defaultValue={lead.internal_notes || ""}
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                      placeholder="Contoh: Follow up Senin, budget 25 juta, butuh company profile."
                    />

                    <button
                      type="submit"
                      className="mt-5 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white"
                    >
                      Simpan Update
                    </button>
                  </form>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
              <h2 className="text-2xl font-semibold">Belum ada leads.</h2>
              <p className="mt-3 text-slate-500">
                Data akan muncul setelah pengunjung mengisi form contact.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 break-words text-slate-700">{value}</p>
    </div>
  );
}
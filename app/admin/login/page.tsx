import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_PASSWORD = "MaliqMIT2026";

async function login(formData: FormData) {
  "use server";

  const password = String(formData.get("password") || "");

  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();

    cookieStore.set("mit_admin", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    redirect("/admin/leads");
  }

  redirect("/admin/login?error=1");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-950">
      <form
        action={login}
        className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          MIT Admin
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Login Dashboard
        </h1>

        <p className="mt-4 text-slate-500">
          Masukkan password admin untuk membuka CRM leads.
        </p>

        <input
          name="password"
          type="password"
          required
          placeholder="Password admin"
          className="mt-8 w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-slate-950"
        />

        {params.error && (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            Password salah.
          </p>
        )}

        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white"
        >
          Masuk Admin
        </button>
      </form>
    </main>
  );
}
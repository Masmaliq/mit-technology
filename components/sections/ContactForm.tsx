"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type ContactFormProps = {
  formTitle?: string;
  formDescription?: string;
};

export function ContactForm({ formTitle, formDescription }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      company: String(formData.get("company") || ""),
      message: String(formData.get("message") || ""),
    };

    const { error } = await supabase.from("contact_leads").insert([payload]);

    setLoading(false);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      setErrorMessage(error.message || "Pesan gagal dikirim.");
      return;
    }

    form.reset();
    setSuccess(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-5">
      {formTitle || formDescription ? (
        <div>
          {formTitle ? <h2 className="text-2xl font-semibold text-slate-950">{formTitle}</h2> : null}
          {formDescription ? (
            <p className="mt-3 leading-7 text-slate-600">{formDescription}</p>
          ) : null}
        </div>
      ) : null}

      <input
        name="name"
        required
        placeholder="Nama lengkap"
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-slate-900"
      />

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-slate-900"
      />

      <input
        name="phone"
        placeholder="Nomor WhatsApp"
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-slate-900"
      />

      <input
        name="company"
        placeholder="Nama perusahaan"
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-slate-900"
      />

      <textarea
        name="message"
        required
        rows={6}
        placeholder="Ceritakan kebutuhan project Anda"
        className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-slate-900"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </button>

      {success && (
        <p className="text-sm font-medium text-green-600">
          Pesan berhasil dikirim. Data sudah masuk ke Supabase.
        </p>
      )}

      {errorMessage && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          Error Supabase: {errorMessage}
        </p>
      )}
    </form>
  );
}

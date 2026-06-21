const packageLevels = [
  {
    name: "Starter",
    price: "Rp 5.000.000",
    description:
      "Basic company profile untuk website sederhana dengan struktur halaman utama, CMS dasar, dan optimasi awal.",
    features: [
      "Homepage",
      "About Page",
      "Services Page",
      "Contact Section",
      "Basic CMS",
      "Mobile Responsive",
      "Basic SEO",
      "WhatsApp CTA",
    ],
    status:
      "Cocok untuk project cepat, company profile sederhana, dan klien yang hanya membutuhkan website informatif tanpa motion kompleks.",
    active: false,
  },
  {
    name: "Growth",
    price: "Rp 10.000.000",
    description:
      "Paket pengembangan menengah untuk website bisnis yang membutuhkan konten lebih lengkap, struktur CMS lebih rapi, dan elemen kepercayaan.",
    features: [
      "Semua fitur Starter",
      "Packages CMS",
      "Case Studies",
      "Testimonials",
      "Blog / Insight",
      "Advanced SEO",
      "Basic Motion Effects",
      "Section Management",
      "Footer CMS",
    ],
    status:
      "Cocok untuk bisnis yang membutuhkan kredibilitas lebih kuat, bukti pekerjaan, testimoni, dan halaman yang lebih lengkap.",
    active: false,
  },
  {
    name: "Premium",
    price: "Rp 15.000.000+",
    description:
      "Paket visual premium untuk website dengan pengalaman cinematic, pengaturan visual lanjutan, dan struktur CMS lebih fleksibel.",
    features: [
      "Semua fitur Growth",
      "Product Parallax",
      "Cinematic Background",
      "Background Image / Video",
      "Start & End Section Control",
      "Motion Preset",
      "Mobile Fallback",
      "Advanced Visual Settings",
      "Priority Support",
      "Custom Layout Direction",
    ],
    status:
      "Cocok untuk brand yang membutuhkan tampilan mewah, visual produk kuat, motion cinematic, dan fleksibilitas desain lebih tinggi.",
    active: true,
  },
];

const baseFeatures = [
  "Mobile Responsive",
  "CMS Ready",
  "Contact Form",
  "WhatsApp CTA",
  "Basic SEO",
  "SSL Ready",
  "Speed Optimization",
  "Basic Page Structure",
];

const premiumFeatures = [
  "Packages CMS",
  "Case Studies",
  "Testimonials",
  "Blog / Insight",
  "Advanced SEO",
  "Motion Effects",
  "Product Parallax",
  "Cinematic Background",
  "Background Scene Image / Video",
  "Start & End Section Control",
  "Mobile Fallback",
  "Custom Visual Direction",
];

export default function PackagePlanStatus() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Package / Plan Control</h3>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600">
              Kelola struktur paket internal MIT Framework berdasarkan level fitur, kompleksitas visual, dan kebutuhan pengembangan website.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700">
              3 Paket Internal
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
              Active: Premium
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packageLevels.map((item) => (
            <div
              key={item.name}
              className={`rounded-lg border p-4 ${
                item.active
                  ? "border-blue-200 bg-blue-50/45 shadow-[0_16px_48px_rgba(37,99,235,0.08)]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                  <div className="mt-1 whitespace-nowrap text-xl font-bold text-slate-950">{item.price}</div>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    Internal Package
                  </span>
                  {item.active ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Current Active
                    </span>
                  ) : null}
                  {item.name === "Premium" ? (
                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
                      Premium Visual
                    </span>
                  ) : null}
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-600">{item.description}</p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                {item.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className={item.active ? "text-blue-600" : "text-emerald-600"}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-800">
                <span className="font-semibold">Status Internal:</span> {item.status}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Base Features</div>
            <p className="mb-3 text-xs leading-5 text-slate-500">
              Fitur dasar yang menjadi standar MIT Framework dan tersedia sejak paket Starter.
            </p>
            <ul className="grid gap-2 text-sm sm:grid-cols-2">
              {baseFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-slate-700">
                  <span className="text-emerald-600">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple-700">Advanced / Premium Features</div>
            <p className="mb-3 text-xs leading-5 text-slate-600">
              Fitur lanjutan untuk paket Growth, Premium, atau custom project.
            </p>
            <ul className="grid gap-1.5 text-sm text-slate-700 sm:grid-cols-2">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-purple-600">✦</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

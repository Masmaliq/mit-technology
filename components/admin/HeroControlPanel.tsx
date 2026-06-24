import AdminActionLink from "@/components/admin/AdminActionLink";
import { heroControlPanel } from "@/lib/admin-dashboard-data";
import type { Homepage, SanityFileValue, SanityImageValue } from "@/lib/sanity/queries";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
          <span className="text-sm text-slate-500">{label}</span>
          <span className="text-sm font-bold text-slate-900">{value}</span>
        </div>
      ))}
    </div>
  );
}

function hasImage(image?: SanityImageValue) {
  return Boolean(image?.url || image?.asset?.url || image?.asset?._ref);
}

function hasFile(file?: SanityFileValue) {
  return Boolean(file?.url || file?.asset?.url || file?.asset?._ref);
}

function fileLabel(file?: SanityFileValue) {
  if (!hasFile(file)) {
    return null;
  }

  return file?.asset?.originalFilename || file?.asset?.url || file?.url || "Uploaded";
}

function uploadedStatus(active: boolean) {
  return active ? "Uploaded" : "Missing";
}

function formatBackgroundType(type?: Homepage["backgroundType"]) {
  if (!type) {
    return null;
  }

  return type.charAt(0).toUpperCase() + type.slice(1);
}

function buildHeroAdminData(homepage?: Homepage) {
  const hasCmsContent = Boolean(
    homepage?.heroTitle ||
      homepage?.heroDescription ||
      homepage?.heroPrimaryCtaLabel ||
      homepage?.heroSecondaryCtaLabel
  );
  const hasBackgroundAsset = Boolean(
    hasImage(homepage?.heroBackgroundImage) ||
      hasFile(homepage?.heroBackgroundVideoMp4) ||
      (homepage?.heroSliderImages?.length ?? 0) > 0
  );
  const hasHeroMedia = Boolean(
    hasImage(homepage?.heroMainImage) ||
      hasImage(homepage?.heroImage) ||
      hasFile(homepage?.heroGif) ||
      hasFile(homepage?.heroVideoMp4)
  );
  const hasMotion = Boolean(
    homepage?.enableCinematicFlow ||
      (homepage?.heroMotionType && homepage.heroMotionType !== "none") ||
      hasFile(homepage?.heroMotionGif) ||
      hasFile(homepage?.heroMotionVideoMp4)
  );
  const hasHomepageData = Boolean(hasCmsContent || hasBackgroundAsset || hasHeroMedia || hasMotion);

  if (!hasHomepageData) {
    return heroControlPanel;
  }

  const backgroundFile =
    fileLabel(homepage?.heroBackgroundVideoMp4) ??
    (hasImage(homepage?.heroBackgroundImage) ? "Image Uploaded" : null) ??
    ((homepage?.heroSliderImages?.length ?? 0) > 0 ? `${homepage?.heroSliderImages?.length} Slides` : null);
  const motionAsset =
    fileLabel(homepage?.heroMotionVideoMp4) ??
    fileLabel(homepage?.heroMotionGif) ??
    (homepage?.heroMotionType === "none" ? "None" : null);

  return {
    ...heroControlPanel,
    summary: [
      { label: "Hero Content", value: hasCmsContent ? "Ready" : "Missing", tone: hasCmsContent ? "emerald" : "amber" },
      { label: "Background Asset", value: hasBackgroundAsset ? "Uploaded" : "Missing", tone: hasBackgroundAsset ? "blue" : "amber" },
      { label: "Hero Media", value: hasHeroMedia ? "Active" : "Missing", tone: hasHeroMedia ? "violet" : "amber" },
      { label: "Motion", value: hasMotion ? "Enabled" : "Disabled", tone: hasMotion ? "emerald" : "amber" },
    ],
    contentPreview: {
      title: homepage?.heroTitle || heroControlPanel.contentPreview.title,
      description: homepage?.heroDescription || heroControlPanel.contentPreview.description,
      primaryCta: homepage?.heroPrimaryCtaLabel || heroControlPanel.contentPreview.primaryCta,
      secondaryCta: homepage?.heroSecondaryCtaLabel || heroControlPanel.contentPreview.secondaryCta,
      targetPage: "Homepage",
    },
    visualAssets: [
      ["Background Type", formatBackgroundType(homepage?.backgroundType) || heroControlPanel.visualAssets[0][1]],
      ["Background File", backgroundFile || heroControlPanel.visualAssets[1][1]],
      [
        "Poster Image",
        uploadedStatus(
          hasImage(homepage?.backgroundPosterImage) ||
            hasImage(homepage?.heroPosterImage) ||
            hasImage(homepage?.cinematicPosterImage)
        ),
      ],
      ["Mobile Fallback", uploadedStatus(hasImage(homepage?.cinematicMobileFallbackImage))],
      ["Hero Object", hasHeroMedia ? "Uploaded" : heroControlPanel.visualAssets[4][1]],
    ],
    motionSettings: [
      ["Hero Motion Type", homepage?.heroMotionType || "none"],
      ["Motion Asset", motionAsset || "None"],
      ["Motion Poster", uploadedStatus(hasImage(homepage?.heroMotionPosterImage))],
      ["Motion Opacity", `${homepage?.heroMotionOpacity ?? heroControlPanel.motionSettings[3][1]}`],
      ["Cinematic Flow", homepage?.enableCinematicFlow ? "Enabled" : "Disabled"],
    ],
  };
}

export default function HeroControlPanel({ homepage }: { homepage?: Homepage }) {
  const heroAdminData = buildHeroAdminData(homepage);

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-white via-blue-50/60 to-violet-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700">
              {heroAdminData.header.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {heroAdminData.header.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {heroAdminData.header.description}
            </p>
          </div>

          <AdminActionLink
            action="Hero Studio"
            className="w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {heroAdminData.header.action}
          </AdminActionLink>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {heroAdminData.summary.map((item) => (
          <article
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_54px_rgba(15,23,42,0.05)]"
            key={item.label}
          >
            <div className="text-sm font-bold text-slate-950">{item.label}</div>
            <div className={`mt-5 inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${summaryTone[item.tone]}`}>
              {item.value}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Hero Content Preview</h2>
              <p className="mt-1 text-sm text-slate-500">Snapshot konten utama hero yang tampil di halaman.</p>
            </div>
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              Target Page: {heroAdminData.contentPreview.targetPage}
            </span>
          </div>

          <div className="mt-7 rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-950 to-blue-950 p-6 text-white">
            <h3 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
              {heroAdminData.contentPreview.title}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72">
              {heroAdminData.contentPreview.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-950">
                {heroAdminData.contentPreview.primaryCta}
              </span>
              <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white">
                {heroAdminData.contentPreview.secondaryCta}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Visual Asset Status</h2>
          <p className="mt-1 text-sm text-slate-500">Status media utama dan fallback visual hero.</p>
          <div className="mt-6">
            <DetailList items={heroAdminData.visualAssets} />
          </div>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Motion Settings</h2>
          <p className="mt-1 text-sm text-slate-500">Status efek visual hero yang aktif di framework.</p>
          <div className="mt-6">
            <DetailList items={heroAdminData.motionSettings} />
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-500">Akses cepat untuk workflow hero.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {heroAdminData.quickActions.map((action, index) => (
              <AdminActionLink
                action={action}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                  index === 0
                    ? "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
                key={action}
              >
                {action}
              </AdminActionLink>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

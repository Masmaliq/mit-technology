import AdminActionLink from "@/components/admin/AdminActionLink";
import { heroControlPanel } from "@/lib/admin-dashboard-data";
import type { Homepage, SanityFileValue, SanityImageValue } from "@/lib/sanity/queries";

const summaryTone: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  violet: "border-violet-100 bg-violet-50 text-violet-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
};

const valueTone = {
  ready: "text-emerald-700",
  review: "text-amber-700",
  neutral: "text-slate-900",
};

function getValueTone(value: string) {
  if (["Siap", "Aktif", "Terunggah", "Framework Ready"].includes(value)) {
    return valueTone.ready;
  }

  if (["Review", "Belum tersedia"].includes(value)) {
    return valueTone.review;
  }

  return valueTone.neutral;
}

function DetailList({ items }: { items: string[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, value]) => (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3" key={label}>
          <span className="text-sm text-slate-500">{label}</span>
          <span className={`max-w-[58%] break-words text-right text-sm font-bold ${getValueTone(value)}`}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function StatusCard({
  title,
  description,
  items,
  accent = "white",
}: {
  title: string;
  description: string;
  items: string[][];
  accent?: "white" | "blue" | "violet";
}) {
  const accentClass = {
    white: "border-slate-200/80 bg-white",
    blue: "border-blue-100 bg-blue-50/55",
    violet: "border-violet-100 bg-violet-50/55",
  }[accent];

  return (
    <article className={`rounded-[2rem] border p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] sm:p-7 ${accentClass}`}>
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      <div className="mt-6">
        <DetailList items={items} />
      </div>
    </article>
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
  return active ? "Terunggah" : "Belum tersedia";
}

function readyStatus(active: boolean) {
  return active ? "Siap" : "Review";
}

function optionalStatus(active: boolean) {
  return active ? "Siap" : "Opsional";
}

function formatBackgroundType(type?: Homepage["backgroundType"]) {
  if (!type) {
    return null;
  }

  return type.charAt(0).toUpperCase() + type.slice(1);
}

function buildHeroAdminData(homepage?: Homepage) {
  const hasHeroCopy = Boolean(homepage?.heroTitle || homepage?.heroDescription);
  const hasHeroCta = Boolean(homepage?.heroPrimaryCtaLabel || homepage?.heroSecondaryCtaLabel);
  const hasBackgroundImage = hasImage(homepage?.heroBackgroundImage);
  const hasBackgroundVideo = hasFile(homepage?.heroBackgroundVideoMp4) || hasFile(homepage?.backgroundVideoMp4);
  const hasCinematicVideo = hasFile(homepage?.cinematicVideoMp4);
  const hasPoster = Boolean(
    hasImage(homepage?.backgroundPosterImage) ||
      hasImage(homepage?.heroPosterImage) ||
      hasImage(homepage?.cinematicPosterImage)
  );
  const hasMobileFallback = hasImage(homepage?.cinematicMobileFallbackImage);
  const hasPrimaryVisual = Boolean(
    hasBackgroundImage ||
      hasBackgroundVideo ||
      hasCinematicVideo ||
      hasPoster ||
      hasMobileFallback ||
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
  const primaryCtaTarget = homepage?.heroPrimaryCtaUrl || homepage?.heroPrimaryCtaHref;
  const secondaryCtaTarget = homepage?.heroSecondaryCtaUrl || homepage?.heroSecondaryCtaHref;
  const hasHomepageData = Boolean(hasHeroCopy || hasHeroCta || hasPrimaryVisual || hasHeroMedia || hasMotion);

  if (!hasHomepageData) {
    return {
      ...heroControlPanel,
      contentStatus: [
        ["Eyebrow", "Opsional"],
        ["Headline", "Opsional"],
        ["Description", "Opsional"],
        ["Mode Konten", "Cinematic-first"],
      ],
      backgroundStatus: [
        ["Background Type", "Belum tersedia"],
        ["Background Image", "Review"],
        ["Background Video", "Review"],
        ["Cinematic Video", "Review"],
        ["Poster / Fallback", "Opsional"],
        ["Mobile Fallback", "Opsional"],
      ],
      mediaStatus: [
        ["Hero Media Type", "Opsional"],
        ["Hero Object", "Opsional"],
        ["Hero GIF", "Opsional"],
        ["Hero Video MP4", "Opsional"],
        ["Hero Poster", "Opsional"],
      ],
      ctaStatus: [
        ["Primary CTA", "Opsional"],
        ["Primary URL", "Opsional"],
        ["Secondary CTA", "Opsional"],
        ["Secondary URL", "Opsional"],
      ],
      motionLayerStatus: [
        ["Motion Stars", "Opsional"],
        ["Motion Airplane", "Opsional"],
        ["Stupa / Parallax", "Opsional"],
        ["Cinematic Layer", "Opsional"],
      ],
    };
  }

  const backgroundFile =
    fileLabel(homepage?.heroBackgroundVideoMp4) ??
    fileLabel(homepage?.backgroundVideoMp4) ??
    (hasImage(homepage?.heroBackgroundImage) ? "Image Uploaded" : null) ??
    ((homepage?.heroSliderImages?.length ?? 0) > 0 ? `${homepage?.heroSliderImages?.length} Slides` : null);
  const cinematicFile = fileLabel(homepage?.cinematicVideoMp4);
  const motionAsset =
    fileLabel(homepage?.heroMotionVideoMp4) ??
    fileLabel(homepage?.heroMotionGif) ??
    (homepage?.heroMotionType === "none" ? "None" : null);

  return {
    ...heroControlPanel,
    summary: [
      { label: "Hero Overall", value: readyStatus(hasPrimaryVisual), tone: hasPrimaryVisual ? "emerald" : "amber" },
      { label: "Hero Copy", value: hasHeroCopy ? "Siap" : "Opsional", tone: hasHeroCopy ? "emerald" : "blue" },
      { label: "Background Video", value: readyStatus(hasBackgroundVideo), tone: hasBackgroundVideo ? "blue" : "amber" },
      { label: "Cinematic Video", value: readyStatus(hasCinematicVideo), tone: hasCinematicVideo ? "violet" : "amber" },
    ],
    contentPreview: {
      title: homepage?.heroTitle || "Hero cinematic tanpa headline",
      description: homepage?.heroDescription || "Copy hero bersifat opsional karena halaman memakai konsep video-first.",
      primaryCta: homepage?.heroPrimaryCtaLabel || "Opsional",
      secondaryCta: homepage?.heroSecondaryCtaLabel || "Opsional",
      targetPage: "Homepage",
    },
    contentStatus: [
      ["Eyebrow", homepage?.heroEyebrow || homepage?.heroSubtitle ? "Siap" : "Opsional"],
      ["Headline", homepage?.heroTitle ? "Siap" : "Opsional"],
      ["Description", homepage?.heroDescription ? "Siap" : "Opsional"],
      ["Mode Konten", hasHeroCopy ? "Copy-first" : "Cinematic-first"],
    ],
    backgroundStatus: [
      ["Background Type", formatBackgroundType(homepage?.backgroundType) || heroControlPanel.visualAssets[0][1]],
      ["Background Image", hasBackgroundImage ? "Siap" : optionalStatus(hasBackgroundVideo || hasCinematicVideo)],
      ["Background Video", backgroundFile || "Review"],
      ["Cinematic Video", cinematicFile || "Review"],
      ["Poster / Fallback", hasPoster ? "Siap" : optionalStatus(hasBackgroundVideo || hasCinematicVideo)],
      ["Mobile Fallback", hasMobileFallback ? "Siap" : optionalStatus(hasBackgroundVideo || hasCinematicVideo)],
    ],
    mediaStatus: [
      ["Hero Media Type", homepage?.heroMediaType || "Opsional"],
      ["Hero Object", hasHeroMedia ? "Terunggah" : "Opsional"],
      ["Hero GIF", hasFile(homepage?.heroGif) ? "Terunggah" : "Opsional"],
      ["Hero Video MP4", hasFile(homepage?.heroVideoMp4) ? "Terunggah" : "Opsional"],
      ["Hero Poster", hasImage(homepage?.heroPosterImage) ? "Siap" : "Opsional"],
    ],
    ctaStatus: [
      ["Primary CTA", homepage?.heroPrimaryCtaLabel || "Opsional"],
      ["Primary URL", primaryCtaTarget || "Opsional"],
      ["Secondary CTA", homepage?.heroSecondaryCtaLabel || "Opsional"],
      ["Secondary URL", secondaryCtaTarget || "Opsional"],
    ],
    motionSettings: [
      ["Hero Motion Type", homepage?.heroMotionType || "none"],
      ["Motion Asset", motionAsset || "Tidak aktif"],
      ["Motion Poster", uploadedStatus(hasImage(homepage?.heroMotionPosterImage))],
      ["Motion Opacity", `${homepage?.heroMotionOpacity ?? heroControlPanel.motionSettings[3][1]}`],
      ["Cinematic Flow", homepage?.enableCinematicFlow ? "Aktif" : "Nonaktif"],
    ],
    motionLayerStatus: [
      ["Motion Stars", homepage?.enableCinematicFlow || hasMotion ? "Framework Ready" : "Opsional"],
      ["Motion Airplane", homepage?.enableCinematicFlow || hasMotion ? "Framework Ready" : "Opsional"],
      ["Stupa / Parallax", hasHeroMedia || hasMotion ? "Framework Ready" : "Opsional"],
      ["Cinematic Layer", homepage?.enableCinematicFlow ? "Aktif" : "Opsional"],
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
              <h2 className="text-xl font-bold text-slate-950">Hero Preview</h2>
              <p className="mt-1 text-sm text-slate-500">Preview ringkas dari konten dan CTA yang terbaca dari Homepage Settings.</p>
            </div>
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              Target: {heroAdminData.contentPreview.targetPage}
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

        <StatusCard
          accent="blue"
          description="Kesiapan background image, video, poster, dan mobile fallback."
          items={heroAdminData.backgroundStatus ?? heroAdminData.visualAssets}
          title="Hero Background"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <StatusCard
          description="Status headline, description, dan mode konten hero."
          items={heroAdminData.contentStatus ?? heroControlPanel.summary.map((item) => [item.label, item.value])}
          title="Hero Content"
        />
        <StatusCard
          description="Status media objek hero, poster, GIF, dan video pendukung."
          items={heroAdminData.mediaStatus ?? heroControlPanel.visualAssets}
          title="Hero Media"
        />
        <StatusCard
          accent="violet"
          description="Status CTA utama dan sekunder yang menjadi jalur konversi hero."
          items={heroAdminData.ctaStatus ?? [["Primary CTA", heroControlPanel.contentPreview.primaryCta], ["Secondary CTA", heroControlPanel.contentPreview.secondaryCta]]}
          title="Hero CTA"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <StatusCard
          description="Status motion layer yang membangun rasa cinematic pada area hero."
          items={heroAdminData.motionLayerStatus ?? heroControlPanel.motionSettings}
          title="Hero Motion"
        />

        <article className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
          <p className="mt-1 text-sm text-slate-500">Akses cepat untuk mengelola konten, visual, dan preview hero.</p>
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

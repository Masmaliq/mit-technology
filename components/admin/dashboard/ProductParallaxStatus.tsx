type ProductParallaxStatusProps = {
  parallaxOn: boolean;
  onToggleParallax: () => void;
  onPreviewParallax: () => void;
  onQuickAction: (action: string) => void;
};

const mainStatus = [
  ["Product Asset", "✓ Uploaded", "text-emerald-600"],
  ["Background Scene", "lab-chemical.mp4", "text-slate-600"],
  ["Poster Image", "✓ Uploaded", "text-emerald-600"],
  ["Mobile Fallback", "Missing", "text-amber-600"],
];

const motionStatus = [
  ["Motion Style", "Product Anchor"],
  ["Motion Intensity", "Medium"],
  ["Product Position", "Center Right"],
  ["Product Scale", "Large"],
  ["Product Asset", "botol-sabun.png"],
];

const parallaxActions = [
  { label: "📁 Edit Product Asset", action: "Edit Product Asset" },
  { label: "🎬 Edit Background Scene", action: "Edit Background Scene" },
  { label: "◈ Edit Motion Style", action: "Edit Motion Style" },
  { label: "↕ Edit Start/End Section", action: "Edit Start/End Section" },
  { label: "▶ Preview Parallax", action: "Preview Parallax", primary: true },
  { label: "⏸ Disable Parallax", action: "Disable Parallax", danger: true },
];

export default function ProductParallaxStatus({
  parallaxOn,
  onToggleParallax,
  onPreviewParallax,
  onQuickAction,
}: ProductParallaxStatusProps) {
  const statusRows = [
    ["Product Parallax", parallaxOn ? "ON" : "OFF", parallaxOn ? "text-emerald-600" : "text-slate-600"],
    ...mainStatus,
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900">Product Parallax Status</h3>
          <div className="flex flex-shrink-0 items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              {parallaxOn ? "● Parallax ON" : "● Parallax OFF"}
            </span>
            <button
              onClick={onPreviewParallax}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium transition hover:bg-slate-50"
            >
              Preview
            </button>
            <button
              onClick={onToggleParallax}
              className={`rounded-lg px-3 py-2 text-xs font-medium text-white transition ${
                parallaxOn ? "bg-red-600 hover:bg-red-700" : "bg-slate-400 hover:bg-slate-500"
              }`}
            >
              {parallaxOn ? "Disable" : "Enable"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b border-slate-100 p-6 md:border-b-0 md:border-r">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status Utama</div>
          <div className="space-y-3">
            {statusRows.map(([key, value, color]) => (
              <div key={key} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                <span className="text-sm text-slate-600">{key}</span>
                <span className={`text-sm font-semibold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Motion Status</div>
          <div className="grid grid-cols-2 gap-3">
            {motionStatus.map(([key, value]) => (
              <div key={key} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="mb-1 text-xs text-slate-500">{key}</div>
                <div className="text-sm font-semibold text-slate-900">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold text-slate-500">Scroll Range:</span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Hero</span>
          <div className="h-0.5 w-12 bg-slate-300" />
          <span className="inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-purple-700">Packages</span>
          <span className="ml-auto text-xs text-slate-500">· Mobile: Lightweight Motion</span>
        </div>
      </div>

      <div className="border-t border-slate-100 p-6">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Quick Actions Parallax</div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {parallaxActions.map((button) => (
            <button
              key={button.action}
              onClick={() => onQuickAction(button.action)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                button.danger
                  ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                  : button.primary
                    ? "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

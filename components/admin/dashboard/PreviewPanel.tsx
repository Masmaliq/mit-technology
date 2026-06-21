type PreviewPanelProps = {
  onQuickAction: (action: string) => void;
  onPreviewParallax: () => void;
};

export default function PreviewPanel({ onQuickAction, onPreviewParallax }: PreviewPanelProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Preview & Akses</h3>
      </div>

      <div className="space-y-2 p-6">
        <button
          onClick={() => onQuickAction("Open Website")}
          className="w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-700 transition hover:bg-blue-100"
        >
          <div className="font-semibold">🌐 Open Website</div>
          <div className="text-xs text-blue-600">mithome.co/preview</div>
        </button>

        <button
          onClick={() => onQuickAction("Desktop Preview")}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <div className="font-semibold">🖥 Desktop</div>
          <div className="text-xs text-slate-500">1440px view</div>
        </button>

        <button
          onClick={() => onQuickAction("Mobile Preview")}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <div className="font-semibold">📱 Mobile</div>
          <div className="text-xs text-slate-500">375px view</div>
        </button>

        <button
          onClick={onPreviewParallax}
          className="w-full rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm font-medium text-amber-700 transition hover:bg-amber-100"
        >
          <div className="font-semibold">◉ Product Parallax</div>
          <div className="text-xs text-amber-600">Preview efek scroll 3D</div>
        </button>
      </div>
    </div>
  );
}

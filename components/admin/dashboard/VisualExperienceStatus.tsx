import AdminActionLink from "@/components/admin/AdminActionLink";

export type VisualMode = {
  name: string;
  desc: string;
  active: boolean;
};

type VisualExperienceStatusProps = {
  modes: VisualMode[];
  onToggleMode: (index: number) => void;
};

export default function VisualExperienceStatus({ modes, onToggleMode }: VisualExperienceStatusProps) {
  return (
    <div className="self-start overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-purple-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Visual Experience Status</h3>
          <span className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
            {modes.length} Mode
          </span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        {modes.map((mode, idx) => (
          <div
            key={mode.name}
            className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm">✦</div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{mode.name}</div>
                  <div className="text-xs text-slate-500">{mode.desc}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  mode.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}
              >
                {mode.active ? "● Active" : "○ Inactive"}
              </span>

              <button
                onClick={() => onToggleMode(idx)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  mode.active ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    mode.active ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-3">
        <span className="text-xs text-slate-500">
          {modes.filter((mode) => mode.active).length} dari {modes.length} mode aktif
        </span>
        <AdminActionLink action="Edit Motion" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
          Kelola Mode →
        </AdminActionLink>
      </div>
    </div>
  );
}

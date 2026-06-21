type QuickActionsPanelProps = {
  onQuickAction: (action: string) => void;
};

const quickActions = [
  { label: "🏠 Edit Homepage", action: "Edit Homepage" },
  { label: "✦ Edit Hero", action: "Edit Hero" },
  { label: "💎 Edit Packages", action: "Edit Packages" },
  { label: "📊 Edit Case Studies", action: "Edit Case Studies" },
  { label: "⊞ Update Footer", action: "Update Footer" },
  { label: "◉ Edit Parallax", action: "Edit Parallax" },
];

export default function QuickActionsPanel({ onQuickAction }: QuickActionsPanelProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((button) => (
            <button
              key={button.action}
              onClick={() => onQuickAction(button.action)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

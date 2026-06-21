import type { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

type Props = {
  children?: ReactNode;
};

export default function DashboardShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="lg:flex lg:items-stretch">
        <aside className="hidden lg:block lg:w-[220px] lg:shrink-0 lg:sticky lg:top-0 lg:h-screen">
          <div className="h-full border-r border-slate-200 bg-white flex flex-col">
            <div className="px-4 py-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">MIT</div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">MIT <span className="text-blue-600">Home</span></div>
                  <div className="text-xs text-slate-500">Framework Control Center</div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <DashboardSidebar />
            </div>

            <div className="px-4 py-3 border-t border-slate-200 text-sm text-slate-500">
              <div className="font-semibold text-slate-700">MIT Framework v2.4.1</div>
              <div className="mt-1">Last deploy: 2 jam lalu</div>
            </div>
          </div>
        </aside>

        <div className="flex-1 lg:pl-0">
          <div className="sticky top-0 z-40">
            <DashboardTopbar />
          </div>

          <main className="px-4 pb-12 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

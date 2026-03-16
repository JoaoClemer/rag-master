
import Sidebar from "../components/layout/Sidebar";
import { knowledgeBases, systemHealth } from "../data/mockData";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background-light">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-primary/10 bg-white/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Resources</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 font-medium">Knowledge Bases</span>
          </div>
          <div className="flex items-center gap-4">
            <Input icon="search" placeholder="Search indexes..." className="w-64" />
            <Button variant="primary" icon="add">
              Create Knowledge Base
            </Button>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Knowledge Bases</h2>
            <p className="text-sm text-slate-500 mt-1">Manage your document collections and vector embeddings.</p>
          </div>

          {/* Knowledge Base Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {knowledgeBases.map((kb) => (
              <Card key={kb.id} hoverable className="group relative flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">{kb.icon}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{kb.name}</h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{kb.description}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-[11px] font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">article</span>
                    {kb.documents} Documents
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">segment</span>
                    {kb.chunks} Chunks
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {kb.date}
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="secondary" size="sm" href="/knowledge-base" className="flex-1">
                    Open
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Upload
                  </Button>
                </div>
              </Card>
            ))}

            {/* Create Placeholder Card */}
            <button className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/20 bg-transparent p-8 text-slate-400 hover:border-primary/40 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-3xl mb-2">add_circle</span>
              <span className="text-sm font-medium">New Knowledge Base</span>
            </button>
          </div>

          {/* System Health */}
          <div className="mt-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">System Health</h3>
            <div className="rounded-xl border border-primary/10 bg-white overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10">
                {systemHealth.map((item) => (
                  <div key={item.label} className="p-4 flex items-center gap-4">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

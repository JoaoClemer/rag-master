import TopNav from "../components/layout/TopNav";
import StatusBadge from "../components/ui/StatusBadge";
import { kbDetails, documents } from "../data/mockData";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const navLinks = [
  { label: "Dashboard", path: "/" },
  { label: "Knowledge Base", path: "/knowledge-base" },
  { label: "Deployments", path: "#" },
  { label: "Logs", path: "#" },
];

export default function KnowledgeBaseDetailsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <TopNav
        title="RAG Engine"
        icon="database"
        links={navLinks}
        searchPlaceholder="Search documents..."
      />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <a className="hover:text-primary transition-colors" href="#">Knowledge Bases</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 font-medium">{kbDetails.name}</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{kbDetails.name}</h1>
            <p className="text-slate-500 mt-2 max-w-2xl">{kbDetails.description}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" icon="sync">
              Re-index All
            </Button>
            <Button variant="primary" icon="add" className="shadow-lg shadow-primary/20">
              Add Source
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <Card className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 hover:shadow-sm">
              {[
                { label: "Embedding Model", value: kbDetails.embeddingModel },
                { label: "Chunk Size", value: kbDetails.chunkSize },
                { label: "Overlap", value: kbDetails.overlap },
                { label: "Total Vectors", value: kbDetails.totalVectors },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{stat.label}</span>
                  <p className="text-sm font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </Card>

            {/* Drag and Drop Area */}
            <section className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/40 transition-all">
              <div className="w-16 h-16 rounded-full bg-white border border-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Upload new documents</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-xs">
                Drag and drop PDF, MD, or TXT files here to expand your knowledge base.
              </p>
              <div className="mt-4 text-[11px] font-bold text-primary px-3 py-1 bg-primary/10 rounded-full uppercase tracking-widest">
                Max 25MB per file
              </div>
            </section>

            {/* Documents Table */}
            <section className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-primary/10 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-primary">description</span>
                  Indexed Documents
                </h3>
                <span className="text-xs font-medium text-slate-400">Showing {documents.length} of 24 documents</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    <tr>
                      <th className="px-6 py-3">Document Name</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Size</th>
                      <th className="px-6 py-3">Last Synced</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {documents.map((doc) => (
                      <tr key={doc.name} className={`hover:bg-primary/5 transition-colors group ${doc.status === "Failed" ? "text-opacity-50" : ""}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined ${doc.status === "Failed" ? "text-red-300" : "text-slate-400 group-hover:text-primary"}`}>
                              {doc.icon}
                            </span>
                            <span className={`text-sm font-medium ${doc.status === "Failed" ? "text-slate-400" : "text-slate-700"}`}>
                              {doc.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={doc.status} />
                        </td>
                        <td className={`px-6 py-4 text-sm ${doc.status === "Failed" ? "text-slate-400" : "text-slate-500"}`}>{doc.size}</td>
                        <td className={`px-6 py-4 text-sm ${doc.status === "Failed" ? "text-slate-400" : "text-slate-500"}`}>{doc.lastSynced}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-primary">
                            <span className="material-symbols-outlined">{doc.status === "Failed" ? "refresh" : "more_horiz"}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-primary/10 bg-slate-50/50 flex justify-center">
                <button className="text-xs font-bold text-primary hover:underline">View all 24 documents</button>
              </div>
            </section>
          </div>

          {/* Sidebar Details */}
          <div className="space-y-6">
            {/* Config Card */}
            <Card className="p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">settings</span>
                Configuration
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Knowledge Base ID</label>
                  <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 rounded border border-primary/5">
                    <code className="text-xs text-primary font-mono truncate">{kbDetails.id}</code>
                    <button className="text-slate-400 hover:text-primary">
                      <span className="material-symbols-outlined text-base">content_copy</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Created</label>
                    <p className="text-sm font-medium text-slate-700">{kbDetails.created}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Visibility</label>
                    <p className="text-sm font-medium text-slate-700">{kbDetails.visibility}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-primary/10">
                <Button variant="danger" className="w-full">
                  Delete Knowledge Base
                </Button>
              </div>
            </Card>

            {/* Usage Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-xl border border-primary/20 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">analytics</span>
                Platform Usage
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-medium text-slate-500">Storage Limit</span>
                  <span className="text-xs font-bold text-slate-700">{kbDetails.storagePercent}% used</span>
                </div>
                <div className="w-full bg-white rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${kbDetails.storagePercent}%` }} />
                </div>
                <div className="pt-2">
                  <p className="text-[10px] text-slate-500 leading-relaxed italic">
                    Increasing your chunk size will reduce the total number of vectors but may decrease retrieval precision.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">bolt</span>
                Quick Actions
              </h4>
              <ul className="space-y-2">
                {[
                  { icon: "chat", label: "Test in Playground" },
                  { icon: "code", label: "Generate API Snippet" },
                  { icon: "settings_suggest", label: "Auto-Optimize Chunks" },
                ].map((action) => (
                  <li key={action.label}>
                    <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-primary/5 hover:text-primary rounded-lg flex items-center gap-2 transition-all">
                      <span className="material-symbols-outlined text-lg">{action.icon}</span>
                      {action.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

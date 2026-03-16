import TopNav from "../components/layout/TopNav";
import {
  retrievalQuery,
  retrievalMetrics,
  retrievedChunks,
  queryParameters,
  metadataTags,
} from "../data/mockData";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const navLinks = [
  { label: "Projects", path: "#" },
  { label: "Retrieval Logs", path: "/inspector" },
  { label: "Evaluations", path: "#" },
];

export default function RetrievalInspectorPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <TopNav
        title="RAG Inspector"
        icon="account_tree"
        links={navLinks}
        searchPlaceholder="Search traces..."
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-primary/10 bg-white hidden lg:flex flex-col p-4 gap-6">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-4">Current Session</p>
            <div className="space-y-1">
              {[
                { icon: "dashboard", label: "Summary", active: false },
                { icon: "database", label: "Retrieved Chunks", active: true },
                { icon: "code", label: "Trace JSON", active: false },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-primary/10">
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Latency</span>
                <span className="text-xs font-mono text-primary">142ms</span>
              </div>
              <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[42%]" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide bg-slate-50">
          <div className="p-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
              <a className="hover:text-primary transition-colors" href="#">Project Alpha</a>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="hover:text-primary transition-colors" href="#">Vector Logs</a>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-slate-900 font-medium">q-98721</span>
            </nav>

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{retrievalQuery.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">schedule</span> {retrievalQuery.latency}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">layers</span> Top-k: {retrievalQuery.topK}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">model_training</span> {retrievalQuery.model}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                    {retrievalQuery.relevance}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="primary" icon="play_arrow" className="shadow-sm shadow-primary/20">
                  Re-run Query
                </Button>
                <Button variant="outline" icon="share" className="!px-2" aria-label="Share" />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {retrievalMetrics.map((metric) => (
                <Card key={metric.label} className="p-4 border-primary/10">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{metric.label}</p>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                    <span className={`text-xs font-medium mb-1 ${metric.positive ? "text-green-500" : "text-red-500"}`}>
                      {metric.change}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Retrieved Chunks List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">view_list</span>
                  Retrieved Results ({retrievedChunks.length + 2})
                </h3>
                <div className="flex items-center gap-4">
                  <select className="bg-transparent border-none text-xs font-medium text-slate-500 focus:ring-0 cursor-pointer">
                    <option>Sort by Score</option>
                    <option>Sort by Recency</option>
                  </select>
                </div>
              </div>

              {retrievedChunks.map((chunk) => (
                <div
                  key={chunk.rank}
                  className={`bg-white border rounded-xl overflow-hidden hover:border-primary/40 transition-all group ${
                    chunk.highlighted ? "border-primary/10" : "border-slate-200"
                  } ${chunk.rank === 3 ? "opacity-80" : ""}`}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div
                      className={`w-1.5 transition-all ${
                        chunk.highlighted
                          ? "bg-primary group-hover:w-2"
                          : chunk.rank === 2
                          ? "bg-slate-300 group-hover:bg-primary"
                          : "bg-slate-200 group-hover:bg-primary/60"
                      }`}
                    />
                    <div className="flex-1 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded bg-slate-100 text-xs font-bold text-slate-600">
                            #{chunk.rank}
                          </span>
                          <a className="text-sm font-semibold text-primary hover:underline flex items-center gap-1" href="#">
                            {chunk.fileName}
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                          </a>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Similarity</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  chunk.highlighted ? "bg-primary" : chunk.rank === 2 ? "bg-primary/60" : "bg-primary/40"
                                }`}
                                style={{ width: `${chunk.similarity * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-slate-900 font-mono">{chunk.similarity.toFixed(3)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                        <p className={`text-sm leading-relaxed ${chunk.highlighted ? "text-slate-700 font-mono" : chunk.rank === 2 ? "text-slate-700 italic" : "text-slate-500 line-clamp-2"}`}>
                          {chunk.text}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {chunk.meta.map((m) => (
                          <span key={m} className="px-2 py-1 rounded bg-slate-100 text-xs text-slate-500">{m}</span>
                        ))}
                        <div className="ml-auto flex items-center gap-3">
                          <button className="text-slate-400 hover:text-green-500 transition-colors">
                            <span className="material-symbols-outlined text-xl">thumb_up</span>
                          </button>
                          <button className="text-slate-400 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-xl">thumb_down</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-8 flex justify-center">
                <button className="text-sm font-medium text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                  Load 2 more chunks
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel: Metadata & Settings */}
        <aside className="w-80 border-l border-primary/10 bg-white hidden xl:flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-primary/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Query Execution</h3>
            <button className="text-xs text-primary font-semibold hover:underline">View Logs</button>
          </div>
          <div className="p-6 space-y-8">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Parameters</p>
              <div className="space-y-4">
                {queryParameters.map((param) => (
                  <div key={param.label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{param.label}</span>
                    <span className={`text-xs text-slate-900 ${param.mono ? "font-mono bg-slate-100 px-1.5 py-0.5 rounded" : ""}`}>
                      {param.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Metadata Tags</p>
              <div className="flex flex-wrap gap-2">
                {metadataTags.map((tag, idx) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      idx === 0
                        ? "bg-primary/10 text-primary"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-xl">lightbulb</span>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight">AI Insights</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Max similarity is high, but the variance between Top-1 and Top-5 suggests potential chunk fragmentation. Consider increasing overlap to 20%.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

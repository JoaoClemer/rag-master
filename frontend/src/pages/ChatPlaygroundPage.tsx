import TopNav from "../components/layout/TopNav";
import { chatMessages, contextChunks } from "../data/mockData";
import Button from "../components/ui/Button";

const navLinks = [
  { label: "Models", path: "#" },
  { label: "Knowledge Base", path: "/knowledge-base" },
  { label: "Playground", path: "/playground" },
  { label: "Logs", path: "#" },
];

export default function ChatPlaygroundPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNav
        title="RAG Playground"
        icon="deployed_code"
        links={navLinks}
        showSearch={false}
        actionButton={{ label: "Deploy", icon: "rocket_launch" }}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Configuration */}
        <aside className="w-64 border-r border-primary/10 bg-white flex flex-col p-4 gap-6 shrink-0">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Configuration</h3>
            <div className="space-y-1">
              {[
                { icon: "description", label: "Documents", active: true },
                { icon: "database", label: "Vector Store", active: false },
                { icon: "view_list", label: "Indexes", active: false },
                { icon: "settings", label: "Model Parameters", active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all text-sm ${
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">info</span>
              <p className="text-[11px] font-bold uppercase tracking-tight text-primary">Active Model</p>
            </div>
            <p className="text-sm font-semibold truncate">GPT-4o-Turbo-v2</p>
            <p className="text-xs text-slate-500 mt-1">Context: 128k tokens</p>
          </div>
        </aside>

        {/* Main Panel: Chat Interface */}
        <main className="flex-1 flex flex-col bg-background-light overflow-hidden relative">
          {/* System Prompt Editor */}
          <div className="border-b border-primary/10 bg-white px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">terminal</span>
                <h3 className="text-sm font-semibold">System Instructions</h3>
              </div>
              <span className="text-[11px] font-medium text-slate-400">Read-only in playground mode</span>
            </div>
            <div className="rounded-lg border border-primary/10 bg-slate-50 p-3">
              <p className="text-xs code-font text-slate-600 leading-relaxed italic">
                You are a helpful RAG assistant. Use the provided context to answer user questions accurately. If the information is not in the context, state that you don't know rather than making up an answer.
              </p>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
            {chatMessages.map((msg, idx) =>
              msg.role === "assistant" ? (
                <div key={idx} className="flex gap-4 max-w-3xl">
                  <div className="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white text-lg">smart_toy</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Assistant</p>
                    {msg.searching && (
                      <div className="flex items-center gap-2 mb-1 px-3 py-1 bg-primary/5 rounded-full border border-primary/10 w-fit">
                        <span className="material-symbols-outlined text-primary text-xs animate-pulse">search</span>
                        <span className="text-[10px] font-medium text-primary">{msg.searchLabel}</span>
                      </div>
                    )}
                    <div className="bg-white border border-primary/5 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-sm leading-relaxed whitespace-pre-line">
                      {msg.content}
                    </div>
                    {msg.searching && (
                      <div className="flex items-center gap-2 mt-2">
                        <button className="text-[10px] font-bold flex items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-xs">thumb_up</span> Helpful
                        </button>
                        <button className="text-[10px] font-bold flex items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-xs">thumb_down</span>
                        </button>
                        <button className="text-[10px] font-bold flex items-center gap-1 text-slate-400 hover:text-primary transition-colors ml-2">
                          <span className="material-symbols-outlined text-xs">content_copy</span> Copy
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex gap-4 max-w-3xl ml-auto flex-row-reverse">
                  <div className="size-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-slate-600 text-lg">person</span>
                  </div>
                  <div className="flex flex-col gap-1.5 items-end">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">User</p>
                    <div className="bg-primary/10 border border-primary/10 rounded-2xl rounded-tr-none px-4 py-3 text-sm leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Input Bar */}
          <div className="p-6 bg-white/50 backdrop-blur-sm border-t border-primary/10">
            <div className="max-w-3xl mx-auto relative">
              <textarea
                className="w-full rounded-xl border-primary/20 focus:border-primary focus:ring-primary/20 bg-white py-4 pl-4 pr-12 text-sm resize-none custom-scrollbar"
                placeholder="Ask your knowledge base..."
                rows={1}
              />
              <Button
                variant="primary"
                icon="send"
                className="absolute right-3 bottom-3 !px-2 size-9 flex items-center justify-center p-0"
                aria-label="Send message"
              />
            </div>
            <div className="flex justify-center gap-4 mt-3">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">bolt</span> Semantic Search Enabled
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">history</span> Session active
              </span>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Retrieved Context */}
        <aside className="w-80 border-l border-primary/10 bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h3 className="text-sm font-bold">Retrieved Context</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">4 Chunks</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {contextChunks.map((chunk) => (
              <div
                key={chunk.fileName}
                className={`p-3 rounded-lg border cursor-pointer group transition-colors ${
                  chunk.highlighted
                    ? "border-primary/10 bg-primary/5 hover:bg-primary/10"
                    : "border-primary/5 bg-slate-50 hover:bg-primary/5"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`material-symbols-outlined text-sm ${chunk.highlighted ? "text-primary" : "text-slate-400"}`}>{chunk.icon}</span>
                    <span className="text-[11px] font-bold truncate max-w-[120px]">{chunk.fileName}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Score: {chunk.score}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 line-clamp-4 italic">{chunk.text}</p>
                {chunk.highlighted && (
                  <div className="mt-2 pt-2 border-t border-primary/5 flex justify-end">
                    <span className="text-[9px] font-bold text-primary group-hover:underline">View Source</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-primary/10">
            <button className="w-full py-2 text-[11px] font-bold text-slate-500 hover:text-primary border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">export_notes</span>
              Export Trace Logs
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

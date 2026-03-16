import { NavLink } from "react-router-dom";
import { sidebarNavItems } from "../../data/mockData";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-primary/10 flex flex-col bg-white z-10 shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-xl">temp_preferences_custom</span>
        </div>
        <h1 className="text-lg font-semibold tracking-tight">RAG Studio</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {sidebarNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 hover:bg-primary/5 hover:text-primary"
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 mt-auto border-t border-primary/10">
        <div className="flex items-center gap-3 p-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium truncate">Jane Doe</p>
            <p className="text-[10px] text-slate-500 truncate">jane@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

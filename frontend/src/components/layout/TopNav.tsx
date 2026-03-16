import { NavLink } from "react-router-dom";

interface TopNavProps {
  readonly title: string;
  readonly icon: string;
  readonly links: ReadonlyArray<{ label: string; path: string }>;
  readonly showSearch?: boolean;
  readonly searchPlaceholder?: string;
  readonly actionButton?: { label: string; icon: string };
}

export default function TopNav({
  title,
  icon,
  links,
  showSearch = true,
  searchPlaceholder = "Search...",
  actionButton,
}: TopNavProps) {
  return (
    <header className="flex items-center justify-between border-b border-primary/10 bg-white/50 backdrop-blur-md px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <span className="material-symbols-outlined block">{icon}</span>
          </div>
          <h2 className="text-slate-900 text-lg font-bold tracking-tight">{title}</h2>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              end
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-sm font-semibold border-b-2 border-primary pb-1"
                  : "text-slate-600 text-sm font-medium hover:text-primary transition-colors"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input
              className="pl-10 pr-4 py-1.5 bg-primary/5 border border-primary/10 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-64"
              placeholder={searchPlaceholder}
              type="text"
            />
          </div>
        )}
        {actionButton && (
          <>
            <div className="h-6 w-px bg-primary/20 mx-2" />
            <button className="bg-primary text-white text-sm font-bold py-2 px-5 rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">{actionButton.icon}</span>
              {actionButton.label}
            </button>
          </>
        )}
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs">
          JD
        </div>
      </div>
    </header>
  );
}

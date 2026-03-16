import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "outline";
  icon?: string;
}

export default function Badge({ 
  children, 
  variant = "primary", 
  icon, 
  className = "", 
  ...props 
}: BadgeProps) {
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-primary/10 text-primary",
    success: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    warning: "bg-amber-50 text-amber-600 border border-amber-200",
    error: "bg-red-50 text-red-600 border border-red-200",
    outline: "border border-primary/20 text-slate-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
      {children}
    </span>
  );
}

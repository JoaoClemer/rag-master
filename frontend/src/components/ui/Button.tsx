import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: string;
  href?: string;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", icon, href, children, className = "", ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-sm",
      secondary:
        "bg-primary/10 text-primary hover:bg-primary/20 focus:ring-primary",
      outline:
        "border border-primary/20 bg-transparent hover:border-primary/40 hover:text-primary text-slate-700 focus:ring-primary",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-500",
      danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs w-full lg:w-auto",
      md: "h-9 px-4 py-2 text-sm",
      lg: "h-11 px-8 text-base",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <Link to={href} className={classes}>
          {icon && <span className="material-symbols-outlined text-[1em]">{icon}</span>}
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {icon && <span className="material-symbols-outlined text-[1em]">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

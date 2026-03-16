import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className = "", ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`h-9 w-full rounded-lg border border-primary/10 bg-primary/5 ${
            icon ? "pl-9" : "px-3"
          } text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

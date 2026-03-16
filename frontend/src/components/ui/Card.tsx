import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export default function Card({ children, hoverable = false, className = "", ...props }: CardProps) {
  const hoverClass = hoverable ? "hover:shadow-md transition-shadow group" : "";
  
  return (
    <div 
      className={`rounded-xl border border-primary/10 bg-white p-5 shadow-sm ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

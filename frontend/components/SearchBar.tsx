"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export default function SearchBar({ onSearch, isLoading, disabled }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed && !isLoading && !disabled) {
      onSearch(trimmed);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={disabled ? "Faça upload de um documento primeiro..." : "Digite sua pergunta..."}
        disabled={disabled || isLoading}
        className={`
          flex-1 border-2 border-black border-r-0 rounded-none
          px-4 py-3 font-mono text-sm bg-white
          focus:outline-none focus:ring-[3px] focus:ring-[#FFEE00] focus:ring-offset-0
          disabled:bg-gray-100 disabled:cursor-not-allowed
          placeholder:text-gray-400 placeholder:uppercase placeholder:tracking-wide
        `}
      />
      <button
        type="submit"
        disabled={disabled || isLoading || !query.trim()}
        className={`
          border-2 border-black px-6 py-3
          font-mono font-black uppercase tracking-wider text-sm
          transition-all duration-100
          ${
            disabled || isLoading || !query.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
          }
        `}
      >
        {isLoading ? "..." : "BUSCAR"}
      </button>
    </form>
  );
}

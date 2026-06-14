"use client";

import { useMemo } from "react";

interface ResultCardProps {
  text: string;
  score: number;
  chunkIndex: number;
  filename: string;
  query: string;
}

function highlightTerms(text: string, query: string): React.ReactNode {
  const terms = query
    .split(/\s+/)
    .filter((t) => t.length > 2)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (!terms.length) return text;

  const pattern = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    pattern.test(part) ? (
      <mark key={i} className="bg-[#FFEE00] font-bold not-italic">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function ResultCard({
  text,
  score,
  chunkIndex,
  filename,
  query,
}: ResultCardProps) {
  const scorePercent = Math.round(score * 100);
  const highlighted = useMemo(() => highlightTerms(text, query), [text, query]);

  return (
    <article className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white p-5">
      {/* header row */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wider font-black">
            CHUNK #{chunkIndex}
          </span>
          <span className="font-mono text-xs text-gray-500 uppercase tracking-wide truncate max-w-[200px]">
            {filename}
          </span>
        </div>

        {/* score badge */}
        <span className="shrink-0 bg-black text-white font-mono font-black text-xs uppercase tracking-wider px-3 py-1">
          {scorePercent}%
        </span>
      </div>

      {/* similarity bar */}
      <div className="w-full h-2 bg-gray-200 border border-black mb-4">
        <div
          className="h-full bg-black transition-none"
          style={{ width: `${scorePercent}%` }}
        />
      </div>

      {/* text content */}
      <p className="text-sm leading-relaxed font-sans text-gray-900 whitespace-pre-wrap">
        {highlighted}
      </p>
    </article>
  );
}

"use client";

import { useState } from "react";
import FileUpload from "../components/FileUpload";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import { searchDocuments, SearchResult } from "../lib/api";

interface DocState {
  collectionId: string;
  filename: string;
  totalChunks: number;
}

export default function Home() {
  const [doc, setDoc] = useState<DocState | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [lastQuery, setLastQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  function handleUploadSuccess(collectionId: string, filename: string, totalChunks: number) {
    setDoc({ collectionId, filename, totalChunks });
    setResults([]);
    setLastQuery("");
    setHasSearched(false);
    setError(null);
  }

  async function handleSearch(query: string) {
    if (!doc) return;
    setSearchLoading(true);
    setError(null);
    setLastQuery(query);
    setHasSearched(true);

    try {
      const res = await searchDocuments(query, doc.collectionId, 5);
      setResults(res.results);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao buscar.");
      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* header */}
      <header className="mb-10">
        <div className="inline-block bg-black text-[#FFEE00] px-4 py-1 font-mono text-xs uppercase tracking-widest mb-4">
          RAG · BUSCA SEMÂNTICA
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase leading-none tracking-tight">
          BUSCA EM<br />DOCUMENTOS
        </h1>
        <p className="mt-3 font-mono text-sm text-gray-600 uppercase tracking-wide">
          Faça upload de um PDF ou TXT e pesquise por significado
        </p>
      </header>

      {/* upload section */}
      <section className="mb-8">
        <label className="block font-mono text-xs font-black uppercase tracking-widest mb-2">
          01 — DOCUMENTO
        </label>
        <FileUpload
          onUploadSuccess={handleUploadSuccess}
          onError={(msg) => setError(msg)}
          isLoading={uploadLoading}
          setIsLoading={setUploadLoading}
        />
      </section>

      {/* success banner */}
      {doc && (
        <div className="mb-8 border-2 border-black bg-[#FFEE00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="font-mono font-black uppercase text-sm tracking-wide">
              {doc.filename}
            </p>
            <p className="font-mono text-xs text-gray-700 uppercase tracking-wider mt-0.5">
              {doc.totalChunks} CHUNKS INDEXADOS
            </p>
          </div>
          <span className="font-mono text-xs bg-black text-white px-3 py-1 uppercase tracking-wider self-start sm:self-auto">
            PRONTO
          </span>
        </div>
      )}

      {/* error banner */}
      {error && (
        <div className="mb-6 border-2 border-black bg-[#FF6B6B] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-5 py-3">
          <p className="font-mono font-black text-sm uppercase tracking-wide">ERRO</p>
          <p className="font-mono text-sm mt-1">{error}</p>
        </div>
      )}

      {/* search section */}
      <section className="mb-10">
        <label className="block font-mono text-xs font-black uppercase tracking-widest mb-2">
          02 — PERGUNTA
        </label>
        <SearchBar
          onSearch={handleSearch}
          isLoading={searchLoading}
          disabled={!doc}
        />
      </section>

      {/* results */}
      {searchLoading && (
        <div className="flex flex-col items-center py-12 gap-4">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <p className="font-mono uppercase tracking-widest text-sm font-black blink">
            BUSCANDO...
          </p>
        </div>
      )}

      {!searchLoading && hasSearched && results.length === 0 && (
        <div className="border-2 border-black px-5 py-8 text-center">
          <p className="font-mono font-black uppercase tracking-wide text-sm">
            NENHUM RESULTADO ENCONTRADO
          </p>
          <p className="font-mono text-xs text-gray-500 mt-2 uppercase tracking-wider">
            Tente reformular a pergunta
          </p>
        </div>
      )}

      {!searchLoading && results.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <label className="font-mono text-xs font-black uppercase tracking-widest">
              03 — RESULTADOS
            </label>
            <span className="font-mono text-xs bg-black text-white px-2 py-0.5 uppercase">
              {results.length} TRECHOS
            </span>
          </div>
          <div className="flex flex-col gap-5">
            {results.map((r, i) => (
              <ResultCard
                key={i}
                text={r.text}
                score={r.score}
                chunkIndex={r.chunk_index}
                filename={r.filename}
                query={lastQuery}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

"use client";

import { useRef, useState } from "react";

interface FileUploadProps {
  onUploadSuccess: (collectionId: string, filename: string, totalChunks: number) => void;
  onError: (msg: string) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export default function FileUpload({
  onUploadSuccess,
  onError,
  isLoading,
  setIsLoading,
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.name.match(/\.(pdf|txt)$/i)) {
      onError("Apenas arquivos PDF ou TXT são suportados.");
      return;
    }

    setIsLoading(true);
    try {
      const { uploadDocument } = await import("../lib/api");
      const result = await uploadDocument(file);
      onUploadSuccess(result.collection_id, result.filename, result.total_chunks);
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : "Erro ao fazer upload.");
    } finally {
      setIsLoading(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => !isLoading && inputRef.current?.click()}
      className={`
        border-4 border-dashed border-black
        flex flex-col items-center justify-center
        min-h-[220px] cursor-pointer select-none
        transition-colors duration-100
        ${dragOver ? "bg-[#FFEE00]" : "bg-white"}
        ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#FFEE00]"}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt"
        className="hidden"
        onChange={onInputChange}
        disabled={isLoading}
      />

      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <p className="font-mono uppercase tracking-wider text-sm font-bold">
            ENVIANDO...
          </p>
        </div>
      ) : (
        <>
          <svg
            className="w-12 h-12 mb-4"
            fill="none"
            stroke="black"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
          </svg>
          <p className="font-mono uppercase tracking-wider text-lg font-black">
            SOLTE O ARQUIVO AQUI
          </p>
          <p className="font-mono text-sm mt-2 uppercase tracking-wide text-gray-600">
            ou clique para selecionar — PDF ou TXT
          </p>
        </>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
  );
}

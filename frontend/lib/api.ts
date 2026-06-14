const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface UploadResult {
  collection_id: string;
  total_chunks: number;
  filename: string;
}

export interface SearchResult {
  text: string;
  score: number;
  chunk_index: number;
  filename: string;
}

export interface SearchResponse {
  results: SearchResult[];
}

export async function uploadDocument(file: File): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/upload`, { method: "POST", body: form });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Upload failed" }));
    throw new Error(err.detail ?? "Upload failed");
  }

  return res.json();
}

export async function searchDocuments(
  query: string,
  collection_id: string,
  top_k = 5
): Promise<SearchResponse> {
  const res = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, collection_id, top_k }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Search failed" }));
    throw new Error(err.detail ?? "Search failed");
  }

  return res.json();
}

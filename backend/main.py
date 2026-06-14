from __future__ import annotations

import io
import os

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from models import HealthResponse, SearchRequest, SearchResponse, SearchResult, UploadResponse
from services.chunker import chunk_text
from services.embedder import embed_query, embed_texts
from services.vector_store import create_collection, new_collection_id, search, upsert_chunks

app = FastAPI(title="Semantic Search API", version="1.0.0")

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://localhost:3000",
    os.getenv("FRONTEND_URL", ""),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in ALLOWED_ORIGINS if o],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _extract_text(filename: str, content: bytes) -> str:
    if filename.lower().endswith(".pdf"):
        try:
            from pypdf import PdfReader
        except ImportError as e:
            raise HTTPException(status_code=500, detail="pypdf not installed") from e

        reader = PdfReader(io.BytesIO(content))
        pages = [page.extract_text() or "" for page in reader.pages]
        return "\n\n".join(pages)

    # TXT — try utf-8 then latin-1
    try:
        return content.decode("utf-8")
    except UnicodeDecodeError:
        return content.decode("latin-1")


@app.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse()


@app.post("/upload", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)) -> UploadResponse:
    filename = file.filename or "document"
    if not (filename.lower().endswith(".pdf") or filename.lower().endswith(".txt")):
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are supported")

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Empty file")

    text = _extract_text(filename, content)
    if not text.strip():
        raise HTTPException(status_code=422, detail="Could not extract text from file")

    chunks = chunk_text(text)
    if not chunks:
        raise HTTPException(status_code=422, detail="Document produced no chunks")

    chunk_texts = [c.text for c in chunks]
    vectors = await embed_texts(chunk_texts)

    collection_id = new_collection_id()
    await create_collection(collection_id)

    payloads = [
        {
            "chunk_text": c.text,
            "filename": filename,
            "chunk_index": c.chunk_index,
            "start_char": c.start_char,
        }
        for c in chunks
    ]
    await upsert_chunks(collection_id, vectors, payloads)

    return UploadResponse(
        collection_id=collection_id,
        total_chunks=len(chunks),
        filename=filename,
    )


@app.post("/search", response_model=SearchResponse)
async def search_documents(body: SearchRequest) -> SearchResponse:
    query_vector = await embed_query(body.query)
    raw_results = await search(body.collection_id, query_vector, body.top_k)

    results = [
        SearchResult(
            text=r["text"],
            score=r["score"],
            chunk_index=r["chunk_index"],
            filename=r["filename"],
        )
        for r in raw_results
    ]
    return SearchResponse(results=results)

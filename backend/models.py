from __future__ import annotations

from pydantic import BaseModel, Field


class UploadResponse(BaseModel):
    collection_id: str
    total_chunks: int
    filename: str


class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1)
    collection_id: str
    top_k: int = Field(default=5, ge=1, le=20)


class SearchResult(BaseModel):
    text: str
    score: float
    chunk_index: int
    filename: str


class SearchResponse(BaseModel):
    results: list[SearchResult]


class HealthResponse(BaseModel):
    status: str = "ok"

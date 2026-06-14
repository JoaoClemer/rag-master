from __future__ import annotations

import os
import uuid

from qdrant_client import AsyncQdrantClient
from qdrant_client.models import (
    Distance,
    PointStruct,
    VectorParams,
)

VECTOR_DIM = 384
DISTANCE = Distance.COSINE


def _short_uuid() -> str:
    return uuid.uuid4().hex[:12]


def _get_client() -> AsyncQdrantClient:
    url = os.getenv("QDRANT_URL", "")
    api_key = os.getenv("QDRANT_API_KEY", "")
    if not url:
        raise RuntimeError("QDRANT_URL environment variable not set")
    return AsyncQdrantClient(url=url, api_key=api_key or None)


async def create_collection(collection_id: str) -> None:
    client = _get_client()
    await client.create_collection(
        collection_name=collection_id,
        vectors_config=VectorParams(size=VECTOR_DIM, distance=DISTANCE),
    )
    await client.close()


async def upsert_chunks(
    collection_id: str,
    vectors: list[list[float]],
    payloads: list[dict],
) -> None:
    client = _get_client()
    points = [
        PointStruct(id=i, vector=vec, payload=meta)
        for i, (vec, meta) in enumerate(zip(vectors, payloads))
    ]
    await client.upsert(collection_name=collection_id, points=points)
    await client.close()


async def search(
    collection_id: str,
    query_vector: list[float],
    top_k: int = 5,
) -> list[dict]:
    client = _get_client()
    results = await client.search(
        collection_name=collection_id,
        query_vector=query_vector,
        limit=top_k,
        with_payload=True,
    )
    await client.close()

    return [
        {
            "text": r.payload.get("chunk_text", ""),
            "score": round(r.score, 4),
            "chunk_index": r.payload.get("chunk_index", 0),
            "filename": r.payload.get("filename", ""),
        }
        for r in results
    ]


def new_collection_id() -> str:
    return f"doc_{_short_uuid()}"

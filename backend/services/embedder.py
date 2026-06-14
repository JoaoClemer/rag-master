from __future__ import annotations

import asyncio
import os

import httpx

HF_API_URL = (
    "https://api-inference.huggingface.co/pipeline/feature-extraction/"
    "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
)
BATCH_SIZE = 32
MAX_RETRIES = 3
RETRY_BACKOFF = 10  # seconds


def _get_token() -> str:
    token = os.getenv("HF_TOKEN", "")
    if not token:
        raise RuntimeError("HF_TOKEN environment variable not set")
    return token


async def _embed_batch(client: httpx.AsyncClient, texts: list[str]) -> list[list[float]]:
    headers = {"Authorization": f"Bearer {_get_token()}"}
    payload = {"inputs": texts, "options": {"wait_for_model": True}}

    for attempt in range(1, MAX_RETRIES + 1):
        response = await client.post(HF_API_URL, json=payload, headers=headers, timeout=60.0)

        if response.status_code == 200:
            return response.json()

        if response.status_code == 503 and attempt < MAX_RETRIES:
            await asyncio.sleep(RETRY_BACKOFF * attempt)
            continue

        response.raise_for_status()

    raise RuntimeError("HF Inference API unavailable after retries")


async def embed_texts(texts: list[str]) -> list[list[float]]:
    batches = [texts[i : i + BATCH_SIZE] for i in range(0, len(texts), BATCH_SIZE)]
    results: list[list[float]] = []

    async with httpx.AsyncClient() as client:
        for batch in batches:
            embeddings = await _embed_batch(client, batch)
            results.extend(embeddings)

    return results


async def embed_query(query: str) -> list[float]:
    embeddings = await embed_texts([query])
    return embeddings[0]

from __future__ import annotations

import os

from huggingface_hub import AsyncInferenceClient

MODEL_ID = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
BATCH_SIZE = 32


def _get_client() -> AsyncInferenceClient:
    token = os.getenv("HF_TOKEN", "")
    if not token:
        raise RuntimeError("HF_TOKEN environment variable not set")
    return AsyncInferenceClient(token=token, provider="hf-inference")


async def embed_texts(texts: list[str]) -> list[list[float]]:
    client = _get_client()
    results: list[list[float]] = []

    batches = [texts[i : i + BATCH_SIZE] for i in range(0, len(texts), BATCH_SIZE)]
    for batch in batches:
        raw = await client.feature_extraction(batch, model=MODEL_ID)
        # SDK may return a numpy array — normalise to list[list[float]]
        if hasattr(raw, "tolist"):
            raw = raw.tolist()
        results.extend(raw)

    return results


async def embed_query(query: str) -> list[float]:
    embeddings = await embed_texts([query])
    return embeddings[0]

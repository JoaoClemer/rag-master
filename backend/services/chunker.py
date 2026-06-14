from __future__ import annotations

import re
from dataclasses import dataclass


@dataclass
class Chunk:
    text: str
    start_char: int
    end_char: int
    chunk_index: int


def _approximate_tokens(text: str) -> int:
    # rough estimate: 1 token ≈ 4 chars for mixed-language text
    return len(text) // 4


def chunk_text(
    text: str,
    max_tokens: int = 500,
    overlap_tokens: int = 50,
) -> list[Chunk]:
    max_chars = max_tokens * 4
    overlap_chars = overlap_tokens * 4

    # split by paragraph boundaries first
    paragraphs = re.split(r"\n{2,}", text.strip())

    chunks: list[Chunk] = []
    buffer = ""
    buffer_start = 0
    current_pos = 0

    for para in paragraphs:
        para = para.strip()
        if not para:
            current_pos += 2
            continue

        para_start = text.find(para, current_pos)
        if para_start == -1:
            para_start = current_pos
        para_end = para_start + len(para)
        current_pos = para_end

        # if adding this paragraph would exceed the limit, flush buffer first
        if buffer and _approximate_tokens(buffer + "\n\n" + para) > max_tokens:
            chunk_end = buffer_start + len(buffer)
            chunks.append(
                Chunk(
                    text=buffer.strip(),
                    start_char=buffer_start,
                    end_char=chunk_end,
                    chunk_index=len(chunks),
                )
            )
            # start next buffer with overlap from the end of the flushed chunk
            overlap_text = buffer[-overlap_chars:] if len(buffer) > overlap_chars else buffer
            buffer = overlap_text + "\n\n" + para
            buffer_start = chunk_end - len(overlap_text)
        else:
            if buffer:
                buffer += "\n\n" + para
            else:
                buffer = para
                buffer_start = para_start

        # if a single paragraph is already larger than max, split it hard
        while _approximate_tokens(buffer) > max_tokens:
            slice_text = buffer[:max_chars]
            slice_end = buffer_start + len(slice_text)
            chunks.append(
                Chunk(
                    text=slice_text.strip(),
                    start_char=buffer_start,
                    end_char=slice_end,
                    chunk_index=len(chunks),
                )
            )
            buffer = buffer[max_chars - overlap_chars:]
            buffer_start = slice_end - overlap_chars

    if buffer.strip():
        chunks.append(
            Chunk(
                text=buffer.strip(),
                start_char=buffer_start,
                end_char=buffer_start + len(buffer),
                chunk_index=len(chunks),
            )
        )

    return chunks

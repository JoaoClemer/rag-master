from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="RAG MVP Platform",
    description="API para orquestração de Retrieval-Augmented Generation usando Qdrant e Google Gemini.",
    version="1.0.0"
)

# Adicionando CORS (liberado para testes de MVP)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "FastAPI is running"}

# TODO: Include routers (Knowledge Base, Documents, Chat)

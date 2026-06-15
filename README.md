# Semantic Search — RAG

Busca semântica em documentos PDF/TXT sem geração de resposta por LLM. O usuário sobe um arquivo, faz uma pergunta em linguagem natural e recebe os trechos mais similares semanticamente.

![Frontend](Print%20Frontend.PNG)

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS |
| Backend | FastAPI + Python 3.11+ |
| Embeddings | HF Inference API — `paraphrase-multilingual-MiniLM-L12-v2` |
| Banco vetorial | Qdrant Cloud (free tier) |
| Deploy frontend | Vercel |
| Deploy backend | Render.com |

---

## Demo rápida

Quer testar sem ter um documento pronto? O repositório inclui o arquivo `test_document.txt` — um texto sobre Inteligência Artificial e Busca Semântica com conteúdo variado que gera múltiplos chunks.

**Sugestões de perguntas para testar:**

- `o que são embeddings?`
- `como funciona o processo de chunking?`
- `qual a diferença entre busca semântica e busca tradicional?`
- `o que é RAG?`
- `como avaliar a qualidade da busca?`
- `quem criou o transformer?`

---

## Rodando localmente

### Pré-requisitos

- Node.js 20+
- Python 3.11+
- Conta no [Hugging Face](https://huggingface.co) (token gratuito)
- Cluster no [Qdrant Cloud](https://cloud.qdrant.io) (free tier)

---

### Backend

```bash
cd backend

# criar virtualenv
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/Mac
source .venv/bin/activate

# instalar dependências
pip install -r requirements.txt

# configurar variáveis de ambiente
cp .env.example .env
# edite .env com seus tokens

# rodar o servidor
uvicorn main:app --reload --port 8000
```

A API estará em `http://localhost:8000`. Documentação interativa em `http://localhost:8000/docs`.

---

### Frontend

```bash
cd frontend

npm install

# configurar variável de ambiente
cp .env.local.example .env.local
# edite .env.local se necessário (padrão aponta para localhost:8000)

npm run dev
```

O app estará em `http://localhost:3000`.

---

## Deploy

### Backend — Render.com

1. Faça push do código para um repositório Git
2. Crie um novo **Web Service** no Render apontando para a pasta `backend/`
3. Configure:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Runtime:** Python 3.11
4. Em **Environment Variables**, adicione:
   - `HF_TOKEN`
   - `QDRANT_URL`
   - `QDRANT_API_KEY`
   - `FRONTEND_URL` (URL do seu app na Vercel, para o CORS)
5. O health check está em `GET /health`

### Frontend — Vercel

1. Importe o repositório no [Vercel](https://vercel.com)
2. Configure o **Root Directory** como `frontend`
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_API_URL` — URL do backend no Render (ex: `https://seu-app.onrender.com`)
4. Deploy automático a cada push

---

## Variáveis de ambiente

### Backend (`backend/.env`)

| Variável | Descrição |
|---|---|
| `HF_TOKEN` | Token da Hugging Face (`hf_...`) |
| `QDRANT_URL` | URL do cluster Qdrant Cloud |
| `QDRANT_API_KEY` | Chave de API do Qdrant |
| `FRONTEND_URL` | URL do frontend (para CORS) |

### Frontend (`frontend/.env.local`)

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL base do backend |

---

## Endpoints da API

| Método | Path | Descrição |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/upload` | Sobe e indexa um PDF ou TXT |
| `POST` | `/search` | Busca semântica por trecho |

### POST /upload

**Request:** `multipart/form-data` com campo `file`

**Response:**
```json
{
  "collection_id": "doc_a1b2c3d4e5f6",
  "total_chunks": 42,
  "filename": "documento.pdf"
}
```

### POST /search

**Request:**
```json
{
  "query": "como funciona o processo de autenticação?",
  "collection_id": "doc_a1b2c3d4e5f6",
  "top_k": 5
}
```

**Response:**
```json
{
  "results": [
    {
      "text": "O processo de autenticação utiliza...",
      "score": 0.92,
      "chunk_index": 7,
      "filename": "documento.pdf"
    }
  ]
}
```

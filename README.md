# 📄 Document Q&A — RAG System

A full-stack web app that lets you upload a PDF and ask questions about it in natural language. Answers are generated using a **Retrieval-Augmented Generation (RAG)** pipeline, grounding every response in the actual document content instead of the model's own memory.

## 🚀 Key Features

- **Context-Grounded Q&A** — Interactive chat interface answering strictly from the uploaded document.
- **Source Citations** — Every answer shows which document chunks it was generated from, with relevance scores.
- **Anti-Hallucination** — If the answer isn't in the document, the system says so instead of guessing.
- **High-Speed Inference** — Powered by Groq's LPU architecture for low-latency generation.
- **Custom-Built Retrieval** — Chunking, embedding, and similarity search implemented from scratch (no LangChain shortcuts) to fully understand the retrieval mechanism.

## 🛠️ Tech Stack

**Backend & AI**
- Node.js + Express — REST API
- Transformers.js — local embedding generation
- FAISS / manual cosine similarity — vector retrieval
- Groq API (LLaMA) — response generation
- MongoDB — document, chunk, and conversation storage

**Frontend**
- React + Tailwind CSS

## ⚙️ How It Works

1. **Upload** — User uploads a PDF.
2. **Chunking** — Text is extracted and split into overlapping chunks.
3. **Embedding** — Each chunk is converted into a vector using a local embedding model.
4. **Storage** — Vectors are stored in MongoDB / FAISS for retrieval.
5. **Query** — User's question is embedded and matched against stored vectors via cosine similarity.
6. **Generation** — The most relevant chunks are passed to Groq's LLM to generate a grounded answer with source citations.

## 👤 Author

Priyanshu Maurya
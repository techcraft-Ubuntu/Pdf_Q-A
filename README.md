📄 Document Q&A — RAG System

A full-stack web application that lets users upload a PDF and ask questions about its content in natural language. Answers are generated using a Retrieval-Augmented Generation (RAG) pipeline, grounding every response in the retrieved document context rather than the model's own memory.

🚀 Features
Upload and process PDF documents (text extraction via pdf-parse)
Text chunking with overlap for better retrieval coverage
Local embedding generation using Transformers.js (Xenova/all-MiniLM-L6-v2)
Semantic retrieval via manually implemented cosine similarity and Top-K ranking
Grounded answer generation using the Groq API
Source citations showing chunk index and similarity score for each answer
Persistent conversation and message history stored in MongoDB
🛠️ Tech Stack

Backend

Node.js, Express.js
MongoDB + Mongoose
Multer (file uploads)

AI / RAG

Transformers.js (Xenova/all-MiniLM-L6-v2 embeddings)
Manually implemented cosine similarity + Top-K retrieval
Groq API — OpenAI GPT-OSS 20B for response generation

Frontend

React
Tailwind CSS
⚙️ RAG Pipeline
text
PDF Upload
   ↓
Text Extraction (pdf-parse)
   ↓
Chunking (with overlap)
   ↓
Embeddings (Transformers.js)
   ↓
MongoDB (chunks + embeddings)
   ↓
Query → Query Embedding
   ↓
Cosine Similarity + Top-K Retrieval
   ↓
Grounded Prompt Construction
   ↓
Groq API (GPT-OSS 20B)
   ↓
Answer + Source Citations
📁 Project Structure
text
backend/
  src/
    models/        # Document, DocumentChunk, Conversation, Message
    routes/         # upload, chat endpoints
    controllers/     # request handlers
    services/       # chunking, embedding, similarity, retrieval, prompt, groq
    middleware/     # upload handling
  server.js

frontend/
  src/
    api/            # API client
    components/     # UploadBox, ChatWindow
    App.jsx
🎯 Goal

This project was built to understand how Retrieval-Augmented Generation actually works under the hood — chunking, embedding, similarity search, and grounded prompt construction were implemented manually rather than using a framework like LangChain, in order to fully grasp each step of the retrieval pipeline before relying on abstractions.

👤 Author

Priyanshu Maurya
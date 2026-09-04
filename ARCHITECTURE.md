// chunker.service.js

/*
 * Splits a large text into smaller overlapping chunks.
 *
 * Why overlap? If a sentence/idea spans a chunk boundary, overlap ensures
 * it isn't cut in half and lost from retrieval — both neighboring chunks
 * will contain enough of it to be found.

 */

 

# Document QA RAG — Project Structure

```text
document-qa-rag/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                         # MongoDB connection
│   │   │   └── env.js                        # env variable loader/validator
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Document.js
│   │   │   ├── DocumentChunk.js
│   │   │   ├── Conversation.js
│   │   │   └── Message.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── document.routes.js
│   │   │   └── chat.routes.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── document.controller.js       # handles upload endpoint
│   │   │   └── chat.controller.js           # handles query endpoint
│   │   │
│   │   ├── services/
│   │   │   ├── pdfExtractor.service.js      # pdf-parse wrapper
│   │   │   ├── chunker.service.js            # YOUR chunking logic
│   │   │   ├── embedding.service.js          # Transformers.js wrapper
│   │   │   ├── vectorStore.service.js        # FAISS wrapper OR manual store
│   │   │   ├── similarity.service.js         # YOUR cosineSimilarity()
│   │   │   ├── retrieval.service.js          # top-K retrieval logic
│   │   │   ├── promptBuilder.service.js      # context + grounding prompt
│   │   │   └── groq.service.js               # LLM call wrapper
│   │   │
│   │   ├── engine/
│   │   │   └── ragEngine.js                  # orchestrates the full pipeline
│   │   │                                       # this is your "core" file, ties
│   │   │                                       # chunker → embedder → retriever →
│   │   │                                       # promptBuilder → groq together
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── upload.middleware.js          # multer config
│   │   │   └── error.middleware.js
│   │   │
│   │   └── app.js                            # Express app setup
│   │
│   ├── server.js                             # entry point
│   ├── .env
│   ├── package.json
│   └── uploads/                              # temp storage for uploaded PDFs
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js                     # axios instance + API calls
│   │   │
│   │   ├── components/
│   │   │   ├── UploadBox.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx             # shows answer + source citation
│   │   │   └── DocumentList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── ChatPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## RAG Core Flow

```text
PDF
 ↓
PDF Extraction
 ↓
Text Chunking
 ↓
Embeddings
 ↓
Vector Store
 ↓
User Query
 ↓
Query Embedding
 ↓
Similarity Search
 ↓
Top-K Relevant Chunks
 ↓
Context + User Query
 ↓
Grounding Prompt
 ↓
Groq LLM
 ↓
Answer + Source Citation
```

## Core RAG Components

| Component | Responsibility |
|---|---|
| `pdfExtractor.service.js` | Extract text from uploaded PDFs |
| `chunker.service.js` | Split extracted text into useful overlapping chunks |
| `embedding.service.js` | Convert text into numerical vectors |
| `similarity.service.js` | Calculate cosine similarity between vectors |
| `vectorStore.service.js` | Store and retrieve document vectors |
| `retrieval.service.js` | Find the Top-K most relevant chunks |
| `promptBuilder.service.js` | Build context-aware, grounded prompts |
| `groq.service.js` | Send the final prompt to the LLM |
| `ragEngine.js` | Orchestrate the complete RAG pipeline |

// services/vectorStore.service.js

const DocumentChunk = require('../models/DocumentChunk');

/**
 * Fetches all chunks (with embeddings) for a given document from MongoDB.
 * This is your "vector store" for now — MongoDB doubles as storage.
 * Later, if you want, you can swap this for FAISS/a dedicated vector DB
 * without touching any other file, since everything else just calls
 * this function and doesn't care where the vectors actually live.
 */
async function getChunksForDocument(documentId) {
  const chunks = await DocumentChunk.find({ documentId }).lean();
  return chunks.map(c => ({
    chunk: c.text,
    embedding: c.embedding,
    chunkIndex: c.chunkIndex,
    documentId: c.documentId,
  }));
}

/**
 * Saves a batch of chunk+embedding pairs for a document.
 * (Used during upload — you may already be doing this inline in the
 * controller; this just centralizes it so upload logic isn't duplicated
 * if you add other ingestion paths later, e.g. re-processing a doc.)
 */
async function saveChunks(documentId, chunks) {
  const docs = chunks.map((c, i) => ({
    documentId,
    chunkIndex: i,
    text: c.text,
    embedding: c.embedding,
  }));
  return DocumentChunk.insertMany(docs);
}

module.exports = { getChunksForDocument, saveChunks };
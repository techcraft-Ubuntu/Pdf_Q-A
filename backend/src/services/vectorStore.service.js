// services/vectorStore.service.js

const DocumentChunk = require('../models/DocumentChunk');

/**
 * Retrieves all chunks and embeddings for a document.
 * MongoDB currently serves as the vector storage layer.
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
 * Saves chunks and their embeddings for a document.
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
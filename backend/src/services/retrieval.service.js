// services/retrieval.service.js

const { embedText } = require('./embedding.service');
const { getTopKChunks } = require('./similarity.service');
const { getChunksForDocument } = require('./vectorStore.service');

/**
 * Given a user's question and a document, retrieves the most relevant
 * chunks to answer it. This is the piece that ties embedding + storage +
 * similarity together into one clean "retrieval" step, so the controller
 * layer doesn't need to know about vectors at all.
 *
 * @param {string} query - user's question
 * @param {string} documentId
 * @param {number} k - how many chunks to retrieve
 * @param {number} minScore - optional relevance threshold (0-1). Chunks
 *   below this similarity score are dropped — prevents forcing in
 *   irrelevant context when nothing in the doc actually matches well.
 */
async function retrieveRelevantChunks(query, documentId, k = 4, minScore = 0.3) {
  const queryVector = await embedText(query);
  const allChunks = await getChunksForDocument(documentId);

  const topChunks = getTopKChunks(queryVector, allChunks, k);

  return topChunks.filter(item => item.score >= minScore);
}

module.exports = { retrieveRelevantChunks };
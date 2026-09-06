// services/retrieval.service.js

const { embedText } = require('./embedding.service');
const { getTopKChunks } = require('./similarity.service');
const { getChunksForDocument } = require('./vectorStore.service');

async function retrieveRelevantChunks(query, documentId, k = 4, minScore = 0.20) {
  const queryVector = await embedText(query);
  const allChunks = await getChunksForDocument(documentId);

  console.log('Chunks found:', allChunks.length);

  const topChunks = getTopKChunks(queryVector, allChunks, k);

  console.log(
    'Similarity scores:',
    topChunks.map(item => item.score)
  );

  return topChunks.filter(item => item.score >= minScore);
}

module.exports = { retrieveRelevantChunks };
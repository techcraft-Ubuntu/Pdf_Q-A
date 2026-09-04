// similarity.service.js

/**
 * Computes cosine similarity between two vectors.
 * Measures the angle between them — 1 = identical direction (very similar meaning),
 * 0 = unrelated, -1 = opposite.
 */
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must be the same length");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Given a query vector and an array of { chunk, embedding } objects,
 * returns the top-K most similar chunks, sorted by similarity descending.
 */
function getTopKChunks(queryVector, chunkEmbeddings, k = 5) {
  const scored = chunkEmbeddings.map(item => ({
    chunk: item.chunk,
    score: cosineSimilarity(queryVector, item.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, k);
}

module.exports = { cosineSimilarity, getTopKChunks };
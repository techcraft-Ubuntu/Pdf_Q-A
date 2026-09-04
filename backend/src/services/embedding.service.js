// embedding.service.js

const { pipeline } = require('@xenova/transformers');

/**
 * Lazy-loaded embedding pipeline. We load the model once and reuse it,
 * since loading is slow but inference is fast once it's in memory.
 *
 * Model: all-MiniLM-L6-v2 — small, fast, good general-purpose embedding
 * model (384-dimensional vectors). Runs entirely on your machine.
 */
let embedder = null;

async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
  }
  return embedder;
}

/**
 * Converts a single piece of text into an embedding vector.
 * @param {string} text
 * @returns {number[]} embedding vector (array of floats)
 */
async function embedText(text) {
  const model = await getEmbedder();

  const output = await model(text, {
    pooling: 'mean',    // average token embeddings into one vector
    normalize: true,    // makes cosine similarity math cleaner (unit vectors)
  });
  
  return Array.from(output.data);
}

/**
 * Embeds multiple chunks in sequence.
 * @param {string[]} texts
 * @returns {Promise<number[][]>} array of embedding vectors
 */
async function embedChunks(texts) {
  const embeddings = [];
  for (const text of texts) {
    const vector = await embedText(text);
    embeddings.push(vector);
  }
  return embeddings;
}

module.exports = { embedText, embedChunks };
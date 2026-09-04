
/**
 * Splits a large text into smaller overlapping chunks.
 *
 * Why overlap? If a sentence/idea spans a chunk boundary, overlap ensures
 * it isn't cut in half and lost from retrieval — both neighboring chunks
 * will contain enough of it to be found.
 *
 * @param {string} text - full extracted PDF text
 * @param {number} chunkSize - max characters per chunk (~500-1000 is typical for small models)
 * @param {number} overlap - characters shared between consecutive chunks
 * @returns {string[]} array of text chunks
 */

function chunkText(text, chunkSize = 800, overlap = 150) {

  if(overlap >= chunkSize) {
    throw new Error("Overlap must be smaller than chunk size.");
  }

  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    if (end === text.length) {
            break;
        }

    start = end - overlap;
  }
  return chunks;
}

module.exports = {
    chunkText
};
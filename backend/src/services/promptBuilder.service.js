// promptBuilder.service.js

/**
 * Builds a grounding prompt from retrieved chunks + the user's question.
 *
 * The key design decision here: explicitly instruct the model to answer
 * ONLY from the given context, and to say it doesn't know if the answer
 * isn't present. This is what reduces hallucination — without this
 * instruction, the LLM will happily make up an answer from its own
 * training knowledge instead of the actual document.
 */
function buildPrompt(query, retrievedChunks) {
  const context = retrievedChunks
    .map((item, i) => `[Source ${i + 1}]: ${item.chunk}`)
    .join('\n\n');

  const systemInstruction = `You are a helpful assistant that answers questions based ONLY on the provided context below.
Rules:
- If the answer is not contained in the context, say "I don't have enough information in the document to answer that."
- Do not use any outside knowledge.
- When you answer, mention which Source number(s) support your answer.`;

  const userPrompt = `Context:
${context}

Question: ${query}

Answer:`;

  return { systemInstruction, userPrompt };
}

module.exports = { buildPrompt };
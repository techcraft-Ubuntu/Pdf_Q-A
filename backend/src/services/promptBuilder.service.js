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

  const systemInstruction = `You are a document question-answering assistant.

Use the retrieved document context as the primary source of truth.

Rules:
- Answer directly when the context clearly contains the answer.
- You may combine information from multiple retrieved chunks when needed.
- You may make simple, logical inferences from information explicitly present in the context.
- Do not invent facts or rely on outside knowledge about the person.
- If the context does not provide enough evidence to answer the question, say:
  "I don't have enough information in the document to answer that."
- Do not infer sensitive or personal attributes such as gender, age, religion,
  ethnicity, or similar attributes from a person's name or other indirect clues.`;

  const userPrompt = `Context:
${context}

Question: ${query}

Answer:`;

  return { systemInstruction, userPrompt };
}

module.exports = { buildPrompt };
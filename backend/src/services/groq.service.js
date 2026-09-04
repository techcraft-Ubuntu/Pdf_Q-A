// groq.service.js

const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Sends the grounded prompt to Groq's LLM and returns the generated answer.
 * Uses Groq specifically for its low-latency LPU-based inference.
 */
async function generateAnswer(systemInstruction, userPrompt, model = 'openai/gpt-oss-20b'
) {
  const completion = await groq.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemInstruction },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.2, // low temperature = more factual, less creative — important for grounded QA
  });

  return completion.choices[0].message.content;
}

module.exports = { generateAnswer }; 
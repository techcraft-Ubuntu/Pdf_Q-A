// controllers/chat.controller.js
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { retrieveRelevantChunks } = require('../services/retrieval.service');
const { buildPrompt } = require('../services/promptBuilder.service');
const { generateAnswer } = require('../services/groq.service');

async function askQuestion(req, res) {
  try {
    const { documentId, conversationId, question } = req.body;

    let conversation = conversationId
      ? await Conversation.findById(conversationId)
      : await Conversation.create({ documentId, title: question.slice(0, 50) });

    // 1. Retrieve relevant chunks
    const relevantChunks = await retrieveRelevantChunks(question, documentId);

    // 2. Handle "nothing relevant found" case explicitly
    if (relevantChunks.length === 0) {
      const fallbackAnswer = "I don't have enough information in the document to answer that.";
      await Message.create({ conversationId: conversation._id, role: 'user', content: question });
      await Message.create({ conversationId: conversation._id, role: 'assistant', content: fallbackAnswer });
      return res.json({ conversationId: conversation._id, answer: fallbackAnswer, sources: [] });
    }

    // 3. Build grounded prompt
    const { systemInstruction, userPrompt } = buildPrompt(question, relevantChunks);

    // 4. Generate answer
    const answer = await generateAnswer(systemInstruction, userPrompt);

    // 5. Persist both messages
    await Message.create({ conversationId: conversation._id, role: 'user', content: question });
    await Message.create({
      conversationId: conversation._id,
      role: 'assistant',
      content: answer,
      sources: relevantChunks.map(c => ({ chunkIndex: c.chunkIndex, score: c.score })),
    });

    res.json({
      conversationId: conversation._id,
      answer,
      sources: relevantChunks.map(c => ({ chunkIndex: c.chunkIndex, score: c.score })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate answer' });
  }
}

module.exports = { askQuestion };
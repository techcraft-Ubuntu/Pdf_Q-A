// src/controllers/document.controller.js
const Document = require('../models/Document');
const DocumentChunk = require('../models/DocumentChunk');
const { extractText } = require('../services/pdfExtractor.service');
const { chunkText } = require('../services/chunker.service');
const { embedText } = require('../services/embedding.service');

async function uploadDocument(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const doc = await Document.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    const text = await extractText(req.file.path);
    const chunks = chunkText(text);

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await embedText(chunks[i]);
      await DocumentChunk.create({
        documentId: doc._id,
        chunkIndex: i,
        text: chunks[i],
        embedding,
      });
    }

    doc.status = 'ready';
    await doc.save();

    res.json({ documentId: doc._id, chunksCreated: chunks.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process document' });
  }
}

module.exports = { uploadDocument };
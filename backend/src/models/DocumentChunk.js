// src/models/DocumentChunk.js
const mongoose = require('mongoose');

const chunkSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true,
  },
  chunkIndex: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number], // array of floats — the vector
    required: true,
  },
});

module.exports = mongoose.model('DocumentChunk', chunkSchema);
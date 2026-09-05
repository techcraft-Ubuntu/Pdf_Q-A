const mongoose = require('mongoose')

const messsageSchema = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
    role: { type: String, enum: ['user', 'assistant'] },
    content: String,
    sources: [{ chunkIndex: Number, score: Number }], // for citation display
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message',messsageSchema);
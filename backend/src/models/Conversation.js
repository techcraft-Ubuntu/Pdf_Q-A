const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    documentId : { type : mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
    title : String,
    createdAt : { type : Date, default: Date.now },
});

module.exports = mongoose.model('Conversation',conversationSchema);
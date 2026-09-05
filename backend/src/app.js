// src/app.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/documents', require('./routes/document.routes'));
app.use('/api/chat', require('./routes/chat.routes'));

// Basic health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong' });
});

module.exports = app;
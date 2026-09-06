import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(`${API_BASE}/documents/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data; // { documentId, chunksCreated }
}

export async function askQuestion(documentId, question, conversationId = null) {
  const res = await axios.post(`${API_BASE}/chat/ask`, {
    documentId,
    question,
    conversationId,
  });
  return res.data; // { conversationId, answer, sources }
}
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let predictions = []; // Stockées en RAM

// GET /predictions : retourne la liste actuelle
app.get('/predictions', (req, res) => {
  res.json({ predictions });
});

// POST /predictions : remplace les anciennes par les nouvelles
app.post('/predictions', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Expected an array of predictions' });
  }
  predictions = req.body;
  res.json({ message: '✅ Predictions updated', count: predictions.length });
});

// Optionnel : vider
app.delete('/predictions', (req, res) => {
  predictions = [];
  res.json({ message: '🗑️ All predictions cleared' });
});

app.listen(PORT, () => {
  console.log(`🚀 API listening on port ${PORT}`);
});

// Variable globale pour stocker la valeur
let lastCount = 0;

// GET /last_count : retourne la valeur actuelle
app.get('/last_count', (req, res) => {
  res.json({ value: lastCount });
});

// POST /last_count : met à jour la valeur
app.post('/last_count', (req, res) => {
  const { value } = req.body;
  if (typeof value !== 'number') {
    return res.status(400).json({ error: '❌ "value" must be a number' });
  }
  lastCount = value;
  res.json({ message: '✅ Last count updated', value: lastCount });
});

// DELETE /last_count : réinitialise la valeur à 0
app.delete('/last_count', (req, res) => {
  lastCount = 0;
  res.json({ message: '🧹 Last count reset to 0' });
});

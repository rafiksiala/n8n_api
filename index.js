const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let latest = []; // Stockées en RAM

// GET /latest : retourne la liste actuelle
app.get('/latest', (req, res) => {
  res.json({ latest });
});

// POST /latest : remplace les anciennes par les nouvelles
app.post('/latest', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Expected an array of predictions' });
  }
  latest = req.body;
  res.json({ message: '✅ Predictions updated', count: latest.length });
});

// Optionnel : vider
app.delete('/latest', (req, res) => {
  latest = [];
  res.json({ message: '🗑️ All predictions cleared' });
});


let upcoming = []; // Stockées en RAM

// GET /upcoming : retourne la liste actuelle
app.get('/upcoming', (req, res) => {
  res.json({ upcoming });
});

// POST /upcoming : remplace les anciennes par les nouvelles
app.post('/upcoming', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Expected an array of predictions' });
  }
  upcoming = req.body;
  res.json({ message: '✅ Predictions updated', count: upcoming.length });
});

// Optionnel : vider
app.delete('/upcoming', (req, res) => {
  upcoming = [];
  res.json({ message: '🗑️ All predictions cleared' });
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


app.listen(PORT, () => {
  console.log(`🚀 API listening on port ${PORT}`);
});

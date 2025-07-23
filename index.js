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

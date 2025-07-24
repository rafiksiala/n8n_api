const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connexion PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ------------------------- LATEST -------------------------
app.get('/latest', async (req, res) => {
  const result = await pool.query(`SELECT bet_id FROM latest`);
  res.json({ latest: result.rows.map(r => r.bet_id) });
});

app.post('/latest', async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Expected an array of bet_ids' });
  }
  await pool.query(`DELETE FROM latest`);
  for (const bet_id of req.body) {
    await pool.query(`INSERT INTO latest (bet_id) VALUES ($1)`, [bet_id]);
  }
  res.json({ message: '✅ Latest updated', count: req.body.length });
});

app.delete('/latest', async (req, res) => {
  await pool.query(`DELETE FROM latest`);
  res.json({ message: '🗑️ All latest bets cleared' });
});

// ------------------------- UPCOMING -------------------------
app.get('/upcoming', async (req, res) => {
  const result = await pool.query(`SELECT bet_id FROM upcoming`);
  res.json({ upcoming: result.rows.map(r => r.bet_id) });
});

app.post('/upcoming', async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Expected an array of bet_ids' });
  }
  await pool.query(`DELETE FROM upcoming`);
  for (const bet_id of req.body) {
    await pool.query(`INSERT INTO upcoming (bet_id) VALUES ($1)`, [bet_id]);
  }
  res.json({ message: '✅ Upcoming updated', count: req.body.length });
});

app.delete('/upcoming', async (req, res) => {
  await pool.query(`DELETE FROM upcoming`);
  res.json({ message: '🗑️ All upcoming bets cleared' });
});

// ------------------------- LAST COUNT -------------------------
app.get('/last_count', async (req, res) => {
  const result = await pool.query(`SELECT value FROM last_count LIMIT 1`);
  res.json({ value: result.rows[0].value });
});

app.post('/last_count', async (req, res) => {
  const { value } = req.body;
  if (typeof value !== 'number') {
    return res.status(400).json({ error: '❌ "value" must be a number' });
  }
  await pool.query(`UPDATE last_count SET value = $1 WHERE id = 1`, [value]);
  res.json({ message: '✅ Last count updated', value });
});

app.delete('/last_count', async (req, res) => {
  await pool.query(`UPDATE last_count SET value = 0 WHERE id = 1`);
  res.json({ message: '🧹 Last count reset to 0' });
});

app.listen(PORT, () => {
  console.log(`🚀 API listening on port ${PORT}`);
});

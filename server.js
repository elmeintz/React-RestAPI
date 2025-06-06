
const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

// PostgreSQL config
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'habitdb',
  password: 'LauElla0408!',
  port: 5432,
});

// GET all habits
app.get('/habits', async (req, res) => {
  const result = await db.query('SELECT * FROM habits');
  res.json(result.rows);
});

// POST a new habit
app.post('/habits', async (req, res) => {
  const { name } = req.body;
  const result = await db.query(
    'INSERT INTO habits (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.json(result.rows[0]);
});

// Mark a habit complete
app.post('/habits/:id/complete', async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    'INSERT INTO completions (habit_id, completed_on) VALUES ($1, CURRENT_DATE) RETURNING *',
    [id]
  );
  res.json(result.rows[0]);
});

// Get habit history
app.get('/habits/:id/history', async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    'SELECT * FROM completions WHERE habit_id = $1 ORDER BY completed_on DESC',
    [id]
  );
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

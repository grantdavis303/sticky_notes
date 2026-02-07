const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Automatically Parse JSON

app.use(express.json());

// Logging Request Details

app.use((req, res, next) => {
  const timestamp = new Date().toDateString();
  console.log(`[${timestamp}] ${req.method} ${req.url} ${req.ip}`);
  next();
});

// Enable CORS

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://192.168.0.105:5173'
  ]
}))

// Database Setup

const pool = new Pool({
  host: 'localhost',
  user: 'grantdavis303',
  port: 5432,
  password: '',
  database: 'sticky_notes'
});

// Start the Server

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
})

// End Points - /

app.get('/', (req, res) => {
  res.send('🚀 Server is up and running!');
})

// Retrieve all Notes

app.get('/api/v1/notes', async (req, res) => {
  try {
    const query = await pool.query(
      `
        SELECT sticky_notes.*
        FROM users
        JOIN sticky_notes ON sticky_notes.user_id = users.id
        WHERE users.id = 1;
      `
    );

    res.send(query.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
})

// Create a Note

app.post('/api/v1/notes/create', async (req, res) => {
  console.log('Creating a new note request body:', req.body);

  try {
    const query = await pool.query(
      `
        INSERT INTO sticky_notes (user_id, title, content, color)
        VALUES (1, $1, $2, $3)
        RETURNING id, user_id, title, content, color, created_at, updated_at;
      `, [req.body.title, req.body.content, req.body.color]
    );

    res.send(query);
  } catch (err) {
    res.status(500).send(err.message);
  }
})

// Delete a Note

app.delete('/api/v1/notes/delete/:id', async (req, res) => {
  try {
    const query = await pool.query(
      `
        DELETE FROM sticky_notes
        WHERE id = ${req.params.id};
      `
    );

    res.send(query);
  } catch (err) {
    res.status(500).send(err.message);
  }
})

// Update a Note

app.patch('/api/v1/notes/update/:id', async (req, res) => {
  console.log('Updating a note request body:', req.body);

  try {
    const query = await pool.query(
      `
        UPDATE sticky_notes
        SET title = $1, content = $2, color = $3, updated_at = now()
        WHERE sticky_notes.id = ${req.params.id}
        RETURNING id, user_id, title, content, color, created_at, updated_at;
      `, [req.body.title, req.body.content, req.body.color]
    );

    res.send(query);
  } catch (err) {
    res.status(500).send(err.message);
  }
})
